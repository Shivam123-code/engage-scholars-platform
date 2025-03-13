
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
    welcome: "Welcome to ParentConnect",
    tagline: "Bridging the gap between parents and teachers for better student success",
    getStarted: "Get Started",
    communication: "Easy Communication",
    communicationDesc: "Direct messaging between parents and teachers for seamless communication",
    events: "Event Management",
    eventsDesc: "Stay updated with school events and parent-teacher meetings",
    progress: "Student Progress",
    progressDesc: "Track your child's academic progress and achievements",
    selectLanguage: "Select Language",
    // Login page
    welcomeBack: "Welcome back",
    credentials: "Enter your credentials to access your account",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    signIn: "Sign in",
    signingIn: "Signing in...",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    iAmA: "I am a:",
    parent: "Parent",
    teacher: "Teacher",
    // Common terms
    backToLogin: "Back to login",
    emailRequired: "Email is required",
    emailInvalid: "Email is invalid",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 6 characters"
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
    selectLanguage: "Seleccionar Idioma",
    // Login page
    welcomeBack: "Bienvenido de nuevo",
    credentials: "Ingrese sus credenciales para acceder a su cuenta",
    email: "Correo electrónico",
    password: "Contraseña",
    forgotPassword: "¿Olvidó su contraseña?",
    signIn: "Iniciar sesión",
    signingIn: "Iniciando sesión...",
    noAccount: "¿No tiene una cuenta?",
    signUp: "Registrarse",
    iAmA: "Soy un:",
    parent: "Padre",
    teacher: "Maestro",
    // Common terms
    backToLogin: "Volver al inicio de sesión",
    emailRequired: "El correo electrónico es obligatorio",
    emailInvalid: "El correo electrónico no es válido",
    passwordRequired: "La contraseña es obligatoria",
    passwordMinLength: "La contraseña debe tener al menos 6 caracteres"
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
    selectLanguage: "Choisir la Langue",
    // Login page
    welcomeBack: "Bienvenue à nouveau",
    credentials: "Entrez vos identifiants pour accéder à votre compte",
    email: "E-mail",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    signIn: "Se connecter",
    signingIn: "Connexion en cours...",
    noAccount: "Vous n'avez pas de compte ?",
    signUp: "S'inscrire",
    iAmA: "Je suis un(e) :",
    parent: "Parent",
    teacher: "Enseignant",
    // Common terms
    backToLogin: "Retour à la connexion",
    emailRequired: "L'e-mail est requis",
    emailInvalid: "L'e-mail est invalide",
    passwordRequired: "Le mot de passe est requis",
    passwordMinLength: "Le mot de passe doit comporter au moins 6 caractères"
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
    selectLanguage: "选择语言",
    // Login page
    welcomeBack: "欢迎回来",
    credentials: "输入您的凭据以访问您的帐户",
    email: "电子邮件",
    password: "密码",
    forgotPassword: "忘记密码？",
    signIn: "登录",
    signingIn: "正在登录...",
    noAccount: "没有帐户？",
    signUp: "注册",
    iAmA: "我是：",
    parent: "家长",
    teacher: "教师",
    // Common terms
    backToLogin: "返回登录",
    emailRequired: "电子邮件是必需的",
    emailInvalid: "电子邮件无效",
    passwordRequired: "密码是必需的",
    passwordMinLength: "密码必须至少有6个字符"
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
    selectLanguage: "اختر اللغة",
    // Login page
    welcomeBack: "مرحبًا بعودتك",
    credentials: "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    noAccount: "ليس لديك حساب؟",
    signUp: "إنشاء حساب",
    iAmA: "أنا:",
    parent: "ولي أمر",
    teacher: "معلم",
    // Common terms
    backToLogin: "العودة إلى تسجيل الدخول",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "البريد الإلكتروني غير صالح",
    passwordRequired: "كلمة المرور مطلوبة",
    passwordMinLength: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"
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
    selectLanguage: "भाषा चुनें",
    // Login page
    welcomeBack: "वापसी पर स्वागत है",
    credentials: "अपने खाते तक पहुंचने के लिए अपने प्रमाण पत्र दर्ज करें",
    email: "ईमेल",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड भूल गए?",
    signIn: "साइन इन करें",
    signingIn: "साइन इन हो रहा है...",
    noAccount: "खाता नहीं है?",
    signUp: "साइन अप करें",
    iAmA: "मैं एक हूँ:",
    parent: "अभिभावक",
    teacher: "शिक्षक",
    // Common terms
    backToLogin: "लॉगिन पर वापस जाएं",
    emailRequired: "ईमेल आवश्यक है",
    emailInvalid: "ईमेल अमान्य है",
    passwordRequired: "पासवर्ड आवश्यक है",
    passwordMinLength: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए"
  },
  gu: {
    welcome: "ParentConnect માં આપનું સ્વાગત છે",
    tagline: "વિદ્યાર્થીઓની સફળતા માટે માતાપિતા અને શિક્ષકો વચ્ચેના અંતરને ઘટાડવું",
    getStarted: "શરૂ કરો",
    communication: "સરળ સંચાર",
    communicationDesc: "માતાપિતા અને શિક્ષકો વચ્ચે સીધો સંદેશાવ્યવહાર",
    events: "કાર્યક્રમ વ્યવસ્થાપન",
    eventsDesc: "શાળાના કાર્યક્રમો અને વાલી-શિક્ષક બેઠકોથી અપડેટ રહો",
    progress: "વિદ્યાર્થી પ્રગતિ",
    progressDesc: "તમારા બાળકની શૈક્ષણિક પ્રગતિ અને સિદ્ધિઓને ટ્રેક કરો",
    selectLanguage: "ભાષા પસંદ કરો",
    // Login page
    welcomeBack: "પુનઃ સ્વાગત છે",
    credentials: "તમારા એકાઉન્ટમાં પ્રવેશ કરવા માટે તમારા પ્રમાણપત્રો દાખલ કરો",
    email: "ઇમેઇલ",
    password: "પાસવર્ડ",
    forgotPassword: "પાસવર્ડ ભૂલી ગયા છો?",
    signIn: "સાઇન ઇન કરો",
    signingIn: "સાઇન ઇન થઈ રહ્યું છે...",
    noAccount: "એકાઉન્ટ નથી?",
    signUp: "સાઇન અપ કરો",
    iAmA: "હું છું:",
    parent: "વાલી",
    teacher: "શિક્ષક",
    // Common terms
    backToLogin: "લોગિન પર પાછા જાઓ",
    emailRequired: "ઇમેઇલ આવશ્યક છે",
    emailInvalid: "ઇમેઇલ અમાન્ય છે",
    passwordRequired: "પાસવર્ડ આવશ્યક છે",
    passwordMinLength: "પાસવર્ડ ઓછામાં ઓછા 6 અક્ષરનો હોવો જોઈએ"
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
