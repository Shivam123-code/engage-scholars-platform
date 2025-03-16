
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { Message, ChatUser } from "@/components/messaging/ChatInterface";
import MessagingHeader from "@/components/messaging/MessagingHeader";
import TeacherContactList from "@/components/messaging/TeacherContactList";
import TranslationSettings from "@/components/messaging/TranslationSettings";
import MessageContainer from "@/components/messaging/MessageContainer";
import { mockTeachers, mockMessages } from "@/components/messaging/mockData";

const Messaging = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("student");
  const { t, language } = useLanguage();
  
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser] = useState<ChatUser>({
    id: "p1",
    name: "Parent",
    role: "parent",
  });
  
  const {
    isEnabled: isTranslationEnabled,
    sourceLanguage,
    targetLanguage,
    toggleTranslation,
    setSourceLanguage,
    setTargetLanguage
  } = useTranslation();
  
  useEffect(() => {
    setSourceLanguage(language);
    setTargetLanguage(language);
  }, [language, setSourceLanguage, setTargetLanguage]);
  
  useEffect(() => {
    if (selectedTeacherId) {
      setMessages(mockMessages[selectedTeacherId] || []);
    }
  }, [selectedTeacherId]);
  
  useEffect(() => {
    if (mockTeachers.length > 0 && !selectedTeacherId) {
      setSelectedTeacherId(mockTeachers[0].id);
    }
  }, [selectedTeacherId]);
  
  const handleLanguageChange = (type: 'source' | 'target', value: string) => {
    if (type === 'source') {
      setSourceLanguage(value);
    } else {
      setTargetLanguage(value);
    }
    
    toast({
      title: t.languageUpdated || "Language Updated",
      description: `${type === 'source' ? (t.translationSourceLang || "Translation source language set to") : (t.translationTargetLang || "Translation target language set to")} ${
        languages.find(l => l.code === value)?.name
      }`,
    });
  };
  
  const selectedTeacher = mockTeachers.find(t => t.id === selectedTeacherId);
  
  return (
    <div className="min-h-screen bg-background">
      <MessagingHeader isTranslationEnabled={isTranslationEnabled} />
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TeacherContactList 
              teachers={mockTeachers}
              selectedTeacherId={selectedTeacherId}
              onSelectTeacher={setSelectedTeacherId}
            />
            
            <TranslationSettings 
              enabled={isTranslationEnabled}
              onToggle={toggleTranslation}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onLanguageChange={handleLanguageChange}
              className="mt-6"
            />
          </div>
          
          <div className="md:col-span-2">
            <MessageContainer
              selectedTeacher={selectedTeacher}
              currentUser={currentUser}
              messages={messages}
              isTranslationEnabled={isTranslationEnabled}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              setMessages={setMessages}
              mockMessages={mockMessages}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messaging;
