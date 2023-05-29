import {useEffect, useState} from 'react';
import {I18nManager} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../../assets/i18n/en.json';
import arabic from '../../assets/i18n/arabic.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: arabic,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: I18nManager.isRTL ? 'ar' : 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
