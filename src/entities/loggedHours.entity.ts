import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectTask } from "./projectTask.entity";

@Entity()
export class LoggedHours extends BaseEntity {
    @CreateDateColumn()
    public timestamp: Date;

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type: 'float', default: 0})
    public hours: number;

    @Column({type: 'text'})
    public notes: string;

    @ManyToOne(type => ProjectTask, task => task.loggedHours)
    public task: ProjectTask;
}