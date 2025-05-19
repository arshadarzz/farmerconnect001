import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

export function useAuth() {
  const { isAuthenticated, login, logout } = useContext(AppContext);
  
  return { isAuthenticated, login, logout };
}