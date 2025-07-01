import { Route, RouteId, BreadcrumbItem } from '../types/routes';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package2, 
  CreditCard, 
  Truck, 
  Settings, 
  Bot,
  Plus,
  Package,
  FileText,
  User,
  Bell
} from 'lucide-react';

export const routes: Record<RouteId, Route> = {
  dashboard: {
    id: 'dashboard',
    path: '/',
    name: 'Dashboard',
    description: 'Overview of your business metrics',
    icon: LayoutDashboard,
    showInNavigation: true,
    requiresAuth: true
  },
  orders: {
    id: 'orders',
    path: '/orders',
    name: 'Orders',
    description: 'Manage customer orders',
    icon: ShoppingCart,
    showInNavigation: true,
    requiresAuth: true
  },
  'new-order': {
    id: 'new-order',
    path: '/orders/new',
    name: 'New Order',
    description: 'Create a new customer order',
    parent: 'orders',
    requiresAuth: true
  },
  'logistics-setup': {
    id: 'logistics-setup',
    path: '/orders/logistics/setup',
    name: 'Logistics Setup',
    description: 'Configure shipping details',
    parent: 'new-order',
    requiresAuth: true
  },
  'logistics-providers': {
    id: 'logistics-providers',
    path: '/orders/logistics/providers',
    name: 'Choose Provider',
    description: 'Select logistics provider',
    parent: 'logistics-setup',
    requiresAuth: true
  },
  'logistics-payment': {
    id: 'logistics-payment',
    path: '/orders/logistics/payment',
    name: 'Payment',
    description: 'Pay for logistics service',
    parent: 'logistics-providers',
    requiresAuth: true
  },
  'order-complete': {
    id: 'order-complete',
    path: '/orders/complete',
    name: 'Order Complete',
    description: 'Order completion confirmation',
    parent: 'logistics-payment',
    requiresAuth: true
  },
  inventory: {
    id: 'inventory',
    path: '/inventory',
    name: 'Inventory',
    description: 'Manage product inventory',
    icon: Package2,
    showInNavigation: true,
    requiresAuth: true
  },
  'add-item': {
    id: 'add-item',
    path: '/inventory/add',
    name: 'Add Item',
    description: 'Add new inventory item',
    parent: 'inventory',
    requiresAuth: true
  },
  payments: {
    id: 'payments',
    path: '/payments',
    name: 'Payments',
    description: 'Track payment transactions',
    icon: CreditCard,
    showInNavigation: true,
    requiresAuth: true
  },
  logistics: {
    id: 'logistics',
    path: '/logistics',
    name: 'Logistics',
    description: 'Manage shipments and deliveries',
    icon: Truck,
    showInNavigation: true,
    requiresAuth: true
  },
  'create-shipment': {
    id: 'create-shipment',
    path: '/logistics/create-shipment',
    name: 'Create Shipment',
    description: 'Create a new shipment',
    parent: 'logistics',
    requiresAuth: true
  },
  notifications: {
    id: 'notifications',
    path: '/notifications',
    name: 'Notifications',
    description: 'View notification messages',
    icon: Bell,
    showInNavigation: true,
    requiresAuth: true
  },
  settings: {
    id: 'settings',
    path: '/settings',
    name: 'Settings',
    description: 'Application settings',
    icon: Settings,
    requiresAuth: true
  },
  'ai-assistant': {
    id: 'ai-assistant',
    path: '/ai-assistant',
    name: 'AI Assistant',
    description: 'Business intelligence assistant',
    icon: Bot,
    requiresAuth: true
  },
  'receipt-templates': {
    id: 'receipt-templates',
    path: '/receipt-templates',
    name: 'Receipt Templates',
    description: 'Customize receipt templates',
    icon: FileText,
    requiresAuth: true
  },
  'business-profile': {
    id: 'business-profile',
    path: '/profile',
    name: 'Business Profile',
    description: 'Manage business and personal information',
    icon: User,
    requiresAuth: true
  }
};

export const quickActions = [
  {
    id: 'new-order',
    name: 'New Order',
    icon: Plus,
    color: 'text-green-600 hover:text-green-700',
    route: 'new-order' as RouteId
  },
  {
    id: 'add-item',
    name: 'Add Item',
    icon: Package,
    color: 'text-blue-600 hover:text-blue-700',
    route: 'add-item' as RouteId
  },
  {
    id: 'receipt-templates',
    name: 'Receipt Setup',
    icon: FileText,
    color: 'text-purple-600 hover:text-purple-700',
    route: 'receipt-templates' as RouteId
  }
];

export function getRoute(routeId: RouteId): Route {
  return routes[routeId];
}

export function getRoutePath(routeId: RouteId): string {
  return routes[routeId].path;
}

export function getNavigationRoutes(): Route[] {
  return Object.values(routes).filter(route => route.showInNavigation);
}

export function generateBreadcrumbs(currentRouteId: RouteId): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];
  let currentRoute = routes[currentRouteId];
  
  // Build breadcrumb chain by following parent relationships
  const routeChain: Route[] = [];
  while (currentRoute) {
    routeChain.unshift(currentRoute);
    currentRoute = currentRoute.parent ? routes[currentRoute.parent] : null;
  }
  
  // Convert to breadcrumb items
  routeChain.forEach((route, index) => {
    breadcrumbs.push({
      name: route.name,
      path: route.path,
      current: index === routeChain.length - 1
    });
  });
  
  return breadcrumbs;
}

export function isValidRoute(routeId: string): routeId is RouteId {
  return routeId in routes;
}

export function getParentRoute(routeId: RouteId): Route | null {
  const route = routes[routeId];
  return route.parent ? routes[route.parent] : null;
}

export function getChildRoutes(routeId: RouteId): Route[] {
  return Object.values(routes).filter(route => route.parent === routeId);
}