import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, TruckIcon, Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { LogisticsCard } from '@/components/LogisticsCard';
import { i18n } from '@/localization/i18n';
import { getLogistics, getVehicles } from '@/services/logisticsService';
import { LogisticsItem, Vehicle } from '@/types';

export default function LogisticsScreen() {
  const [activeTab, setActiveTab] = useState('active');
  const [logistics, setLogistics] = useState<LogisticsItem[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const logisticsData = await getLogistics();
    const vehiclesData = await getVehicles();
    setLogistics(logisticsData);
    setVehicles(vehiclesData);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const renderVehicleItem = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity style={styles.vehicleCard}>
      <View style={styles.vehicleImageContainer}>
        <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      </View>
      <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleCapacity}>{item.capacity}</Text>
        <View style={[
          styles.vehicleStatus,
          { backgroundColor: item.available ? Colors.success[50] : Colors.neutral[100] }
        ]}>
          <Text style={[
            styles.vehicleStatusText,
            { color: item.available ? Colors.success[700] : Colors.neutral[600] }
          ]}>
            {item.available ? i18n.t('available') : i18n.t('booked')}
          </Text>
        </View>
      </View>
      <View style={styles.vehiclePriceContainer}>
        <Text style={styles.vehiclePrice}>₹{item.price}</Text>
        <Text style={styles.vehiclePriceUnit}>/{i18n.t('km')}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredLogistics = logistics.filter(item => {
    if (activeTab === 'active') return item.status !== 'completed';
    return item.status === 'completed';
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('logistics')}</Text>
        <TouchableOpacity style={styles.voiceAssistButton}>
          <Play color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.vehiclesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{i18n.t('availableVehicles')}</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>{i18n.t('viewAll')}</Text>
              <ChevronRight color={Colors.primary[500]} size={16} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={vehicles}
            renderItem={renderVehicleItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vehiclesList}
          />
        </View>

        <View style={styles.bookNowContainer}>
          <View style={styles.bookNowContent}>
            <TruckIcon color={Colors.white} size={28} />
            <View style={styles.bookNowTextContainer}>
              <Text style={styles.bookNowTitle}>{i18n.t('needTransport')}</Text>
              <Text style={styles.bookNowSubtitle}>{i18n.t('bookTransportHelp')}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowButtonText}>{i18n.t('bookNow')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.shipmentsContainer}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'active' && styles.activeTab]} 
              onPress={() => setActiveTab('active')}
            >
              <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
                {i18n.t('active')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'completed' && styles.activeTab]} 
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
                {i18n.t('completed')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logisticsList}>
            {filteredLogistics.length > 0 ? (
              filteredLogistics.map((item, index) => (
                <LogisticsCard key={index} item={item} />
              ))
            ) : (
              <View style={styles.emptyStateContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/753525/pexels-photo-753525.jpeg' }}
                  style={styles.emptyStateImage}
                />
                <Text style={styles.emptyStateText}>
                  {activeTab === 'active' 
                    ? i18n.t('noActiveShipments') 
                    : i18n.t('noCompletedShipments')
                  }
                </Text>
              </View>
            )}
          </View>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  vehiclesContainer: {
    marginBottom: 24,
  },
  vehiclesList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  vehicleCard: {
    width: 220,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    marginRight: 8,
    overflow: 'hidden',
  },
  vehicleImageContainer: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  vehicleDetails: {
    padding: 12,
  },
  vehicleName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  vehicleCapacity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 8,
  },
  vehicleStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  vehicleStatusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  vehiclePriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  vehiclePrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.primary[500],
  },
  vehiclePriceUnit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 2,
  },
  bookNowContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
  },
  bookNowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookNowTextContainer: {
    marginLeft: 16,
  },
  bookNowTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.white,
  },
  bookNowSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  bookNowButton: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookNowButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary[500],
  },
  shipmentsContainer: {
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary[500],
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.primary[500],
  },
  logisticsList: {
    paddingHorizontal: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 24,
  },
  emptyStateImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});