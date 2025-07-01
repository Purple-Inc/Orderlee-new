import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, Send, TrendingUp, AlertTriangle, DollarSign, Package, Users, Lightbulb, User } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI business assistant. I can help you with tracking orders, analyzing payments, managing inventory, and providing insights for business growth. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Show me sales analytics",
        "What's my inventory status?",
        "Payment trends this month",
        "Customer insights"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes('sales') || lowerMessage.includes('analytics')) {
      response = "📊 **Sales Analytics Insights:**\n\n• Your sales have increased by 12% this month\n• Top performing product: Wireless Headphones (₦89,999)\n• Peak sales time: 2-4 PM weekdays\n• Recommended: Focus marketing on electronics category\n\n**Revenue Breakdown:**\n• Total Revenue: ₦45,678,000\n• Average Order Value: ₦37,500\n• Customer Retention: 68%";
      suggestions = ["Show inventory recommendations", "Customer segmentation analysis", "Forecast next month"];
    } else if (lowerMessage.includes('inventory')) {
      response = "📦 **Inventory Status Report:**\n\n**Critical Alerts:**\n• 3 items below reorder level\n• Wireless Headphones: Only 5 left (Reorder: 20)\n• Smart Watch: 8 remaining (Reorder: 15)\n\n**Recommendations:**\n• Reorder electronics immediately\n• Consider bulk discount for phone cases\n• Seasonal demand for accessories increasing\n\n**Total Inventory Value:** ₦2,456,000";
      suggestions = ["Create purchase orders", "Set up auto-reorder", "Analyze slow-moving items"];
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('financial')) {
      response = "💰 **Payment & Financial Insights:**\n\n**This Month:**\n• Total Payments: ₦1,234,000\n• Success Rate: 94.2%\n• Failed Payments: 5 (₦89,500)\n• Average Processing Time: 2.3 seconds\n\n**Payment Methods:**\n• Bank Transfer: 45%\n• Card Payments: 35%\n• Mobile Money: 20%\n\n**Recommendation:** Follow up on failed payments to recover ₦89,500";
      suggestions = ["Payment recovery strategies", "Cash flow forecast", "Fee optimization"];
    } else if (lowerMessage.includes('customer')) {
      response = "👥 **Customer Insights:**\n\n**Customer Segments:**\n• VIP Customers: 23 (₦500K+ annually)\n• Regular Customers: 156 (₦100K-500K)\n• New Customers: 89 (This month)\n\n**Behavior Patterns:**\n• 68% repeat purchase rate\n• Average time between orders: 21 days\n• Most active: Lagos, Abuja, Port Harcourt\n\n**Growth Opportunity:** 34% of customers haven't ordered in 60+ days";
      suggestions = ["Customer retention campaign", "Loyalty program setup", "Geographic expansion"];
    } else if (lowerMessage.includes('growth') || lowerMessage.includes('business')) {
      response = "🚀 **Business Growth Recommendations:**\n\n**Immediate Actions:**\n1. Launch email campaign for inactive customers\n2. Optimize inventory for top-selling items\n3. Implement loyalty rewards program\n\n**Strategic Initiatives:**\n• Expand to 2 new cities (Kano, Ibadan)\n• Add 5 new product categories\n• Partner with local logistics companies\n\n**Projected Impact:** 25-30% revenue increase in 6 months";
      suggestions = ["Create action plan", "Budget allocation", "Timeline setup"];
    } else {
      response = "I understand you're asking about your business operations. I can help you with:\n\n• **Sales Analytics** - Revenue trends, top products, customer behavior\n• **Inventory Management** - Stock levels, reorder alerts, demand forecasting\n• **Payment Tracking** - Transaction success rates, payment methods analysis\n• **Customer Insights** - Segmentation, retention, growth opportunities\n• **Business Growth** - Strategic recommendations and action plans\n\nWhat specific area would you like to explore?";
      suggestions = ["Sales performance", "Inventory alerts", "Customer analysis", "Growth strategies"];
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const quickActions = [
    { icon: TrendingUp, label: "Sales Report", message: "Show me this month's sales analytics" },
    { icon: AlertTriangle, label: "Inventory Alerts", message: "What inventory items need attention?" },
    { icon: DollarSign, label: "Payment Insights", message: "Analyze my payment trends" },
    { icon: Users, label: "Customer Analysis", message: "Give me customer insights and recommendations" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Business Assistant</h3>
                <p className="text-purple-100">Your intelligent business advisor</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b bg-gray-50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(action.message)}
                className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                <action.icon className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-600">Suggested actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'order-1 ml-3' : 'order-2 mr-3'}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Ask me about your business metrics, inventory, customers, or growth strategies..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;