
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarClock, GraduationCap, UserCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface StudentProps {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
  teacherName: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
    total: number;
  };
  performanceStatus: 'excellent' | 'good' | 'average' | 'needs-improvement';
}

const StudentCard: React.FC<StudentProps> = ({
  id,
  name,
  grade,
  avatar,
  teacherName,
  attendance,
  performanceStatus,
}) => {
  // Calculate attendance percentage
  const attendancePercentage = Math.round(
    (attendance.present / attendance.total) * 100
  );
  
  // Get performance status badge color
  const getStatusColor = () => {
    switch (performanceStatus) {
      case 'excellent':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'good':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'average':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'needs-improvement':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md card-hover">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <GraduationCap className="h-4 w-4 mr-1" />
            Grade {grade}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center">
              <UserCheck className="h-4 w-4 mr-1" /> Teacher
            </span>
            <span className="text-sm font-medium">{teacherName}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center">
              <CalendarClock className="h-4 w-4 mr-1" /> Attendance
            </span>
            <Badge variant={attendancePercentage >= 90 ? "default" : "outline"}>
              {attendancePercentage}%
            </Badge>
          </div>
          
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Performance</span>
              <Badge 
                variant="outline" 
                className={`capitalize ${getStatusColor()}`}
              >
                {performanceStatus.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/messaging?student=${id}`}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Teacher
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
