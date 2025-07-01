package com.orderlee.service;

import com.orderlee.dto.request.PaymentRequest;
import com.orderlee.model.Payment;

import java.util.List;

public interface PaymentService {
    Payment processPayment(PaymentRequest paymentRequest);
    Payment updatePaymentStatus(Long paymentId, Payment.PaymentStatus status);
    Payment getPaymentById(Long paymentId);
    List<Payment> getPaymentsByOrder(Long orderId);
    List<Payment> getPaymentsByBusiness();
}