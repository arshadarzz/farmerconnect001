import { I18n } from 'i18n-js';
import en from './translations/en';
import ta from './translations/ta';
import hi from './translations/hi';

export const i18n = new I18n({
  en,
  ta,
  hi,
});

// Set the default locale
i18n.defaultLocale = 'en';
i18n.locale = 'en';

// Enable fallbacks if a translation is missing
i18n.enableFallback = true;