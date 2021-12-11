import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entity";
import { InvoiceItem } from "./invoiceItem.entity";

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

    @PrimaryColumn()
    public id: string;

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