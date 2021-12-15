import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class QuoteDto {
    
    @IsUUID()
    public clientId: string;
    
    @IsArray()
    @Type(() => QuoteItemDto)
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    public items: QuoteItemDto[];
}

export class QuoteItemDto {
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