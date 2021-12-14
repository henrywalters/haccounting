import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectDto, ProjectTaskDto, TaskWorkDto } from "src/dtos/project.dto";
import { Client } from "src/entities/client.entity";
import { LoggedHours } from "src/entities/loggedHours.entity";
import { Project } from "src/entities/project.entity";
import { ProjectTask } from "src/entities/projectTask.entity";

@Injectable()
export class ProjectService {
    public async getProject(id: string) {
        const project = await Project.findOne({
            where: {
                id,
            },
            relations: ['client', 'tasks']
        });

        if (!project) {
            throw new NotFoundException("Project does not exist");
        }

        return project;
    }

    public async getClientProjects(clientId: string) {
        const projects = await Project.find({
            where: {
                client: {
                    id: clientId
                }
            },
            relations: []
        });

        return projects;
    }

    public async getProjects() {
        const projects = await Project.find({
            relations: ['client', 'tasks']
        });

        return projects;
    }

    public async getProjectTasks(projectId: string) {
        return await ProjectTask.find({
            where: {
                project: {
                    id: projectId,
                }
            },
            relations: [
                'loggedHours',
            ],
            order: {
                'createdOn': 'ASC'
            }
        });
    }

    public async getProjectTask(id: string) {
        const task = await ProjectTask.findOne({
            where: {id},
            relations: [
                'loggedHours',
            ]
        });
        if (!task) {
            throw new NotFoundException("Task does not exist");
        }
        return task;
    }

    public async createProject(client: Client, dto: ProjectDto) {
        const project = new Project();
        project.client = client;
        return await this.updateProject(project, dto);
    }

    public async updateProject(project: Project, dto: ProjectDto) {
        project.title = dto.title;
        project.status = dto.status;
        await project.save();
        return project;
    }

    public async createProjectTask(project: Project, dto: ProjectTaskDto) {
        const task = new ProjectTask();
        task.project = project;
        return await this.updateProjectTask(task, dto);
    }

    public async updateProjectTask(task: ProjectTask, dto: ProjectTaskDto) {
        task.title = dto.title;
        task.complete = dto.complete;
        task.description = dto.description;
        task.estimatedHours = dto.estimatedHours;
        await task.save();
        return task;
    }

    public async workOnTask(task: ProjectTask, dto: TaskWorkDto) {
        const loggedHours = new LoggedHours();
        loggedHours.hours = dto.hours;
        loggedHours.notes = dto.notes;
        loggedHours.task = task;
        task.actualHours += dto.hours;
        await task.save();
        await loggedHours.save();
    }
}