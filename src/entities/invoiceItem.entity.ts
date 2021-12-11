import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity()
export class InvoiceItem extends BaseEntity {
    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @Index()
    public invoiceItemId: string;

    @ManyToOne(type => Invoice, invoice => invoice.items)
    public invoice: Invoice;

    @Column()
    public title: string;

    @Column({nullable: true})
    public description?: string;

    @Column({type: 'float'})
    public rate: number;

    @Column({type: 'float'})
    public quantity: number;
}