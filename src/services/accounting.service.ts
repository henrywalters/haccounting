import { Injectable, NotFoundException } from "@nestjs/common";
import { CardPaymentDto } from "src/dtos/cardPayment.dto";
import { Client } from "src/entities/client.entity";
import { Invoice, InvoiceStatus } from "src/entities/invoice.entity";
import { InvoiceItem } from "src/entities/invoiceItem.entity";
import { Payment } from "src/entities/payment.entity";
import { Project } from "src/entities/project.entity";
import { EntityManager, getConnection } from "typeorm";
import { StripeService } from "./stripe.service";

@Injectable()
export class AccountingService {

    constructor(private readonly stripe: StripeService) {}

    public async getInvoice(id: string, txn: EntityManager) {
        const invoice = await txn.findOne(Invoice, {
            where: {id},
            relations: ['items', 'client', 'payments', 'client.billingAddress', 'client.shippingAddress'],
        });

        if (!invoice) {
            throw new Error("Invoice does not exist");
        }

        return invoice;
    }

    public async getInvoices() {
        return await Invoice.find({relations: ['client', 'items', 'payments']});
    }

    public async getClientInvoices(client: Client) {
        return await Invoice.find({
            where: {
                client: {
                    id: client.id,
                }
            },
        })
    }

    public async getNextInvoiceId(client: Client, txn: EntityManager, leadingZeros = 3) {

        const {count} = await txn.createQueryBuilder(Invoice, 'invoice')
            .where('clientId = :clientId', {clientId: client.id})
            .andWhere('invoiceId LIKE :id', {id: `${client.invoicePrefix}-%`})
            .select('COUNT(id)', 'count')
            .getRawOne();

        let countStr = (parseInt(count) + 1).toFixed(0);

        for (let i = 0; i < leadingZeros - countStr.length; i++) {
            countStr = '0' + countStr;
        }

        return `${client.invoicePrefix}-${countStr}`;
    }

    public async createInvoiceForProject(projectId: string) {
        return await getConnection().transaction(async trans => {

            const project = await trans.findOne(Project, {
                where: {id: projectId},
                relations: ['tasks', 'client'],
            });

            if (!project) {
                throw new Error("Failed to find project matching this id");
            }

            const invoice = new Invoice();
            invoice.invoiceId = await this.getNextInvoiceId(project.client, trans);
            invoice.date = new Date();
            invoice.client = project.client;
            invoice.status = InvoiceStatus.INVOICED;
            
            const items = [];

            for (let i = 0; i < project.tasks.length; i++) {
                const task = project.tasks[i];
                const balance = task.actualHours - task.billedHours;
                if (balance != 0) {
                    const item = new InvoiceItem();
                    item.invoice = invoice;
                    item.invoiceItemId = `${invoice.invoiceId}-${i + 1}`;
                    item.title = task.title;
                    item.description = task.description;
                    item.rate = project.client.rate;
                    item.quantity = balance;

                    items.push(item);

                    task.billedHours += balance;
                    await trans.save(task);
                }
            }

            if (items.length === 0) {
                throw new Error("Nothing to be billed for this project");
            }

            await trans.save(invoice);
            await trans.save(items);

            return invoice;
        })
    }

    public async payInvoice(invoiceId: string, amount: number, cardId: string) {
        return await getConnection().transaction(async trans => {
            const invoice = await this.getInvoice(invoiceId, trans);
            if (amount > invoice.totalAmountOwed) {
                throw new Error("Amount exceeds total amounted owed by: " + (amount - invoice.totalAmountOwed));
            }

            await this.stripe.chargeClient(invoice.client, amount, cardId, `Invoice #${invoice.invoiceId}`);

            invoice.amountPaid += amount;

            if (invoice.amountPaid == invoice.totalAmount) {
                invoice.status = InvoiceStatus.PAID;
            }

            const payment = new Payment();
            payment.invoice = invoice;
            payment.client = invoice.client;
            payment.amount = amount;

            await trans.save(invoice);
            await trans.save(payment);

            return invoice;
        });
    }

    public async voidInvoice(invoiceId: string) {
        return await getConnection().transaction(async trans => {
            const invoice = await this.getInvoice(invoiceId, trans);
            invoice.status = InvoiceStatus.VOID;
            await trans.save(invoice);
            return invoice;
        });
    }
}