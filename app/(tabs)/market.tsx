import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Filter, ChevronDown, Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { LineChart } from 'react-native-chart-kit';
import { MarketPriceCard } from '@/components/MarketPriceCard';
import { i18n } from '@/localization/i18n';
import { getMarketPrices } from '@/services/marketService';
import { MarketPrice, ChartData } from '@/types';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function MarketScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1W');
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState<ChartData>({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [50, 55, 53, 56, 61, 58, 62],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 2,
      }
    ],
  });
  const router = useRouter();

  useEffect(() => {
    loadMarketPrices();
  }, []);

  const loadMarketPrices = async () => {
    const prices = await getMarketPrices();
    setMarketPrices(prices);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMarketPrices();
    setRefreshing(false);
  };

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Spices', 'Pulses'];
  const timeRanges = ['1D', '1W', '1M', '3M', '1Y'];

  const filteredPrices = marketPrices.filter(price => {
    const matchesSearch = price.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || price.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('marketPrices')}</Text>
        <TouchableOpacity style={styles.voiceAssistButton}>
          <Play color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search color={Colors.neutral[400]} size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder={i18n.t('searchProducts')}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={Colors.neutral[700]} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>{i18n.t('marketIndex')}</Text>
              <Text style={styles.chartValue}>₹58.25 <Text style={styles.chartChange}>(+2.3%)</Text></Text>
            </View>
            <View style={styles.timeRangeContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {timeRanges.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeRangeButton,
                      selectedTimeRange === range && styles.timeRangeButtonActive
                    ]}
                    onPress={() => setSelectedTimeRange(range)}
                  >
                    <Text style={[
                      styles.timeRangeText,
                      selectedTimeRange === range && styles.timeRangeTextActive
                    ]}>
                      {range}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={180}
            chartConfig={{
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: Colors.primary[500],
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>{i18n.t('popularProducts')}</Text>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>{i18n.t('sortBy')}: {i18n.t('price')}</Text>
            <ChevronDown color={Colors.neutral[600]} size={16} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {filteredPrices.map((item, index) => (
            <MarketPriceCard
              key={index}
              name={item.name}
              category={item.category}
              price={item.price}
              change={item.change}
              image={item.image}
              onPress={() => router.push({
                pathname: "/market/[id]",
                params: { id: item.id }
              })}
            />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  filterButton: {
    padding: 8,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.neutral[100],
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary[500],
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  categoryTextActive: {
    color: Colors.white,
  },
  chartContainer: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chartTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[600],
  },
  chartValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: Colors.neutral[900],
  },
  chartChange: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.success[500],
  },
  timeRangeContainer: {
    flexDirection: 'row',
  },
  timeRangeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 4,
    borderRadius: 4,
  },
  timeRangeButtonActive: {
    backgroundColor: Colors.primary[100],
  },
  timeRangeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
  },
  timeRangeTextActive: {
    fontFamily: 'Poppins-Medium',
    color: Colors.primary[700],
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.neutral[900],
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginRight: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});