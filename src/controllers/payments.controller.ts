import { Body, Controller, Get, InternalServerErrorException, Param, Post } from "@nestjs/common";
import { ClientPaymentDto } from "../dtos/client.dto";
import { AccountingService } from "../services/accounting.service";

@Controller('api/payments')
export class PaymentsController {

    constructor(
        private readonly accounting: AccountingService
    ) {}

    @Post()
    public async clientPayment(@Body() body: ClientPaymentDto) {
        try {
            return await this.accounting.payInvoice(body.invoiceId, body.amount, body.cardId);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    @Get(":id")
    public async getPayment(@Param("id") id: string) {
        return await this.accounting.getPayment(id);
    }
}