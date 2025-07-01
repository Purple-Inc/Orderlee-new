import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { RouteId } from '../../types/routes';
import { generateBreadcrumbs } from '../../utils/routes';

interface BreadcrumbsProps {
  currentRoute: RouteId;
  onNavigate: (routeId: RouteId) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentRoute, onNavigate }) => {
  const breadcrumbs = generateBreadcrumbs(currentRoute);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center hover:text-gray-900 transition-colors"
      >
        <Home className="h-4 w-4" />
      </button>
      
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <button
            onClick={() => {
              // Navigate to parent routes, but not the current route
              if (!breadcrumb.current) {
                const routeId = Object.values(require('../../utils/routes').routes)
                  .find(route => route.path === breadcrumb.path)?.id;
                if (routeId) {
                  onNavigate(routeId as RouteId);
                }
              }
            }}
            className={`hover:text-gray-900 transition-colors ${
              breadcrumb.current 
                ? 'text-gray-900 font-medium cursor-default' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            disabled={breadcrumb.current}
          >
            {breadcrumb.name}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;