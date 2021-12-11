import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ProjectStatus } from "src/entities/project.entity";

export class ProjectDto {

    @IsString()
    public title: string;

    @IsString()
    public status: ProjectStatus;
}

export class ProjectCreateDto extends ProjectDto {
    @IsUUID()
    public clientId: string;
}

export class ProjectTaskDto {
    @IsString()
    public title: string;

    @IsString()
    @IsOptional()
    public description?: string;

    @IsNumber()
    public estimatedHours: number;
}

export class TaskWorkDto {
    @IsNumber()
    public hours: number;
}