package com.orderlee.repository;

import com.orderlee.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByBusinessIdOrderByCreatedAtDesc(Long businessId);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.business.id = :businessId AND n.isRead = false")
    Long countUnreadByBusinessId(@Param("businessId") Long businessId);
    
    List<Notification> findByBusinessIdAndIsReadOrderByCreatedAtDesc(Long businessId, Boolean isRead);
}