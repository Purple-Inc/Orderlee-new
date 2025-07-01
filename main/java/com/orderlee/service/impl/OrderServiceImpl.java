package com.orderlee.service.impl;

import com.orderlee.dto.request.OrderRequest;
import com.orderlee.dto.request.OrderItemRequest;
import com.orderlee.exception.ResourceNotFoundException;
import com.orderlee.exception.BadRequestException;
import com.orderlee.model.*;
import com.orderlee.repository.OrderRepository;
import com.orderlee.repository.ProductRepository;
import com.orderlee.service.BusinessService;
import com.orderlee.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private BusinessService businessService;
    
    @Override
    public Order createOrder(OrderRequest orderRequest) {
        Business business = businessService.getCurrentUserBusiness();
        
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setCustomerName(orderRequest.getCustomerName());
        order.setCustomerEmail(orderRequest.getCustomerEmail());
        order.setCustomerPhone(orderRequest.getCustomerPhone());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setOrderSource(orderRequest.getOrderSource());
        order.setNotes(orderRequest.getNotes());
        order.setPaymentStatus(orderRequest.getPaymentStatus());
        order.setBusiness(business);
        
        // Process order items
        BigDecimal subtotal = BigDecimal.ZERO;
        for (OrderItemRequest itemRequest : orderRequest.getOrderItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", itemRequest.getProductId()));
            
            // Check stock availability
            if (product.getStockQuantity() < itemRequest.getQuantity()) {
                throw new BadRequestException("Insufficient stock for product: " + product.getName());
            }
            
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(itemRequest.getUnitPrice());
            orderItem.setTotalPrice(itemRequest.getUnitPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
            orderItem.setOrder(order);
            
            order.getOrderItems().add(orderItem);
            subtotal = subtotal.add(orderItem.getTotalPrice());
            
            // Update product stock
            product.setStockQuantity(product.getStockQuantity() - itemRequest.getQuantity());
            productRepository.save(product);
        }
        
        // Calculate totals
        BigDecimal taxRate = new BigDecimal("0.075"); // 7.5% VAT
        BigDecimal taxAmount = subtotal.multiply(taxRate);
        BigDecimal totalAmount = subtotal.add(taxAmount);
        
        order.setSubtotal(subtotal);
        order.setTaxAmount(taxAmount);
        order.setTotalAmount(totalAmount);
        
        return orderRepository.save(order);
    }
    
    @Override
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = getOrderById(orderId);
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!order.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only update your own orders");
        }
        
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }
    
    @Override
    public Order updatePaymentStatus(Long orderId, Order.PaymentStatus status) {
        Order order = getOrderById(orderId);
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!order.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only update your own orders");
        }
        
        order.setPaymentStatus(status);
        return orderRepository.save(order);
    }
    
    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));
    }
    
    @Override
    public Order getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
            .orElseThrow(() -> new ResourceNotFoundException("Order", "orderNumber", orderNumber));
    }
    
    @Override
    public List<Order> getOrdersByBusiness() {
        Business business = businessService.getCurrentUserBusiness();
        return orderRepository.findByBusinessId(business.getId());
    }
    
    @Override
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        Business business = businessService.getCurrentUserBusiness();
        return orderRepository.findByBusinessIdAndOrderStatus(business.getId(), status);
    }
    
    @Override
    public void cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!order.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only cancel your own orders");
        }
        
        if (order.getOrderStatus() == Order.OrderStatus.DELIVERED) {
            throw new BadRequestException("Cannot cancel a delivered order");
        }
        
        // Restore product stock
        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            productRepository.save(product);
        }
        
        order.setOrderStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
    
    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return "ORD-" + timestamp;
    }
}