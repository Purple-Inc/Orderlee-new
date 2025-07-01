package com.orderlee.controller;

import com.orderlee.dto.request.BusinessRequest;
import com.orderlee.dto.response.ApiResponse;
import com.orderlee.model.Business;
import com.orderlee.service.BusinessService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/business")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BusinessController {
    
    @Autowired
    private BusinessService businessService;
    
    @PostMapping
    public ResponseEntity<?> createBusiness(@Valid @RequestBody BusinessRequest businessRequest) {
        try {
            Business business = businessService.createBusiness(businessRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Business created successfully", business));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/{businessId}")
    public ResponseEntity<?> updateBusiness(@PathVariable Long businessId, 
                                          @Valid @RequestBody BusinessRequest businessRequest) {
        try {
            Business business = businessService.updateBusiness(businessId, businessRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Business updated successfully", business));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUserBusiness() {
        try {
            Business business = businessService.getCurrentUserBusiness();
            return ResponseEntity.ok(new ApiResponse(true, "Business retrieved successfully", business));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}