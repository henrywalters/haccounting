import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class InvoiceDto {

    @IsUUID()
    public clientId: string;

    @IsArray()
    @Type(() => InvoiceItemDto)
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    public items: InvoiceItemDto[];
}

export class InvoiceItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    rate: number;

    @IsNumber()
    quantity: number;

}