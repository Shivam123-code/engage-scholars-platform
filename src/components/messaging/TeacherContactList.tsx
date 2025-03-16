
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatUser } from "./ChatInterface";

interface TeacherContactListProps {
  teachers: ChatUser[];
  selectedTeacherId: string;
  onSelectTeacher: (teacherId: string) => void;
}

const TeacherContactList: React.FC<TeacherContactListProps> = ({
  teachers,
  selectedTeacherId,
  onSelectTeacher,
}) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>{t.contacts || "Contacts"}</span>
        </CardTitle>
        <CardDescription>{t.selectTeacher || "Select a teacher to message"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className={`p-3 rounded-lg flex items-center cursor-pointer hover:bg-muted transition-colors ${
              selectedTeacherId === teacher.id ? 'bg-muted' : ''
            }`}
            onClick={() => onSelectTeacher(teacher.id)}
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
  );
};

export default TeacherContactList;
