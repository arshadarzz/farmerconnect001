export interface MarketPrice {
  id: string;
  name: string;
  category: string;
  price: number;
  change: number;
  image: string;
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  price: number;
  change: number;
  image: string;
}

export interface LogisticsItem {
  id: string;
  from: string;
  to: string;
  date: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'completed';
  vehicle: string;
  amount: number;
  items: string;
  coordinates?: {
    pickup: {
      latitude: number;
      longitude: number;
    };
    delivery: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface Vehicle {
  id: string;
  name: string;
  capacity: string;
  price: number;
  available: boolean;
  image: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity?: number) => string;
    strokeWidth?: number;
  }[];
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  wind: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  image?: string;
  farmType: string;
  productsCount: number;
  salesCount: number;
  rating: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}

export type UnitType = 'kg' | 'g' | 'l' | 'ml' | 'units';