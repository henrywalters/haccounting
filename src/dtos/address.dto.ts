import { IsObject, IsOptional, IsPostalCode, IsString, IsUUID } from "class-validator";

export class AddressDto {
    @IsString()
    public streetAddress: string;

    @IsString()
    @IsOptional()
    public unitType: string;

    @IsString()
    @IsOptional()
    public unitNumber: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsPostalCode('US')
    public zipCode: string;
}