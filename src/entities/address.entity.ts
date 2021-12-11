import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entity";

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    public streetAddress: string;

    @Column({nullable: true})
    public unitType: string;

    @Column({nullable: true})
    public unitNumber: string;

    @Column()
    public city: string;

    @Column()
    public state: string;

    @Column()
    public zipCode: string;

    @ManyToOne(type => Client, {cascade: ['remove']})
    public client: Client;
}