import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, ChevronRight, TrendingUp, TrendingDown, Play, Settings } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { MarketTrend } from '@/components/MarketTrend';
import { WeatherWidget } from '@/components/WeatherWidget';
import { i18n } from '@/localization/i18n';
import { getMarketPrices, getActivities } from '@/services/marketService';
import { MarketPrice, Activity } from '@/types';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const prices = await getMarketPrices();
    const acts = await getActivities();
    setMarketPrices(prices);
    setActivities(acts);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{i18n.t('hello')}, Ravi!</Text>
            <Text style={styles.subtitle}>{i18n.t('welcomeBack')}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Search color={Colors.neutral[700]} size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell color={Colors.neutral[700]} size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.voiceAssistBar}>
          <Text style={styles.voiceText}>{i18n.t('tapForVoice')}</Text>
          <TouchableOpacity style={styles.voiceButton}>
            <Play color={Colors.white} size={20} />
          </TouchableOpacity>
        </View>

        <WeatherWidget />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{i18n.t('marketTrends')}</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/market')}
          >
            <Text style={styles.viewAllText}>{i18n.t('viewAll')}</Text>
            <ChevronRight color={Colors.primary[500]} size={16} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.marketTrendsContainer}
        >
          {marketPrices.map((item, index) => (
            <MarketTrend 
              key={index}
              name={item.name}
              price={item.price}
              change={item.change}
              image={item.image}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{i18n.t('recentActivity')}</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>{i18n.t('viewAll')}</Text>
            <ChevronRight color={Colors.primary[500]} size={16} />
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesContainer}>
          {activities.map((activity, index) => (
            <TouchableOpacity key={index} style={styles.activityCard}>
              <Image source={{ uri: activity.image }} style={styles.activityImage} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <View style={styles.activityPriceContainer}>
                <Text style={styles.activityPrice}>₹{activity.price}</Text>
                <View style={[
                  styles.activityChangeContainer,
                  { backgroundColor: activity.change > 0 ? Colors.success[50] : Colors.error[50] }
                ]}>
                  {activity.change > 0 ? (
                    <TrendingUp size={12} color={Colors.success[500]} />
                  ) : (
                    <TrendingDown size={12} color={Colors.error[500]} />
                  )}
                  <Text style={[
                    styles.activityChange,
                    { color: activity.change > 0 ? Colors.success[500] : Colors.error[500] }
                  ]}>
                    {Math.abs(activity.change)}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.settingsButton}>
        <Settings size={24} color={Colors.white} />
      </TouchableOpacity>
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
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  voiceAssistBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 12,
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
  },
  voiceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  voiceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.neutral[900],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 4,
  },
  marketTrendsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  activitiesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  activityImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[900],
  },
  activityTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  activityPriceContainer: {
    alignItems: 'flex-end',
  },
  activityPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  activityChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activityChange: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 2,
  },
  settingsButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});