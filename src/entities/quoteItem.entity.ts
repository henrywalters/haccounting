import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Quote } from "./quote.entity";

@Entity()
export class QuoteItem extends BaseEntity {
    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @Index()
    public quoteItemId: string;

    @ManyToOne(type => Quote, invoice => invoice.items)
    public quote: Quote;

    @Column()
    public title: string;

    @Column({nullable: true})
    public description?: string;

    @Column({type: 'float'})
    public rate: number;

    @Column({type: 'float'})
    public quantity: number;
}