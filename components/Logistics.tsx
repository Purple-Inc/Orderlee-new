import React, { useState } from 'react';
import { Search, Filter, Truck, MapPin, Clock, CheckCircle, AlertCircle, Plus, Package } from 'lucide-react';
import { RouteId } from '../types/routes';

interface LogisticsProps {
  onNavigate: (routeId: RouteId) => void;
}

const Logistics: React.FC<LogisticsProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'shipments' | 'orders'>('shipments');

  const shipments = [
    { id: 'SHP-001', orderId: '#ORD-001', customer: 'John Smith', address: '123 Main St, Lagos, Nigeria', carrier: 'DHL Express', trackingNumber: 'DHL123456789', status: 'In Transit', estimatedDelivery: '2024-01-17', paymentStatus: 'paid' },
    { id: 'SHP-002', orderId: '#ORD-002', customer: 'Sarah Johnson', address: '456 Oak Ave, Abuja, Nigeria', carrier: 'GIG Logistics', trackingNumber: 'GIG987654321', status: 'Delivered', estimatedDelivery: '2024-01-16', paymentStatus: 'paid' },
    { id: 'SHP-003', orderId: '#ORD-003', customer: 'Mike Brown', address: '789 Pine Rd, Port Harcourt, Nigeria', carrier: 'Kwik Delivery', trackingNumber: 'KWK456789123', status: 'Preparing', estimatedDelivery: '2024-01-18', paymentStatus: 'pending' },
    { id: 'SHP-004', orderId: '#ORD-004', customer: 'Lisa Davis', address: '321 Elm St, Kano, Nigeria', carrier: 'FedEx Nigeria', trackingNumber: 'FDX789123456', status: 'Delayed', estimatedDelivery: '2024-01-19', paymentStatus: 'partial' },
    { id: 'SHP-005', orderId: '#ORD-005', customer: 'Tom Wilson', address: '654 Maple Dr, Ibadan, Nigeria', carrier: 'UPS Nigeria', trackingNumber: 'UPS123456789', status: 'Cancelled', estimatedDelivery: '2024-01-20', paymentStatus: 'pending' },
  ];

  const ordersAwaitingShipment = [
    { id: '#ORD-007', customer: 'Alice Cooper', amount: '₦125,000', items: 2, date: '2024-01-16', paymentStatus: 'paid', address: 'Victoria Island, Lagos' },
    { id: '#ORD-008', customer: 'Bob Johnson', amount: '₦89,500', items: 1, date: '2024-01-16', paymentStatus: 'partial', address: 'Garki, Abuja' },
    { id: '#ORD-009', customer: 'Carol Smith', amount: '₦234,000', items: 3, date: '2024-01-15', paymentStatus: 'paid', address: 'GRA, Port Harcourt' },
  ];

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in transit': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'in transit': return <Truck className="h-4 w-4" />;
      case 'preparing': return <Clock className="h-4 w-4" />;
      case 'delayed': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const handleCreateShipment = (orderId?: string) => {
    console.log(`Creating shipment${orderId ? ` for order ${orderId}` : ''}`);
    onNavigate('create-shipment');
  };

  const stats = [
    { label: 'Total Shipments', value: '1,234', icon: Truck, color: 'bg-blue-500' },
    { label: 'In Transit', value: '89', icon: MapPin, color: 'bg-yellow-500' },
    { label: 'Delivered', value: '1,120', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Awaiting Shipment', value: ordersAwaitingShipment.length.toString(), icon: Package, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Logistics</h2>
                <p className="text-gray-600">Track shipments and manage logistics operations</p>
              </div>
              <button
                onClick={() => handleCreateShipment()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create Shipment</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('shipments')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'shipments'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Active Shipments
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'orders'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Orders Awaiting Shipment ({ordersAwaitingShipment.length})
                  </button>
                </nav>
              </div>

              {/* Filters */}
              <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder={activeTab === 'shipments' ? "Search shipments..." : "Search orders..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {activeTab === 'shipments' && (
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="preparing">Preparing</option>
                        <option value="in transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="delayed">Delayed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'shipments' ? (
            /* Shipments Table */
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredShipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{shipment.id}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{shipment.address}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          {shipment.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {shipment.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Truck className="h-4 w-4 mr-2 text-gray-400" />
                            {shipment.carrier}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">{shipment.trackingNumber}</code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                            {getStatusIcon(shipment.status)}
                            <span className="ml-1">{shipment.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(shipment.paymentStatus)}`}>
                            {shipment.paymentStatus === 'paid' && 'Paid'}
                            {shipment.paymentStatus === 'partial' && 'Partial'}
                            {shipment.paymentStatus === 'pending' && 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shipment.estimatedDelivery}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Orders Awaiting Shipment */
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Orders Ready for Shipment</h3>
                <p className="text-sm text-gray-600 mt-1">Create shipments for completed orders</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ordersAwaitingShipment.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus === 'paid' && 'Paid'}
                            {order.paymentStatus === 'partial' && 'Partial'}
                            {order.paymentStatus === 'pending' && 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                          {order.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleCreateShipment(order.id)}
                            className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Create Shipment
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logistics;