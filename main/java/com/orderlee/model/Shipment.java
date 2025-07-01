package com.orderlee.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
public class Shipment extends BaseEntity {
    
    @NotBlank
    @Size(max = 50)
    @Column(name = "tracking_number", unique = true)
    private String trackingNumber;
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "carrier_name")
    private String carrierName;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "shipment_status")
    private ShipmentStatus shipmentStatus = ShipmentStatus.PREPARING;
    
    @Column(name = "estimated_delivery")
    private LocalDateTime estimatedDelivery;
    
    @Column(name = "actual_delivery")
    private LocalDateTime actualDelivery;
    
    @Column(name = "shipping_cost", precision = 10, scale = 2)
    private BigDecimal shippingCost;
    
    @Column(name = "sender_name")
    private String senderName;
    
    @Column(name = "sender_address", columnDefinition = "TEXT")
    private String senderAddress;
    
    @Column(name = "sender_phone")
    private String senderPhone;
    
    @Column(name = "receiver_name")
    private String receiverName;
    
    @Column(name = "receiver_address", columnDefinition = "TEXT")
    private String receiverAddress;
    
    @Column(name = "receiver_phone")
    private String receiverPhone;
    
    @Column(name = "package_weight", precision = 8, scale = 2)
    private BigDecimal packageWeight;
    
    @Column(name = "package_value", precision = 10, scale = 2)
    private BigDecimal packageValue;
    
    @Column(name = "package_description", columnDefinition = "TEXT")
    private String packageDescription;
    
    @Column(name = "is_fragile")
    private Boolean isFragile = false;
    
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
    
    // Constructors
    public Shipment() {}
    
    // Getters and Setters
    public String getTrackingNumber() {
        return trackingNumber;
    }
    
    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }
    
    public String getCarrierName() {
        return carrierName;
    }
    
    public void setCarrierName(String carrierName) {
        this.carrierName = carrierName;
    }
    
    public ShipmentStatus getShipmentStatus() {
        return shipmentStatus;
    }
    
    public void setShipmentStatus(ShipmentStatus shipmentStatus) {
        this.shipmentStatus = shipmentStatus;
    }
    
    public LocalDateTime getEstimatedDelivery() {
        return estimatedDelivery;
    }
    
    public void setEstimatedDelivery(LocalDateTime estimatedDelivery) {
        this.estimatedDelivery = estimatedDelivery;
    }
    
    public LocalDateTime getActualDelivery() {
        return actualDelivery;
    }
    
    public void setActualDelivery(LocalDateTime actualDelivery) {
        this.actualDelivery = actualDelivery;
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
    
    public Order getOrder() {
        return order;
    }
    
    public void setOrder(Order order) {
        this.order = order;
    }
    
    public enum ShipmentStatus {
        PREPARING, IN_TRANSIT, DELIVERED, DELAYED, CANCELLED
    }
}