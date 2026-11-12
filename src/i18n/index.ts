import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import hiCommon from '../locales/hi/common.json';
import mrCommon from '../locales/mr/common.json';

const resources = {
  en: { common: enCommon },
  hi: { common: hiCommon },
  mr: { common: mrCommon }
};

const savedLang = localStorage.getItem('placepilot_language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
