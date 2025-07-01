import React, { useState } from 'react';
import { ArrowLeft, Building, User, Mail, Phone, MapPin, Globe, Upload, Save, Edit, Camera, Shield, Bell, CreditCard } from 'lucide-react';
import { RouteId } from '../../types/routes';

interface BusinessProfileProps {
  onNavigate: (routeId: RouteId) => void;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('business');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);

  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Orderly Business Solutions',
    registrationNumber: 'RC123456789',
    taxId: 'TIN987654321',
    industry: 'E-commerce',
    businessType: 'Limited Liability Company',
    foundedYear: '2020',
    website: 'https://www.orderly.com',
    description: 'A comprehensive business management platform helping small and medium enterprises streamline their operations.',
    address: '123 Business District, Victoria Island',
    city: 'Lagos',
    state: 'Lagos',
    postalCode: '101001',
    country: 'Nigeria',
    phone: '+234 901 234 5678',
    email: 'info@orderly.com',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/orderly',
      twitter: 'https://twitter.com/orderly',
      facebook: 'https://facebook.com/orderly',
      instagram: 'https://instagram.com/orderly'
    }
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    title: 'Chief Executive Officer',
    email: 'john.doe@orderly.com',
    phone: '+234 901 234 5678',
    dateOfBirth: '1985-06-15',
    nationality: 'Nigerian',
    address: '456 Residential Area, Ikoyi',
    city: 'Lagos',
    state: 'Lagos',
    postalCode: '101001',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+234 901 234 5679'
    }
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    dateFormat: 'DD/MM/YYYY',
    notifications: {
      email: true,
      sms: true,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'private',
      showEmail: false,
      showPhone: false
    }
  });

  const tabs = [
    { id: 'business', name: 'Business Info', icon: Building },
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Bell },
    { id: 'billing', name: 'Billing', icon: CreditCard }
  ];

  const industries = [
    'E-commerce', 'Retail', 'Manufacturing', 'Technology', 'Healthcare',
    'Education', 'Finance', 'Real Estate', 'Food & Beverage', 'Fashion',
    'Automotive', 'Construction', 'Consulting', 'Other'
  ];

  const businessTypes = [
    'Sole Proprietorship', 'Partnership', 'Limited Liability Company',
    'Corporation', 'Non-Profit Organization', 'Other'
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'business') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'profile') {
          setProfileImage(e.target?.result as string);
        } else {
          setBusinessLogo(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving profile data:', { businessInfo, personalInfo, preferences });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      {/* Business Logo */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Logo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {businessLogo ? (
                <img src={businessLogo} alt="Business Logo" className="w-full h-full object-cover" />
              ) : (
                <Building className="h-8 w-8 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'business')}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Upload Business Logo</h4>
            <p className="text-sm text-gray-600">Recommended: 200x200px, PNG or JPG</p>
            <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
          </div>
        </div>
      </div>

      {/* Basic Business Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              value={businessInfo.businessName}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number
            </label>
            <input
              type="text"
              value={businessInfo.registrationNumber}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, registrationNumber: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax ID
            </label>
            <input
              type="text"
              value={businessInfo.taxId}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, taxId: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry *
            </label>
            <select
              value={businessInfo.industry}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, industry: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type
            </label>
            <select
              value={businessInfo.businessType}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessType: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Founded Year
            </label>
            <input
              type="number"
              value={businessInfo.foundedYear}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, foundedYear: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description
          </label>
          <textarea
            rows={4}
            value={businessInfo.description}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, description: e.target.value }))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            placeholder="Describe your business..."
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Email *
            </label>
            <input
              type="email"
              value={businessInfo.email}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Phone *
            </label>
            <input
              type="tel"
              value={businessInfo.phone}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              value={businessInfo.website}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Business Address */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={businessInfo.city}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, city: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <select
              value={businessInfo.state}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, state: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              {nigerianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              value={businessInfo.postalCode}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, postalCode: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={businessInfo.country}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="h-8 w-8 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'profile')}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Upload Profile Picture</h4>
            <p className="text-sm text-gray-600">Recommended: 200x200px, PNG or JPG</p>
            <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={personalInfo.title}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, title: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Email *
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Phone
            </label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality
            </label>
            <input
              type="text"
              value={personalInfo.nationality}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, nationality: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Name
            </label>
            <input
              type="text"
              value={personalInfo.emergencyContact.name}
              onChange={(e) => setPersonalInfo(prev => ({ 
                ...prev, 
                emergencyContact: { ...prev.emergencyContact, name: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship
            </label>
            <input
              type="text"
              value={personalInfo.emergencyContact.relationship}
              onChange={(e) => setPersonalInfo(prev => ({ 
                ...prev, 
                emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={personalInfo.emergencyContact.phone}
              onChange={(e) => setPersonalInfo(prev => ({ 
                ...prev, 
                emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'business':
        return renderBusinessInfo();
      case 'personal':
        return renderPersonalInfo();
      case 'security':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
            <p className="text-gray-600">Security settings will be implemented here.</p>
          </div>
        );
      case 'preferences':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
            <p className="text-gray-600">User preferences will be implemented here.</p>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
            <p className="text-gray-600">Billing settings will be implemented here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Business Profile</h2>
                <p className="text-gray-600">Manage your business and personal information</p>
              </div>
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;