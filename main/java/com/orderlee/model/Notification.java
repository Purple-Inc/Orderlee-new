package com.orderlee.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity {
    
    @NotBlank
    @Size(max = 50)
    private String type;
    
    @NotBlank
    @Size(max = 200)
    private String title;
    
    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @NotNull
    @Column(name = "is_read")
    private Boolean isRead = false;
    
    @Column(name = "action_required")
    private Boolean actionRequired = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    private Business business;
    
    // Constructors
    public Notification() {}
    
    public Notification(String type, String title, String message, Business business) {
        this.type = type;
        this.title = title;
        this.message = message;
        this.business = business;
    }
    
    // Getters and Setters
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Boolean getIsRead() {
        return isRead;
    }
    
    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
    
    public Boolean getActionRequired() {
        return actionRequired;
    }
    
    public void setActionRequired(Boolean actionRequired) {
        this.actionRequired = actionRequired;
    }
    
    public Business getBusiness() {
        return business;
    }
    
    public void setBusiness(Business business) {
        this.business = business;
    }
}