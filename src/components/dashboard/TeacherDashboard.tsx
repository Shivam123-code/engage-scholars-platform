
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MessageSquare, Users, Plus, FileEdit, PieChart, TrendingUp, UserCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import EventCard, { EventProps } from '../events/EventCard';
import { StudentProps } from '../students/StudentCard';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface TeacherDashboardProps {
  teacher: {
    id: string;
    name: string;
    avatar?: string;
    subject?: string;
    grade?: string;
  };
  students: StudentProps[];
  events: EventProps[];
  announcements: {
    id: string;
    title: string;
    description: string;
    date: Date;
  }[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  students,
  events,
  announcements
}) => {
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const { toast } = useToast();
  
  // Get upcoming events (next 2)
  const upcomingEvents = events
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 2);
  
  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim()) {
      toast({
        title: "Announcement created",
        description: "Your announcement has been sent to all parents.",
      });
      setNewAnnouncement('');
      setShowAddAnnouncement(false);
    }
  };
  
  // Calculate class performance metrics
  const performanceMetrics = {
    excellent: students.filter(s => s.performanceStatus === 'excellent').length,
    good: students.filter(s => s.performanceStatus === 'good').length,
    average: students.filter(s => s.performanceStatus === 'average').length,
    needsImprovement: students.filter(s => s.performanceStatus === 'needs-improvement').length,
  };
  
  // Calculate attendance metrics
  const attendanceMetrics = students.reduce(
    (acc, student) => {
      acc.present += student.attendance.present;
      acc.absent += student.attendance.absent;
      acc.late += student.attendance.late;
      acc.total += student.attendance.total;
      return acc;
    },
    { present: 0, absent: 0, late: 0, total: 0 }
  );
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {teacher.name}</h1>
          <p className="text-muted-foreground">
            {teacher.subject ? `${teacher.subject} Teacher` : 'Teacher'} 
            {teacher.grade ? ` - Grade ${teacher.grade}` : ''}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link to="/messaging">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Link>
          </Button>
          <Button asChild>
            <Link to="/students">
              <Users className="h-4 w-4 mr-2" />
              Students
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-slide-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Class Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Class Overview</CardTitle>
                <CardDescription>Summary of your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Students</span>
                    <span className="font-medium">{students.length}</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Attendance Rate</span>
                      <span className="font-medium">
                        {Math.round((attendanceMetrics.present / attendanceMetrics.total) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(attendanceMetrics.present / attendanceMetrics.total) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 border rounded-md text-center">
                      <p className="text-xl font-semibold">{performanceMetrics.excellent + performanceMetrics.good}</p>
                      <p className="text-xs text-muted-foreground">Performing Well</p>
                    </div>
                    <div className="p-3 border rounded-md text-center">
                      <p className="text-xl font-semibold">{performanceMetrics.average + performanceMetrics.needsImprovement}</p>
                      <p className="text-xs text-muted-foreground">Need Attention</p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link to="/performance">
                      <TrendingUp className="h-3 w-3 mr-2" />
                      View Full Report
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Performance Distribution */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <div className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-muted-foreground" />
                    Performance
                  </div>
                </CardTitle>
                <CardDescription>Student performance distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries({
                    'Excellent': performanceMetrics.excellent,
                    'Good': performanceMetrics.good,
                    'Average': performanceMetrics.average,
                    'Needs Improvement': performanceMetrics.needsImprovement
                  }).map(([status, count]) => (
                    <div key={status} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{status}</span>
                        <span className="text-sm text-muted-foreground">
                          {count} students ({Math.round((count / students.length) * 100)}%)
                        </span>
                      </div>
                      <Progress 
                        value={(count / students.length) * 100} 
                        className={`h-2 ${
                          status === 'Excellent' ? 'bg-green-100' : 
                          status === 'Good' ? 'bg-blue-100' :
                          status === 'Average' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Attendance Breakdown */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <div className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5 text-muted-foreground" />
                    Attendance
                  </div>
                </CardTitle>
                <CardDescription>Monthly attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 border rounded-md text-center">
                      <p className="text-xl font-semibold">
                        {Math.round((attendanceMetrics.present / attendanceMetrics.total) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Present</p>
                    </div>
                    <div className="p-3 border rounded-md text-center">
                      <p className="text-xl font-semibold">
                        {Math.round((attendanceMetrics.absent / attendanceMetrics.total) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Absent</p>
                    </div>
                    <div className="p-3 border rounded-md text-center">
                      <p className="text-xl font-semibold">
                        {Math.round((attendanceMetrics.late / attendanceMetrics.total) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Late</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Students with low attendance:</h4>
                    <div className="space-y-2">
                      {students
                        .filter(s => (s.attendance.present / s.attendance.total) < 0.8)
                        .slice(0, 3)
                        .map(student => (
                          <div key={student.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{student.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {Math.round((student.attendance.present / student.attendance.total) * 100)}%
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Announcements */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Recent Announcements</CardTitle>
                    <CardDescription>Updates sent to parents</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddAnnouncement(!showAddAnnouncement)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddAnnouncement && (
                  <div className="mb-4 p-3 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">New Announcement</h4>
                    <div className="space-y-2">
                      <Input
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        placeholder="Type your announcement..."
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={handleAddAnnouncement}
                          className="w-full"
                        >
                          Send
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddAnnouncement(false)}
                          className="w-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {announcements.slice(0, 3).map(announcement => (
                    <div
                      key={announcement.id}
                      className="p-3 rounded-lg border"
                    >
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {announcement.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {announcement.date.toLocaleString()}
                      </p>
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
                    <CardDescription>School events on your calendar</CardDescription>
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
                      <EventCard key={event.id} {...event} />
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
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="animate-slide-in">
          <Card>
            <CardHeader>
              <CardTitle>Your Students</CardTitle>
              <CardDescription>Manage and update student information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Student list */}
                <div className="border rounded-md">
                  <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium text-sm">
                    <div>Student</div>
                    <div>Performance</div>
                    <div>Attendance</div>
                    <div>Actions</div>
                  </div>
                  {students.map(student => (
                    <div key={student.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">Grade {student.grade}</p>
                        </div>
                      </div>
                      <div>
                        <Badge 
                          variant="outline" 
                          className={`capitalize ${
                            student.performanceStatus === 'excellent' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                              : student.performanceStatus === 'good'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                              : student.performanceStatus === 'average'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                          }`}
                        >
                          {student.performanceStatus.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={(student.attendance.present / student.attendance.total) * 100} 
                            className="h-2 flex-grow"
                          />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {Math.round((student.attendance.present / student.attendance.total) * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/students/${student.id}`}>
                            <FileEdit className="h-3 w-3 mr-1" />
                            Update
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/messaging?student=${student.id}`}>
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements" className="animate-slide-in">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Create and manage announcements</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.length > 0 ? (
                  announcements.map(announcement => (
                    <div
                      key={announcement.id}
                      className="p-4 rounded-lg border hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{announcement.title}</p>
                          <p className="text-muted-foreground mt-1">
                            {announcement.description}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {announcement.date.toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>No announcements created yet</p>
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

export default TeacherDashboard;
