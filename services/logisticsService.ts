import { LogisticsItem, Vehicle } from '@/types';

// Mock data - in a real app, this would fetch from a backend API
export const getLogistics = async (): Promise<LogisticsItem[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      from: 'Salem',
      to: 'Chennai',
      date: '23 Jun 2025',
      status: 'in-transit',
      vehicle: 'Mini Truck',
      amount: 1250,
      items: '50kg Rice, 30kg Wheat',
    },
    {
      id: '2',
      from: 'Coimbatore',
      to: 'Madurai',
      date: '25 Jun 2025',
      status: 'pending',
      vehicle: 'Pickup Truck',
      amount: 980,
      items: '40kg Tomatoes, 25kg Potatoes',
    },
    {
      id: '3',
      from: 'Trichy',
      to: 'Tirunelveli',
      date: '18 Jun 2025',
      status: 'completed',
      vehicle: 'Mini Truck',
      amount: 1450,
      items: '60kg Mangoes, 20kg Bananas',
    },
  ];
};

export const getVehicles = async (): Promise<Vehicle[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      name: 'Mini Truck',
      capacity: '1 ton',
      price: 12,
      available: true,
      image: 'https://images.pexels.com/photos/2236713/pexels-photo-2236713.jpeg',
    },
    {
      id: '2',
      name: 'Pickup Truck',
      capacity: '500 kg',
      price: 8,
      available: true,
      image: 'https://images.pexels.com/photos/6170396/pexels-photo-6170396.jpeg',
    },
    {
      id: '3',
      name: 'Refrigerated Truck',
      capacity: '800 kg',
      price: 15,
      available: false,
      image: 'https://images.pexels.com/photos/5964381/pexels-photo-5964381.jpeg',
    },
    {
      id: '4',
      name: 'Large Truck',
      capacity: '2 tons',
      price: 18,
      available: true,
      image: 'https://images.pexels.com/photos/3770096/pexels-photo-3770096.jpeg',
    },
  ];
};