import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entity";
import { InvoiceItem } from "./invoiceItem.entity";
import { Payment } from "./payment.entity";

export enum InvoiceStatus {
    INVOICED = "Invoiced",
    PAID = "Paid",
    VOID = "Void",
}

@Entity()
export class Invoice extends BaseEntity {

    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @Index()
    public invoiceId: string;

    @Column({type: "datetime"})
    public date: Date;

    @ManyToOne(type => Client)
    public client: Client;

    @Column({type: 'float', default: 0})
    public amountPaid: number;

    @Column({type: 'enum', enum: InvoiceStatus})
    public status: InvoiceStatus;

    @OneToMany(type => InvoiceItem, item => item.invoice)
    public items: InvoiceItem[];

    @OneToMany(type => Payment, payment => payment.invoice)
    public payments: Payment[];

    public get totalAmount() {
        let sum = 0;

        for (const item of this.items) {
            sum += item.quantity * item.rate;
        }

        return sum;
    }

    public get totalAmountOwed() {
        return this.totalAmount - this.amountPaid;
    }
}