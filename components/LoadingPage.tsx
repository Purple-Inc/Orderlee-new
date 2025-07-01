import React from 'react';
import { Package } from 'lucide-react';

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="flex items-center space-x-6">
        {/* Rotating Logo */}
        <div className="bg-white p-4 rounded-2xl shadow-lg animate-spin">
          <Package className="h-12 w-12 text-blue-600" />
        </div>
        
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold text-white">Orderlee</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;