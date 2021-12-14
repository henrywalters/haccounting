import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { ProjectStatus } from "src/entities/project.entity";

export class ProjectDto {

    @IsString()
    @IsNotEmpty()
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
    @IsNotEmpty()
    public title: string;

    @IsString()
    @IsOptional()
    public description?: string;

    @IsNumber()
    public estimatedHours: number;

    @IsBoolean()
    public complete: boolean;
}

export class TaskWorkDto {
    @IsNumber()
    @Min(0)
    public hours: number;

    @IsString()
    @IsNotEmpty()
    public notes: string;
}