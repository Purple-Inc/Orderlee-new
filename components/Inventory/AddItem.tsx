import React, { useState } from 'react';
import { ArrowLeft, Package, Save, Upload, AlertTriangle } from 'lucide-react';

interface AddItemProps {
  onBack: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ onBack }) => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    category: '',
    sku: '',
    costPrice: '',
    sellingPrice: '',
    initialStock: '',
    reorderLevel: '',
    supplier: '',
    location: '',
    notes: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Electronics',
    'Accessories',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
    'Health & Beauty',
    'Automotive',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!itemData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!itemData.category) {
      newErrors.category = 'Category is required';
    }

    if (!itemData.costPrice || Number(itemData.costPrice) <= 0) {
      newErrors.costPrice = 'Valid cost price is required';
    }

    if (!itemData.sellingPrice || Number(itemData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Valid selling price is required';
    }

    if (Number(itemData.sellingPrice) <= Number(itemData.costPrice)) {
      newErrors.sellingPrice = 'Selling price must be higher than cost price';
    }

    if (!itemData.initialStock || Number(itemData.initialStock) < 0) {
      newErrors.initialStock = 'Valid initial stock is required';
    }

    if (!itemData.reorderLevel || Number(itemData.reorderLevel) < 0) {
      newErrors.reorderLevel = 'Valid reorder level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setItemData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSKU = () => {
    const prefix = itemData.category.substring(0, 3).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const sku = `${prefix}-${random}`;
    setItemData(prev => ({ ...prev, sku }));
  };

  const formatCurrency = (amount: string) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(Number(amount));
  };

  const calculateProfitMargin = () => {
    const cost = Number(itemData.costPrice);
    const selling = Number(itemData.sellingPrice);
    if (cost && selling) {
      return (((selling - cost) / selling) * 100).toFixed(1);
    }
    return '0';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Handle item creation
    console.log('Item Data:', itemData);
    // Redirect back to inventory
    onBack();
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
              <span>Back to Inventory</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Add New Item</h2>
            <p className="text-gray-600">Add a new product to your inventory</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Package className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Image */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Upload product image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={itemData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={itemData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={itemData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.category ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={itemData.sku}
                          onChange={(e) => handleInputChange('sku', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Product SKU"
                        />
                        <button
                          type="button"
                          onClick={generateSKU}
                          className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Pricing & Stock</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Price (₦) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={itemData.costPrice}
                    onChange={(e) => handleInputChange('costPrice', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.costPrice ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.costPrice && (
                    <p className="mt-1 text-sm text-red-600">{errors.costPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price (₦) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={itemData.sellingPrice}
                    onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.sellingPrice ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.sellingPrice && (
                    <p className="mt-1 text-sm text-red-600">{errors.sellingPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={itemData.initialStock}
                    onChange={(e) => handleInputChange('initialStock', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.initialStock ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.initialStock && (
                    <p className="mt-1 text-sm text-red-600">{errors.initialStock}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reorder Level *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={itemData.reorderLevel}
                    onChange={(e) => handleInputChange('reorderLevel', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.reorderLevel ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.reorderLevel && (
                    <p className="mt-1 text-sm text-red-600">{errors.reorderLevel}</p>
                  )}
                </div>
              </div>

              {/* Profit Margin Display */}
              {itemData.costPrice && itemData.sellingPrice && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Profit Margin: {calculateProfitMargin()}%
                      </p>
                      <p className="text-sm text-green-600">
                        Profit per unit: {formatCurrency((Number(itemData.sellingPrice) - Number(itemData.costPrice)).toString())}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier
                  </label>
                  <input
                    type="text"
                    value={itemData.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Supplier name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storage Location
                  </label>
                  <input
                    type="text"
                    value={itemData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Warehouse section/shelf"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={itemData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional notes about this product..."
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
                <Save className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;