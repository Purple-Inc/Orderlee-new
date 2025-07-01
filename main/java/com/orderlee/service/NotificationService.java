package com.orderlee.service;

import com.orderlee.model.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getNotificationsByBusiness();
    void markAsRead(Long notificationId);
    void markAllAsRead();
    void deleteNotification(Long notificationId);
    void createNotification(String type, String title, String message, Boolean actionRequired);
    Long getUnreadCount();
}