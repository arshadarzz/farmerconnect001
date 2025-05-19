import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, TruckIcon, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { LogisticsItem } from '@/types';
import { i18n } from '@/localization/i18n';

interface LogisticsCardProps {
  item: LogisticsItem;
  onPress?: () => void;
}

export function LogisticsCard({ item, onPress }: LogisticsCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return Colors.warning[500];
      case 'in-transit':
        return Colors.primary[500];
      case 'delivered':
      case 'completed':
        return Colors.success[500];
      default:
        return Colors.neutral[500];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return i18n.t('pending');
      case 'in-transit':
        return i18n.t('inTransit');
      case 'delivered':
        return i18n.t('delivered');
      case 'completed':
        return i18n.t('completed');
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{i18n.t('shipmentId')}: #{item.id}</Text>
          <View style={[
            styles.statusContainer, 
            { backgroundColor: getStatusColor(item.status) + '20' }
          ]}>
            <Text style={[
              styles.statusText, 
              { color: getStatusColor(item.status) }
            ]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        <Text style={styles.amount}>₹{item.amount}</Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.locationContainer}>
          <MapPin color={Colors.error[500]} size={16} />
          <Text style={styles.locationText}>{item.from}</Text>
        </View>
        <View style={styles.routeLineContainer}>
          <View style={styles.routeLine} />
        </View>
        <View style={styles.locationContainer}>
          <MapPin color={Colors.primary[500]} size={16} />
          <Text style={styles.locationText}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Calendar color={Colors.neutral[600]} size={16} />
          <Text style={styles.footerText}>{item.date}</Text>
        </View>
        <View style={styles.footerItem}>
          <TruckIcon color={Colors.neutral[600]} size={16} />
          <Text style={styles.footerText}>{item.vehicle}</Text>
        </View>
      </View>

      <Text style={styles.items}>{item.items}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginRight: 8,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  amount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.neutral[900],
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
    marginLeft: 4,
  },
  routeLineContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  routeLine: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.neutral[300],
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 4,
  },
  items: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
  },
});