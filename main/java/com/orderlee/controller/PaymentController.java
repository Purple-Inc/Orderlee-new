package com.orderlee.controller;

import com.orderlee.dto.request.PaymentRequest;
import com.orderlee.dto.response.ApiResponse;
import com.orderlee.model.Payment;
import com.orderlee.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping
    public ResponseEntity<?> processPayment(@Valid @RequestBody PaymentRequest paymentRequest) {
        try {
            Payment payment = paymentService.processPayment(paymentRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Payment processed successfully", payment));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/{paymentId}/status")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long paymentId, 
                                                @RequestParam Payment.PaymentStatus status) {
        try {
            Payment payment = paymentService.updatePaymentStatus(paymentId, status);
            return ResponseEntity.ok(new ApiResponse(true, "Payment status updated successfully", payment));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getPayments() {
        try {
            List<Payment> payments = paymentService.getPaymentsByBusiness();
            return ResponseEntity.ok(new ApiResponse(true, "Payments retrieved successfully", payments));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getPayment(@PathVariable Long paymentId) {
        try {
            Payment payment = paymentService.getPaymentById(paymentId);
            return ResponseEntity.ok(new ApiResponse(true, "Payment retrieved successfully", payment));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getPaymentsByOrder(@PathVariable Long orderId) {
        try {
            List<Payment> payments = paymentService.getPaymentsByOrder(orderId);
            return ResponseEntity.ok(new ApiResponse(true, "Payments retrieved successfully", payments));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}