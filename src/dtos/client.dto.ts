import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPhoneNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { AddressDto } from "./address.dto";
import { CardPaymentDto } from "./cardPayment.dto";

export class ClientInfoDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsNumber()
    public rate: number;

    @IsString()
    @IsOptional()
    public contactName?: string;

    @IsString()
    @IsOptional()
    public contactEmail?: string;

    @IsPhoneNumber('US')
    public phone: string;

    @IsString()
    @IsOptional()
    public invoicePrefix?: string;
}

export class ClientAddressesDto {
    @IsUUID()
    @IsOptional()
    public billingAddressId?: string;

    @IsBoolean()
    @IsOptional()
    public shippingAddressSameAsBilling?: boolean;

    @IsUUID()
    @IsOptional()
    public shippingAddressId?: string;
}

export class ClientPaymentDto {
    @IsUUID()
    public invoiceId: string;

    @IsNumber()
    public amount: number;

    @IsString()
    public cardId: string;
}