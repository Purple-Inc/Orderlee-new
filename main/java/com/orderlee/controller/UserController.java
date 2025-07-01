package com.orderlee.controller;

import com.orderlee.dto.response.ApiResponse;
import com.orderlee.model.User;
import com.orderlee.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            User user = userService.getCurrentUser();
            return ResponseEntity.ok(new ApiResponse(true, "User retrieved successfully", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User userUpdate) {
        try {
            User user = userService.updateProfile(userUpdate);
            return ResponseEntity.ok(new ApiResponse(true, "Profile updated successfully", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}