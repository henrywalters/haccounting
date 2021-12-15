import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { InvoiceDto } from "src/dtos/invoice.dto";
import { QuoteDto } from "src/dtos/quote.dto";
import { AccountingService } from "src/services/accounting.service";
import { getConnection } from "typeorm";

@Controller('api/quotes')
export class QuotesController {

    constructor(private accounting: AccountingService) {}

    @Get()
    public async getQuotes() {
        return await this.accounting.getQuotes();
    }

    @Post()
    public async createQuote(@Body() dto: QuoteDto) {
        return await this.accounting.createQuote(dto.clientId, dto);
    }

    @Get(':id')
    public async getQuote(@Param('id', ParseUUIDPipe) id: string) {
        return await getConnection().transaction(async trans => {
            return await this.accounting.getQuote(id, trans);
        });
    }
}