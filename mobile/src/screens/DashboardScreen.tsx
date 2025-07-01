import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp,
  Bell,
  User,
  Plus
} from 'lucide-react';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '../components/Icon';
import Button from '../components/Button';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const stats = [
    { label: 'Total Orders', value: '0', icon: ShoppingCart, color: '#3B82F6' },
    { label: 'Revenue', value: '₦0.00', icon: DollarSign, color: '#10B981' },
    { label: 'Inventory', value: '0', icon: Package, color: '#8B5CF6' },
    { label: 'Pending', value: '0', icon: AlertTriangle, color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back, Admin!</Text>
            <Text style={styles.subGreeting}>
              Here's what's happening with your business today
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Notifications' as never)}
            >
              <Icon icon={Bell} color="#6B7280" size={24} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('BusinessProfile' as never)}
            >
              <Icon icon={User} color="#6B7280" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statChange}>+0% from last month</Text>
              </View>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Icon icon={stat.icon} color="#FFFFFF" size={20} />
              </View>
            </View>
          ))}
        </View>

        {/* Getting Started */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          
          <View style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Icon icon={Package} color="#2563EB" size={24} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Add Your First Product</Text>
              <Text style={styles.actionDescription}>
                Start by adding products to your inventory. This will help you track stock levels and manage orders.
              </Text>
              <Button 
                title="Add Product" 
                variant="primary" 
                size="sm" 
                onPress={() => navigation.navigate('Inventory' as never)}
                style={styles.actionButton}
              />
            </View>
          </View>
          
          <View style={styles.actionCard}>
            <View style={[styles.actionIconContainer, { backgroundColor: '#DCFCE7' }]}>
              <Icon icon={ShoppingCart} color="#10B981" size={24} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Create Your First Order</Text>
              <Text style={styles.actionDescription}>
                Once you have products, you can start creating orders for your customers.
              </Text>
              <Button 
                title="Create Order" 
                variant="primary" 
                size="sm" 
                onPress={() => navigation.navigate('Orders' as never)}
                style={[styles.actionButton, { backgroundColor: '#10B981' }]}
              />
            </View>
          </View>
        </View>

        {/* Analytics Chart Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Analytics</Text>
          <View style={styles.chartPlaceholder}>
            <Icon icon={TrendingUp} color="#D1D5DB" size={48} />
            <Text style={styles.chartPlaceholderText}>No sales data yet</Text>
            <Text style={styles.chartPlaceholderSubtext}>
              Your sales chart will appear here once you start making sales
            </Text>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.quickActions}>
          <Button 
            title="New Order" 
            icon={Plus}
            variant="primary" 
            onPress={() => navigation.navigate('Orders' as never)}
            style={styles.quickActionButton}
          />
          <Button 
            title="Add Product" 
            icon={Package}
            variant="outline" 
            onPress={() => navigation.navigate('Inventory' as never)}
            style={styles.quickActionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#6B7280',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  actionButton: {
    alignSelf: 'flex-start',
  },
  chartPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartPlaceholderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 12,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickActionButton: {
    width: '48%',
  },
});

export default DashboardScreen;