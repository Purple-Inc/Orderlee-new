import React, { useState } from 'react';
import { Search, Filter, Plus, AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';
import { RouteId } from '../types/routes';

interface InventoryProps {
  onNavigate: (routeId: RouteId) => void;
}

const Inventory: React.FC<InventoryProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const inventory = [
    { id: 'INV-001', name: 'Wireless Headphones', category: 'Electronics', stock: 5, reorderLevel: 20, cost: '$45.00', price: '$89.99', status: 'Low Stock' },
    { id: 'INV-002', name: 'Smart Watch', category: 'Electronics', stock: 8, reorderLevel: 15, cost: '$120.00', price: '$249.99', status: 'Low Stock' },
    { id: 'INV-003', name: 'Phone Case', category: 'Accessories', stock: 12, reorderLevel: 25, cost: '$8.00', price: '$19.99', status: 'Low Stock' },
    { id: 'INV-004', name: 'Bluetooth Speaker', category: 'Electronics', stock: 45, reorderLevel: 20, cost: '$25.00', price: '$59.99', status: 'In Stock' },
    { id: 'INV-005', name: 'USB Cable', category: 'Accessories', stock: 150, reorderLevel: 50, cost: '$3.00', price: '$12.99', status: 'In Stock' },
    { id: 'INV-006', name: 'Laptop Stand', category: 'Accessories', stock: 0, reorderLevel: 10, cost: '$15.00', price: '$39.99', status: 'Out of Stock' },
  ];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock': return <TrendingUp className="h-4 w-4" />;
      case 'Low Stock': return <AlertTriangle className="h-4 w-4" />;
      case 'Out of Stock': return <TrendingDown className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const stats = [
    { label: 'Total Items', value: '2,456', icon: Package, color: 'bg-blue-500' },
    { label: 'Low Stock', value: '23', icon: AlertTriangle, color: 'bg-yellow-500' },
    { label: 'Out of Stock', value: '5', icon: TrendingDown, color: 'bg-red-500' },
    { label: 'Total Value', value: '$45,678', icon: TrendingUp, color: 'bg-green-500' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventory</h2>
                <p className="text-sm sm:text-base text-gray-600">Track and manage your product inventory</p>
              </div>
              <button 
                onClick={() => onNavigate('add-item')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
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
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
            {/* Mobile Cards View */}
            <div className="block lg:hidden">
              <div className="divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.id}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-bold text-gray-900">{item.price}</p>
                        <p className="text-xs text-gray-500">Cost: {item.cost}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Stock: {item.stock}</p>
                        <p className="text-xs text-gray-500">Reorder at {item.reorderLevel}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 text-blue-600 hover:text-blue-900 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 text-green-600 hover:text-green-900 text-sm font-medium bg-green-50 hover:bg-green-100 px-3 py-2 rounded transition-colors">
                        Reorder
                      </button>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.stock}</div>
                          <div className="text-sm text-gray-500">Reorder at {item.reorderLevel}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.cost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{item.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3 hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-900 hover:bg-green-50 px-2 py-1 rounded transition-colors">
                          Reorder
                        </button>
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

export default Inventory;