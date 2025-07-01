import React from 'react';
import { RouteId } from '../../types/routes';
import { getRoute } from '../../utils/routes';

interface RouteLinkProps {
  to: RouteId;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onNavigate: (routeId: RouteId) => void;
}

const RouteLink: React.FC<RouteLinkProps> = ({ 
  to, 
  children, 
  className = '', 
  onClick,
  onNavigate 
}) => {
  const route = getRoute(to);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    onNavigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} transition-colors`}
      title={route.description}
    >
      {children}
    </button>
  );
};

export default RouteLink;