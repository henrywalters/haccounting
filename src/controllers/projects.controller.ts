import { Body, Controller, Get, InternalServerErrorException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ProjectCreateDto, ProjectDto, ProjectTaskDto, TaskWorkDto } from "src/dtos/project.dto";
import { AccountingService } from "src/services/accounting.service";
import { ProjectService } from "src/services/project.service";
import { RolladeckService } from "src/services/rolladeck.service";

@Controller('api/projects')
export class ProjectsController {

    constructor(
        private readonly rolladeck: RolladeckService,
        private readonly projects: ProjectService,
        private readonly accounting: AccountingService,
    ) {}

    @Get()
    public async getProjects() {
        return await this.projects.getProjects();
    }

    @Post()
    public async createProject(@Body() dto: ProjectCreateDto) {
        return await this.projects.createProject(await this.rolladeck.getClient(dto.clientId), dto);
    }

    @Put(':id')
    public async updateProject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ProjectDto) {
        return await this.projects.updateProject(await this.projects.getProject(id), dto);
    }

    @Get(':id')
    public async getProject(@Param('id', ParseUUIDPipe) id: string) {
        return await this.projects.getProject(id);
    }
    
    @Get(':projectId/tasks')
    public async getProjectTask(@Param('projectId', ParseUUIDPipe) projectId: string) {
        return await this.projects.getProjectTasks(projectId);
    }

    @Post(':projectId/tasks')
    public async createProjectTask(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() dto: ProjectTaskDto) {
        return await this.projects.createProjectTask(await this.projects.getProject(projectId), dto);
    }

    @Put(':projectId/tasks/:id')
    public async updateProjectTask(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ProjectTaskDto) {
        return await this.projects.updateProjectTask(await this.projects.getProjectTask(id), dto);
    }

    @Post(':projectId/tasks/:id/work')
    public async workOnProjectTask(@Param('projectId', ParseUUIDPipe) projectId: string, @Param('id', ParseUUIDPipe) id: string, @Body() dto: TaskWorkDto) {
        const task = await this.projects.getProjectTask(id);
        task.actualHours += dto.hours;
        await task.save();
        return task;
    }

    @Post(':projectId/invoice')
    public async createInvoiceForProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
        try {
            return await this.accounting.createInvoiceForProject(projectId);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
        
    }
}