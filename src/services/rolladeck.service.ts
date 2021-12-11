import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { AddressDto } from "src/dtos/address.dto";
import { ClientInfoDto } from "src/dtos/client.dto";
import { Address } from "src/entities/address.entity";
import { Client } from "src/entities/client.entity";
import { StripeService } from "./stripe.service";

@Injectable()
export class RolladeckService {

    constructor(private readonly stripe: StripeService) {}

    public async getAddresses(client: Client) {
        return await Address.find({where: { client: {id: client.id}}, relations: ['client']});
    }

    public async getAddress(clientId: string, id: string) {
        const address = await Address.findOne({where: {id, client: {id: clientId}}});
        if (!address) {
            throw new NotFoundException("Address does not exist");
        }
        return address;
    }

    public async updateAddress(address: Address, dto: AddressDto) {
        address.streetAddress = dto.streetAddress;
        address.unitType = dto.unitType;
        address.unitNumber = dto.unitNumber;
        address.city = dto.city;
        address.state = dto.state;
        address.zipCode = dto.zipCode;
        await address.save();
        return address;
    }

    public async createAddress(client: Client, dto: AddressDto) {
        const address = new Address();
        address.client = client;
        return await this.updateAddress(address, dto);
    }

    public async getClients() {
        return await Client.find({relations: ['billingAddress', 'shippingAddress']})
    }

    public async getClient(id: string) {
        const client = await Client.findOne(id, {relations: ['billingAddress', 'shippingAddress']});
        if (!client) {
            throw new NotFoundException("Client does not exist");
        }
        await this.stripe.createStripeCustomerForClient(client);
        return client;
    }

    public async updateClient(client: Client, dto: ClientInfoDto) {
        client.name = dto.name;
        client.rate = dto.rate;
        client.contactName = dto.contactName;
        client.contactEmail = dto.contactEmail;
        client.phone = dto.phone;
        if (dto.invoicePrefix) client.invoicePrefix = dto.invoicePrefix;
        await client.save();
        await this.stripe.createStripeCustomerForClient(client);
        return client;
    }

    public async createClient(dto: ClientInfoDto) {
        const client = await this.updateClient(new Client(), dto);
        await this.stripe.createStripeCustomerForClient(client);
        return client;
    }

    public async setBillingAddress(client: Client, address: Address) {
  
        client.billingAddress = address;
        await client.save();
        return client;
    }

    public async setShippingAddress(client: Client, address: Address) {

        client.shippingAddress = address;

        await client.save();
        return client;
    }
}