package com.orderlee.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ShipmentRequest {
    
    @NotNull
    private Long orderId;
    
    @NotBlank
    @Size(max = 100)
    private String carrierName;
    
    private LocalDateTime estimatedDelivery;
    
    private BigDecimal shippingCost;
    
    @NotBlank
    private String senderName;
    
    @NotBlank
    private String senderAddress;
    
    @NotBlank
    private String senderPhone;
    
    @NotBlank
    private String receiverName;
    
    @NotBlank
    private String receiverAddress;
    
    @NotBlank
    private String receiverPhone;
    
    private BigDecimal packageWeight;
    
    private BigDecimal packageValue;
    
    private String packageDescription;
    
    private Boolean isFragile = false;
    
    // Constructors
    public ShipmentRequest() {}
    
    // Getters and Setters
    public Long getOrderId() {
        return orderId;
    }
    
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    
    public String getCarrierName() {
        return carrierName;
    }
    
    public void setCarrierName(String carrierName) {
        this.carrierName = carrierName;
    }
    
    public LocalDateTime getEstimatedDelivery() {
        return estimatedDelivery;
    }
    
    public void setEstimatedDelivery(LocalDateTime estimatedDelivery) {
        this.estimatedDelivery = estimatedDelivery;
    }
    
    public BigDecimal getShippingCost() {
        return shippingCost;
    }
    
    public void setShippingCost(BigDecimal shippingCost) {
        this.shippingCost = shippingCost;
    }
    
    public String getSenderName() {
        return senderName;
    }
    
    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }
    
    public String getSenderAddress() {
        return senderAddress;
    }
    
    public void setSenderAddress(String senderAddress) {
        this.senderAddress = senderAddress;
    }
    
    public String getSenderPhone() {
        return senderPhone;
    }
    
    public void setSenderPhone(String senderPhone) {
        this.senderPhone = senderPhone;
    }
    
    public String getReceiverName() {
        return receiverName;
    }
    
    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }
    
    public String getReceiverAddress() {
        return receiverAddress;
    }
    
    public void setReceiverAddress(String receiverAddress) {
        this.receiverAddress = receiverAddress;
    }
    
    public String getReceiverPhone() {
        return receiverPhone;
    }
    
    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }
    
    public BigDecimal getPackageWeight() {
        return packageWeight;
    }
    
    public void setPackageWeight(BigDecimal packageWeight) {
        this.packageWeight = packageWeight;
    }
    
    public BigDecimal getPackageValue() {
        return packageValue;
    }
    
    public void setPackageValue(BigDecimal packageValue) {
        this.packageValue = packageValue;
    }
    
    public String getPackageDescription() {
        return packageDescription;
    }
    
    public void setPackageDescription(String packageDescription) {
        this.packageDescription = packageDescription;
    }
    
    public Boolean getIsFragile() {
        return isFragile;
    }
    
    public void setIsFragile(Boolean isFragile) {
        this.isFragile = isFragile;
    }
}