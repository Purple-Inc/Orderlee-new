package com.orderlee.controller;

import com.orderlee.dto.request.OrderRequest;
import com.orderlee.dto.response.ApiResponse;
import com.orderlee.model.Order;
import com.orderlee.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderRequest orderRequest) {
        try {
            Order order = orderService.createOrder(orderRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Order created successfully", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, 
                                             @RequestParam Order.OrderStatus status) {
        try {
            Order order = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(new ApiResponse(true, "Order status updated successfully", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/{orderId}/payment-status")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long orderId, 
                                                @RequestParam Order.PaymentStatus status) {
        try {
            Order order = orderService.updatePaymentStatus(orderId, status);
            return ResponseEntity.ok(new ApiResponse(true, "Payment status updated successfully", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getOrders() {
        try {
            List<Order> orders = orderService.getOrdersByBusiness();
            return ResponseEntity.ok(new ApiResponse(true, "Orders retrieved successfully", orders));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable Long orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
            return ResponseEntity.ok(new ApiResponse(true, "Order retrieved successfully", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<?> getOrderByNumber(@PathVariable String orderNumber) {
        try {
            Order order = orderService.getOrderByNumber(orderNumber);
            return ResponseEntity.ok(new ApiResponse(true, "Order retrieved successfully", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getOrdersByStatus(@PathVariable Order.OrderStatus status) {
        try {
            List<Order> orders = orderService.getOrdersByStatus(status);
            return ResponseEntity.ok(new ApiResponse(true, "Orders retrieved successfully", orders));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok(new ApiResponse(true, "Order cancelled successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}