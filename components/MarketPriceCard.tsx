import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface MarketPriceCardProps {
  name: string;
  category: string;
  price: number;
  change: number;
  image: string;
  onPress: () => void;
}

export function MarketPriceCard({ name, category, price, change, image, onPress }: MarketPriceCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
        <View style={styles.priceContainer}>
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  category: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  priceContainer: {
    alignItems: 'flex-end',
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
  },
  change: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 2,
  },
});