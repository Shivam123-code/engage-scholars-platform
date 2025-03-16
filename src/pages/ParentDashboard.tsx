
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, MessageSquare, BookOpen, LogOut, Send, PlusCircle, Users, BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ParentDashboard = () => {
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome, Parent!</h2>
            <p className="text-muted-foreground">
              Here's what's happening with your children's education.
            </p>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigate("/messaging")}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button variant="outline" onClick={() => navigate("/community")}>
              <Users className="h-4 w-4 mr-2" />
              Community
            </Button>
            <Button variant="outline" onClick={() => navigate("/learning-insights")}>
              <BrainCircuit className="h-4 w-4 mr-2" />
              Learning Insights
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    From 2 teachers
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    Next: Parent-Teacher Conference (3 days)
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    For this week
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your children's recent academic activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Math Quiz Completed</p>
                        <p className="text-sm text-muted-foreground">Emily - Grade: A</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Science Project Submitted</p>
                        <p className="text-sm text-muted-foreground">Jacob - Awaiting grade</p>
                      </div>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">English Essay Feedback</p>
                        <p className="text-sm text-muted-foreground">Emily - Revision requested</p>
                      </div>
                      <p className="text-sm text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Attendance</CardTitle>
                  <CardDescription>Monthly attendance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Emily</p>
                        <p className="text-sm font-medium">96%</p>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "96%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Jacob</p>
                        <p className="text-sm font-medium">92%</p>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "92%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with your children's teachers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full">
                          MS
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium">Ms. Smith</p>
                        <p className="text-sm text-muted-foreground">Math Teacher</p>
                      </div>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">
                        Hello! I wanted to let you know that Emily has been doing great in her
                        math assignments. She scored 95% on the last quiz.
                      </p>
                      <p className="text-xs text-muted-foreground text-right mt-2">
                        Received today at 2:30 PM
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <div className="bg-blue-500 text-white flex h-10 w-10 items-center justify-center rounded-full">
                          MJ
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium">Mr. Johnson</p>
                        <p className="text-sm text-muted-foreground">Science Teacher</p>
                      </div>
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">
                        Reminder: The science project is due next Friday. Jacob should bring his 
                        materials to class tomorrow so I can check his progress.
                      </p>
                      <p className="text-xs text-muted-foreground text-right mt-2">
                        Received yesterday at 4:15 PM
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
              <CardHeader>
                <CardTitle>School Events</CardTitle>
                <CardDescription>Stay updated with upcoming school events</CardDescription>
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
                            Meet with teachers to discuss your child's progress
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-primary/10">3 days</Badge>
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
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="bg-blue-500 h-2" />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Science Fair</h3>
                          <p className="text-sm text-muted-foreground">
                            Annual school science fair with student projects
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-blue-500/10">2 weeks</Badge>
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
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  This feature will be connected to Supabase data storage.
                </p>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Track your children's academic achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Emily - Grade 5</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Math</p>
                        <p className="text-sm font-medium">94%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "94%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Science</p>
                        <p className="text-sm font-medium">88%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "88%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">English</p>
                        <p className="text-sm font-medium">91%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "91%" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Jacob - Grade 3</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Math</p>
                        <p className="text-sm font-medium">86%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "86%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Science</p>
                        <p className="text-sm font-medium">92%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "92%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">English</p>
                        <p className="text-sm font-medium">79%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-yellow-500" style={{ width: "79%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Last updated: June 8, 2023
                </p>
                <Button variant="outline" size="sm">
                  Download Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ParentDashboard;
