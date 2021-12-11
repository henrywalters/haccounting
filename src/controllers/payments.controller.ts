import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
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
            return await this.accounting.payInvoice(body.invoiceId, body.amount, body.card);
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
        
    }
}