package com.orderlee.service.impl;

import com.orderlee.dto.request.PaymentRequest;
import com.orderlee.exception.ResourceNotFoundException;
import com.orderlee.exception.BadRequestException;
import com.orderlee.model.Business;
import com.orderlee.model.Order;
import com.orderlee.model.Payment;
import com.orderlee.repository.OrderRepository;
import com.orderlee.repository.PaymentRepository;
import com.orderlee.service.BusinessService;
import com.orderlee.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private BusinessService businessService;
    
    @Override
    public Payment processPayment(PaymentRequest paymentRequest) {
        Order order = orderRepository.findById(paymentRequest.getOrderId())
            .orElseThrow(() -> new ResourceNotFoundException("Order", "id", paymentRequest.getOrderId()));
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!order.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only process payments for your own orders");
        }
        
        Payment payment = new Payment();
        payment.setPaymentId(generatePaymentId());
        payment.setAmount(paymentRequest.getAmount());
        payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        payment.setTransactionReference(paymentRequest.getTransactionReference());
        payment.setProcessingFee(paymentRequest.getProcessingFee());
        payment.setNotes(paymentRequest.getNotes());
        payment.setOrder(order);
        
        // Simulate payment processing
        payment.setPaymentStatus(Payment.PaymentStatus.COMPLETED);
        
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update order payment status
        updateOrderPaymentStatus(order);
        
        return savedPayment;
    }
    
    @Override
    public Payment updatePaymentStatus(Long paymentId, Payment.PaymentStatus status) {
        Payment payment = getPaymentById(paymentId);
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!payment.getOrder().getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only update your own payments");
        }
        
        payment.setPaymentStatus(status);
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update order payment status
        updateOrderPaymentStatus(payment.getOrder());
        
        return savedPayment;
    }
    
    @Override
    public Payment getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId)
            .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", paymentId));
    }
    
    @Override
    public List<Payment> getPaymentsByOrder(Long orderId) {
        return paymentRepository.findByOrderId(orderId);
    }
    
    @Override
    public List<Payment> getPaymentsByBusiness() {
        Business business = businessService.getCurrentUserBusiness();
        return paymentRepository.findByBusinessId(business.getId());
    }
    
    private void updateOrderPaymentStatus(Order order) {
        List<Payment> payments = paymentRepository.findByOrderId(order.getId());
        
        if (payments.isEmpty()) {
            order.setPaymentStatus(Order.PaymentStatus.PENDING);
        } else {
            boolean hasCompleted = payments.stream()
                .anyMatch(p -> p.getPaymentStatus() == Payment.PaymentStatus.COMPLETED);
            boolean allCompleted = payments.stream()
                .allMatch(p -> p.getPaymentStatus() == Payment.PaymentStatus.COMPLETED);
            
            if (allCompleted) {
                order.setPaymentStatus(Order.PaymentStatus.PAID);
            } else if (hasCompleted) {
                order.setPaymentStatus(Order.PaymentStatus.PARTIAL);
            } else {
                order.setPaymentStatus(Order.PaymentStatus.PENDING);
            }
        }
        
        orderRepository.save(order);
    }
    
    private String generatePaymentId() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return "PAY-" + timestamp + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}