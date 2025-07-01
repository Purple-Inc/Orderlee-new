package com.orderlee.service;

import com.orderlee.dto.request.SignupRequest;
import com.orderlee.dto.request.LoginRequest;
import com.orderlee.dto.response.AuthResponse;
import com.orderlee.model.User;

public interface UserService {
    AuthResponse signup(SignupRequest signupRequest);
    AuthResponse login(LoginRequest loginRequest);
    User verifyEmail(String token);
    void resendVerificationEmail(String email);
    User getCurrentUser();
    User updateProfile(User user);
}