
import React, { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TranslationSettings from '@/components/messaging/TranslationSettings';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const TranslationMenuButton: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  // Get saved settings from localStorage or use defaults
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(() => {
    const savedState = localStorage.getItem("translationEnabled");
    return savedState ? JSON.parse(savedState) : false;
  });
  
  const [sourceLanguage, setSourceLanguage] = useState(() => {
    const savedLang = localStorage.getItem("translationSourceLang");
    return savedLang || language;
  });
  
  const [targetLanguage, setTargetLanguage] = useState(() => {
    const savedLang = localStorage.getItem("translationTargetLang");
    return savedLang || language;
  });
  
  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("translationEnabled", JSON.stringify(isTranslationEnabled));
  }, [isTranslationEnabled]);
  
  useEffect(() => {
    localStorage.setItem("translationSourceLang", sourceLanguage);
  }, [sourceLanguage]);
  
  useEffect(() => {
    localStorage.setItem("translationTargetLang", targetLanguage);
  }, [targetLanguage]);
  
  const handleLanguageChange = (type: 'source' | 'target', value: string) => {
    if (type === 'source') {
      setSourceLanguage(value);
    } else {
      setTargetLanguage(value);
    }
    
    toast({
      title: "Language Updated",
      description: `Translation ${type === 'source' ? 'source' : 'target'} language set to ${
        value
      }`,
    });
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Translation Settings"
        >
          <Languages className="h-5 w-5" />
          {isTranslationEnabled && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <TranslationSettings
          enabled={isTranslationEnabled}
          onToggle={() => setIsTranslationEnabled(!isTranslationEnabled)}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onLanguageChange={handleLanguageChange}
          showCard={false}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TranslationMenuButton;
