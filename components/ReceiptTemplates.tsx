import React, { useState } from 'react';
import { ArrowLeft, FileText, Eye, Edit, Download, Plus, Upload, Save, Building, Mail, Phone } from 'lucide-react';
import { RouteId } from '../types/routes';

interface ReceiptTemplatesProps {
  onNavigate: (routeId: RouteId) => void;
}

interface ReceiptTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  isActive: boolean;
  customizable: boolean;
}

const ReceiptTemplates: React.FC<ReceiptTemplatesProps> = ({ onNavigate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    logo: null as string | null,
    taxId: '',
    website: ''
  });

  const [receiptSettings, setReceiptSettings] = useState({
    includeLogo: true,
    showItemDescriptions: true,
    includeVATBreakdown: true,
    addThankYouMessage: true,
    showPaymentMethod: true,
    includeTerms: false,
    customFooter: ''
  });

  const templates: ReceiptTemplate[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional with company branding',
      preview: 'A sleek design with your logo at the top, organized sections, and modern typography',
      isActive: true,
      customizable: true
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional receipt layout with detailed information',
      preview: 'Traditional format with clear sections and comprehensive order details',
      isActive: false,
      customizable: true
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and compact design for quick printing',
      preview: 'Streamlined layout focusing on essential information only',
      isActive: false,
      customizable: false
    },
    {
      id: 'detailed',
      name: 'Detailed',
      description: 'Comprehensive layout with item descriptions and taxes',
      preview: 'Extensive format with full product details, taxes, and payment information',
      isActive: false,
      customizable: true
    }
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyInfo(prev => ({ ...prev, logo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving receipt settings:', { selectedTemplate, companyInfo, receiptSettings });
    alert('Receipt template settings saved successfully!');
  };

  const generateSampleReceipt = () => {
    const sampleData = {
      orderId: '#ORD-001',
      date: new Date().toLocaleDateString(),
      customer: 'John Doe',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 89999 },
        { name: 'Phone Case', quantity: 2, price: 19999 }
      ],
      subtotal: 129997,
      vat: 9749.78,
      total: 139746.78
    };

    console.log('Generating receipt with template:', selectedTemplate, sampleData);
    alert('Sample receipt generated! Check console for details.');
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
            <h2 className="text-3xl font-bold text-gray-900">Receipt Templates</h2>
            <p className="text-gray-600">Customize how your receipts look when automatically generated for orders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Template Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <div className="flex items-center space-x-2">
                          {template.isActive && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                          )}
                          <input
                            type="radio"
                            name="receiptTemplate"
                            value={template.id}
                            checked={selectedTemplate === template.id}
                            onChange={() => setSelectedTemplate(template.id)}
                            className="text-blue-600"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <p className="text-xs text-gray-500">{template.preview}</p>
                      {template.customizable && (
                        <span className="inline-block mt-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          Customizable
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Logo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        {companyInfo.logo ? (
                          <img src={companyInfo.logo} alt="Company Logo" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Upload className="h-6 w-6 text-gray-400" />
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
                      Tax ID / Registration Number
                    </label>
                    <input
                      type="text"
                      value={companyInfo.taxId}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, taxId: e.target.value }))}
                      placeholder="RC123456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
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

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://www.yourbusiness.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Receipt Settings */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={receiptSettings.includeLogo}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, includeLogo: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Include company logo</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={receiptSettings.showItemDescriptions}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, showItemDescriptions: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Show item descriptions</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={receiptSettings.includeVATBreakdown}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, includeVATBreakdown: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Include VAT breakdown</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={receiptSettings.addThankYouMessage}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, addThankYouMessage: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Add thank you message</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={receiptSettings.showPaymentMethod}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, showPaymentMethod: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Show payment method</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={receiptSettings.includeTerms}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, includeTerms: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Include terms & conditions</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Footer Message
                    </label>
                    <textarea
                      rows={3}
                      value={receiptSettings.customFooter}
                      onChange={(e) => setReceiptSettings(prev => ({ ...prev, customFooter: e.target.value }))}
                      placeholder="Add a custom message at the bottom of receipts..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview & Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview & Actions</h3>
                
                {/* Template Preview */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
                  <div className="text-center mb-4">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">
                      {templates.find(t => t.id === selectedTemplate)?.name} Template
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Preview will show here
                    </p>
                  </div>
                  
                  {/* Sample Receipt Content */}
                  <div className="bg-white p-3 rounded border text-xs">
                    {companyInfo.logo && (
                      <div className="text-center mb-2">
                        <img src={companyInfo.logo} alt="Logo" className="h-8 mx-auto" />
                      </div>
                    )}
                    <div className="text-center mb-2">
                      <div className="font-bold">{companyInfo.name || 'Your Business Name'}</div>
                      <div className="text-gray-600">{companyInfo.address || 'Business Address'}</div>
                      <div className="text-gray-600">{companyInfo.phone || 'Phone Number'}</div>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-2">
                      <div>Receipt #: ORD-001</div>
                      <div>Date: {new Date().toLocaleDateString()}</div>
                      <div>Customer: John Doe</div>
                    </div>
                    <hr className="my-2" />
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Wireless Headphones x1</span>
                        <span>₦89,999</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone Case x2</span>
                        <span>₦39,998</span>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₦129,997</span>
                      </div>
                      {receiptSettings.includeVATBreakdown && (
                        <div className="flex justify-between">
                          <span>VAT (7.5%):</span>
                          <span>₦9,750</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₦139,747</span>
                      </div>
                    </div>
                    {receiptSettings.addThankYouMessage && (
                      <div className="text-center mt-2 text-gray-600">
                        Thank you for your business!
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={generateSampleReceipt}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview Sample</span>
                  </button>
                  
                  <button
                    onClick={handleSaveSettings}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Settings</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download Template</span>
                  </button>
                </div>

                {/* Help Text */}
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Auto-Receipt Generation</h4>
                  <p className="text-xs text-blue-700">
                    Receipts will be automatically generated when orders are marked as "Paid" and can be downloaded or emailed to customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptTemplates;