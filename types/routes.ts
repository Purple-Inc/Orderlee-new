export type RouteId = 
  | 'dashboard'
  | 'orders'
  | 'new-order'
  | 'logistics-setup'
  | 'logistics-providers'
  | 'logistics-payment'
  | 'order-complete'
  | 'inventory'
  | 'add-item'
  | 'payments'
  | 'logistics'
  | 'create-shipment'
  | 'notifications'
  | 'settings'
  | 'ai-assistant'
  | 'receipt-templates'
  | 'business-profile';

export interface Route {
  id: RouteId;
  path: string;
  name: string;
  description?: string;
  icon?: React.ComponentType<any>;
  parent?: RouteId;
  requiresAuth?: boolean;
  showInNavigation?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
  current: boolean;
}