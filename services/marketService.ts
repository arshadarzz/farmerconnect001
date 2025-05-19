import { MarketPrice, Activity } from '@/types';

export const getMarketPrices = async (): Promise<MarketPrice[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      name: 'Tomatoes',
      category: 'Vegetables',
      price: 42.50,
      change: 2.5,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    },
    {
      id: '2',
      name: 'Rice',
      category: 'Grains',
      price: 58.75,
      change: 0.8,
      image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    },
    {
      id: '3',
      name: 'Mangoes',
      category: 'Fruits',
      price: 86.25,
      change: -1.2,
      image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg',
    },
    {
      id: '4',
      name: 'Potatoes',
      category: 'Vegetables',
      price: 32.40,
      change: 3.7,
      image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg',
    },
    {
      id: '5',
      name: 'Wheat',
      category: 'Grains',
      price: 45.60,
      change: -0.5,
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
    },
    {
      id: '6',
      name: 'Apples',
      category: 'Fruits',
      price: 75.20,
      change: 1.8,
      image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    },
    {
      id: '7',
      name: 'Milk',
      category: 'Dairy',
      price: 52.30,
      change: 0.3,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
    },
    {
      id: '8',
      name: 'Onions',
      category: 'Vegetables',
      price: 38.90,
      change: -2.1,
      image: 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg',
    }
  ];
};

export const getActivities = async (): Promise<Activity[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      title: 'Sold 50kg Rice',
      time: '2 hours ago',
      price: 2500,
      change: 2.3,
      image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    },
    {
      id: '2',
      title: 'Sold 25kg Tomatoes',
      time: 'Yesterday',
      price: 1200,
      change: -1.5,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    },
    {
      id: '3',
      title: 'Purchased Fertilizer',
      time: '3 days ago',
      price: 890,
      change: 0,
      image: 'https://images.pexels.com/photos/2133095/pexels-photo-2133095.jpeg',
    },
    {
      id: '4',
      title: 'Sold 30kg Mangoes',
      time: '4 days ago',
      price: 2100,
      change: 3.2,
      image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg',
    }
  ];
};