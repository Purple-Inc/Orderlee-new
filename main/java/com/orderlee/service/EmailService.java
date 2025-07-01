package com.orderlee.service;

public interface EmailService {
    void sendVerificationEmail(String email, String token);
    void sendPasswordResetEmail(String email, String token);
    void sendOrderConfirmationEmail(String email, String orderNumber);
}