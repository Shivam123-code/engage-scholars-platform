
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages } from "@/locales/translations";
import { useToast } from "@/hooks/use-toast";

interface LanguageSwitcherProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showLabel?: boolean;
}

const LanguageSwitcher = ({ 
  variant = "outline", 
  size = "sm", 
  className = "",
  showLabel = true
}: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    const langName = languages.find(lang => lang.code === langCode)?.name || "English";
    toast({
      title: t.languageUpdated || "Language Updated",
      description: `${langName}`,
      duration: 2000
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={`flex items-center gap-2 ${className}`}>
          <Globe className="h-4 w-4" />
          {showLabel && (
            <span>{languages.find(lang => lang.code === language)?.name || "English"}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? "bg-accent" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
