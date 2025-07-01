import React, { useState } from 'react';
import { Package, Bell, User, LogOut, Bot, Menu, X } from 'lucide-react';
import { RouteId } from '../types/routes';
import { getNavigationRoutes, quickActions } from '../utils/routes';
import RouteLink from './Navigation/RouteLink';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: RouteId) => void;
  onSettingsClick: () => void;
  onLogout: () => void;
  onAIAssistant: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  onSettingsClick, 
  onLogout, 
  onAIAssistant 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigationItems = getNavigationRoutes();

  const handleNavigate = (routeId: RouteId) => {
    onViewChange(routeId);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <RouteLink
          to="dashboard"
          onNavigate={handleNavigate}
          className="flex items-center space-x-3 w-full text-left"
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Orderlee</h1>
          </div>
        </RouteLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <div className="space-y-1 sm:space-y-2">
          {navigationItems.map((item) => (
            <RouteLink
              key={item.id}
              to={item.id}
              onNavigate={handleNavigate}
              className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.icon && (
                <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                  currentView === item.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
              )}
              <span className="font-medium text-sm sm:text-base truncate">{item.name}</span>
            </RouteLink>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3 px-3 sm:px-4">
            Quick Actions
          </h3>
          <div className="space-y-1 sm:space-y-2">
            {quickActions.map((action) => (
              <RouteLink
                key={action.id}
                to={action.route}
                onNavigate={handleNavigate}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-200 ${action.color} hover:bg-gray-50`}
              >
                <action.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base truncate">{action.name}</span>
              </RouteLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 sm:p-4 border-t border-gray-200">
        <div className="space-y-1 sm:space-y-2">
          {/* AI Assistant */}
          <button 
            onClick={() => {
              onAIAssistant();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
          >
            <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base flex-1 text-left truncate">AI Assistant</span>
            <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 flex-shrink-0">AI</span>
          </button>

          <button 
            onClick={() => {
              handleNavigate('notifications');
            }}
            className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base flex-1 text-left truncate">Notifications</span>
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 flex-shrink-0">3</span>
          </button>
          
          <button 
            onClick={() => {
              onSettingsClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base truncate">Settings</span>
          </button>

          <button 
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base truncate">Sign Out</span>
          </button>

          {/* User Profile */}
          <div className="mt-3 sm:mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@orderlee.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-2 rounded-lg shadow-lg border border-gray-200"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Now flows with the page instead of being fixed */}
      <div className="hidden lg:flex w-64 bg-white shadow-lg border-r border-gray-200 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col h-screen transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;