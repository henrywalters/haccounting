import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { AddressDto } from "../dtos/address.dto";
import { ClientAddressesDto, ClientInfoDto } from "../dtos/client.dto";
import { ProjectDto, ProjectTaskDto } from "../dtos/project.dto";
import { Address } from "../entities/address.entity";
import { Client } from "../entities/client.entity";
import { ProjectTask } from "../entities/projectTask.entity";
import { AccountingService } from "../services/accounting.service";
import { ProjectService } from "../services/project.service";
import { RolladeckService } from "../services/rolladeck.service";

@Controller('api/clients')
export class ClientsController {
    constructor(
        private readonly rolladeck: RolladeckService,
        private readonly projects: ProjectService,
        private readonly accounting: AccountingService,
    ) {}

    @Get()
    public async getClients() {
        return await this.rolladeck.getClients();
    }

    @Post()
    public async createClient(@Body() body: ClientInfoDto) {
        return await this.rolladeck.createClient(body);
    }

    @Get(':id')
    public async getClient(@Param('id', ParseUUIDPipe) id: string) {
        return await this.rolladeck.getClient(id);
    }

    @Put(':id')
    public async updateClient(@Param('id', ParseUUIDPipe) id: string, @Body() body: ClientInfoDto) {
        const client = await this.rolladeck.getClient(id);
        return await this.rolladeck.updateClient(client, body);
    }

    @Delete(':id')
    public async deleteClient(@Param('id', ParseUUIDPipe) id: string) {
        const client = await this.rolladeck.getClient(id);
        await client.remove();
        return void 0;
    }

    @Get(':id/addresses')
    public async getAddresses(@Param('id', ParseUUIDPipe) id: string) {
        return await this.rolladeck.getAddresses(await this.rolladeck.getClient(id));
    }

    @Post(':id/addresses')
    public async createAddress(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AddressDto) {
        return await this.rolladeck.createAddress(await this.rolladeck.getClient(id),dto);
    }

    @Put(":clientId/addresses/:id")
    public async updateAddress(@Param('clientId', ParseUUIDPipe) clientId: string, @Param('id', ParseUUIDPipe) id: string, @Body() dto: AddressDto) {
        return await this.rolladeck.updateAddress(await this.rolladeck.getAddress(clientId, id), dto);
    }

    @Delete(":clientId/addresses/:id")
    public async deleteAddress(@Param('clientId', ParseUUIDPipe) clientId: string, @Param('id', ParseUUIDPipe) id: string) {
        const address = await this.rolladeck.getAddress(clientId, id);
        await address.remove();
        return void 0;
    }

    @Post(':id/active-addresses')
    public async updateActiveAddresses(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ClientAddressesDto) {
        const client = await this.rolladeck.getClient(id);
        if (dto.billingAddressId) {
            await this.rolladeck.setBillingAddress(client, await this.rolladeck.getAddress(client.id, dto.billingAddressId));
        }
        if (dto.shippingAddressId) {
            await this.rolladeck.setShippingAddress(client, await this.rolladeck.getAddress(client.id, dto.shippingAddressId));
        } else if (dto.shippingAddressSameAsBilling && client.billingAddress) {
            await this.rolladeck.setShippingAddress(client, client.billingAddress);
        } else if (dto.shippingAddressSameAsBilling === false) {
            client.shippingAddress = null;
            await client.save();
        }
        return client;
    }

    @Get(':clientId/projects')
    public async getProjects(@Param('clientId', ParseUUIDPipe) clientId) {
        return await this.projects.getClientProjects(clientId);
    }
}