
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MessageSquare, Bell, ExternalLink, Book, PieChart, TrendingUp, UserCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import EventCard, { EventProps } from '../events/EventCard';
import StudentCard, { StudentProps } from '../students/StudentCard';
import { useToast } from '@/hooks/use-toast';

interface ParentDashboardProps {
  parent: {
    id: string;
    name: string;
    avatar?: string;
  };
  students: StudentProps[];
  events: EventProps[];
  notifications: {
    id: string;
    title: string;
    description: string;
    date: Date;
    isRead: boolean;
  }[];
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({
  parent,
  students,
  events,
  notifications
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  // Event RSVP handling
  const handleRsvp = (eventId: string) => {
    toast({
      title: "RSVP confirmed",
      description: "You have successfully registered for this event.",
    });
  };
  
  const handleCancelRsvp = (eventId: string) => {
    toast({
      title: "RSVP cancelled",
      description: "Your registration has been cancelled.",
    });
  };
  
  // Get upcoming events (next 2)
  const upcomingEvents = events
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 2);
  
  // Get unread notifications count
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {parent.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your children today.</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link to="/messaging">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Link>
          </Button>
          <Button asChild>
            <Link to="/events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            Notifications
            {unreadNotifications > 0 && (
              <Badge className="ml-2 px-1 py-0 h-5 min-w-5 flex items-center justify-center rounded-full">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-slide-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Children summary card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Children</CardTitle>
                <CardDescription>Quick summary of all students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map(student => (
                    <div key={student.id} className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{student.name}</p>
                          <Badge variant="outline" className="text-xs">
                            Grade {student.grade}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Teacher: {student.teacherName}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link to="/students">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Attendance Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <div className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5 text-muted-foreground" />
                    Attendance
                  </div>
                </CardTitle>
                <CardDescription>Monthly attendance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map(student => (
                    <div key={student.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{student.name}</p>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((student.attendance.present / student.attendance.total) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(student.attendance.present / student.attendance.total) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Present: {student.attendance.present} days</span>
                        <span>Absent: {student.attendance.absent} days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Academic Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
                    Academic Progress
                  </div>
                </CardTitle>
                <CardDescription>Performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map(student => (
                    <div key={student.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{student.name}</p>
                        <Badge 
                          variant={
                            student.performanceStatus === 'excellent' || 
                            student.performanceStatus === 'good' ? 'default' : 'outline'
                          }
                          className="capitalize"
                        >
                          {student.performanceStatus.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-primary/10 rounded-md">
                          <p className="text-xs text-muted-foreground">Math</p>
                          <p className="font-medium">B+</p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-md">
                          <p className="text-xs text-muted-foreground">Science</p>
                          <p className="font-medium">A-</p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-md">
                          <p className="text-xs text-muted-foreground">English</p>
                          <p className="font-medium">A</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Events */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    <CardDescription>Next events on your calendar</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/events">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map(event => (
                      <EventCard
                        key={event.id}
                        {...event}
                        onRsvp={handleRsvp}
                        onCancelRsvp={handleCancelRsvp}
                      />
                    ))
                  ) : (
                    <div className="md:col-span-2 p-6 text-center text-muted-foreground">
                      <Calendar className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>No upcoming events</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Notifications */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Recent Notifications</CardTitle>
                    <CardDescription>Updates from school</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        !notification.isRead ? 'bg-primary/5 border-primary/20' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-medium ${!notification.isRead ? 'text-primary' : ''}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <Badge variant="default" className="ml-2 mt-1">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.date.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="animate-slide-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.map(student => (
              <StudentCard key={student.id} {...student} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="animate-slide-in">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Stay updated with important announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        !notification.isRead ? 'bg-primary/5 border-primary/20' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-medium ${!notification.isRead ? 'text-primary' : ''}`}>
                            {notification.title}
                          </p>
                          <p className="text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <Badge variant="default" className="ml-2 mt-1">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {notification.date.toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;
