import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Menu, 
  X,
  Truck,
  CreditCard,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  Quote,
  Minimize2,
  Maximize2,
  Calendar,
  DollarSign
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onSignIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeView, setActiveView] = useState<'dashboard' | 'orders' | 'revenue'>('dashboard');
  const [isMinimized, setIsMinimized] = useState(false);

  const features = [
    {
      icon: ShoppingCart,
      title: 'Order Management',
      description: 'Streamline your order process from creation to delivery with automated workflows and real-time tracking.',
      color: 'bg-blue-500'
    },
    {
      icon: Package,
      title: 'Inventory Control',
      description: 'Keep track of stock levels, set reorder alerts, and manage your products with intelligent inventory management.',
      color: 'bg-green-500'
    },
    {
      icon: Truck,
      title: 'Logistics Integration',
      description: 'Connect with multiple shipping providers, compare rates, and automate your delivery process.',
      color: 'bg-purple-500'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Accept payments seamlessly with multiple payment methods and automated receipt generation.',
      color: 'bg-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Business Analytics',
      description: 'Get insights into your business performance with detailed reports and AI-powered recommendations.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Build stronger relationships with comprehensive customer profiles and communication tools.',
      color: 'bg-teal-500'
    }
  ];

  const testimonials = [
    {
      name: 'Adebayo Ogundimu',
      role: 'CEO, TechHub Lagos',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'Orderlee transformed our business operations. We increased efficiency by 40% and reduced order processing time significantly.',
      rating: 5
    },
    {
      name: 'Fatima Abdullahi',
      role: 'Founder, Kano Fashion House',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'The inventory management feature is a game-changer. No more stockouts or overstocking. Our cash flow improved dramatically.',
      rating: 5
    },
    {
      name: 'Chinedu Okwu',
      role: 'Operations Manager, Port Harcourt Electronics',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'The logistics integration saved us hours of manual work. We can now focus on growing our business instead of managing shipments.',
      rating: 5
    }
  ];

  const stats = [
    { number: '1,000+', label: 'Business Owners' },
    { number: '5', label: 'Cities Covered' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const orders = [
    { id: '#ORD-001', customer: 'John Smith', amount: '₦89,999', status: 'Completed', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Sarah Johnson', amount: '₦149,500', status: 'Processing', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Mike Brown', amount: '₦234,000', status: 'Shipped', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Lisa Davis', amount: '₦67,500', status: 'Pending', date: '2024-01-14' },
  ];

  const revenueData = [
    { date: 'Jan 10', amount: 45000, orders: 12 },
    { date: 'Jan 11', amount: 67000, orders: 18 },
    { date: 'Jan 12', amount: 89000, orders: 24 },
    { date: 'Jan 13', amount: 123000, orders: 31 },
    { date: 'Jan 14', amount: 156000, orders: 42 },
    { date: 'Jan 15', amount: 234000, orders: 58 },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboardContent = () => {
    if (isMinimized) {
      return (
        <div className="flex items-center justify-between p-2">
          <span className="text-sm font-medium text-gray-700">Dashboard</span>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <Maximize2 className="h-3 w-3" />
          </button>
        </div>
      );
    }

    switch (activeView) {
      case 'orders':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 text-sm">Order Management</h4>
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Minimize2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-2 bg-white rounded border text-xs">
                  <div>
                    <div className="font-medium text-gray-900">{order.id}</div>
                    <div className="text-gray-600">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{order.amount}</div>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 text-sm">Revenue Analytics</h4>
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Minimize2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-100 p-2 rounded">
                  <div className="text-xs text-green-700">Total Revenue</div>
                  <div className="font-bold text-green-900">₦714,500</div>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <div className="text-xs text-blue-700">Total Orders</div>
                  <div className="font-bold text-blue-900">185</div>
                </div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="text-xs font-medium text-gray-700 mb-2">Last 6 Days</div>
                <div className="space-y-1">
                  {revenueData.slice(-3).map((data, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-gray-600">{data.date}</span>
                      <span className="font-medium">₦{data.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">Dashboard Overview</h3>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveView('orders')}
                className="bg-blue-100 p-3 rounded-lg transition-all hover:scale-105 hover:bg-blue-200 cursor-pointer"
                style={{
                  transform: `translateZ(${mousePosition.x * 2}px)`,
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <ShoppingCart className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium text-blue-900">Orders</span>
                </div>
                <p className="text-base font-bold text-blue-900">1,234</p>
              </button>
              <button
                onClick={() => setActiveView('revenue')}
                className="bg-green-100 p-3 rounded-lg transition-all hover:scale-105 hover:bg-green-200 cursor-pointer"
                style={{
                  transform: `translateZ(${mousePosition.y * 2}px)`,
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-900">Revenue</span>
                </div>
                <p className="text-base font-bold text-green-900">₦2.5M</p>
              </button>
            </div>
            <div 
              className="bg-white p-3 rounded-lg transition-all"
              style={{
                transform: `translateZ(${(mousePosition.x + mousePosition.y) * 1}px)`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Recent Activity</span>
                <span className="text-xs text-gray-500 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                  Live
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">#ORD-001</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">#ORD-002</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Processing</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Orderlee</h1>
              </div>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-6 lg:space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              >
                Contact
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={onSignIn}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              >
                Sign In
              </button>
              <button 
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
              >
                Try Orderlee
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-left text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')} 
                  className="text-left text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Testimonials
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-left text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </button>
                <button 
                  onClick={onSignIn}
                  className="text-left text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={onGetStarted}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-left"
                >
                  Try Orderlee
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Streamline Your
                <span className="text-blue-600 block">Business Operations</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto lg:mx-0">
                Orderlee is the all-in-one business management platform that helps African businesses manage orders, inventory, payments, and logistics seamlessly.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={onGetStarted}
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-700 transition-all font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Try Orderlee</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-base sm:text-lg"
                >
                  Learn More
                </button>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No Credit Card Required</span>
                </div>
              </div>
            </div>
            
            {/* Interactive Dashboard Preview */}
            <div 
              className="relative mt-8 lg:mt-0"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-100 transition-all duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) translateZ(20px)`,
                }}
              >
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 min-h-[300px]">
                  {renderDashboardContent()}
                </div>
              </div>
              {/* Floating elements with enhanced interactivity */}
              <div 
                className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                style={{
                  transform: `translateZ(${mousePosition.x * 3}px) rotate(${mousePosition.x * 2}deg)`,
                }}
              >
                <Zap className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div 
                className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                style={{
                  transform: `translateZ(${mousePosition.y * 3}px) rotate(${mousePosition.y * -2}deg)`,
                }}
              >
                <Shield className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="text-blue-600 block">Grow Your Business</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed specifically for African businesses to streamline operations and boost productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className={`${feature.color} p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by African
              <span className="text-blue-600 block">Business Owners</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              See how Orderlee is helping businesses across Africa streamline their operations and grow faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 relative hover:shadow-xl transition-all duration-300">
                <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-50" />
                <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">{testimonial.content}</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of African businesses already using Orderlee to streamline their operations and boost growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition-all font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Try Orderlee</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all font-semibold text-base sm:text-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Orderlee</h1>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-sm sm:text-base">
                Empowering African businesses with intelligent management tools to streamline operations and accelerate growth.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm sm:text-base">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm sm:text-base">+234 901 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm sm:text-base">hello@orderlee.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors text-sm sm:text-base">Features</button></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Mobile App</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Orderlee. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Globe className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400 text-sm">Made in Africa 🌍</span>
              
              {/* Bolt Logo */}
              <a 
                href="https://bolt.new/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <img 
                  src="/white_circle_360x360 copy copy.png" 
                  alt="Powered by Bolt" 
                  className="h-20 w-20 rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;