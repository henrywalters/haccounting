import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    public name: string;

    @Column({type: "float"})
    public rate: number;

    @Column({nullable: true})
    public contactName?: string;

    @Column({nullable: true})
    public contactEmail?: string;

    @Column()
    public phone: string;

    @OneToOne(type => Address, {nullable: true})
    @JoinColumn()
    public billingAddress?: Address;

    @OneToOne(type => Address, {nullable: true})
    @JoinColumn()
    public shippingAddress?: Address;

    @Column({nullable: true})
    public stripeId?: string;

    @Column({default: () => new Date().getFullYear().toString()})
    public invoicePrefix: string;
}