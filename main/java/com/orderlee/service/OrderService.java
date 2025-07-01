package com.orderlee.service;

import com.orderlee.dto.request.OrderRequest;
import com.orderlee.model.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderRequest orderRequest);
    Order updateOrderStatus(Long orderId, Order.OrderStatus status);
    Order updatePaymentStatus(Long orderId, Order.PaymentStatus status);
    Order getOrderById(Long orderId);
    Order getOrderByNumber(String orderNumber);
    List<Order> getOrdersByBusiness();
    List<Order> getOrdersByStatus(Order.OrderStatus status);
    void cancelOrder(Long orderId);
}