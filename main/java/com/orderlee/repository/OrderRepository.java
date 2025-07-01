package com.orderlee.repository;

import com.orderlee.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBusinessId(Long businessId);
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByBusinessIdAndOrderStatus(Long businessId, Order.OrderStatus status);
    List<Order> findByBusinessIdAndPaymentStatus(Long businessId, Order.PaymentStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.business.id = :businessId AND " +
           "o.createdAt BETWEEN :startDate AND :endDate")
    List<Order> findOrdersByDateRange(@Param("businessId") Long businessId, 
                                     @Param("startDate") LocalDateTime startDate, 
                                     @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.business.id = :businessId")
    Long countOrdersByBusiness(@Param("businessId") Long businessId);
}