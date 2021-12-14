import { IsNotEmpty, IsObject, IsOptional, IsPostalCode, IsString, IsUUID } from "class-validator";

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    public streetAddress: string;

    @IsString()
    @IsOptional()
    public unitType?: string;

    @IsString()
    @IsOptional()
    public unitNumber?: string;

    @IsString()
    @IsNotEmpty()
    public city: string;

    @IsString()
    @IsNotEmpty()
    public state: string;

    @IsPostalCode('US')
    public zipCode: string;
}