
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, MessageSquare, Calendar, ThumbsUp, Share, Flag, Search, Plus, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'parent' | 'teacher';
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked?: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  isAttending?: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  topics: string[];
  isMember?: boolean;
}

const Community = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("posts");
  const [newPostContent, setNewPostContent] = useState("");
  
  // Mock data
  const posts: Post[] = [
    {
      id: "p1",
      author: {
        id: "u1",
        name: "Sarah Wilson",
        role: 'parent',
      },
      content: "Does anyone have recommendations for math tutoring services? My daughter is struggling with fractions and could use some extra help.",
      timestamp: "2023-06-07T14:32:00",
      likes: 8,
      replies: 5,
    },
    {
      id: "p2",
      author: {
        id: "u2",
        name: "Mr. Johnson",
        role: 'teacher',
      },
      content: "Reminder: The school science fair is coming up next month! Students should start thinking about their projects now. I'm happy to provide guidance during office hours.",
      timestamp: "2023-06-06T10:15:00",
      likes: 15,
      replies: 3,
      isLiked: true,
    },
    {
      id: "p3",
      author: {
        id: "u3",
        name: "David Chen",
        role: 'parent',
      },
      content: "I just wanted to share a great educational app my son has been using called 'MathWhiz'. It's really helped improve his multiplication skills through fun games. Highly recommend!",
      timestamp: "2023-06-05T16:45:00",
      likes: 12,
      replies: 7,
    },
  ];
  
  const events: Event[] = [
    {
      id: "e1",
      title: "Parent-Teacher Spring Picnic",
      description: "Join us for our annual spring picnic! This is a great opportunity for parents, teachers, and students to connect outside the classroom in a fun setting. Food and drinks will be provided.",
      date: "2023-06-24",
      time: "12:00 PM - 3:00 PM",
      location: "Central Park",
      organizer: "PTA",
      attendees: 45,
    },
    {
      id: "e2",
      title: "Math & Science Night",
      description: "Interactive stations for families to explore math and science concepts together. Teachers will demonstrate fun experiments and activities you can do at home.",
      date: "2023-07-12",
      time: "6:00 PM - 8:00 PM",
      location: "School Gymnasium",
      organizer: "Science Department",
      attendees: 28,
      isAttending: true,
    },
    {
      id: "e3",
      title: "Summer Reading Program Kickoff",
      description: "Learn about our summer reading challenge, sign up for reading logs, and enjoy storytelling sessions. Library cards will be available for those who need them.",
      date: "2023-06-18",
      time: "10:00 AM - 12:00 PM",
      location: "School Library",
      organizer: "Ms. Thompson",
      attendees: 34,
    },
  ];
  
  const groups: Group[] = [
    {
      id: "g1",
      name: "Grade 5 Parents",
      description: "A group for parents of 5th graders to discuss curriculum, events, and share resources.",
      members: 32,
      topics: ["Homework", "Field Trips", "End-of-year Activities"],
      isMember: true,
    },
    {
      id: "g2",
      name: "STEM Enthusiasts",
      description: "For parents and teachers interested in promoting science, technology, engineering, and math education.",
      members: 45,
      topics: ["Science Projects", "Robotics", "Math Competitions"],
    },
    {
      id: "g3",
      name: "Special Education Support",
      description: "A supportive community for parents of children with special educational needs to share experiences and resources.",
      members: 28,
      topics: ["IEP Resources", "Accommodations", "Success Stories"],
    },
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const formatTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return formatDate(dateString);
    }
  };
  
  const handlePostAction = (action: "like" | "reply" | "share" | "report", post: Post) => {
    switch (action) {
      case "like":
        toast({
          title: post.isLiked ? "Post Unliked" : "Post Liked",
          description: `You ${post.isLiked ? "unliked" : "liked"} ${post.author.name}'s post.`,
        });
        break;
      case "reply":
        toast({
          title: "Reply to Post",
          description: "This feature will allow replying to posts. Coming soon!",
        });
        break;
      case "share":
        toast({
          title: "Share Post",
          description: "This feature will allow sharing posts. Coming soon!",
        });
        break;
      case "report":
        toast({
          title: "Report Post",
          description: "This feature will allow reporting inappropriate content. Coming soon!",
        });
        break;
    }
  };
  
  const handleEventAction = (action: "attend" | "share", event: Event) => {
    switch (action) {
      case "attend":
        toast({
          title: event.isAttending ? "Not Attending" : "Attending",
          description: `You are ${event.isAttending ? "no longer attending" : "now attending"} ${event.title}.`,
        });
        break;
      case "share":
        toast({
          title: "Share Event",
          description: "This feature will allow sharing events. Coming soon!",
        });
        break;
    }
  };
  
  const handleGroupAction = (action: "join" | "leave", group: Group) => {
    switch (action) {
      case "join":
        toast({
          title: "Group Joined",
          description: `You are now a member of ${group.name}.`,
        });
        break;
      case "leave":
        toast({
          title: "Group Left",
          description: `You are no longer a member of ${group.name}.`,
        });
        break;
    }
  };
  
  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Post Created",
      description: "Your post has been published to the community.",
    });
    
    setNewPostContent("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/parent-dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            School Community
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Connect & Collaborate</h2>
          <p className="text-muted-foreground">
            Build relationships with other parents and teachers
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="groups">
              <Users className="h-4 w-4 mr-2" />
              Groups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Create Post</CardTitle>
                <CardDescription>Share questions, resources, or ideas with the school community</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="What's on your mind?"
                  className="min-h-[100px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleCreatePost}>
                  Post to Community
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <h4 className="font-semibold">{post.author.name}</h4>
                          <Badge className="ml-2 text-xs" variant="outline">
                            {post.author.role === 'teacher' ? 'Teacher' : 'Parent'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p>{post.content}</p>
                  </CardContent>
                  <CardFooter className="pt-0 border-t flex items-center justify-between">
                    <div className="flex space-x-1 text-xs text-muted-foreground">
                      <span>{post.likes} likes</span>
                      <span>•</span>
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={post.isLiked ? "text-primary" : ""}
                        onClick={() => handlePostAction("like", post)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handlePostAction("reply", post)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handlePostAction("share", post)}
                      >
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Button variant="outline" size="sm" onClick={() => {
                toast({
                  title: "Create Event",
                  description: "This feature will allow creating community events. Coming soon!",
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
            
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="mt-1 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(event.date)} • {event.time}
                        </CardDescription>
                      </div>
                      {event.isAttending && (
                        <Badge>Attending</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm mb-4">{event.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attendees • Organized by {event.organizer}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button 
                      variant={event.isAttending ? "outline" : "default"}
                      className="mr-2"
                      onClick={() => handleEventAction("attend", event)}
                    >
                      {event.isAttending ? "Cancel RSVP" : "RSVP"}
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => handleEventAction("share", event)}
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Community Groups</h3>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search groups..." className="pl-10" />
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Create Group",
                    description: "This feature will allow creating community groups. Coming soon!",
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((group) => (
                <Card key={group.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.members} members</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm mb-4">{group.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary">{topic}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button 
                      variant={group.isMember ? "outline" : "default"}
                      className="w-full"
                      onClick={() => handleGroupAction(group.isMember ? "leave" : "join", group)}
                    >
                      {group.isMember ? "Leave Group" : "Join Group"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Community;
