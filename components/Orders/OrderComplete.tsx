import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Truck, Receipt, Home, Download, Share2, FileText, Printer } from 'lucide-react';
import { RouteId } from '../../types/routes';

interface OrderCompleteProps {
  orderId: string;
  provider: any;
  logisticsData: any;
  onGoHome: () => void;
  onNavigate: (routeId: RouteId) => void;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({ 
  orderId, 
  provider, 
  logisticsData, 
  onGoHome,
  onNavigate 
}) => {
  const [countdown, setCountdown] = useState(5);
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [printReceipt, setPrintReceipt] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onGoHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onGoHome]);

  useEffect(() => {
    // Auto-generate receipt if payment is complete
    const generateReceipt = () => {
      console.log('Auto-generating receipt for completed order:', orderId);
      setReceiptGenerated(true);
      
      // Auto-print if enabled
      if (printReceipt) {
        setTimeout(() => {
          console.log('Auto-printing receipt for order:', orderId);
          window.print();
        }, 1000);
      }
    };

    // Simulate receipt generation after 2 seconds
    const receiptTimer = setTimeout(generateReceipt, 2000);
    return () => clearTimeout(receiptTimer);
  }, [orderId, printReceipt]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const generateTrackingNumber = () => {
    return `${provider.name.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-8)}`;
  };

  const trackingNumber = generateTrackingNumber();

  const handleDownloadReceipt = () => {
    console.log('Downloading receipt for order:', orderId);
    alert('Receipt download started!');
  };

  const handleEmailReceipt = () => {
    console.log('Emailing receipt for order:', orderId);
    alert('Receipt sent to customer email!');
  };

  const handlePrintReceipt = () => {
    console.log('Printing receipt for order:', orderId);
    window.print();
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Complete!</h2>
            <p className="text-gray-600">
              Your order has been successfully created and logistics has been arranged
            </p>
          </div>

          {/* Print Receipt Toggle */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Printer className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">Auto-Print Receipt</h4>
                  <p className="text-sm text-blue-700">
                    Automatically print receipt when order is completed
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={printReceipt}
                  onChange={(e) => setPrintReceipt(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Receipt Generation Status */}
          {receiptGenerated && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Receipt Generated</h4>
                  <p className="text-sm text-green-700">
                    Your receipt has been automatically generated and is ready for download
                    {printReceipt && ' (Auto-printing initiated)'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Confirmed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2 text-blue-600" />
                  Order Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-medium text-green-600">Paid</span>
                  </div>
                </div>
              </div>

              {/* Logistics Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-green-600" />
                  Logistics Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">{provider.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking:</span>
                    <span className="font-medium text-blue-600">{trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium">{provider.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">{formatCurrency(provider.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Pickup Address</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{logisticsData?.sender?.name}</p>
                  {logisticsData?.sender?.company && (
                    <p>{logisticsData.sender.company}</p>
                  )}
                  <p>{logisticsData?.sender?.address}</p>
                  <p>{logisticsData?.sender?.city}, {logisticsData?.sender?.state}</p>
                  <p>{logisticsData?.sender?.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{logisticsData?.receiver?.name}</p>
                  {logisticsData?.receiver?.company && (
                    <p>{logisticsData.receiver.company}</p>
                  )}
                  <p>{logisticsData?.receiver?.address}</p>
                  <p>{logisticsData?.receiver?.city}, {logisticsData?.receiver?.state}</p>
                  <p>{logisticsData?.receiver?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
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
                    {provider.name} will pickup your package within {provider.pickupTime.toLowerCase()}
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
                    Package will be delivered within {provider.deliveryTime.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button 
              onClick={handleDownloadReceipt}
              disabled={!receiptGenerated}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Receipt className="h-4 w-4" />
              <span>Download Receipt</span>
            </button>
            
            <button 
              onClick={handlePrintReceipt}
              disabled={!receiptGenerated}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer className="h-4 w-4" />
              <span>Print Receipt</span>
            </button>
            
            <button 
              onClick={handleEmailReceipt}
              disabled={!receiptGenerated}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 className="h-4 w-4" />
              <span>Email Receipt</span>
            </button>
            
            <button 
              onClick={onGoHome}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Go to Dashboard</span>
            </button>
          </div>

          {/* Auto Redirect Notice */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Automatically redirecting to dashboard in {countdown} seconds...
            </p>
            <button
              onClick={onGoHome}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              Go now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;