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

    public async createStripeCustomerForClient(client: Client) {
        if (client.stripeId) {
            return client;
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

    public async chargeClient(client: Client, amount: number, card: CardPaymentDto, description?: string) {
        
        const paymentMethod = await this.stripe.paymentMethods.create({
            // @ts-ignore
            type: 'card',
            card: {
                number: card.number,
                exp_month: card.expMonth,
                exp_year: card.expYear,
                cvc: card.cvc,
            }
        });

        console.log(paymentMethod);
        
        const intent = await this.stripe.paymentIntents.create({
            // multiply by ten to use dollars instead of cents
            amount: amount * 100,
            currency: 'usd',
            payment_method: paymentMethod.id,
            customer: client.stripeId,
            description,
        });

        console.log(intent);

        const confirmedIntent = await this.stripe.paymentIntents.confirm(intent.id);

        console.log(confirmedIntent);

        //const capturedPayment = await this.stripe.paymentIntents.capture(confirmedIntent.id);

        //console.log(capturedPayment);
    }
}