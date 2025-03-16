
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Languages, BrainCircuit, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface MessagingHeaderProps {
  isTranslationEnabled: boolean;
}

const MessagingHeader: React.FC<MessagingHeaderProps> = ({ isTranslationEnabled }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{t.messages || "Messages"}</h1>
        
        <div className="ml-auto flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/learning-insights")}
            className="hidden sm:flex items-center"
          >
            <BrainCircuit className="h-4 w-4 mr-2" />
            {t.learningInsights || "Learning Insights"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/community")}
            className="hidden sm:flex items-center"
          >
            <Users className="h-4 w-4 mr-2" />
            {t.community || "Community"}
          </Button>
          
          {isTranslationEnabled && (
            <div className="flex items-center text-sm">
              <Languages className="h-4 w-4 mr-1 text-primary" />
              <span>{t.translation || "Translation"} {t.active || "Active"}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MessagingHeader;
