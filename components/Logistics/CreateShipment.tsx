import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, User, Building, Phone, Mail, Save, Package, Truck, CheckCircle, CreditCard, Shield } from 'lucide-react';
import { RouteId } from '../../types/routes';

interface CreateShipmentProps {
  orderId?: string;
  onBack: () => void;
  onComplete: () => void;
  onNavigate: (routeId: RouteId) => void;
}

interface ShipmentData {
  sender: {
    name: string;
    company: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
  };
  receiver: {
    name: string;
    company: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
  };
  packageDetails: {
    weight: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
    value: string;
    description: string;
    fragile: boolean;
  };
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
}

const CreateShipment: React.FC<CreateShipmentProps> = ({ orderId, onBack, onComplete, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shipmentData, setShipmentData] = useState<ShipmentData>({
    sender: {
      name: '',
      company: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      email: ''
    },
    receiver: {
      name: '',
      company: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      email: ''
    },
    packageDetails: {
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      },
      value: '',
      description: '',
      fragile: false
    }
  });

  const [selectedProvider, setSelectedProvider] = useState<LogisticsProvider | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shipmentComplete, setShipmentComplete] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

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
      description: 'Premium express delivery service with guaranteed delivery times.',
      trackingIncluded: true,
      insuranceIncluded: true,
      pickupTime: 'Same day pickup',
      serviceType: 'express'
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
      description: 'Leading Nigerian logistics company with extensive local network.',
      trackingIncluded: true,
      insuranceIncluded: false,
      pickupTime: 'Same day pickup',
      serviceType: 'standard'
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
      description: 'Fast same-day delivery service for urgent shipments.',
      trackingIncluded: true,
      insuranceIncluded: false,
      pickupTime: 'Within 1 hour',
      serviceType: 'same-day'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const handleInputChange = (section: 'sender' | 'receiver' | 'packageDetails', field: string, value: string | boolean) => {
    if (section === 'packageDetails' && field.includes('.')) {
      const [parent, child] = field.split('.');
      setShipmentData(prev => ({
        ...prev,
        packageDetails: {
          ...prev.packageDetails,
          [parent]: {
            ...prev.packageDetails[parent as keyof typeof prev.packageDetails],
            [child]: value
          }
        }
      }));
    } else {
      setShipmentData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProviderSelect = (provider: LogisticsProvider) => {
    setSelectedProvider(provider);
    handleNextStep();
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const newTrackingNumber = `${selectedProvider?.name.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-8)}`;
      setTrackingNumber(newTrackingNumber);
      setShipmentComplete(true);
      setIsProcessing(false);
      setCurrentStep(4);
    }, 3000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Sender Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Building className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Sender Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipmentData.sender.name}
                    onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter sender's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Business Name
                  </label>
                  <input
                    type="text"
                    value={shipmentData.sender.company}
                    onChange={(e) => handleInputChange('sender', 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name (optional)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={shipmentData.sender.address}
                    onChange={(e) => handleInputChange('sender', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete pickup address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipmentData.sender.city}
                    onChange={(e) => handleInputChange('sender', 'city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    required
                    value={shipmentData.sender.state}
                    onChange={(e) => handleInputChange('sender', 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shipmentData.sender.phone}
                    onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={shipmentData.sender.email}
                    onChange={(e) => handleInputChange('sender', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="sender@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Receiver Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Receiver Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipmentData.receiver.name}
                    onChange={(e) => handleInputChange('receiver', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter receiver's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Business Name
                  </label>
                  <input
                    type="text"
                    value={shipmentData.receiver.company}
                    onChange={(e) => handleInputChange('receiver', 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name (optional)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={shipmentData.receiver.address}
                    onChange={(e) => handleInputChange('receiver', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipmentData.receiver.city}
                    onChange={(e) => handleInputChange('receiver', 'city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    required
                    value={shipmentData.receiver.state}
                    onChange={(e) => handleInputChange('receiver', 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shipmentData.receiver.phone}
                    onChange={(e) => handleInputChange('receiver', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={shipmentData.receiver.email}
                    onChange={(e) => handleInputChange('receiver', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="receiver@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Package className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Package Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={shipmentData.packageDetails.weight}
                    onChange={(e) => handleInputChange('packageDetails', 'weight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    value={shipmentData.packageDetails.dimensions.length}
                    onChange={(e) => handleInputChange('packageDetails', 'dimensions.length', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    value={shipmentData.packageDetails.dimensions.width}
                    onChange={(e) => handleInputChange('packageDetails', 'dimensions.width', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={shipmentData.packageDetails.dimensions.height}
                    onChange={(e) => handleInputChange('packageDetails', 'dimensions.height', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Value (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    value={shipmentData.packageDetails.value}
                    onChange={(e) => handleInputChange('packageDetails', 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shipmentData.packageDetails.fragile}
                      onChange={(e) => handleInputChange('packageDetails', 'fragile', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Fragile item</span>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Description
                </label>
                <textarea
                  rows={3}
                  value={shipmentData.packageDetails.description}
                  onChange={(e) => handleInputChange('packageDetails', 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the contents of the package..."
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Pickup Location</h4>
                  <p className="text-sm text-blue-800">
                    {shipmentData.sender.city}, {shipmentData.sender.state}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Delivery Location</h4>
                  <p className="text-sm text-blue-800">
                    {shipmentData.receiver.city}, {shipmentData.receiver.state}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Package Details</h4>
                  <p className="text-sm text-blue-800">
                    {shipmentData.packageDetails.weight}kg • {formatCurrency(Number(shipmentData.packageDetails.value))}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
                  onClick={() => handleProviderSelect(provider)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{provider.logo}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i} className={`text-sm ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
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
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivery Time</p>
                        <p className="text-sm text-gray-600">{provider.deliveryTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pickup</p>
                        <p className="text-sm text-gray-600">{provider.pickupTime}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

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
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                
                <div className="space-y-3 mb-6">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Debit/Credit Card</h4>
                        <p className="text-sm text-gray-600">Pay with your Visa, Mastercard, or Verve card</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'transfer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Bank Transfer</h4>
                        <p className="text-sm text-gray-600">Direct bank transfer with instant confirmation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        <span>Pay {selectedProvider ? formatCurrency(selectedProvider.price) : ''}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Summary</h3>
                
                {selectedProvider && (
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Provider:</span>
                      <span className="font-medium">{selectedProvider.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{selectedProvider.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{shipmentData.packageDetails.weight}kg</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedProvider.price)}</span>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Secure Payment</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Shipment Created!</h2>
              <p className="text-gray-600">
                Your shipment has been successfully created and payment processed
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tracking Number:</span>
                      <span className="font-medium text-blue-600">{trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="font-medium">{selectedProvider?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{selectedProvider?.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium">{selectedProvider ? formatCurrency(selectedProvider.price) : ''}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="font-medium">{shipmentData.sender.city}, {shipmentData.sender.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-medium">{shipmentData.receiver.city}, {shipmentData.receiver.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{shipmentData.packageDetails.weight}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-green-600">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Package Pickup</p>
                    <p className="text-sm text-blue-700">
                      {selectedProvider?.name} will pickup your package within {selectedProvider?.pickupTime.toLowerCase()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">In Transit</p>
                    <p className="text-sm text-blue-700">
                      Track your package using tracking number: {trackingNumber}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Delivery</p>
                    <p className="text-sm text-blue-700">
                      Package will be delivered within {selectedProvider?.deliveryTime.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={onComplete}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Shipping Details';
      case 2: return 'Choose Provider';
      case 3: return 'Payment';
      case 4: return 'Shipment Complete';
      default: return '';
    }
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
              <span>Back to Logistics</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Create Shipment</h2>
            <p className="text-gray-600">
              {orderId ? `Create shipment for order ${orderId}` : 'Create a new shipment'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentStep >= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-24 h-1 mx-4 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h3>
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep < 4 && !shipmentComplete && (
            <div className="flex justify-between mt-8">
              <button
                onClick={currentStep === 1 ? onBack : handlePrevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {currentStep === 1 ? 'Cancel' : 'Previous'}
              </button>
              
              {currentStep < 3 && (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShipment;