package com.orderlee.service.impl;

import com.orderlee.exception.ResourceNotFoundException;
import com.orderlee.exception.BadRequestException;
import com.orderlee.model.Business;
import com.orderlee.model.Notification;
import com.orderlee.repository.NotificationRepository;
import com.orderlee.service.BusinessService;
import com.orderlee.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private BusinessService businessService;
    
    @Override
    public List<Notification> getNotificationsByBusiness() {
        Business business = businessService.getCurrentUserBusiness();
        return notificationRepository.findByBusinessIdOrderByCreatedAtDesc(business.getId());
    }
    
    @Override
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!notification.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only update your own notifications");
        }
        
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }
    
    @Override
    public void markAllAsRead() {
        Business business = businessService.getCurrentUserBusiness();
        List<Notification> unreadNotifications = notificationRepository
            .findByBusinessIdAndIsReadOrderByCreatedAtDesc(business.getId(), false);
        
        unreadNotifications.forEach(notification -> notification.setIsRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }
    
    @Override
    public void deleteNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!notification.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only delete your own notifications");
        }
        
        notificationRepository.delete(notification);
    }
    
    @Override
    public void createNotification(String type, String title, String message, Boolean actionRequired) {
        Business business = businessService.getCurrentUserBusiness();
        
        Notification notification = new Notification(type, title, message, business);
        notification.setActionRequired(actionRequired != null ? actionRequired : false);
        
        notificationRepository.save(notification);
    }
    
    @Override
    public Long getUnreadCount() {
        Business business = businessService.getCurrentUserBusiness();
        return notificationRepository.countUnreadByBusinessId(business.getId());
    }
}