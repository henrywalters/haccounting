import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entity";
import { ProjectTask } from "./projectTask.entity";

export enum ProjectStatus {
    LEAD = "Lead",
    QUOTED = "Quoted",
    IN_PROGRESS = "In Progress",
    COMPLETE = "Complete",
    VOID = "Void",
}

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdOn: Date;

    @UpdateDateColumn()
    public lastUpdate: Date;

    @DeleteDateColumn()
    public deletedOn: Date;

    @Column()
    public title: string;

    @Column({type: "enum", enum: ProjectStatus})
    public status: ProjectStatus;

    @OneToMany(type => ProjectTask, task => task.project)
    public tasks: ProjectTask[];

    @ManyToOne(type => Client)
    public client: Client;
}