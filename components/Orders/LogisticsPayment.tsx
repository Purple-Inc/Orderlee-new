import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle, Lock, Shield, Clock } from 'lucide-react';
import { stripeService } from '../../services/stripe';
import apiClient from '../../services/api';

interface LogisticsPaymentProps {
  orderId: string;
  provider: any;
  logisticsData: any;
  onBack: () => void;
  onComplete: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  processingTime: string;
  fee: number;
}

const LogisticsPayment: React.FC<LogisticsPaymentProps> = ({ 
  orderId, 
  provider, 
  logisticsData, 
  onBack, 
  onComplete 
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    bankCode: '',
    accountNumber: '',
    phoneNumber: ''
  });
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay with your Visa, Mastercard, or Verve card',
      processingTime: 'Instant',
      fee: 1.5
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      icon: <Building className="h-5 w-5" />,
      description: 'Direct bank transfer with instant confirmation',
      processingTime: 'Instant',
      fee: 0
    },
    {
      id: 'ussd',
      name: 'USSD (*901#)',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Pay using your mobile banking USSD code',
      processingTime: '1-2 minutes',
      fee: 0
    }
  ];

  const banks = [
    { code: '044', name: 'Access Bank' },
    { code: '014', name: 'Afribank' },
    { code: '023', name: 'Citibank' },
    { code: '050', name: 'Ecobank' },
    { code: '011', name: 'First Bank' },
    { code: '058', name: 'GTBank' },
    { code: '030', name: 'Heritage Bank' },
    { code: '082', name: 'Keystone Bank' },
    { code: '076', name: 'Polaris Bank' },
    { code: '221', name: 'Stanbic IBTC' },
    { code: '068', name: 'Standard Chartered' },
    { code: '232', name: 'Sterling Bank' },
    { code: '032', name: 'Union Bank' },
    { code: '033', name: 'UBA' },
    { code: '215', name: 'Unity Bank' },
    { code: '035', name: 'Wema Bank' },
    { code: '057', name: 'Zenith Bank' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const calculateTotal = () => {
    const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);
    const fee = selectedMethod ? (provider.price * selectedMethod.fee / 100) : 0;
    return provider.price + fee;
  };

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      handleInputChange('cardNumber', formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      handleInputChange('expiryDate', formatted);
    }
  };

  const handleStripePayment = async () => {
    try {
      setPaymentError(null);
      
      // Create payment intent
      const clientSecret = await stripeService.createPaymentIntent({
        amount: calculateTotal(),
        currency: 'ngn',
        description: `Logistics payment for order ${orderId}`,
        orderId: parseInt(orderId),
        customerEmail: logisticsData?.receiver?.email,
      });

      // For demo purposes, we'll simulate a successful payment
      // In a real implementation, you would use Stripe Elements
      const mockPaymentMethod = {
        card: {
          number: paymentData.cardNumber.replace(/\s/g, ''),
          exp_month: parseInt(paymentData.expiryDate.split('/')[0]),
          exp_year: parseInt('20' + paymentData.expiryDate.split('/')[1]),
          cvc: paymentData.cvv,
        },
        billing_details: {
          name: paymentData.cardName,
        },
      };

      // Simulate payment confirmation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { success: true };
    } catch (error) {
      console.error('Stripe payment error:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      if (selectedPaymentMethod === 'card') {
        await handleStripePayment();
      } else {
        // Handle other payment methods
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Create payment record in backend
      await apiClient.processPayment({
        orderId: parseInt(orderId),
        amount: calculateTotal(),
        paymentMethod: selectedPaymentMethod.toUpperCase(),
        transactionReference: `TXN-${Date.now()}`,
        notes: `Logistics payment via ${selectedPaymentMethod}`,
      });

      onComplete();
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={paymentData.expiryDate}
                  onChange={handleExpiryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={paymentData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
          </div>
        );
        
      case 'transfer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bank
              </label>
              <select
                value={paymentData.bankCode}
                onChange={(e) => handleInputChange('bankCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose your bank</option>
                {banks.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={paymentData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234567890"
                maxLength={10}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                You will be redirected to your bank's secure payment page to complete the transaction.
              </p>
            </div>
          </div>
        );
        
      case 'ussd':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={paymentData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+234 xxx xxx xxxx"
              />
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">USSD Payment Steps:</h4>
              <ol className="text-sm text-green-800 space-y-1">
                <li>1. Dial *901# on your registered phone</li>
                <li>2. Select "Pay Bills"</li>
                <li>3. Enter merchant code: 12345</li>
                <li>4. Enter amount: ₦{provider.price.toLocaleString()}</li>
                <li>5. Enter your PIN to complete</li>
              </ol>
            </div>
          </div>
        );
        
      default:
        return null;
    }
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
              <span>Back to Providers</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Payment for Logistics</h2>
            <p className="text-gray-600">Complete payment for your shipping with {provider.name}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              {/* Payment Methods */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            selectedPaymentMethod === method.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {method.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {method.fee > 0 ? `${method.fee}% fee` : 'No fee'}
                          </div>
                          <div className="text-xs text-gray-500">{method.processingTime}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Lock className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                  <span className="text-sm text-green-600">Secure</span>
                </div>
                
                {renderPaymentForm()}

                {paymentError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{paymentError}</p>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t">
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
                        <span>Pay {formatCurrency(calculateTotal())}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                {/* Order Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">{provider.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{provider.deliveryTime}</span>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="border-t pt-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Shipping Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">From:</span>
                      <p className="font-medium">{logisticsData?.sender?.city}, {logisticsData?.sender?.state}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">To:</span>
                      <p className="font-medium">{logisticsData?.receiver?.city}, {logisticsData?.receiver?.state}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium ml-1">{logisticsData?.packageDetails?.weight}kg</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping Cost:</span>
                      <span>{formatCurrency(provider.price)}</span>
                    </div>
                    {selectedPaymentMethod && paymentMethods.find(m => m.id === selectedPaymentMethod)?.fee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Fee:</span>
                        <span>{formatCurrency(provider.price * paymentMethods.find(m => m.id === selectedPaymentMethod)!.fee / 100)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
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
        </div>
      </div>
    </div>
  );
};

export default LogisticsPayment;