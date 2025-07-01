import React, { useState } from 'react';
import { Search, Filter, CreditCard, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const payments = [
    { id: 'PAY-001', orderId: '#ORD-001', customer: 'John Smith', amount: '$299.99', method: 'Credit Card', status: 'Completed', date: '2024-01-15', fee: '$8.99' },
    { id: 'PAY-002', orderId: '#ORD-002', customer: 'Sarah Johnson', amount: '$149.50', method: 'PayPal', status: 'Completed', date: '2024-01-15', fee: '$4.48' },
    { id: 'PAY-003', orderId: '#ORD-003', customer: 'Mike Brown', amount: '$89.99', method: 'Credit Card', status: 'Pending', date: '2024-01-14', fee: '$2.70' },
    { id: 'PAY-004', orderId: '#ORD-004', customer: 'Lisa Davis', amount: '$199.99', method: 'Bank Transfer', status: 'Failed', date: '2024-01-14', fee: '$0.00' },
    { id: 'PAY-005', orderId: '#ORD-005', customer: 'Tom Wilson', amount: '$349.99', method: 'Credit Card', status: 'Refunded', date: '2024-01-13', fee: '$10.50' },
    { id: 'PAY-006', orderId: '#ORD-006', customer: 'Emma Taylor', amount: '$79.99', method: 'PayPal', status: 'Completed', date: '2024-01-13', fee: '$2.40' },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'refunded': return <DollarSign className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const stats = [
    { label: 'Total Revenue', value: '$45,678', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Completed', value: '1,234', icon: CheckCircle, color: 'bg-blue-500' },
    { label: 'Pending', value: '23', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Failed', value: '5', icon: XCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h2>
                <p className="text-sm sm:text-base text-gray-600">Track and manage all payment transactions</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2`}>
                      <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search payments..."
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
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
            {/* Mobile Cards View */}
            <div className="block lg:hidden">
              <div className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <div key={payment.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900">{payment.id}</h3>
                        <p className="text-sm text-gray-600">{payment.customer}</p>
                        <p className="text-xs text-gray-500">{payment.orderId}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-bold text-gray-900">{payment.amount}</p>
                        <p className="text-xs text-gray-500">Fee: {payment.fee}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{payment.method}</span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1">{payment.status}</span>
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {payment.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        {payment.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                          {payment.method}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-1">{payment.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.fee}
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

export default Payments;