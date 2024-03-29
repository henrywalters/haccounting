import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";
import { Invoice } from "./invoice.entity";

@Entity()
export class Payment extends BaseEntity {

    @CreateDateColumn()
    public timestamp: Date;

    // Internal ID
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    // External ID
    @Column()
    public paymentId: string;

    @Column({type: 'float'})
    public amount: number;

    @ManyToOne(type => Client)
    public client: Client;

    @ManyToOne(type => Invoice)
    public invoice: Invoice;
}