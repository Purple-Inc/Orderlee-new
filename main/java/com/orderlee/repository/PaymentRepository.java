package com.orderlee.repository;

import com.orderlee.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByPaymentId(String paymentId);
    List<Payment> findByOrderId(Long orderId);
    
    @Query("SELECT p FROM Payment p WHERE p.order.business.id = :businessId")
    List<Payment> findByBusinessId(@Param("businessId") Long businessId);
    
    @Query("SELECT p FROM Payment p WHERE p.order.business.id = :businessId AND p.paymentStatus = :status")
    List<Payment> findByBusinessIdAndStatus(@Param("businessId") Long businessId, 
                                          @Param("status") Payment.PaymentStatus status);
}