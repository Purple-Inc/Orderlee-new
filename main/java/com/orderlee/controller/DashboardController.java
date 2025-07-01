package com.orderlee.controller;

import com.orderlee.dto.response.ApiResponse;
import com.orderlee.model.Business;
import com.orderlee.repository.OrderRepository;
import com.orderlee.repository.ProductRepository;
import com.orderlee.repository.PaymentRepository;
import com.orderlee.repository.ShipmentRepository;
import com.orderlee.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DashboardController {
    
    @Autowired
    private BusinessService businessService;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private ShipmentRepository shipmentRepository;
    
    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats() {
        try {
            Business business = businessService.getCurrentUserBusiness();
            
            Map<String, Object> stats = new HashMap<>();
            
            // Order statistics
            Long totalOrders = orderRepository.countOrdersByBusiness(business.getId());
            stats.put("totalOrders", totalOrders);
            
            // Product statistics
            Long totalProducts = (long) productRepository.findByBusinessId(business.getId()).size();
            Long lowStockProducts = (long) productRepository.findLowStockProducts(business.getId()).size();
            stats.put("totalProducts", totalProducts);
            stats.put("lowStockProducts", lowStockProducts);
            
            // Revenue calculation (simplified)
            BigDecimal totalRevenue = orderRepository.findByBusinessId(business.getId())
                .stream()
                .filter(order -> order.getTotalAmount() != null)
                .map(order -> order.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            stats.put("totalRevenue", totalRevenue);
            
            // Recent activity
            LocalDateTime lastWeek = LocalDateTime.now().minusDays(7);
            Long recentOrders = (long) orderRepository.findOrdersByDateRange(
                business.getId(), lastWeek, LocalDateTime.now()).size();
            stats.put("recentOrders", recentOrders);
            
            return ResponseEntity.ok(new ApiResponse(true, "Dashboard stats retrieved successfully", stats));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}