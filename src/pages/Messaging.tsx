
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatInterface, { Message, ChatUser } from "@/components/messaging/ChatInterface";
import TranslationSettings from "@/components/messaging/TranslationSettings";
import { useLanguage, languages } from "@/contexts/LanguageContext";

// Mock data
const mockTeachers: ChatUser[] = [
  {
    id: "t1",
    name: "Ms. Smith",
    avatar: "",
    role: "teacher",
    isOnline: true,
  },
  {
    id: "t2",
    name: "Mr. Johnson",
    avatar: "",
    role: "teacher",
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "t3",
    name: "Mrs. Davis",
    avatar: "",
    role: "teacher",
    lastSeen: new Date(Date.now() - 86400000), // 1 day ago
  },
];

const mockMessages: Record<string, Message[]> = {
  t1: [
    {
      id: "m1",
      senderId: "t1",
      senderName: "Ms. Smith",
      content: "Hello! Emily has been doing great in math class this week.",
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      status: "read",
    },
    {
      id: "m2",
      senderId: "p1",
      senderName: "Parent",
      content: "That's great to hear! She's been practicing a lot at home.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: "read",
    },
  ],
  t2: [
    {
      id: "m3",
      senderId: "t2",
      senderName: "Mr. Johnson",
      content: "Reminder: The science project is due next Friday.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      status: "read",
    },
  ],
  t3: [],
};

const Messaging = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
  
  // Translation settings
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState(language);
  const [targetLanguage, setTargetLanguage] = useState(language);
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Update source and target languages when the app language changes
  useEffect(() => {
    setSourceLanguage(language);
    setTargetLanguage(language);
  }, [language]);
  
  useEffect(() => {
    if (selectedTeacherId) {
      setMessages(mockMessages[selectedTeacherId] || []);
    }
  }, [selectedTeacherId]);
  
  useEffect(() => {
    // Auto-select the first teacher if none selected
    if (mockTeachers.length > 0 && !selectedTeacherId) {
      setSelectedTeacherId(mockTeachers[0].id);
    }
  }, [selectedTeacherId]);
  
  const handleSendMessage = (content: string) => {
    if (!selectedTeacherId) return;
    
    let translatedContent = content;
    
    // Simulate translation (in a real implementation, this would call a translation API)
    if (isTranslationEnabled && sourceLanguage !== targetLanguage) {
      setIsTranslating(true);
      
      // Simulate translation delay
      setTimeout(() => {
        setIsTranslating(false);
        
        // Add message to chat
        const newMessage: Message = {
          id: `m${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          content: translatedContent,
          timestamp: new Date(),
          status: "sent",
        };
        
        setMessages([...messages, newMessage]);
        
        // Update mocked messages data
        mockMessages[selectedTeacherId] = [...(mockMessages[selectedTeacherId] || []), newMessage];
        
        // Show translation notification
        if (isTranslationEnabled && sourceLanguage !== targetLanguage) {
          toast({
            title: t.messageTranslated || "Message Translated",
            description: `${t.translatedFrom || "Your message was automatically translated from"} ${
              languages.find(l => l.code === sourceLanguage)?.name
            } ${t.translatedTo || "to"} ${
              languages.find(l => l.code === targetLanguage)?.name
            }`,
          });
        }
      }, 1000);
    } else {
      // Add message directly without translation
      const newMessage: Message = {
        id: `m${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        content: content,
        timestamp: new Date(),
        status: "sent",
      };
      
      setMessages([...messages, newMessage]);
      
      // Update mocked messages data
      mockMessages[selectedTeacherId] = [...(mockMessages[selectedTeacherId] || []), newMessage];
    }
  };
  
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
          
          {isTranslationEnabled && (
            <div className="ml-auto flex items-center text-sm">
              <Languages className="h-4 w-4 mr-1 text-primary" />
              <span>{t.translation || "Translation"} {t.active || "Active"}</span>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span>{t.contacts || "Contacts"}</span>
                </CardTitle>
                <CardDescription>{t.selectTeacher || "Select a teacher to message"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTeachers.map(teacher => (
                  <div
                    key={teacher.id}
                    className={`p-3 rounded-lg flex items-center cursor-pointer hover:bg-muted transition-colors ${
                      selectedTeacherId === teacher.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedTeacherId(teacher.id)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback>
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {teacher.isOnline ? (
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                            {t.online || "Online"}
                          </span>
                        ) : teacher.lastSeen ? (
                          `${t.lastSeen || "Last seen"} ${new Date(teacher.lastSeen).toLocaleDateString()}`
                        ) : (
                          t.offline || "Offline"
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <TranslationSettings 
              enabled={isTranslationEnabled}
              onToggle={() => setIsTranslationEnabled(!isTranslationEnabled)}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onLanguageChange={handleLanguageChange}
              className="mt-6"
            />
          </div>
          
          <div className="md:col-span-2">
            {selectedTeacher ? (
              <ChatInterface
                currentUser={currentUser}
                recipient={selectedTeacher}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent>
                  <p className="text-muted-foreground">{t.startMessaging || "Select a teacher to start messaging"}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messaging;
