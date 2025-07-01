import React, { useState } from 'react';
import { Bell, Check, X, AlertCircle, Info, CheckCircle, Clock, Trash2, AreaChart as MarkAsUnread } from 'lucide-react';
import { RouteId } from '../types/routes';
import Breadcrumbs from './Navigation/Breadcrumbs';

interface NotificationsProps {
  onNavigate?: (routeId: RouteId) => void;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ onNavigate = () => {} }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Order Completed',
      message: 'Order #ORD-001 has been successfully delivered to John Smith.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      actionRequired: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Wireless Headphones inventory is running low. Only 5 items remaining.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionRequired: true
    },
    {
      id: '3',
      type: 'info',
      title: 'New Order Received',
      message: 'You have received a new order #ORD-002 from Sarah Johnson worth ₦149,500.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
      actionRequired: false
    },
    {
      id: '4',
      type: 'error',
      title: 'Payment Failed',
      message: 'Payment for order #ORD-003 has failed. Customer needs to retry payment.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: false,
      actionRequired: true
    },
    {
      id: '5',
      type: 'success',
      title: 'Shipment Created',
      message: 'Shipment for order #ORD-004 has been created with DHL Express.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionRequired: false
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <X className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="hidden sm:block">
            <Breadcrumbs currentRoute="notifications" onNavigate={onNavigate} />
          </div>
          
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center space-x-3">
                  <Bell className="h-8 w-8 text-blue-600" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">Stay updated with your business activities</p>
              </div>
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Mark All Read</span>
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'unread'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'read'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Read ({notifications.length - unreadCount})
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">
                  {filter === 'unread' ? 'All caught up! No unread notifications.' : 'You have no notifications yet.'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-xl p-4 sm:p-6 transition-all hover:shadow-md ${
                    notification.read ? 'bg-white border-gray-200' : getNotificationBg(notification.type)
                  } ${!notification.read ? 'border-l-4' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm sm:text-base font-semibold ${
                            notification.read ? 'text-gray-900' : 'text-gray-900'
                          }`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                            )}
                          </h3>
                          <p className={`text-sm mt-1 ${
                            notification.read ? 'text-gray-600' : 'text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{formatTimestamp(notification.timestamp)}</span>
                            </div>
                            {notification.actionRequired && (
                              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                Action Required
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read ? (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsUnread(notification.id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Mark as unread"
                            >
                              <MarkAsUnread className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;