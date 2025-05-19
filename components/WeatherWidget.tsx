import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Cloud, Droplets, Wind } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { i18n } from '@/localization/i18n';
import { getWeather } from '@/services/weatherService';
import { WeatherData } from '@/types';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const data = await getWeather();
      if (data) {
        setWeather(data);
        setError(null);
      } else {
        setError('Unable to fetch weather data');
      }
    } catch (err) {
      setError('Error loading weather data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainInfo}>
        <View>
          <Text style={styles.temperature}>{weather.temperature}°C</Text>
          <Text style={styles.condition}>{weather.condition}</Text>
          <Text style={styles.location}>{weather.location}</Text>
        </View>
        <Cloud color={Colors.secondary[300]} size={64} />
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Droplets color={Colors.secondary[500]} size={16} />
          <Text style={styles.detailText}>
            {weather.humidity}% {i18n.t('humidity')}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Wind color={Colors.secondary[500]} size={16} />
          <Text style={styles.detailText}>
            {weather.wind} km/h {i18n.t('wind')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: Colors.secondary[50],
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.error[500],
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  temperature: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.neutral[900],
  },
  condition: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[700],
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  detailsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.secondary[100],
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 4,
  },
});