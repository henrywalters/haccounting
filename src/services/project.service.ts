import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectDto, ProjectTaskDto } from "src/dtos/project.dto";
import { Client } from "src/entities/client.entity";
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
        });
    }

    public async getProjectTask(id: string) {
        const task = await ProjectTask.findOne({where: {id}});
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
        if (dto.description) task.description = dto.description;
        if (dto.estimatedHours) task.estimatedHours = dto.estimatedHours;
        await task.save();
        return task;
    }
}