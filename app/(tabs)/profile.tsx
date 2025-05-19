import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, Bell, Moon, Languages, ChevronRight, LogOut, Play, HelpCircle, Settings } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { i18n } from '@/localization/i18n';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();
  const { logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const menuItems = [
    {
      icon: <Settings color={Colors.neutral[700]} size={20} />,
      label: i18n.t('accountSettings'),
      action: () => {},
    },
    {
      icon: <Bell color={Colors.neutral[700]} size={20} />,
      label: i18n.t('notifications'),
      action: toggleNotifications,
      isSwitch: true,
      value: notifications,
    },
    {
      icon: <Moon color={Colors.neutral[700]} size={20} />,
      label: i18n.t('darkMode'),
      action: toggleDarkMode,
      isSwitch: true,
      value: darkMode,
    },
    {
      icon: <Languages color={Colors.neutral[700]} size={20} />,
      label: i18n.t('language'),
      value: language === 'en' ? 'English' : 'தமிழ்',
      action: handleLanguageChange,
    },
    {
      icon: <HelpCircle color={Colors.neutral[700]} size={20} />,
      label: i18n.t('help'),
      action: () => {},
    },
    {
      icon: <LogOut color={Colors.error[500]} size={20} />,
      label: i18n.t('logout'),
      action: handleLogout,
      textColor: Colors.error[500],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('profile')}</Text>
        <TouchableOpacity style={styles.voiceAssistButton}>
          <Play color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera color={Colors.white} size={16} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Ravi Kumar</Text>
              <Text style={styles.profileLocation}>Tamil Nadu, India</Text>
              <View style={styles.farmTypeContainer}>
                <Text style={styles.farmType}>{i18n.t('organicFarmer')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>{i18n.t('products')}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>48</Text>
              <Text style={styles.statLabel}>{i18n.t('sales')}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>{i18n.t('rating')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.badgesContainer}>
          <Text style={styles.badgesTitle}>{i18n.t('achievements')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.badge}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/617958/pexels-photo-617958.jpeg' }} 
                style={styles.badgeIcon} 
              />
              <Text style={styles.badgeName}>{i18n.t('topSeller')}</Text>
            </View>
            <View style={styles.badge}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg' }} 
                style={styles.badgeIcon} 
              />
              <Text style={styles.badgeName}>{i18n.t('organicCertified')}</Text>
            </View>
            <View style={styles.badge}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg' }} 
                style={styles.badgeIcon} 
              />
              <Text style={styles.badgeName}>{i18n.t('fastDelivery')}</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.isSwitch ? undefined : item.action}
            >
              <View style={styles.menuIconContainer}>{item.icon}</View>
              <Text style={[
                styles.menuLabel, 
                item.textColor && { color: item.textColor }
              ]}>
                {item.label}
              </Text>
              {item.isSwitch ? (
                <Switch
                  value={item.value}
                  onValueChange={item.action}
                  trackColor={{ false: Colors.neutral[300], true: Colors.primary[300] }}
                  thumbColor={item.value ? Colors.primary[500] : Colors.white}
                  ios_backgroundColor={Colors.neutral[300]}
                />
              ) : item.value ? (
                <View style={styles.menuValueContainer}>
                  <Text style={styles.menuValue}>{item.value}</Text>
                  <ChevronRight color={Colors.neutral[500]} size={16} />
                </View>
              ) : (
                <ChevronRight color={Colors.neutral[500]} size={16} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  voiceAssistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.neutral[900],
  },
  profileLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 8,
  },
  farmTypeContainer: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  farmType: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.primary[700],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.neutral[900],
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.neutral[200],
  },
  badgesContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  badgesTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.neutral[900],
    marginBottom: 12,
  },
  badge: {
    alignItems: 'center',
    marginRight: 16,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: Colors.primary[300],
  },
  badgeName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[700],
  },
  menuContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  menuValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginRight: 4,
  },
});