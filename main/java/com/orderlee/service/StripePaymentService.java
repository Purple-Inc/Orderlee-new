package com.orderlee.service;

import com.orderlee.dto.request.StripePaymentRequest;

public interface StripePaymentService {
    String createPaymentIntent(StripePaymentRequest request) throws Exception;
    boolean confirmPayment(String paymentIntentId) throws Exception;
    void handleWebhook(String payload, String sigHeader) throws Exception;
}