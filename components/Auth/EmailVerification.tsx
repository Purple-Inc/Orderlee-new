import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Package } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onResend: () => void;
  onBackToLanding: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email, onVerified, onResend, onBackToLanding }) => {
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResend = async () => {
    setIsResending(true);
    setCanResend(false);
    setCountdown(60);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      onResend();
    }, 1000);
  };

  const handleVerifyDemo = () => {
    // For demo purposes, simulate verification after 2 seconds
    setTimeout(() => {
      onVerified();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Package className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-600 text-sm sm:text-base">We've sent a verification link to your email address</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          {/* Email Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
            </div>
          </div>

          {/* Email Address */}
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2 text-sm sm:text-base">Verification email sent to:</p>
            <p className="font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg text-sm sm:text-base break-all">
              {email}
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Next steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li>Check your email inbox</li>
                  <li>Click the verification link</li>
                  <li>Return to this page to continue</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Demo Verification Button */}
          <button
            onClick={handleVerifyDemo}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium flex items-center justify-center space-x-2 mb-4 text-sm sm:text-base"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Simulate Email Verification (Demo)</span>
          </button>

          {/* Resend Email */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              Didn't receive the email? Check your spam folder or
            </p>
            <button
              onClick={handleResend}
              disabled={!canResend || isResending}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  <span>
                    {canResend ? 'Resend verification email' : `Resend in ${countdown}s`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Having trouble? Contact our support team at{' '}
              <a href="mailto:support@orderlee.com" className="text-blue-600 hover:text-blue-700">
                support@orderlee.com
              </a>
            </p>
          </div>
        </div>

        {/* Back to Landing */}
        <div className="text-center mt-6">
          <button
            onClick={onBackToLanding}
            className="text-gray-600 hover:text-gray-700 text-sm flex items-center justify-center space-x-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Orderlee. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;