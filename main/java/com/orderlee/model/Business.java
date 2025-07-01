package com.orderlee.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "businesses")
public class Business extends BaseEntity {
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "business_name")
    private String businessName;
    
    @Size(max = 50)
    @Column(name = "registration_number")
    private String registrationNumber;
    
    @Size(max = 50)
    @Column(name = "tax_id")
    private String taxId;
    
    @Size(max = 50)
    private String industry;
    
    @Size(max = 50)
    @Column(name = "business_type")
    private String businessType;
    
    @Column(name = "founded_year")
    private Integer foundedYear;
    
    @Size(max = 255)
    private String website;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Size(max = 255)
    private String address;
    
    @Size(max = 50)
    private String city;
    
    @Size(max = 50)
    private String state;
    
    @Size(max = 20)
    @Column(name = "postal_code")
    private String postalCode;
    
    @Size(max = 50)
    private String country = "Nigeria";
    
    @Size(max = 20)
    private String phone;
    
    @Size(max = 100)
    private String email;
    
    @Size(max = 255)
    @Column(name = "logo_url")
    private String logoUrl;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    // Constructors
    public Business() {}
    
    // Getters and Setters
    public String getBusinessName() {
        return businessName;
    }
    
    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
    
    public String getRegistrationNumber() {
        return registrationNumber;
    }
    
    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }
    
    public String getTaxId() {
        return taxId;
    }
    
    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }
    
    public String getIndustry() {
        return industry;
    }
    
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    
    public String getBusinessType() {
        return businessType;
    }
    
    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }
    
    public Integer getFoundedYear() {
        return foundedYear;
    }
    
    public void setFoundedYear(Integer foundedYear) {
        this.foundedYear = foundedYear;
    }
    
    public String getWebsite() {
        return website;
    }
    
    public void setWebsite(String website) {
        this.website = website;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public String getState() {
        return state;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public String getPostalCode() {
        return postalCode;
    }
    
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
    
    public String getCountry() {
        return country;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getLogoUrl() {
        return logoUrl;
    }
    
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
}