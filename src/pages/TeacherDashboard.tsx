
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, MessageSquare, Users, LogOut, Plus, Send, BookOpen, ChevronRight, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleLogout = () => {
    // This would be replaced with actual logout logic
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ParentConnect</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Welcome, Teacher!</h2>
          <p className="text-muted-foreground">
            Manage your classroom and communicate with parents effectively.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">
                    In your class
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    From 4 parents
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Next: Parent-Teacher Conference (3 days)
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest classroom updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Math Quiz Graded</p>
                        <p className="text-sm text-muted-foreground">28 students - Avg. score: 85%</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Science Project Assigned</p>
                        <p className="text-sm text-muted-foreground">Due in 2 weeks</p>
                      </div>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Parent Meeting Scheduled</p>
                        <p className="text-sm text-muted-foreground">With Emily's parents</p>
                      </div>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Assignments Due</CardTitle>
                  <CardDescription>Track upcoming student submissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Math Worksheet</p>
                      <p className="text-sm">Tomorrow</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium">Reading Response</p>
                      <p className="text-sm">3 days</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium">Science Project</p>
                      <p className="text-sm">2 weeks</p>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Assignment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and update student information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full">
                            EA
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">Emily Anderson</h3>
                          <p className="text-sm text-muted-foreground">Student ID: S-12345</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Overall Grade</p>
                          <p className="font-medium">A (94%)</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Attendance</p>
                          <p className="font-medium">96%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <div className="bg-blue-500 text-white flex h-10 w-10 items-center justify-center rounded-full">
                            JB
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">Jacob Brown</h3>
                          <p className="text-sm text-muted-foreground">Student ID: S-12346</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Overall Grade</p>
                          <p className="font-medium">B+ (86%)</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Attendance</p>
                          <p className="font-medium">92%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <div className="bg-green-500 text-white flex h-10 w-10 items-center justify-center rounded-full">
                            SM
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">Sophia Martinez</h3>
                          <p className="text-sm text-muted-foreground">Student ID: S-12347</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Overall Grade</p>
                          <p className="font-medium">A- (91%)</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Attendance</p>
                          <p className="font-medium">99%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <div className="bg-purple-500 text-white flex h-10 w-10 items-center justify-center rounded-full">
                            LW
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">Liam Wilson</h3>
                          <p className="text-sm text-muted-foreground">Student ID: S-12348</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Overall Grade</p>
                          <p className="font-medium">B (83%)</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Attendance</p>
                          <p className="font-medium">88%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  View All Students
                </Button>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with parents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <div className="bg-yellow-500 text-white flex h-10 w-10 items-center justify-center rounded-full">
                          MA
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium">Mrs. Anderson</p>
                        <p className="text-sm text-muted-foreground">Emily's Parent</p>
                      </div>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">
                        Hi Ms. Smith, I'm concerned about Emily's latest math test. Could we schedule a meeting to discuss how we can help her improve?
                      </p>
                      <p className="text-xs text-muted-foreground text-right mt-2">
                        Received today at 10:15 AM
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <div className="bg-orange-500 text-white flex h-10 w-10 items-center justify-center rounded-full">
                          DB
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium">Mr. Brown</p>
                        <p className="text-sm text-muted-foreground">Jacob's Parent</p>
                      </div>
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">
                        Jacob mentioned a science project that's due soon. Could you share the requirements and rubric so we can help him prepare?
                      </p>
                      <p className="text-xs text-muted-foreground text-right mt-2">
                        Received yesterday at 3:45 PM
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5 ml-8">
                    <CardContent className="p-4">
                      <p className="text-sm">
                        I've attached the science project requirements to this message. The project is due in 2 weeks. Let me know if you have any questions!
                      </p>
                      <p className="text-xs text-muted-foreground text-right mt-2">
                        Sent yesterday at 4:30 PM
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                  <Button size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  This feature will be connected to Supabase real-time messaging.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Create and manage school events</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Card className="overflow-hidden">
                    <div className="bg-primary h-2" />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Parent-Teacher Conference</h3>
                          <p className="text-sm text-muted-foreground">
                            Individual meetings with parents to discuss student progress
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="bg-primary/10">3 days</Badge>
                          <Badge variant="outline">28 Attendees</Badge>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>June 15, 2023 • 3:00 PM - 6:00 PM</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>School Auditorium</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-muted/10 p-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Send Reminder</Button>
                    </CardFooter>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="bg-blue-500 h-2" />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Science Fair</h3>
                          <p className="text-sm text-muted-foreground">
                            Annual showcase of student science projects
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="bg-blue-500/10">2 weeks</Badge>
                          <Badge variant="outline">Class Event</Badge>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>June 28, 2023 • 10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>School Gymnasium</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-muted/10 p-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Send Reminder</Button>
                    </CardFooter>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="bg-green-500 h-2" />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">End of Year Celebration</h3>
                          <p className="text-sm text-muted-foreground">
                            Celebration of student achievements for the academic year
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="bg-green-500/10">1 month</Badge>
                          <Badge variant="outline">School Event</Badge>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>July 15, 2023 • 1:00 PM - 3:00 PM</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>School Playground</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-muted/10 p-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Send Reminder</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;
