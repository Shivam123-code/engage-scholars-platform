import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "gu", name: "ગુજરાતી" }, // Added Gujarati
];

// Translations for all the app content
export const translations = {
  en: {
    // ... keep existing code (existing English translations)
    // Messaging page
    messages: "Messages",
    contacts: "Contacts",
    selectTeacher: "Select a teacher to message",
    startMessaging: "Select a teacher to start messaging",
    online: "Online",
    offline: "Offline",
    lastSeen: "Last seen",
    // Translation component
    translation: "Translation",
    translationDescription: "Communicate across language barriers",
    enableTranslation: "Enable Translation",
    iSpeak: "I speak (your messages will be sent in):",
    translateTo: "Translate to (messages you receive):",
    selectLanguage: "Select language",
    translationDisclaimer: "Messages will be automatically translated between the selected languages. Translation is provided by AI language models.",
    messageTranslated: "Message Translated",
    translatedFrom: "Your message was automatically translated from",
    translatedTo: "to",
    languageUpdated: "Language Updated",
    translationSourceLang: "Translation source language set to",
    translationTargetLang: "Translation target language set to",
    typeMessage: "Type a message...",
    today: "Today"
  },
  es: {
    // ... keep existing code (existing Spanish translations)
    // Messaging page
    messages: "Mensajes",
    contacts: "Contactos",
    selectTeacher: "Seleccione un profesor para enviar un mensaje",
    startMessaging: "Seleccione un profesor para comenzar a enviar mensajes",
    online: "En línea",
    offline: "Desconectado",
    lastSeen: "Última vez visto",
    // Translation component
    translation: "Traducción",
    translationDescription: "Comuníquese a través de barreras lingüísticas",
    enableTranslation: "Habilitar traducción",
    iSpeak: "Yo hablo (sus mensajes se enviarán en):",
    translateTo: "Traducir a (mensajes que recibe):",
    selectLanguage: "Seleccionar idioma",
    translationDisclaimer: "Los mensajes se traducirán automáticamente entre los idiomas seleccionados. La traducción es proporcionada por modelos de lenguaje de IA.",
    messageTranslated: "Mensaje Traducido",
    translatedFrom: "Su mensaje fue traducido automáticamente de",
    translatedTo: "a",
    languageUpdated: "Idioma Actualizado",
    translationSourceLang: "Idioma de origen de traducción establecido a",
    translationTargetLang: "Idioma de destino de traducción establecido a",
    typeMessage: "Escriba un mensaje...",
    today: "Hoy"
  },
  fr: {
    // ... keep existing code (existing French translations)
    // Messaging page
    messages: "Messages",
    contacts: "Contacts",
    selectTeacher: "Sélectionnez un enseignant pour envoyer un message",
    startMessaging: "Sélectionnez un enseignant pour commencer à envoyer des messages",
    online: "En ligne",
    offline: "Hors ligne",
    lastSeen: "Dernière connexion",
    // Translation component
    translation: "Traduction",
    translationDescription: "Communiquer à travers les barrières linguistiques",
    enableTranslation: "Activer la traduction",
    iSpeak: "Je parle (vos messages seront envoyés en):",
    translateTo: "Traduire vers (messages que vous recevez):",
    selectLanguage: "Sélectionner la langue",
    translationDisclaimer: "Les messages seront automatiquement traduits entre les langues sélectionnées. La traduction est fournie par des modèles de langage IA.",
    messageTranslated: "Message Traduit",
    translatedFrom: "Votre message a été automatiquement traduit de",
    translatedTo: "à",
    languageUpdated: "Langue Mise à Jour",
    translationSourceLang: "Langue source de traduction définie sur",
    translationTargetLang: "Langue cible de traduction définie sur",
    typeMessage: "Tapez un message...",
    today: "Aujourd'hui"
  },
  zh: {
    // ... keep existing code (existing Chinese translations)
    // Messaging page
    messages: "消息",
    contacts: "联系人",
    selectTeacher: "选择一位老师发送消息",
    startMessaging: "选择一位老师开始发送消息",
    online: "在线",
    offline: "离线",
    lastSeen: "最后上线",
    // Translation component
    translation: "翻译",
    translationDescription: "跨越语言障碍进行交流",
    enableTranslation: "启用翻译",
    iSpeak: "我说(您的消息将以此语言发送):",
    translateTo: "翻译成(您收到的消息):",
    selectLanguage: "选择语言",
    translationDisclaimer: "消息将在所选语言之间自动翻译。翻译由AI语言模型提供。",
    messageTranslated: "消息已翻译",
    translatedFrom: "您的消息已从",
    translatedTo: "自动翻译为",
    languageUpdated: "语言已更新",
    translationSourceLang: "翻译源语言设置为",
    translationTargetLang: "翻译目标语言设置为",
    typeMessage: "输入消息...",
    today: "今天"
  },
  ar: {
    // ... keep existing code (existing Arabic translations)
    // Messaging page
    messages: "الرسائل",
    contacts: "جهات الاتصال",
    selectTeacher: "اختر مدرسًا للمراسلة",
    startMessaging: "اختر مدرسًا لبدء المراسلة",
    online: "متصل",
    offline: "غير متصل",
    lastSeen: "آخر ظهور",
    // Translation component
    translation: "الترجمة",
    translationDescription: "التواصل عبر حواجز اللغة",
    enableTranslation: "تمكين الترجمة",
    iSpeak: "أنا أتحدث (سيتم إرسال رسائلك بهذه اللغة):",
    translateTo: "ترجمة إلى (الرسائل التي تتلقاها):",
    selectLanguage: "اختر اللغة",
    translationDisclaimer: "سيتم ترجمة الرسائل تلقائيًا بين اللغات المحددة. يتم توفير الترجمة بواسطة نماذج لغة الذكاء الاصطناعي.",
    messageTranslated: "تمت ترجمة الرسالة",
    translatedFrom: "تمت ترجمة رسالتك تلقائيًا من",
    translatedTo: "إلى",
    languageUpdated: "تم تحديث اللغة",
    translationSourceLang: "تم تعيين لغة المصدر للترجمة إلى",
    translationTargetLang: "تم تعيين لغة الهدف للترجمة إلى",
    typeMessage: "اكتب رسالة...",
    today: "اليوم"
  },
  hi: {
    // ... keep existing code (existing Hindi translations)
    // Messaging page
    messages: "संदेश",
    contacts: "संपर्क",
    selectTeacher: "संदेश भेजने के लिए एक शिक्षक चुनें",
    startMessaging: "संदेश भेजना शुरू करने के लिए एक शिक्षक चुनें",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    lastSeen: "आखिरी बार देखा गया",
    // Translation component
    translation: "अनुवाद",
    translationDescription: "भाषा बाधाओं के पार संवाद करें",
    enableTranslation: "अनुवाद सक्षम करें",
    iSpeak: "मैं बोलता/बोलती हूँ (आपके संदेश इसमें भेजे जाएंगे):",
    translateTo: "इसमें अनुवाद करें (आपको प्राप्त होने वाले संदेश):",
    selectLanguage: "भाषा चुनें",
    translationDisclaimer: "संदेशों का चयनित भाषાઓं के बीच स्वचालित रूप से अनुवाद किया जाएगा। अनुवाद AI भाषा मॉडल द्वारा प्रदान किया जाता है।",
    messageTranslated: "संदेश का अनुवाद किया गया",
    translatedFrom: "आपके संदेश का स्वचालित रूप से अनुवाद किया गया",
    translatedTo: "से",
    languageUpdated: "भाषा अपडेट की गई",
    translationSourceLang: "अनुवाद स्रोत भाषा सेट की गई",
    translationTargetLang: "अनुवाद लक्ष्य भाषा सेट की गई",
    typeMessage: "संदेश टाइप करें...",
    today: "आज"
  },
  gu: {
    // ... keep existing code (existing Gujarati translations)
    // Messaging page
    messages: "સંદેશાઓ",
    contacts: "સંપર્કો",
    selectTeacher: "સંદેશ મોકલવા માટે શિક્ષક પસંદ કરો",
    startMessaging: "સંદેશ શરૂ કરવા માટે શિક્ષક પસંદ કરો",
    online: "ઓનલાઇન",
    offline: "ઓફલાઇન",
    lastSeen: "છેલ્લે જોયું",
    // Translation component
    translation: "અનુવાદ",
    translationDescription: "ભાષા અવરોધો વચ્ચે સંચાર કરો",
    enableTranslation: "અનુવાદ સક્ષમ કરો",
    iSpeak: "હું બોલું છું (તમારા સંદેશાઓ આમાં મોકલવામાં આવશે):",
    translateTo: "અનુવાદ કરો (તમને મળતા સંદેશાઓ):",
    selectLanguage: "ભાષા પસંદ કરો",
    translationDisclaimer: "સંદેશાઓનું પસંદ કરેલી ભાષાઓ વચ્ચે આપોઆપ અનુવાદ થશે. અનુવાદ AI ભા�ા મોડેલ્સ દ્વારા પ્રદાન કરવામાં આવે છે.",
    messageTranslated: "સંદેશનો અનુવાદ થયો",
    translatedFrom: "તમારા સંદેશનો આપોઆપ અનુવાદ કરવામાં આવ્યો",
    translatedTo: "થી",
    languageUpdated: "ભાષા અપડેટ થઈ",
    translationSourceLang: "અનુવાદ સ્રોત ભા�ા સેટ કરી",
    translationTargetLang: "અનુવાદ લક્ષ્ય ભા�ા સેટ કરી",
    typeMessage: "સંદેશ ટાઇપ કરો...",
    today: "આજે"
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: any;
}

const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: translations.en,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    return savedLanguage || "en";
  });

  // Get translations for current language
  const t = translations[language as keyof typeof translations] || translations.en;

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    // Dispatch an event to notify other components about the language change
    const event = new CustomEvent("languageChange", { detail: { language } });
    window.dispatchEvent(event);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
