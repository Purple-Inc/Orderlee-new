import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Shield, Truck, CheckCircle, Info, MapPin } from 'lucide-react';

interface LogisticsProvidersProps {
  orderId: string;
  logisticsData: any;
  onBack: () => void;
  onComplete: (provider: LogisticsProvider) => void;
}

interface LogisticsProvider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  price: number;
  features: string[];
  description: string;
  trackingIncluded: boolean;
  insuranceIncluded: boolean;
  pickupTime: string;
  serviceType: 'standard' | 'express' | 'same-day' | 'next-day';
  coverage: string[];
}

const LogisticsProviders: React.FC<LogisticsProvidersProps> = ({ 
  orderId, 
  logisticsData, 
  onBack, 
  onComplete 
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const providers: LogisticsProvider[] = [
    {
      id: 'dhl',
      name: 'DHL Express',
      logo: '🚚',
      rating: 4.8,
      reviews: 2456,
      deliveryTime: '1-2 business days',
      price: 3500,
      features: ['Real-time tracking', 'Insurance included', 'Signature required', 'SMS notifications'],
      description: 'Premium express delivery service with guaranteed delivery times and comprehensive insurance coverage.',
      trackingIncluded: true,
      insuranceIncluded: true,
      pickupTime: 'Same day pickup',
      serviceType: 'express',
      coverage: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna']
    },
    {
      id: 'fedex',
      name: 'FedEx Nigeria',
      logo: '📦',
      rating: 4.7,
      reviews: 1890,
      deliveryTime: '2-3 business days',
      price: 2800,
      features: ['Package tracking', 'Delivery confirmation', 'Flexible pickup', 'Customer support'],
      description: 'Reliable international courier service with extensive network coverage across Nigeria.',
      trackingIncluded: true,
      insuranceIncluded: true,
      pickupTime: 'Next business day',
      serviceType: 'standard',
      coverage: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan']
    },
    {
      id: 'gig',
      name: 'GIG Logistics',
      logo: '🏃‍♂️',
      rating: 4.5,
      reviews: 3421,
      deliveryTime: '2-4 business days',
      price: 1800,
      features: ['Nationwide coverage', 'Cash on delivery', 'Bulk discounts', 'API integration'],
      description: 'Leading Nigerian logistics company with extensive local network and competitive pricing.',
      trackingIncluded: true,
      insuranceIncluded: false,
      pickupTime: 'Same day pickup',
      serviceType: 'standard',
      coverage: ['All 36 states', 'FCT']
    },
    {
      id: 'ups',
      name: 'UPS Nigeria',
      logo: '🚛',
      rating: 4.6,
      reviews: 1567,
      deliveryTime: '1-3 business days',
      price: 3200,
      features: ['Express delivery', 'Package insurance', 'Delivery alerts', 'Proof of delivery'],
      description: 'Global shipping solutions with reliable express delivery options and comprehensive tracking.',
      trackingIncluded: true,
      insuranceIncluded: true,
      pickupTime: 'Same day pickup',
      serviceType: 'express',
      coverage: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano']
    },
    {
      id: 'kwik',
      name: 'Kwik Delivery',
      logo: '⚡',
      rating: 4.3,
      reviews: 2890,
      deliveryTime: '3-6 hours',
      price: 2500,
      features: ['Same day delivery', 'Real-time tracking', 'Instant pickup', 'Live chat support'],
      description: 'Fast same-day delivery service perfect for urgent shipments within major cities.',
      trackingIncluded: true,
      insuranceIncluded: false,
      pickupTime: 'Within 1 hour',
      serviceType: 'same-day',
      coverage: ['Lagos', 'Abuja', 'Port Harcourt']
    },
    {
      id: 'sendbox',
      name: 'Sendbox',
      logo: '📮',
      rating: 4.4,
      reviews: 1234,
      deliveryTime: '1-5 business days',
      price: 1500,
      features: ['Affordable rates', 'Multiple pickup points', 'SMS updates', 'Return handling'],
      description: 'Cost-effective logistics solution with flexible delivery options and competitive pricing.',
      trackingIncluded: true,
      insuranceIncluded: false,
      pickupTime: 'Next business day',
      serviceType: 'standard',
      coverage: ['Lagos', 'Abuja', 'Ibadan', 'Kano', 'Port Harcourt']
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'same-day': return 'bg-red-100 text-red-800';
      case 'express': return 'bg-blue-100 text-blue-800';
      case 'next-day': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'same-day': return 'Same Day';
      case 'express': return 'Express';
      case 'next-day': return 'Next Day';
      default: return 'Standard';
    }
  };

  const handleSelectProvider = (provider: LogisticsProvider) => {
    onComplete(provider);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Logistics Setup</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Choose Logistics Provider</h2>
            <p className="text-gray-600">
              Select the best shipping option for order {orderId} from {logisticsData?.sender?.city} to {logisticsData?.receiver?.city}
            </p>
          </div>

          {/* Shipping Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Pickup Location</h4>
                <p className="text-sm text-blue-800">
                  {logisticsData?.sender?.city}, {logisticsData?.sender?.state}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Delivery Location</h4>
                <p className="text-sm text-blue-800">
                  {logisticsData?.receiver?.city}, {logisticsData?.receiver?.state}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Package Details</h4>
                <p className="text-sm text-blue-800">
                  {logisticsData?.packageDetails?.weight}kg • {formatCurrency(Number(logisticsData?.packageDetails?.value))}
                </p>
              </div>
            </div>
          </div>

          {/* Providers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all hover:shadow-md ${
                  selectedProvider === provider.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {/* Provider Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{provider.logo}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(provider.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {provider.rating} ({provider.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(provider.price)}
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getServiceTypeColor(provider.serviceType)}`}>
                      {getServiceTypeLabel(provider.serviceType)}
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivery Time</p>
                      <p className="text-sm text-gray-600">{provider.deliveryTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pickup</p>
                      <p className="text-sm text-gray-600">{provider.pickupTime}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {provider.trackingIncluded && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Tracking
                      </span>
                    )}
                    {provider.insuranceIncluded && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        <Shield className="h-3 w-3 mr-1" />
                        Insurance
                      </span>
                    )}
                    <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      <MapPin className="h-3 w-3 mr-1" />
                      {provider.coverage.length > 3 ? `${provider.coverage.length} locations` : provider.coverage.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDetails(showDetails === provider.id ? null : provider.id)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Info className="h-4 w-4" />
                    <span>Details</span>
                  </button>
                  <button
                    onClick={() => handleSelectProvider(provider)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Select & Pay</span>
                  </button>
                </div>

                {/* Expanded Details */}
                {showDetails === provider.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Service Features</h4>
                    <div className="space-y-2">
                      {provider.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Coverage Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {provider.coverage.map((location, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Choosing?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-lg inline-block mb-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Urgent Delivery</h4>
                <p className="text-sm text-gray-600">Choose same-day or express options for time-sensitive packages</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-lg inline-block mb-2">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">High Value Items</h4>
                <p className="text-sm text-gray-600">Select providers with insurance for valuable packages</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-3 rounded-lg inline-block mb-2">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900">Remote Areas</h4>
                <p className="text-sm text-gray-600">Check coverage areas for deliveries to remote locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsProviders;