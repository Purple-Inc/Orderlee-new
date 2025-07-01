package com.orderlee.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class ProductRequest {
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    private String description;
    
    @NotBlank
    @Size(max = 50)
    private String category;
    
    @Size(max = 50)
    private String sku;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal costPrice;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal sellingPrice;
    
    @NotNull
    private Integer stockQuantity;
    
    @NotNull
    private Integer reorderLevel;
    
    @Size(max = 100)
    private String supplier;
    
    @Size(max = 100)
    private String storageLocation;
    
    private String notes;
    
    @Size(max = 255)
    private String imageUrl;
    
    private Boolean isFragile = false;
    
    private BigDecimal weightKg;
    
    private BigDecimal lengthCm;
    
    private BigDecimal widthCm;
    
    private BigDecimal heightCm;
    
    // Constructors
    public ProductRequest() {}
    
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
}