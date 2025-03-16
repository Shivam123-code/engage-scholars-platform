
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface TranslationSettings {
  isEnabled: boolean;
  sourceLanguage: string;
  targetLanguage: string;
  toggleTranslation: () => void;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
}

export const useTranslation = (): TranslationSettings => {
  const { language } = useLanguage();
  
  // Get saved settings from localStorage or use defaults
  const [isEnabled, setIsEnabled] = useState(() => {
    const savedState = localStorage.getItem("translationEnabled");
    return savedState ? JSON.parse(savedState) : false;
  });
  
  const [sourceLanguage, setSourceLang] = useState(() => {
    const savedLang = localStorage.getItem("translationSourceLang");
    return savedLang || language;
  });
  
  const [targetLanguage, setTargetLang] = useState(() => {
    const savedLang = localStorage.getItem("translationTargetLang");
    return savedLang || language;
  });
  
  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("translationEnabled", JSON.stringify(isEnabled));
  }, [isEnabled]);
  
  useEffect(() => {
    localStorage.setItem("translationSourceLang", sourceLanguage);
  }, [sourceLanguage]);
  
  useEffect(() => {
    localStorage.setItem("translationTargetLang", targetLanguage);
  }, [targetLanguage]);
  
  const toggleTranslation = () => setIsEnabled(!isEnabled);
  const setSourceLanguage = (lang: string) => setSourceLang(lang);
  const setTargetLanguage = (lang: string) => setTargetLang(lang);
  
  return {
    isEnabled,
    sourceLanguage,
    targetLanguage,
    toggleTranslation,
    setSourceLanguage,
    setTargetLanguage
  };
};
