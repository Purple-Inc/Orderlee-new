package com.orderlee.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank
    @Size(max = 50)
    private String category;
    
    @Size(max = 50)
    private String sku;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "cost_price", precision = 10, scale = 2)
    private BigDecimal costPrice;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "selling_price", precision = 10, scale = 2)
    private BigDecimal sellingPrice;
    
    @NotNull
    @Column(name = "stock_quantity")
    private Integer stockQuantity;
    
    @NotNull
    @Column(name = "reorder_level")
    private Integer reorderLevel;
    
    @Size(max = 100)
    private String supplier;
    
    @Size(max = 100)
    @Column(name = "storage_location")
    private String storageLocation;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Size(max = 255)
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "is_fragile")
    private Boolean isFragile = false;
    
    @Column(name = "weight_kg", precision = 8, scale = 2)
    private BigDecimal weightKg;
    
    @Column(name = "length_cm", precision = 8, scale = 2)
    private BigDecimal lengthCm;
    
    @Column(name = "width_cm", precision = 8, scale = 2)
    private BigDecimal widthCm;
    
    @Column(name = "height_cm", precision = 8, scale = 2)
    private BigDecimal heightCm;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    private Business business;
    
    // Constructors
    public Product() {}
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getSku() {
        return sku;
    }
    
    public void setSku(String sku) {
        this.sku = sku;
    }
    
    public BigDecimal getCostPrice() {
        return costPrice;
    }
    
    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }
    
    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }
    
    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }
    
    public Integer getStockQuantity() {
        return stockQuantity;
    }
    
    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
    
    public Integer getReorderLevel() {
        return reorderLevel;
    }
    
    public void setReorderLevel(Integer reorderLevel) {
        this.reorderLevel = reorderLevel;
    }
    
    public String getSupplier() {
        return supplier;
    }
    
    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }
    
    public String getStorageLocation() {
        return storageLocation;
    }
    
    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public Boolean getIsFragile() {
        return isFragile;
    }
    
    public void setIsFragile(Boolean isFragile) {
        this.isFragile = isFragile;
    }
    
    public BigDecimal getWeightKg() {
        return weightKg;
    }
    
    public void setWeightKg(BigDecimal weightKg) {
        this.weightKg = weightKg;
    }
    
    public BigDecimal getLengthCm() {
        return lengthCm;
    }
    
    public void setLengthCm(BigDecimal lengthCm) {
        this.lengthCm = lengthCm;
    }
    
    public BigDecimal getWidthCm() {
        return widthCm;
    }
    
    public void setWidthCm(BigDecimal widthCm) {
        this.widthCm = widthCm;
    }
    
    public BigDecimal getHeightCm() {
        return heightCm;
    }
    
    public void setHeightCm(BigDecimal heightCm) {
        this.heightCm = heightCm;
    }
    
    public Business getBusiness() {
        return business;
    }
    
    public void setBusiness(Business business) {
        this.business = business;
    }
}