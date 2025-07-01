import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import Payments from './components/Payments';
import Logistics from './components/Logistics';
import Settings from './components/Settings';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import EmailVerification from './components/Auth/EmailVerification';
import LoadingPage from './components/LoadingPage';
import GoodbyePage from './components/GoodbyePage';
import NewOrder from './components/Orders/NewOrder';
import LogisticsSetup from './components/Orders/LogisticsSetup';
import LogisticsProviders from './components/Orders/LogisticsProviders';
import LogisticsPayment from './components/Orders/LogisticsPayment';
import OrderComplete from './components/Orders/OrderComplete';
import AddItem from './components/Inventory/AddItem';
import ReceiptTemplates from './components/ReceiptTemplates';
import AIAssistant from './components/AI/AIAssistant';
import CreateShipment from './components/Logistics/CreateShipment';
import BusinessProfile from './components/Profile/BusinessProfile';
import Notifications from './components/Notifications';
import LandingPage from './components/LandingPage';
import { RouteId } from './types/routes';

type AppState = 'landing' | 'login' | 'signup' | 'verify-email' | 'loading' | 'authenticated' | 'goodbye';

interface LogisticsData {
  sender: any;
  receiver: any;
  packageDetails: any;
}

function App() {
  const [currentView, setCurrentView] = useState<RouteId>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [appState, setAppState] = useState<AppState>('landing');
  const [userEmail, setUserEmail] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // Logistics flow state
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [logisticsData, setLogisticsData] = useState<LogisticsData | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const handleLogin = () => {
    setAppState('loading');
    // Simulate loading time
    setTimeout(() => {
      setAppState('authenticated');
      setCurrentView('dashboard');
    }, 3000);
  };

  const handleSignup = (email: string) => {
    setUserEmail(email);
    setAppState('verify-email');
  };

  const handleEmailVerified = () => {
    setAppState('loading');
    // Simulate loading time
    setTimeout(() => {
      setAppState('authenticated');
      setCurrentView('dashboard');
    }, 3000);
  };

  const handleLogout = () => {
    setAppState('goodbye');
    setCurrentView('dashboard');
    setUserEmail('');
    setCurrentOrderId(null);
    setLogisticsData(null);
    setSelectedProvider(null);
    setIsSettingsOpen(false);
    setShowAIAssistant(false);
  };

  const handleGoodbyeComplete = () => {
    setAppState('landing');
  };

  const handleSwitchToSignup = () => {
    setAppState('signup');
  };

  const handleSwitchToLogin = () => {
    setAppState('login');
  };

  const handleGetStarted = () => {
    setAppState('signup');
  };

  const handleSignIn = () => {
    setAppState('login');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    setUserEmail('');
  };

  const handleNavigate = (routeId: RouteId) => {
    setCurrentView(routeId);
  };

  const handleOrderCreated = (orderId: string) => {
    setCurrentOrderId(orderId);
    setCurrentView('logistics-setup');
  };

  const handleLogisticsSetup = (data: LogisticsData) => {
    setLogisticsData(data);
    setCurrentView('logistics-providers');
  };

  const handleProviderSelected = (provider: any) => {
    setSelectedProvider(provider);
    setCurrentView('logistics-payment');
  };

  const handlePaymentComplete = () => {
    setCurrentView('order-complete');
  };

  const handleOrderComplete = () => {
    // Reset logistics flow
    setCurrentOrderId(null);
    setLogisticsData(null);
    setSelectedProvider(null);
    setCurrentView('dashboard');
  };

  const handleShipmentComplete = () => {
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'orders':
        return <Orders onNavigate={handleNavigate} />;
      case 'new-order':
        return (
          <NewOrder 
            onBack={() => setCurrentView('orders')} 
            onOrderCreated={handleOrderCreated}
            onNavigate={handleNavigate}
          />
        );
      case 'logistics-setup':
        return (
          <LogisticsSetup
            orderId={currentOrderId || ''}
            onBack={() => setCurrentView('new-order')}
            onNext={handleLogisticsSetup}
            onNavigate={handleNavigate}
          />
        );
      case 'logistics-providers':
        return (
          <LogisticsProviders
            orderId={currentOrderId || ''}
            logisticsData={logisticsData}
            onBack={() => setCurrentView('logistics-setup')}
            onComplete={handleProviderSelected}
            onNavigate={handleNavigate}
          />
        );
      case 'logistics-payment':
        return (
          <LogisticsPayment
            orderId={currentOrderId || ''}
            provider={selectedProvider}
            logisticsData={logisticsData}
            onBack={() => setCurrentView('logistics-providers')}
            onComplete={handlePaymentComplete}
            onNavigate={handleNavigate}
          />
        );
      case 'order-complete':
        return (
          <OrderComplete
            orderId={currentOrderId || ''}
            provider={selectedProvider}
            logisticsData={logisticsData}
            onGoHome={handleOrderComplete}
            onNavigate={handleNavigate}
          />
        );
      case 'inventory':
        return <Inventory onNavigate={handleNavigate} />;
      case 'add-item':
        return (
          <AddItem 
            onBack={() => setCurrentView('inventory')}
            onNavigate={handleNavigate}
          />
        );
      case 'payments':
        return <Payments onNavigate={handleNavigate} />;
      case 'logistics':
        return <Logistics onNavigate={handleNavigate} />;
      case 'create-shipment':
        return (
          <CreateShipment
            onBack={() => setCurrentView('logistics')}
            onComplete={handleShipmentComplete}
            onNavigate={handleNavigate}
          />
        );
      case 'notifications':
        return <Notifications onNavigate={handleNavigate} />;
      case 'receipt-templates':
        return <ReceiptTemplates onNavigate={handleNavigate} />;
      case 'business-profile':
        return <BusinessProfile onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  // Show goodbye page
  if (appState === 'goodbye') {
    return <GoodbyePage onComplete={handleGoodbyeComplete} />;
  }

  // Show landing page
  if (appState === 'landing') {
    return (
      <LandingPage 
        onGetStarted={handleGetStarted}
        onSignIn={handleSignIn}
      />
    );
  }

  // Show loading page
  if (appState === 'loading') {
    return <LoadingPage />;
  }

  // Show authentication pages if not authenticated
  if (appState === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={handleSwitchToSignup}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={handleSwitchToLogin}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  if (appState === 'verify-email') {
    return (
      <EmailVerification
        email={userEmail}
        onVerified={handleEmailVerified}
        onResend={() => {}}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  // Show main application if authenticated
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentView={currentView}
        onViewChange={handleNavigate}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onLogout={handleLogout}
        onAIAssistant={() => setShowAIAssistant(true)}
      />
      <div className="flex-1 overflow-hidden">
        <div className="lg:hidden h-16"></div> {/* Spacer for mobile menu button */}
        {renderCurrentView()}
      </div>
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <AIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />
    </div>
  );
}

export default App;