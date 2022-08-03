import { Injectable } from "@nestjs/common";
import { CardPaymentDto } from "src/dtos/cardPayment.dto";
import { Client } from "src/entities/client.entity";
import Stripe from "stripe";

@Injectable()
export class StripeService {

    private stripe: Stripe;
    private pubKey: string;
    private secretKey: string;

    constructor() {
        this.pubKey = process.env.STRIPE_KEY;
        this.secretKey = process.env.STRIPE_SECRET;
        this.stripe = new Stripe(this.secretKey, null);
    }

    public async stripeCustomerExists(id: string): Promise<boolean> {
        try {
            await this.stripe.customers.retrieve(id);
            return true;
        } catch (e) {
            return false;
        }
    }

    public async createStripeCustomerForClient(client: Client) {
        if (client.stripeId) {
            if (await this.stripeCustomerExists(client.stripeId)) {
                return client;
            }
        }

        const customer = await this.stripe.customers.create({
            name: client.name,
            email: client.contactEmail,
        });

        client.stripeId = customer.id;
        await client.save();

        console.log(customer);

        return client;
    }

    public async chargeClient(client: Client, amount: number, cardId: string, description?: string) {
        
        const intent = await this.stripe.paymentIntents.create({
            // multiply by ten to use dollars instead of cents
            amount: amount * 100,
            currency: 'usd',
            payment_method_data: {
                // @ts-ignore
                type: 'card',
                card: {
                    token: cardId,
                }
            },
            customer: client.stripeId,
            description,
        });

        const confirmedIntent = await this.stripe.paymentIntents.confirm(intent.id);
    }
}