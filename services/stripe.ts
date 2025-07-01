import { loadStripe, Stripe } from '@stripe/stripe-js';
import apiClient from './api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here');

export interface PaymentData {
  amount: number;
  currency?: string;
  description?: string;
  orderId?: number;
  shipmentId?: number;
  customerEmail?: string;
}

export class StripeService {
  private stripe: Stripe | null = null;

  async initialize(): Promise<Stripe> {
    if (!this.stripe) {
      this.stripe = await stripePromise;
      if (!this.stripe) {
        throw new Error('Failed to initialize Stripe');
      }
    }
    return this.stripe;
  }

  async createPaymentIntent(paymentData: PaymentData) {
    try {
      const response = await apiClient.createPaymentIntent(paymentData);
      return response.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async confirmPayment(clientSecret: string, paymentMethod?: any) {
    const stripe = await this.initialize();
    
    try {
      const result = await stripe.confirmPayment({
        clientSecret,
        confirmParams: paymentMethod ? {
          payment_method: paymentMethod,
        } : undefined,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }

  async confirmCardPayment(clientSecret: string, cardElement: any, billingDetails?: any) {
    const stripe = await this.initialize();
    
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentIntent;
    } catch (error) {
      console.error('Error confirming card payment:', error);
      throw error;
    }
  }

  async createPaymentMethod(cardElement: any, billingDetails?: any) {
    const stripe = await this.initialize();
    
    try {
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentMethod;
    } catch (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }
  }

  async processLogisticsPayment(
    amount: number,
    orderId: number,
    shipmentId: number,
    paymentMethod: any,
    customerEmail?: string
  ) {
    try {
      // Create payment intent
      const clientSecret = await this.createPaymentIntent({
        amount,
        currency: 'ngn',
        description: `Logistics payment for order ${orderId}`,
        orderId,
        shipmentId,
        customerEmail,
      });

      // Confirm payment
      const paymentIntent = await this.confirmPayment(clientSecret, paymentMethod);
      
      return {
        success: true,
        paymentIntent,
        clientSecret,
      };
    } catch (error) {
      console.error('Error processing logistics payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed',
      };
    }
  }
}

export const stripeService = new StripeService();
export default stripeService;