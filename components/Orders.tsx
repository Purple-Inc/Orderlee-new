import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { RouteId } from '../types/routes';
import RouteLink from './Navigation/RouteLink';
import Breadcrumbs from './Navigation/Breadcrumbs';

interface OrdersProps {
  onNavigate?: (routeId: RouteId) => void;
}

const Orders: React.FC<OrdersProps> = ({ onNavigate = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    { id: '#ORD-001', customer: 'John Smith', email: 'john@example.com', amount: '₦299,999', status: 'Processing', date: '2024-01-15', items: 3, paymentStatus: 'paid' },
    { id: '#ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', amount: '₦149,500', status: 'Shipped', date: '2024-01-15', items: 1, paymentStatus: 'paid' },
    { id: '#ORD-003', customer: 'Mike Brown', email: 'mike@example.com', amount: '₦89,999', status: 'Delivered', date: '2024-01-14', items: 2, paymentStatus: 'paid' },
    { id: '#ORD-004', customer: 'Lisa Davis', email: 'lisa@example.com', amount: '₦199,999', status: 'Processing', date: '2024-01-14', items: 1, paymentStatus: 'partial' },
    { id: '#ORD-005', customer: 'Tom Wilson', email: 'tom@example.com', amount: '₦349,999', status: 'Cancelled', date: '2024-01-13', items: 4, paymentStatus: 'pending' },
    { id: '#ORD-006', customer: 'Emma Taylor', email: 'emma@example.com', amount: '₦79,999', status: 'Delivered', date: '2024-01-13', items: 1, paymentStatus: 'paid' },
    { id: '#ORD-007', customer: 'Alice Cooper', email: 'alice@example.com', amount: '₦125,000', status: 'Ready to Ship', date: '2024-01-16', items: 2, paymentStatus: 'paid' },
    { id: '#ORD-008', customer: 'Bob Johnson', email: 'bob@example.com', amount: '₦89,500', status: 'Ready to Ship', date: '2024-01-16', items: 1, paymentStatus: 'partial' },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'ready to ship': return 'bg-purple-100 text-purple-800';
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

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="hidden sm:block">
            <Breadcrumbs currentRoute="orders" onNavigate={onNavigate} />
          </div>
          
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Orders</h2>
                <p className="text-sm sm:text-base text-gray-600">Manage and track all customer orders</p>
              </div>
              <RouteLink
                to="new-order"
                onNavigate={onNavigate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span>New Order</span>
              </RouteLink>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="processing">Processing</option>
                    <option value="ready to ship">Ready to Ship</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
            {/* Mobile Cards View */}
            <div className="block sm:hidden">
              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{order.amount}</p>
                        <p className="text-xs text-gray-500">{order.items} items</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus === 'paid' && 'Paid'}
                        {order.paymentStatus === 'partial' && 'Partial'}
                        {order.paymentStatus === 'pending' && 'Pending'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{order.date}</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.items} items</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus === 'paid' && 'Paid'}
                          {order.paymentStatus === 'partial' && 'Partial'}
                          {order.paymentStatus === 'pending' && 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;