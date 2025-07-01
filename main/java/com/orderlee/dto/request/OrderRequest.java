package com.orderlee.dto.request;

import com.orderlee.model.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class OrderRequest {
    
    @NotBlank
    @Size(max = 100)
    private String customerName;
    
    @Size(max = 100)
    private String customerEmail;
    
    @NotBlank
    @Size(max = 20)
    private String customerPhone;
    
    @NotBlank
    private String shippingAddress;
    
    @NotBlank
    @Size(max = 50)
    private String orderSource;
    
    private String notes;
    
    @NotNull
    private Order.PaymentStatus paymentStatus;
    
    @NotEmpty
    private List<OrderItemRequest> orderItems;
    
    // Constructors
    public OrderRequest() {}
    
    // Getters and Setters
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public String getCustomerPhone() {
        return customerPhone;
    }
    
    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
    
    public String getShippingAddress() {
        return shippingAddress;
    }
    
    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    
    public String getOrderSource() {
        return orderSource;
    }
    
    public void setOrderSource(String orderSource) {
        this.orderSource = orderSource;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public Order.PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }
    
    public void setPaymentStatus(Order.PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    
    public List<OrderItemRequest> getOrderItems() {
        return orderItems;
    }
    
    public void setOrderItems(List<OrderItemRequest> orderItems) {
        this.orderItems = orderItems;
    }
}