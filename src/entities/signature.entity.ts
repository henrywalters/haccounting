import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Signature extends BaseEntity {
    @CreateDateColumn()
    public timestamp: Date;

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public signedName: string;

    @Column()
    public signedDate: string;
}