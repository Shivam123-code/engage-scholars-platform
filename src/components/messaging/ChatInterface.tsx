
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Clock, CheckCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  role: 'parent' | 'teacher';
  lastSeen?: Date;
  isOnline?: boolean;
}

interface ChatInterfaceProps {
  currentUser: ChatUser;
  recipient: ChatUser;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUser,
  recipient,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages, isScrolledToBottom]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsScrolledToBottom(isBottom);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
      // Force scroll to bottom
      setIsScrolledToBottom(true);
    }
  };
  
  // Group messages by date for cleaner display
  const groupedMessages = messages.reduce<{date: string; messages: Message[]}[]>((groups, message) => {
    const date = message.timestamp.toLocaleDateString();
    
    const existingGroup = groups.find(group => group.date === date);
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groups.push({ date, messages: [message] });
    }
    
    return groups;
  }, []);
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Get message status icon
  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case 'sent':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-full rounded-md overflow-hidden border glass-card">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={recipient.avatar} alt={recipient.name} />
            <AvatarFallback>{getInitials(recipient.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{recipient.name}</h3>
            <p className="text-xs text-muted-foreground">
              {recipient.isOnline ? (
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  Online
                </span>
              ) : recipient.lastSeen ? (
                `Last seen ${formatDistanceToNow(recipient.lastSeen, { addSuffix: true })}`
              ) : (
                `${recipient.role === 'teacher' ? 'Teacher' : 'Parent'}`
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Chat body */}
      <div 
        className="flex-grow p-4 overflow-y-auto"
        onScroll={handleScroll}
      >
        {groupedMessages.map((group, groupIndex) => (
          <div key={group.date} className="mb-4">
            <div className="flex justify-center mb-4">
              <div className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                {group.date === new Date().toLocaleDateString() ? 'Today' : group.date}
              </div>
            </div>
            
            {group.messages.map((message, msgIndex) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const showAvatar = msgIndex === 0 || 
                group.messages[msgIndex - 1].senderId !== message.senderId;
              
              return (
                <div 
                  key={message.id}
                  className={cn(
                    "flex mb-4",
                    isCurrentUser ? "justify-end" : "justify-start"
                  )}
                >
                  {!isCurrentUser && showAvatar && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  {!isCurrentUser && !showAvatar && <div className="w-10" />}
                  
                  <div 
                    className={cn(
                      "max-w-[75%]",
                      isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
                      "px-4 py-2 rounded-lg"
                    )}
                  >
                    <div className="break-words">{message.content}</div>
                    <div 
                      className={cn(
                        "text-xs mt-1 flex justify-end items-center space-x-1",
                        isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      <span>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {isCurrentUser && (
                        <span>{getStatusIcon(message.status)}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
