const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// API Client with authentication
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyEmail(token: string) {
    return this.request(`/auth/verify-email?token=${token}`, {
      method: 'POST',
    });
  }

  async resendVerification(email: string) {
    return this.request(`/auth/resend-verification?email=${email}`, {
      method: 'POST',
    });
  }

  // User endpoints
  async getCurrentUser() {
    return this.request('/users/me');
  }

  async updateProfile(userData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Business endpoints
  async createBusiness(businessData: any) {
    return this.request('/business', {
      method: 'POST',
      body: JSON.stringify(businessData),
    });
  }

  async updateBusiness(businessId: number, businessData: any) {
    return this.request(`/business/${businessId}`, {
      method: 'PUT',
      body: JSON.stringify(businessData),
    });
  }

  async getCurrentBusiness() {
    return this.request('/business/current');
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  // Product endpoints
  async getProducts() {
    return this.request('/products');
  }

  async createProduct(productData: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(productId: number, productData: any) {
    return this.request(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId: number) {
    return this.request(`/products/${productId}`, {
      method: 'DELETE',
    });
  }

  async getLowStockProducts() {
    return this.request('/products/low-stock');
  }

  async searchProducts(query: string) {
    return this.request(`/products/search?query=${encodeURIComponent(query)}`);
  }

  // Order endpoints
  async getOrders() {
    return this.request('/orders');
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId: number) {
    return this.request(`/orders/${orderId}`);
  }

  async getOrderByNumber(orderNumber: string) {
    return this.request(`/orders/number/${orderNumber}`);
  }

  async updateOrderStatus(orderId: number, status: string) {
    return this.request(`/orders/${orderId}/status?status=${status}`, {
      method: 'PUT',
    });
  }

  async updatePaymentStatus(orderId: number, status: string) {
    return this.request(`/orders/${orderId}/payment-status?status=${status}`, {
      method: 'PUT',
    });
  }

  async cancelOrder(orderId: number) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'POST',
    });
  }

  async getOrdersByStatus(status: string) {
    return this.request(`/orders/status/${status}`);
  }

  // Payment endpoints
  async getPayments() {
    return this.request('/payments');
  }

  async processPayment(paymentData: any) {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPayment(paymentId: number) {
    return this.request(`/payments/${paymentId}`);
  }

  async getPaymentsByOrder(orderId: number) {
    return this.request(`/payments/order/${orderId}`);
  }

  async updatePaymentStatus(paymentId: number, status: string) {
    return this.request(`/payments/${paymentId}/status?status=${status}`, {
      method: 'PUT',
    });
  }

  // Shipment endpoints
  async getShipments() {
    return this.request('/shipments');
  }

  async createShipment(shipmentData: any) {
    return this.request('/shipments', {
      method: 'POST',
      body: JSON.stringify(shipmentData),
    });
  }

  async getShipment(shipmentId: number) {
    return this.request(`/shipments/${shipmentId}`);
  }

  async getShipmentByTracking(trackingNumber: string) {
    return this.request(`/shipments/tracking/${trackingNumber}`);
  }

  async updateShipmentStatus(shipmentId: number, status: string) {
    return this.request(`/shipments/${shipmentId}/status?status=${status}`, {
      method: 'PUT',
    });
  }

  async getShipmentsByStatus(status: string) {
    return this.request(`/shipments/status/${status}`);
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(notificationId: number) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/mark-all-read', {
      method: 'PUT',
    });
  }

  async deleteNotification(notificationId: number) {
    return this.request(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  // Stripe Payment endpoints
  async createPaymentIntent(paymentData: {
    amount: number;
    currency?: string;
    description?: string;
    orderId?: number;
    shipmentId?: number;
    customerEmail?: string;
  }) {
    return this.request('/stripe/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async confirmPayment(paymentIntentId: string) {
    return this.request(`/stripe/confirm-payment?paymentIntentId=${paymentIntentId}`, {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;