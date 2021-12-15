import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entity";
import { InvoiceItem } from "./invoiceItem.entity";
import { Payment } from "./payment.entity";
import { QuoteItem } from "./quoteItem.entity";

export enum QuoteStatus {
    PENDING = "Pending",
    INVOICED = "Invoiced",
    LOST = "Lost",
    VOID = "Void",
}

@Entity()
export class Quote extends BaseEntity {

    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @Index()
    public quoteId: string;

    @Column({type: "datetime"})
    public date: Date;

    @ManyToOne(type => Client)
    public client: Client;

    @Column({type: 'enum', enum: QuoteStatus})
    public status: QuoteStatus;

    @OneToMany(type => QuoteItem, item => item.quote)
    public items: QuoteItem[];
}