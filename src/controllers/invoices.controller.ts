import { Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { AccountingService } from "src/services/accounting.service";
import { getConnection } from "typeorm";

@Controller('api/invoices')
export class InvoicesController {

    constructor(private accounting: AccountingService) {}

    @Get()
    public async getInvoices() {
        return await this.accounting.getInvoices();
    }

    @Get(':id')
    public async getInvoice(@Param('id', ParseUUIDPipe) id: string) {
        return await getConnection().transaction(async trans => {
            return await this.accounting.getInvoice(id, trans);
        });
    }
}