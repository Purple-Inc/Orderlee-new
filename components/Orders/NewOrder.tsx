import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, User, MapPin, Package, Calculator, Save, Clock } from 'lucide-react';
import { RouteId } from '../../types/routes';

interface NewOrderProps {
  onBack: () => void;
  onOrderCreated: (orderId: string) => void;
  onNavigate: (routeId: RouteId) => void;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderSource {
  id: string;
  name: string;
  type: 'website' | 'phone' | 'email' | 'whatsapp' | 'store' | 'social';
}

const NewOrder: React.FC<NewOrderProps> = ({ onBack, onOrderCreated, onNavigate }) => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    orderSource: '',
    notes: '',
    paymentStatus: 'pending' as 'pending' | 'paid' | 'partial'
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [availableProducts] = useState([
    { id: '1', name: 'Wireless Headphones', price: 89999, stock: 5 },
    { id: '2', name: 'Smart Watch', price: 249999, stock: 8 },
    { id: '3', name: 'Phone Case', price: 19999, stock: 12 },
    { id: '4', name: 'Bluetooth Speaker', price: 59999, stock: 45 },
    { id: '5', name: 'USB Cable', price: 12999, stock: 150 },
  ]);

  const orderSources: OrderSource[] = [
    { id: 'website', name: 'Website', type: 'website' },
    { id: 'phone', name: 'Phone Call', type: 'phone' },
    { id: 'email', name: 'Email', type: 'email' },
    { id: 'whatsapp', name: 'WhatsApp', type: 'whatsapp' },
    { id: 'store', name: 'Physical Store', type: 'store' },
    { id: 'instagram', name: 'Instagram', type: 'social' },
    { id: 'facebook', name: 'Facebook', type: 'social' },
  ];

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      quantity: 1,
      total: 0
    };
    setOrderItems([...orderItems, newItem]);
  };

  const updateOrderItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setOrderItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'price' || field === 'quantity') {
            updatedItem.total = updatedItem.price * updatedItem.quantity;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeOrderItem = (id: string) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  const selectProduct = (itemId: string, productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
      updateOrderItem(itemId, 'name', product.name);
      updateOrderItem(itemId, 'price', product.price);
    }
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.075; // 7.5% VAT
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const generateOrderId = () => {
    return `ORD-${Date.now().toString().slice(-6)}`;
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const handleSaveForLater = () => {
    if (orderItems.length === 0) {
      alert('Please add at least one item to save the order');
      return;
    }

    const orderId = generateOrderId();
    console.log('Order Saved for Later:', { orderId, orderData, orderItems, status: 'draft' });
    
    // Show success message and redirect
    alert(`Order ${orderId} saved as draft!`);
    onBack();
  };

  const handleProceedToLogistics = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderItems.length === 0) {
      alert('Please add at least one item to the order');
      return;
    }

    // Update inventory for selected items
    orderItems.forEach(item => {
      const product = availableProducts.find(p => p.name === item.name);
      if (product) {
        console.log(`Updating inventory for ${product.name}: ${product.stock} - ${item.quantity} = ${product.stock - item.quantity}`);
      }
    });

    // Generate order ID and proceed to logistics
    const orderId = generateOrderId();
    console.log('Order Created:', { orderId, orderData, orderItems, status: 'processing' });
    
    // Proceed to logistics setup
    onOrderCreated(orderId);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Orders</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Create New Order</h2>
            <p className="text-gray-600">Add customer details and order items</p>
          </div>

          <form onSubmit={handleProceedToLogistics} className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderData.customerName}
                    onChange={(e) => setOrderData({...orderData, customerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter customer name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={orderData.customerEmail}
                    onChange={(e) => setOrderData({...orderData, customerEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="customer@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={orderData.customerPhone}
                    onChange={(e) => setOrderData({...orderData, customerPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Source *
                  </label>
                  <select
                    required
                    value={orderData.orderSource}
                    onChange={(e) => setOrderData({...orderData, orderSource: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select order source</option>
                    {orderSources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={orderData.shippingAddress}
                  onChange={(e) => setOrderData({...orderData, shippingAddress: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter complete shipping address"
                />
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                </div>
                <button
                  type="button"
                  onClick={addOrderItem}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                    <div className="col-span-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product
                      </label>
                      <select
                        value={item.name}
                        onChange={(e) => {
                          const selectedProduct = availableProducts.find(p => p.name === e.target.value);
                          if (selectedProduct) {
                            selectProduct(item.id, selectedProduct.id);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select product</option>
                        {availableProducts.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name} (Stock: {product.stock})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₦)
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateOrderItem(item.id, 'price', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateOrderItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total
                      </label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 font-medium">
                        {formatCurrency(item.total)}
                      </div>
                    </div>
                    
                    <div className="col-span-1">
                      <button
                        type="button"
                        onClick={() => removeOrderItem(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {orderItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No items added yet. Click "Add Item" to get started.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Status */}
            {orderItems.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Payment & Order Summary</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Payment Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Status
                    </label>
                    <select
                      value={orderData.paymentStatus}
                      onChange={(e) => setOrderData({...orderData, paymentStatus: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending Payment</option>
                      <option value="partial">Partial Payment</option>
                      <option value="paid">Fully Paid</option>
                    </select>
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(orderData.paymentStatus)}`}>
                        {orderData.paymentStatus === 'pending' && 'Payment Pending'}
                        {orderData.paymentStatus === 'partial' && 'Partially Paid'}
                        {orderData.paymentStatus === 'paid' && 'Fully Paid'}
                      </span>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>VAT (7.5%):</span>
                        <span>{formatCurrency(calculateTax())}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total:</span>
                          <span>{formatCurrency(calculateTotal())}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Notes</h3>
              <textarea
                rows={3}
                value={orderData.notes}
                onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any special instructions or notes for this order..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSaveForLater}
                  disabled={orderItems.length === 0}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Clock className="h-4 w-4" />
                  <span>Save for Later</span>
                </button>
                
                <button
                  type="submit"
                  disabled={orderItems.length === 0}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Proceed to Logistics</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;