import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface MarketTrendProps {
  name: string;
  price: number;
  change: number;
  image: string;
  onPress?: () => void;
}

export function MarketTrend({ name, price, change, image, onPress }: MarketTrendProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>₹{price.toFixed(2)}</Text>
        <View style={[
          styles.changeContainer,
          { backgroundColor: change >= 0 ? Colors.success[50] : Colors.error[50] }
        ]}>
          {change >= 0 ? (
            <TrendingUp size={12} color={Colors.success[500]} />
          ) : (
            <TrendingDown size={12} color={Colors.error[500]} />
          )}
          <Text style={[
            styles.change,
            { color: change >= 0 ? Colors.success[500] : Colors.error[500] }
          ]}>
            {Math.abs(change)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  change: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 2,
  },
});