
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import ChatInterface, { ChatUser, Message } from "./ChatInterface";

interface MessageContainerProps {
  selectedTeacher: ChatUser | undefined;
  currentUser: ChatUser;
  messages: Message[];
  isTranslationEnabled: boolean;
  sourceLanguage: string;
  targetLanguage: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  mockMessages: Record<string, Message[]>;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  selectedTeacher,
  currentUser,
  messages,
  isTranslationEnabled,
  sourceLanguage,
  targetLanguage,
  setMessages,
  mockMessages,
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSendMessage = (content: string) => {
    if (!selectedTeacher) return;
    
    let translatedContent = content;
    
    if (isTranslationEnabled && sourceLanguage !== targetLanguage) {
      setIsTranslating(true);
      
      setTimeout(() => {
        setIsTranslating(false);
        
        const newMessage: Message = {
          id: `m${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          content: translatedContent,
          timestamp: new Date(),
          status: "sent",
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        mockMessages[selectedTeacher.id] = [...(mockMessages[selectedTeacher.id] || []), newMessage];
        
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
      const newMessage: Message = {
        id: `m${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        content: content,
        timestamp: new Date(),
        status: "sent",
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      mockMessages[selectedTeacher.id] = [...(mockMessages[selectedTeacher.id] || []), newMessage];
    }
  };

  if (!selectedTeacher) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">{t.startMessaging || "Select a teacher to start messaging"}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ChatInterface
      currentUser={currentUser}
      recipient={selectedTeacher}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

export default MessageContainer;
