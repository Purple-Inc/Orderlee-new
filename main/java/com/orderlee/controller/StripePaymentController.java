package com.orderlee.controller;

import com.orderlee.dto.request.StripePaymentRequest;
import com.orderlee.dto.response.ApiResponse;
import com.orderlee.service.StripePaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StripePaymentController {
    
    @Autowired
    private StripePaymentService stripePaymentService;
    
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@Valid @RequestBody StripePaymentRequest request) {
        try {
            String clientSecret = stripePaymentService.createPaymentIntent(request);
            return ResponseEntity.ok(new ApiResponse(true, "Payment intent created successfully", 
                java.util.Map.of("clientSecret", clientSecret)));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PostMapping("/confirm-payment")
    public ResponseEntity<?> confirmPayment(@RequestParam String paymentIntentId) {
        try {
            boolean confirmed = stripePaymentService.confirmPayment(paymentIntentId);
            return ResponseEntity.ok(new ApiResponse(true, "Payment confirmed successfully", 
                java.util.Map.of("confirmed", confirmed)));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody String payload, 
                                         @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            stripePaymentService.handleWebhook(payload, sigHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}