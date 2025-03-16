
import { ChatUser, Message } from "./ChatInterface";

export const mockTeachers: ChatUser[] = [
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

export const mockMessages: Record<string, Message[]> = {
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
