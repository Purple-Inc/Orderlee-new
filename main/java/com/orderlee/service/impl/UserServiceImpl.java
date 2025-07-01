package com.orderlee.service.impl;

import com.orderlee.dto.request.SignupRequest;
import com.orderlee.dto.request.LoginRequest;
import com.orderlee.dto.response.AuthResponse;
import com.orderlee.exception.ResourceNotFoundException;
import com.orderlee.exception.BadRequestException;
import com.orderlee.model.User;
import com.orderlee.repository.UserRepository;
import com.orderlee.security.JwtTokenProvider;
import com.orderlee.service.UserService;
import com.orderlee.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private EmailService emailService;
    
    @Override
    public AuthResponse signup(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BadRequestException("Email address already in use!");
        }
        
        User user = new User();
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setVerificationToken(UUID.randomUUID().toString());
        
        User savedUser = userRepository.save(user);
        
        // Send verification email
        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getVerificationToken());
        
        String jwt = tokenProvider.generateToken(savedUser.getId());
        
        return new AuthResponse(jwt, savedUser.getId(), savedUser.getEmail(), 
                               savedUser.getFirstName() + " " + savedUser.getLastName());
    }
    
    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("User", "email", loginRequest.getEmail()));
        
        String jwt = tokenProvider.generateToken(user.getId());
        
        return new AuthResponse(jwt, user.getId(), user.getEmail(), 
                               user.getFirstName() + " " + user.getLastName());
    }
    
    @Override
    public User verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
            .orElseThrow(() -> new BadRequestException("Invalid verification token"));
        
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        
        return userRepository.save(user);
    }
    
    @Override
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        
        if (user.getEmailVerified()) {
            throw new BadRequestException("Email is already verified");
        }
        
        String newToken = UUID.randomUUID().toString();
        user.setVerificationToken(newToken);
        userRepository.save(user);
        
        emailService.sendVerificationEmail(email, newToken);
    }
    
    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }
    
    @Override
    public User updateProfile(User user) {
        User currentUser = getCurrentUser();
        
        currentUser.setFirstName(user.getFirstName());
        currentUser.setLastName(user.getLastName());
        currentUser.setPhone(user.getPhone());
        
        return userRepository.save(currentUser);
    }
}