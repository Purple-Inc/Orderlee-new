import React, { useState } from 'react';
import { X, User, Bell, Shield, Globe, FileText, Upload, Building, Save, Check } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('company');
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for all settings
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    registrationNumber: '',
    address: '',
    phone: '',
    email: ''
  });

  const [profileInfo, setProfileInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [notifications, setNotifications] = useState({
    orders: true,
    lowStock: true,
    payments: true
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [general, setGeneral] = useState({
    language: 'English',
    timezone: 'UTC+1 (West Africa Time)',
    currency: 'NGN (₦) - Nigerian Naira'
  });

  const [receiptSettings, setReceiptSettings] = useState({
    template: 'modern',
    includeLogo: true,
    showDescriptions: true,
    includeVAT: true,
    thankYouMessage: false
  });

  const receiptTemplates = [
    { id: 'modern', name: 'Modern', preview: 'Clean and professional with company branding' },
    { id: 'classic', name: 'Classic', preview: 'Traditional receipt layout with detailed information' },
    { id: 'minimal', name: 'Minimal', preview: 'Simple and compact design for quick printing' },
    { id: 'detailed', name: 'Detailed', preview: 'Comprehensive layout with item descriptions and taxes' },
  ];

  const tabs = [
    { id: 'company', name: 'Company', icon: Building },
    { id: 'receipts', name: 'Receipts', icon: FileText },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'general', name: 'General', icon: Globe },
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAllSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call to save all settings
    const allSettings = {
      company: companyInfo,
      profile: profileInfo,
      notifications,
      security: {
        currentPassword: security.currentPassword,
        newPassword: security.newPassword
      },
      general,
      receipts: receiptSettings,
      logo: companyLogo
    };

    console.log('Saving all settings:', allSettings);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 bg-gray-50 p-4 lg:p-6 border-r">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Mobile Tab Selector */}
            <div className="lg:hidden mb-4">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block space-y-2">
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

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            {activeTab === 'company' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                <div className="space-y-6">
                  {/* Company Logo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        {companyLogo ? (
                          <img src={companyLogo} alt="Company Logo" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Upload className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Upload Logo
                        </label>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended: 200x200px, PNG or JPG
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your Business Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Registration Number
                      </label>
                      <input
                        type="text"
                        value={companyInfo.registrationNumber}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, registrationNumber: e.target.value }))}
                        placeholder="RC123456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address
                    </label>
                    <textarea
                      rows={3}
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your complete business address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+234 xxx xxx xxxx"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="business@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'receipts' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt Templates</h3>
                <p className="text-gray-600 mb-6">Choose how your receipts will look when automatically generated for orders</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {receiptTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        receiptSettings.template === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setReceiptSettings(prev => ({ ...prev, template: template.id }))}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <input
                          type="radio"
                          name="receiptTemplate"
                          value={template.id}
                          checked={receiptSettings.template === template.id}
                          onChange={() => setReceiptSettings(prev => ({ ...prev, template: template.id }))}
                          className="text-blue-600"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{template.preview}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Receipt Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={receiptSettings.includeLogo}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, includeLogo: e.target.checked }))}
                        className="mr-2" 
                      />
                      <span className="text-sm text-blue-800">Include company logo</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={receiptSettings.showDescriptions}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, showDescriptions: e.target.checked }))}
                        className="mr-2" 
                      />
                      <span className="text-sm text-blue-800">Show item descriptions</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={receiptSettings.includeVAT}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, includeVAT: e.target.checked }))}
                        className="mr-2" 
                      />
                      <span className="text-sm text-blue-800">Include VAT breakdown</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={receiptSettings.thankYouMessage}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, thankYouMessage: e.target.checked }))}
                        className="mr-2" 
                      />
                      <span className="text-sm text-blue-800">Add thank you message</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profileInfo.firstName}
                        onChange={(e) => setProfileInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="John"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profileInfo.lastName}
                        onChange={(e) => setProfileInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileInfo.email}
                      onChange={(e) => setProfileInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="admin@yourbusiness.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileInfo.phone}
                      onChange={(e) => setProfileInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+234 xxx xxx xxxx"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Order Notifications</h4>
                      <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.orders}
                        onChange={(e) => setNotifications(prev => ({ ...prev, orders: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Low Stock Alerts</h4>
                      <p className="text-sm text-gray-600">Alert when inventory is running low</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.lowStock}
                        onChange={(e) => setNotifications(prev => ({ ...prev, lowStock: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Payment Updates</h4>
                      <p className="text-sm text-gray-600">Notifications for payment status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.payments}
                        onChange={(e) => setNotifications(prev => ({ ...prev, payments: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={security.currentPassword}
                      onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={security.newPassword}
                      onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'general' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select 
                      value={general.language}
                      onChange={(e) => setGeneral(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>English</option>
                      <option>Hausa</option>
                      <option>Yoruba</option>
                      <option>Igbo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select 
                      value={general.timezone}
                      onChange={(e) => setGeneral(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>UTC+1 (West Africa Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC-5 (Eastern)</option>
                      <option>UTC-8 (Pacific)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select 
                      value={general.currency}
                      onChange={(e) => setGeneral(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>NGN (₦) - Nigerian Naira</option>
                      <option>USD ($) - US Dollar</option>
                      <option>EUR (€) - Euro</option>
                      <option>GBP (£) - British Pound</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleSaveAllSettings}
                  disabled={isSaving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save All Changes</span>
                    </>
                  )}
                </button>
                
                {saveSuccess && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">All settings saved successfully!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;