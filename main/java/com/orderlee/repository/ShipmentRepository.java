package com.orderlee.repository;

import com.orderlee.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Optional<Shipment> findByTrackingNumber(String trackingNumber);
    Optional<Shipment> findByOrderId(Long orderId);
    
    @Query("SELECT s FROM Shipment s WHERE s.order.business.id = :businessId")
    List<Shipment> findByBusinessId(@Param("businessId") Long businessId);
    
    @Query("SELECT s FROM Shipment s WHERE s.order.business.id = :businessId AND s.shipmentStatus = :status")
    List<Shipment> findByBusinessIdAndStatus(@Param("businessId") Long businessId, 
                                           @Param("status") Shipment.ShipmentStatus status);
}