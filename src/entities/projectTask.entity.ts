import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LoggedHours } from "./loggedHours.entity";
import { Project } from "./project.entity";

@Entity()
export class ProjectTask extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ManyToOne(type => Project, project => project.tasks)
    public project: Project;

    @CreateDateColumn()
    public createdOn: Date;

    @UpdateDateColumn()
    public lastUpdate: Date;

    @Column()
    public title: string;

    @Column({nullable: true})
    public description?: string;

    @Column({type: "bool", default: false})
    public complete: boolean;

    @Column({type: "float"})
    public estimatedHours: number;

    @Column({type: "float", nullable: true, default: 0})
    public actualHours: number;

    @Column({type: "float", default: 0})
    public billedHours: number;
    
    @OneToMany(type => LoggedHours, hours => hours.task)
    public loggedHours: LoggedHours[];
}