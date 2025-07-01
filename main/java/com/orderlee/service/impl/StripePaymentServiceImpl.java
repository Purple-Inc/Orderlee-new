package com.orderlee.service.impl;

import com.orderlee.dto.request.StripePaymentRequest;
import com.orderlee.service.StripePaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class StripePaymentServiceImpl implements StripePaymentService {
    
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;
    
    @Value("${stripe.webhook.secret}")
    private String webhookSecret;
    
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }
    
    @Override
    public String createPaymentIntent(StripePaymentRequest request) throws Exception {
        try {
            // Convert amount to cents (Stripe expects amounts in smallest currency unit)
            long amountInCents = request.getAmount().multiply(new BigDecimal("100")).longValue();
            
            PaymentIntentCreateParams.Builder paramsBuilder = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(request.getCurrency().toLowerCase())
                .setAutomaticPaymentMethods(
                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .build()
                );
            
            // Add metadata
            Map<String, String> metadata = new HashMap<>();
            if (request.getOrderId() != null) {
                metadata.put("orderId", request.getOrderId().toString());
            }
            if (request.getShipmentId() != null) {
                metadata.put("shipmentId", request.getShipmentId().toString());
            }
            if (request.getDescription() != null) {
                paramsBuilder.setDescription(request.getDescription());
            }
            if (!metadata.isEmpty()) {
                paramsBuilder.setMetadata(metadata);
            }
            
            PaymentIntent intent = PaymentIntent.create(paramsBuilder.build());
            return intent.getClientSecret();
            
        } catch (StripeException e) {
            throw new Exception("Failed to create payment intent: " + e.getMessage());
        }
    }
    
    @Override
    public boolean confirmPayment(String paymentIntentId) throws Exception {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            return "succeeded".equals(intent.getStatus());
        } catch (StripeException e) {
            throw new Exception("Failed to confirm payment: " + e.getMessage());
        }
    }
    
    @Override
    public void handleWebhook(String payload, String sigHeader) throws Exception {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            
            switch (event.getType()) {
                case "payment_intent.succeeded":
                    handlePaymentSucceeded(event);
                    break;
                case "payment_intent.payment_failed":
                    handlePaymentFailed(event);
                    break;
                default:
                    System.out.println("Unhandled event type: " + event.getType());
            }
        } catch (Exception e) {
            throw new Exception("Webhook error: " + e.getMessage());
        }
    }
    
    private void handlePaymentSucceeded(Event event) {
        // Handle successful payment
        System.out.println("Payment succeeded: " + event.getId());
        // TODO: Update order/shipment status, send confirmation emails, etc.
    }
    
    private void handlePaymentFailed(Event event) {
        // Handle failed payment
        System.out.println("Payment failed: " + event.getId());
        // TODO: Update order/shipment status, notify customer, etc.
    }
}