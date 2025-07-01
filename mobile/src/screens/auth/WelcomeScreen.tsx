import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Package, ArrowRight } from 'lucide-react';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/Button';
import { Icon } from '../../components/Icon';

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon icon={Package} color="#FFFFFF" size={32} />
          </View>
          <Text style={styles.title}>Orderlee</Text>
          <Text style={styles.subtitle}>Business Management Platform</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Streamline Your{' '}
            <Text style={styles.heroTitleHighlight}>Business Operations</Text>
          </Text>
          <Text style={styles.heroDescription}>
            Orderlee is the all-in-one business management platform that helps African businesses manage orders, inventory, payments, and logistics seamlessly.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#3B82F6' }]}>
              <Icon icon={Package} color="#FFFFFF" size={20} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Inventory Management</Text>
              <Text style={styles.featureDescription}>
                Track stock levels and manage products with ease
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#10B981' }]}>
              <Icon icon={Package} color="#FFFFFF" size={20} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Order Processing</Text>
              <Text style={styles.featureDescription}>
                Create and manage customer orders efficiently
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#8B5CF6' }]}>
              <Icon icon={Package} color="#FFFFFF" size={20} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Payment Tracking</Text>
              <Text style={styles.featureDescription}>
                Monitor transactions and manage finances
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button 
            title="Get Started" 
            variant="primary" 
            size="lg" 
            icon={ArrowRight} 
            iconPosition="right"
            fullWidth
            onPress={() => navigation.navigate('Signup')}
            style={styles.primaryButton}
          />
          
          <Button 
            title="Sign In" 
            variant="outline" 
            size="lg" 
            fullWidth
            onPress={() => navigation.navigate('Login')}
            style={styles.secondaryButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Orderlee. All rights reserved.</Text>
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
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  heroSection: {
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  heroTitleHighlight: {
    color: '#2563EB',
  },
  heroDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionContainer: {
    marginBottom: 40,
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    marginBottom: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default WelcomeScreen;