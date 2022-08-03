import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Res } from "@nestjs/common";
import { PDFService } from "@t00nday/nestjs-pdf";
import { Response } from "express";
import { InvoiceDto } from "src/dtos/invoice.dto";
import { AccountingService } from "src/services/accounting.service";
import { getConnection } from "typeorm";

@Controller('api/invoices')
export class InvoicesController {

    constructor(
        private accounting: AccountingService,
        private pdf: PDFService
    ) {}

    @Get()
    public async getInvoices() {
        return await this.accounting.getInvoices();
    }

    @Post()
    public async createInvoice(@Body() dto: InvoiceDto) {
        return await this.accounting.createInvoice(dto.clientId, dto);
    }

    @Get(':id')
    public async getInvoice(@Param('id', ParseUUIDPipe) id: string) {
        return await getConnection().transaction(async trans => {
            return await this.accounting.getInvoice(id, trans);
        });
    }

    @Delete(':id')
    public async voidInvoice(@Param('id', ParseUUIDPipe) id: string) {
        return await this.accounting.voidInvoice(id);
    }
}