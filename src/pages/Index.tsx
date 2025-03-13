
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Globe } from "lucide-react"; 
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Available languages
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
];

// Translations for the page content
const translations = {
  en: {
    welcome: "Welcome to ParentConnect",
    tagline: "Bridging the gap between parents and teachers for better student success",
    getStarted: "Get Started",
    communication: "Easy Communication",
    communicationDesc: "Direct messaging between parents and teachers for seamless communication",
    events: "Event Management",
    eventsDesc: "Stay updated with school events and parent-teacher meetings",
    progress: "Student Progress",
    progressDesc: "Track your child's academic progress and achievements",
    selectLanguage: "Select Language"
  },
  es: {
    welcome: "Bienvenido a ParentConnect",
    tagline: "Cerrando la brecha entre padres y maestros para un mejor éxito estudiantil",
    getStarted: "Comenzar",
    communication: "Comunicación Fácil",
    communicationDesc: "Mensajería directa entre padres y maestros para una comunicación fluida",
    events: "Gestión de Eventos",
    eventsDesc: "Mantente actualizado con los eventos escolares y reuniones de padres y maestros",
    progress: "Progreso del Estudiante",
    progressDesc: "Sigue el progreso académico y los logros de tu hijo",
    selectLanguage: "Seleccionar Idioma"
  },
  fr: {
    welcome: "Bienvenue à ParentConnect",
    tagline: "Combler le fossé entre les parents et les enseignants pour une meilleure réussite des élèves",
    getStarted: "Commencer",
    communication: "Communication Facile",
    communicationDesc: "Messagerie directe entre parents et enseignants pour une communication fluide",
    events: "Gestion des Événements",
    eventsDesc: "Restez informé des événements scolaires et des réunions parents-enseignants",
    progress: "Progrès de l'Élève",
    progressDesc: "Suivez les progrès académiques et les réalisations de votre enfant",
    selectLanguage: "Choisir la Langue"
  },
  zh: {
    welcome: "欢迎使用ParentConnect",
    tagline: "架起家长与教师之间的桥梁，促进学生更好地成功",
    getStarted: "开始使用",
    communication: "便捷沟通",
    communicationDesc: "家长和教师之间的直接消息传递，实现无缝沟通",
    events: "活动管理",
    eventsDesc: "随时了解学校活动和家长教师会议",
    progress: "学生进度",
    progressDesc: "跟踪孩子的学业进步和成就",
    selectLanguage: "选择语言"
  },
  ar: {
    welcome: "مرحبًا بك في ParentConnect",
    tagline: "سد الفجوة بين الآباء والمعلمين لنجاح أفضل للطلاب",
    getStarted: "البدء",
    communication: "تواصل سهل",
    communicationDesc: "المراسلة المباشرة بين الآباء والمعلمين للتواصل السلس",
    events: "إدارة الفعاليات",
    eventsDesc: "ابق على اطلاع بأحداث المدرسة واجتماعات أولياء الأمور والمعلمين",
    progress: "تقدم الطالب",
    progressDesc: "تتبع التقدم الأكاديمي لطفلك وإنجازاته",
    selectLanguage: "اختر اللغة"
  },
  hi: {
    welcome: "ParentConnect में आपका स्वागत है",
    tagline: "बेहतर छात्र सफलता के लिए माता-पिता और शिक्षकों के बीच की दूरी को पाटना",
    getStarted: "शुरू करें",
    communication: "आसान संचार",
    communicationDesc: "निर्बाध संचार के लिए माता-पिता और शिक्षकों के बीच सीधा संदेश",
    events: "कार्यक्रम प्रबंधन",
    eventsDesc: "स्कूल के कार्यक्रमों और माता-पिता-शिक्षक बैठकों के बारे में अपडेट रहें",
    progress: "छात्र प्रगति",
    progressDesc: "अपने बच्चे की शैक्षणिक प्रगति और उपलब्धियों को ट्रैक करें",
    selectLanguage: "भाषा चुनें"
  }
};

const Index = () => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    return savedLanguage || "en";
  });

  // Get translations for current language
  const t = translations[language] || translations.en;

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    // You could dispatch an event here to notify other components about the language change
    const event = new CustomEvent("languageChange", { detail: { language } });
    window.dispatchEvent(event);
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Language selector */}
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{languages.find(lang => lang.code === language)?.name || "English"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-accent" : ""}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {t.welcome}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t.tagline}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/login">
              <Button size="lg" className="neo-button">
                {t.getStarted}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">{t.communication}</h3>
            <p className="mt-2 text-muted-foreground">
              {t.communicationDesc}
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">{t.events}</h3>
            <p className="mt-2 text-muted-foreground">
              {t.eventsDesc}
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">{t.progress}</h3>
            <p className="mt-2 text-muted-foreground">
              {t.progressDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
