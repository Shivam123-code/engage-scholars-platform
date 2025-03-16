
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage, languages } from '@/contexts/LanguageContext';

interface TranslationSettingsProps {
  enabled: boolean;
  onToggle: () => void;
  sourceLanguage: string;
  targetLanguage: string;
  onLanguageChange: (type: 'source' | 'target', value: string) => void;
  className?: string;
  showCard?: boolean;
}

const TranslationSettings: React.FC<TranslationSettingsProps> = ({
  enabled,
  onToggle,
  sourceLanguage,
  targetLanguage,
  onLanguageChange,
  className,
  showCard = true,
}) => {
  const { t } = useLanguage();
  
  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">{t.enableTranslation || "Enable Translation"}</span>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            {t.iSpeak || "I speak (your messages will be sent in):"}
          </label>
          <Select 
            value={sourceLanguage} 
            onValueChange={(value) => onLanguageChange('source', value)}
            disabled={!enabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.selectLanguage || "Select language"} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={`source-${lang.code}`} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            {t.translateTo || "Translate to (messages you receive):"}
          </label>
          <Select 
            value={targetLanguage} 
            onValueChange={(value) => onLanguageChange('target', value)}
            disabled={!enabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.selectLanguage || "Select language"} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={`target-${lang.code}`} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {enabled && (
        <p className="text-xs text-muted-foreground italic">
          {t.translationDisclaimer || "Messages will be automatically translated between the selected languages. Translation is provided by AI language models."}
        </p>
      )}
    </div>
  );
  
  if (!showCard) {
    return <div className={className}>{content}</div>;
  }
  
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Languages className="h-5 w-5 mr-2" />
          <span>{t.translation || "Translation"}</span>
        </CardTitle>
        <CardDescription>{t.translationDescription || "Communicate across language barriers"}</CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default TranslationSettings;
