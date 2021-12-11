import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class ProjectTask extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ManyToOne(type => Project, project => project.tasks)
    public project: Project;

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

}