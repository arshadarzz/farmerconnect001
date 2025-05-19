import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, PhoneCall, MapPin, Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { i18n } from '@/localization/i18n';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  
  const handleRegister = () => {
    // For demo purposes, we'll just redirect to login
    router.push('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ChevronLeft color={Colors.neutral[800]} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{i18n.t('createAccount')}</Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg' }} 
            style={styles.image}
          />
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>{i18n.t('getStarted')}</Text>
          <Text style={styles.subtitle}>{i18n.t('createYourAccount')}</Text>
          
          <View style={styles.inputContainer}>
            <User color={Colors.primary[500]} size={20} />
            <TextInput
              style={styles.input}
              placeholder={i18n.t('fullName')}
              value={name}
              onChangeText={setName}
            />
          </View>
          
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
            <MapPin color={Colors.primary[500]} size={20} />
            <TextInput
              style={styles.input}
              placeholder={i18n.t('location')}
              value={location}
              onChangeText={setLocation}
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>{i18n.t('register')}</Text>
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>{i18n.t('alreadyHaveAccount')} </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginLink}>{i18n.t('loginNow')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.voiceAssistContainer}>
            <TouchableOpacity style={styles.voiceAssistButton}>
              <Play color={Colors.white} size={24} />
            </TouchableOpacity>
            <Text style={styles.voiceAssistText}>{i18n.t('voiceAssist')}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  placeholder: {
    width: 40,
  },
  imageContainer: {
    height: 200,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  loginLink: {
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