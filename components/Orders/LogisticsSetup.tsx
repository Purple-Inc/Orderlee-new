import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, User, Building, Phone, Mail, Save } from 'lucide-react';

interface LogisticsSetupProps {
  orderId: string;
  onBack: () => void;
  onNext: (logisticsData: LogisticsData) => void;
}

interface LogisticsData {
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

const LogisticsSetup: React.FC<LogisticsSetupProps> = ({ orderId, onBack, onNext }) => {
  const [logisticsData, setLogisticsData] = useState<LogisticsData>({
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate sender details
    if (!logisticsData.sender.name.trim()) {
      newErrors['sender.name'] = 'Sender name is required';
    }
    if (!logisticsData.sender.address.trim()) {
      newErrors['sender.address'] = 'Sender address is required';
    }
    if (!logisticsData.sender.city.trim()) {
      newErrors['sender.city'] = 'Sender city is required';
    }
    if (!logisticsData.sender.state) {
      newErrors['sender.state'] = 'Sender state is required';
    }
    if (!logisticsData.sender.phone.trim()) {
      newErrors['sender.phone'] = 'Sender phone is required';
    }

    // Validate receiver details
    if (!logisticsData.receiver.name.trim()) {
      newErrors['receiver.name'] = 'Receiver name is required';
    }
    if (!logisticsData.receiver.address.trim()) {
      newErrors['receiver.address'] = 'Receiver address is required';
    }
    if (!logisticsData.receiver.city.trim()) {
      newErrors['receiver.city'] = 'Receiver city is required';
    }
    if (!logisticsData.receiver.state) {
      newErrors['receiver.state'] = 'Receiver state is required';
    }
    if (!logisticsData.receiver.phone.trim()) {
      newErrors['receiver.phone'] = 'Receiver phone is required';
    }

    // Validate package details
    if (!logisticsData.packageDetails.weight) {
      newErrors['package.weight'] = 'Package weight is required';
    }
    if (!logisticsData.packageDetails.value) {
      newErrors['package.value'] = 'Package value is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section: 'sender' | 'receiver' | 'packageDetails', field: string, value: string | boolean) => {
    if (section === 'packageDetails' && field.includes('.')) {
      const [parent, child] = field.split('.');
      setLogisticsData(prev => ({
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
      setLogisticsData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }

    // Clear error when user starts typing
    const errorKey = `${section}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(logisticsData);
    }
  };

  const formatCurrency = (amount: string) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(Number(amount));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Order</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Setup Logistics</h2>
            <p className="text-gray-600">Configure shipping details for order {orderId}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
                    value={logisticsData.sender.name}
                    onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['sender.name'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter sender's full name"
                  />
                  {errors['sender.name'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['sender.name']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Business Name
                  </label>
                  <input
                    type="text"
                    value={logisticsData.sender.company}
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
                    value={logisticsData.sender.address}
                    onChange={(e) => handleInputChange('sender', 'address', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['sender.address'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter complete pickup address"
                  />
                  {errors['sender.address'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['sender.address']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={logisticsData.sender.city}
                    onChange={(e) => handleInputChange('sender', 'city', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['sender.city'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="City"
                  />
                  {errors['sender.city'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['sender.city']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    required
                    value={logisticsData.sender.state}
                    onChange={(e) => handleInputChange('sender', 'state', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['sender.state'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors['sender.state'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['sender.state']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={logisticsData.sender.phone}
                    onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['sender.phone'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+234 xxx xxx xxxx"
                  />
                  {errors['sender.phone'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['sender.phone']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={logisticsData.sender.email}
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
                    value={logisticsData.receiver.name}
                    onChange={(e) => handleInputChange('receiver', 'name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['receiver.name'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter receiver's full name"
                  />
                  {errors['receiver.name'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['receiver.name']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Business Name
                  </label>
                  <input
                    type="text"
                    value={logisticsData.receiver.company}
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
                    value={logisticsData.receiver.address}
                    onChange={(e) => handleInputChange('receiver', 'address', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['receiver.address'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter complete delivery address"
                  />
                  {errors['receiver.address'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['receiver.address']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={logisticsData.receiver.city}
                    onChange={(e) => handleInputChange('receiver', 'city', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['receiver.city'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="City"
                  />
                  {errors['receiver.city'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['receiver.city']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    required
                    value={logisticsData.receiver.state}
                    onChange={(e) => handleInputChange('receiver', 'state', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['receiver.state'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors['receiver.state'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['receiver.state']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={logisticsData.receiver.phone}
                    onChange={(e) => handleInputChange('receiver', 'phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['receiver.phone'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+234 xxx xxx xxxx"
                  />
                  {errors['receiver.phone'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['receiver.phone']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={logisticsData.receiver.email}
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
                <MapPin className="h-5 w-5 text-purple-600" />
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
                    value={logisticsData.packageDetails.weight}
                    onChange={(e) => handleInputChange('packageDetails', 'weight', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['package.weight'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.0"
                  />
                  {errors['package.weight'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['package.weight']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    value={logisticsData.packageDetails.dimensions.length}
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
                    value={logisticsData.packageDetails.dimensions.width}
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
                    value={logisticsData.packageDetails.dimensions.height}
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
                    value={logisticsData.packageDetails.value}
                    onChange={(e) => handleInputChange('packageDetails', 'value', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['package.value'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors['package.value'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['package.value']}</p>
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={logisticsData.packageDetails.fragile}
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
                  value={logisticsData.packageDetails.description}
                  onChange={(e) => handleInputChange('packageDetails', 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the contents of the package..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Continue to Providers</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogisticsSetup;