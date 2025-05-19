import { Platform } from 'react-native';

export const getWeather = async () => {
  try {
    // For demo purposes, return mock data
    return {
      temperature: 25,
      condition: 'Clear',
      location: 'Sample City',
      humidity: 60,
      wind: 10,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};