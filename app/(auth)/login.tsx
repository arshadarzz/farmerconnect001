import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Play, PhoneCall, Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { i18n } from '@/localization/i18n';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  
  const handleLogin = () => {
    // For demo purposes, we'll just redirect to the main app
    login(phoneNumber);
    router.replace('/(tabs)');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg' }} 
          style={styles.backgroundImage}
        />
        <View style={styles.logoOverlay}>
          <Text style={styles.logoText}>FarmConnect</Text>
          <Text style={styles.logoSubtext}>{i18n.t('connectingFarmers')}</Text>
        </View>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>{i18n.t('welcome')}</Text>
        <Text style={styles.subtitle}>{i18n.t('loginToAccount')}</Text>
        
        <View style={styles.inputContainer}>
          <PhoneCall color={Colors.primary[500]} size={20} />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('phoneNumber')}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder={i18n.t('password')}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              {showPassword ? (
                <EyeOff color={Colors.neutral[400]} size={20} />
              ) : (
                <Eye color={Colors.neutral[400]} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>{i18n.t('forgotPassword')}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{i18n.t('login')}</Text>
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>{i18n.t('noAccount')} </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.registerLink}>{i18n.t('registerNow')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.voiceAssistContainer}>
          <TouchableOpacity style={styles.voiceAssistButton}>
            <Play color={Colors.white} size={24} />
          </TouchableOpacity>
          <Text style={styles.voiceAssistText}>{i18n.t('voiceAssist')}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    height: '35%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.white,
  },
  logoSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.white,
  },
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  passwordWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  button: {
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  registerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  registerLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  voiceAssistContainer: {
    alignItems: 'center',
  },
  voiceAssistButton: {
    backgroundColor: Colors.secondary[500],
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  voiceAssistText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
  },
});