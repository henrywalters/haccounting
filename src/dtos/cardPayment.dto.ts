import { IsCreditCard, IsNumber, IsString } from "class-validator";

export class CardPaymentDto {
    @IsCreditCard()
    public number: number;
    
    @IsNumber()
    public expMonth: number;

    @IsNumber()
    public expYear: number;

    @IsNumber()
    public cvc: number;
}