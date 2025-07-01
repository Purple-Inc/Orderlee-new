import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Package, ArrowLeft, Mail, CheckCircle, RefreshCw } from 'lucide-react';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/Button';
import { Icon } from '../../components/Icon';

type EmailVerificationScreenProps = NativeStackScreenProps<AuthStackParamList, 'EmailVerification'>;

const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({ route, navigation }) => {
  const { email } = route.params;
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

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
    if (!canResend) return;
    
    setIsResending(true);
    setCanResend(false);
    setCountdown(60);
    
    try {
      // In a real app, you would call your API here
      // await apiClient.resendVerification(email);
      Alert.alert('Success', 'Verification email has been resent');
    } catch (error) {
      Alert.alert(
        'Error', 
        error instanceof Error ? error.message : 'Failed to resend verification email'
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyDemo = () => {
    // For demo purposes, simulate verification after 2 seconds
    setTimeout(() => {
      Alert.alert(
        'Email Verified',
        'Your email has been verified successfully!',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Icon icon={ArrowLeft} color="#6B7280" size={20} />
          <Text style={styles.backButtonText}>Back to home</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon icon={Package} color="#FFFFFF" size={32} />
          </View>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We've sent a verification link to your email address</Text>
        </View>

        {/* Verification Card */}
        <View style={styles.card}>
          {/* Email Icon */}
          <View style={styles.emailIconContainer}>
            <Mail color="#2563EB" size={40} />
          </View>

          {/* Email Address */}
          <View style={styles.emailContainer}>
            <Text style={styles.emailLabel}>Verification email sent to:</Text>
            <View style={styles.emailAddressContainer}>
              <Text style={styles.emailAddress}>{email}</Text>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <View style={styles.instructionsHeader}>
              <CheckCircle color="#2563EB" size={20} />
              <Text style={styles.instructionsTitle}>Next steps:</Text>
            </View>
            <View style={styles.instructionsList}>
              <Text style={styles.instructionItem}>1. Check your email inbox</Text>
              <Text style={styles.instructionItem}>2. Click the verification link</Text>
              <Text style={styles.instructionItem}>3. Return to this app to continue</Text>
            </View>
          </View>

          {/* Demo Verification Button */}
          <Button
            title="Simulate Email Verification (Demo)"
            icon={CheckCircle}
            variant="primary"
            fullWidth
            onPress={handleVerifyDemo}
            style={styles.verifyButton}
          />

          {/* Resend Email */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Didn't receive the email? Check your spam folder or
            </Text>
            <TouchableOpacity 
              onPress={handleResend}
              disabled={!canResend || isResending}
              style={[
                styles.resendButton,
                (!canResend || isResending) && styles.resendButtonDisabled
              ]}
            >
              <Icon 
                icon={RefreshCw} 
                color={canResend ? '#2563EB' : '#9CA3AF'} 
                size={16} 
              />
              <Text style={[
                styles.resendButtonText,
                (!canResend || isResending) && styles.resendButtonTextDisabled
              ]}>
                {isResending 
                  ? 'Sending...' 
                  : canResend 
                    ? 'Resend verification email' 
                    : `Resend in ${countdown}s`
                }
              </Text>
            </TouchableOpacity>
          </View>

          {/* Help Text */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Having trouble? Contact our support team at{' '}
              <Text style={styles.helpLink}>support@orderlee.com</Text>
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Orderlee. All rights reserved.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  emailIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emailContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  emailAddressContainer: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  emailAddress: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  instructionsContainer: {
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginLeft: 8,
  },
  instructionsList: {
    marginLeft: 28,
  },
  instructionItem: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 4,
  },
  verifyButton: {
    marginBottom: 20,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  resendButtonTextDisabled: {
    color: '#9CA3AF',
  },
  helpContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  helpText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  helpLink: {
    color: '#2563EB',
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

export default EmailVerificationScreen;