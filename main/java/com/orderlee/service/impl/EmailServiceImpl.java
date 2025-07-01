package com.orderlee.service.impl;

import com.orderlee.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Override
    public void sendVerificationEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Verify Your Email - Orderlee");
        message.setText("Please click the following link to verify your email: " +
                       "http://localhost:3000/verify-email?token=" + token);
        
        mailSender.send(message);
    }
    
    @Override
    public void sendPasswordResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Reset Your Password - Orderlee");
        message.setText("Please click the following link to reset your password: " +
                       "http://localhost:3000/reset-password?token=" + token);
        
        mailSender.send(message);
    }
    
    @Override
    public void sendOrderConfirmationEmail(String email, String orderNumber) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Order Confirmation - " + orderNumber);
        message.setText("Your order " + orderNumber + " has been confirmed and is being processed.");
        
        mailSender.send(message);
    }
}