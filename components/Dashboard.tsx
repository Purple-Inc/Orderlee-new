import React from 'react';
import { TrendingUp, ShoppingCart, Package, DollarSign, AlertTriangle, MapPin, Users, Lightbulb, User } from 'lucide-react';
import { RouteId } from '../types/routes';
import RouteLink from './Navigation/RouteLink';
import Breadcrumbs from './Navigation/Breadcrumbs';

interface DashboardProps {
  onNavigate?: (routeId: RouteId) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate = () => {} }) => {
  const stats = [
    { label: 'Total Orders', value: '0', change: '+0%', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Revenue', value: '₦0.00', change: '+0%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Inventory Items', value: '0', change: '+0%', icon: Package, color: 'bg-purple-500' },
    { label: 'Pending Orders', value: '0', change: '+0%', icon: AlertTriangle, color: 'bg-orange-500' },
  ];

  const orderSources = [
    { name: 'Website', orders: 0, percentage: 0, color: 'bg-blue-500' },
    { name: 'WhatsApp', orders: 0, percentage: 0, color: 'bg-green-500' },
    { name: 'Instagram', orders: 0, percentage: 0, color: 'bg-pink-500' },
    { name: 'Phone Calls', orders: 0, percentage: 0, color: 'bg-yellow-500' },
    { name: 'Physical Store', orders: 0, percentage: 0, color: 'bg-gray-500' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="hidden sm:block">
            <Breadcrumbs currentRoute="dashboard" onNavigate={onNavigate} />
          </div>
          
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
            <p className="text-sm sm:text-base text-gray-600">Here's what's happening with your business today. Start by adding your first product or creating an order.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs sm:text-sm mt-1 text-gray-500">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.color} p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2`}>
                    <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Getting Started */}
            <div className="xl:col-span-2 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Getting Started</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-blue-900 text-sm sm:text-base">Add Your First Product</h4>
                      <p className="text-xs sm:text-sm text-blue-700 mt-1">
                        Start by adding products to your inventory. This will help you track stock levels and manage orders.
                      </p>
                      <RouteLink
                        to="add-item"
                        onNavigate={onNavigate}
                        className="mt-2 text-xs sm:text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors inline-block"
                      >
                        Add Product
                      </RouteLink>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-green-900 text-sm sm:text-base">Create Your First Order</h4>
                      <p className="text-xs sm:text-sm text-green-700 mt-1">
                        Once you have products, you can start creating orders for your customers.
                      </p>
                      <RouteLink
                        to="new-order"
                        onNavigate={onNavigate}
                        className="mt-2 text-xs sm:text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors inline-block"
                      >
                        Create Order
                      </RouteLink>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 border border-purple-200 bg-purple-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-purple-900 text-sm sm:text-base">Set Up Receipt Templates</h4>
                      <p className="text-xs sm:text-sm text-purple-700 mt-1">
                        Customize your receipt templates with your company logo and branding.
                      </p>
                      <RouteLink
                        to="receipt-templates"
                        onNavigate={onNavigate}
                        className="mt-2 text-xs sm:text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors inline-block"
                      >
                        Setup Receipts
                      </RouteLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Sources */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Order Sources</h3>
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                {orderSources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${source.color} flex-shrink-0`}></div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{source.name}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">{source.orders}</p>
                      <p className="text-xs text-gray-500">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
                <div className="pt-3 sm:pt-4 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Start receiving orders to see source analytics
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Chart Placeholder */}
          <div className="mt-4 sm:mt-6 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Sales Analytics</h3>
            <div className="h-48 sm:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm sm:text-base text-gray-500 mb-2">No sales data yet</p>
                <p className="text-xs sm:text-sm text-gray-400">Your sales chart will appear here once you start making sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;