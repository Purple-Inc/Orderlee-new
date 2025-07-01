package com.orderlee.dto.request;

import com.orderlee.model.Payment;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class PaymentRequest {
    
    @NotNull
    private Long orderId;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal amount;
    
    @NotNull
    private Payment.PaymentMethod paymentMethod;
    
    @Size(max = 100)
    private String transactionReference;
    
    private BigDecimal processingFee;
    
    private String notes;
    
    // Constructors
    public PaymentRequest() {}
    
    // Getters and Setters
    public Long getOrderId() {
        return orderId;
    }
    
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public Payment.PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(Payment.PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public String getTransactionReference() {
        return transactionReference;
    }
    
    public void setTransactionReference(String transactionReference) {
        this.transactionReference = transactionReference;
    }
    
    public BigDecimal getProcessingFee() {
        return processingFee;
    }
    
    public void setProcessingFee(BigDecimal processingFee) {
        this.processingFee = processingFee;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}