import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LayoutDashboard, ShoppingCart, Package2, CreditCard, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from '../components/Icon';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';
import AuthNavigator from './AuthNavigator';
import DashboardScreen from '../screens/DashboardScreen';
import OrdersScreen from '../screens/OrdersScreen';
import InventoryScreen from '../screens/InventoryScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import LogisticsScreen from '../screens/LogisticsScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon icon={LayoutDashboard} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon icon={ShoppingCart} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={InventoryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon icon={Package2} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Payments" 
        component={PaymentsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon icon={CreditCard} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Logistics" 
        component={LogisticsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon icon={Truck} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;