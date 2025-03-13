
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
}

interface TranslationSettingsProps {
  enabled: boolean;
  onToggle: () => void;
  sourceLanguage: string;
  targetLanguage: string;
  onLanguageChange: (type: 'source' | 'target', value: string) => void;
  languages: Language[];
  className?: string;
}

const TranslationSettings: React.FC<TranslationSettingsProps> = ({
  enabled,
  onToggle,
  sourceLanguage,
  targetLanguage,
  onLanguageChange,
  languages,
  className,
}) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Languages className="h-5 w-5 mr-2" />
          <span>Translation</span>
        </CardTitle>
        <CardDescription>Communicate across language barriers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Enable Translation</span>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              I speak (your messages will be sent in):
            </label>
            <Select 
              value={sourceLanguage} 
              onValueChange={(value) => onLanguageChange('source', value)}
              disabled={!enabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
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
              Translate to (messages you receive):
            </label>
            <Select 
              value={targetLanguage} 
              onValueChange={(value) => onLanguageChange('target', value)}
              disabled={!enabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
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
            Messages will be automatically translated between the selected languages.
            Translation is provided by AI language models.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TranslationSettings;
