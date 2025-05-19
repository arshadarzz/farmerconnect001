import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { i18n } from '@/localization/i18n';

export function useLanguage() {
  const { language, setLanguage } = useContext(AppContext);
  
  useEffect(() => {
    i18n.locale = language;
  }, [language]);
  
  return { language, setLanguage };
}