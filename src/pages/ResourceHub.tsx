
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, ArrowLeft, Search, FileText, Video, Plus, Upload, Download, FolderOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "document" | "video" | "worksheet" | "link";
  subject: string;
  grade: string;
  uploadedBy: string;
  uploadedAt: string;
  downloads: number;
  isFavorite?: boolean;
}

const ResourceHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  
  // Mock data
  const resources: Resource[] = [
    {
      id: "r1",
      title: "Math Problem Solving Strategies",
      description: "A comprehensive guide to solving complex math problems with step-by-step examples.",
      type: "document",
      subject: "Math",
      grade: "5",
      uploadedBy: "Ms. Smith",
      uploadedAt: "2023-06-01",
      downloads: 45,
      isFavorite: true,
    },
    {
      id: "r2",
      title: "Introduction to Fractions",
      description: "Interactive worksheets for practicing fraction operations.",
      type: "worksheet",
      subject: "Math",
      grade: "3",
      uploadedBy: "Mr. Johnson",
      uploadedAt: "2023-05-15",
      downloads: 78,
    },
    {
      id: "r3",
      title: "Solar System Exploration",
      description: "Video tour of our solar system with amazing visuals and explanations.",
      type: "video",
      subject: "Science",
      grade: "5",
      uploadedBy: "Mrs. Davis",
      uploadedAt: "2023-06-10",
      downloads: 32,
      isFavorite: true,
    },
    {
      id: "r4",
      title: "Reading Comprehension Practice",
      description: "Series of short stories with comprehension questions for reading practice.",
      type: "worksheet",
      subject: "English",
      grade: "3",
      uploadedBy: "Ms. Thompson",
      uploadedAt: "2023-04-22",
      downloads: 54,
    },
    {
      id: "r5",
      title: "American History: Colonial Period",
      description: "Summary of key events and figures in early American history.",
      type: "document",
      subject: "History",
      grade: "5",
      uploadedBy: "Mr. Adams",
      uploadedAt: "2023-05-28",
      downloads: 27,
    },
    {
      id: "r6",
      title: "Interactive Periodic Table",
      description: "Link to an interactive periodic table with element information.",
      type: "link",
      subject: "Science",
      grade: "5",
      uploadedBy: "Mrs. Davis",
      uploadedAt: "2023-06-05",
      downloads: 41,
    },
  ];
  
  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === "" || resource.subject === selectedSubject;
    const matchesGrade = selectedGrade === "" || resource.grade === selectedGrade;
    
    return matchesSearch && matchesSubject && matchesGrade;
  });
  
  // Get unique subjects and grades for filters
  const subjects = Array.from(new Set(resources.map(r => r.subject))).sort();
  const grades = Array.from(new Set(resources.map(r => r.grade))).sort((a, b) => parseInt(a) - parseInt(b));
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document": return <FileText className="h-6 w-6 text-blue-500" />;
      case "video": return <Video className="h-6 w-6 text-red-500" />;
      case "worksheet": return <FileText className="h-6 w-6 text-green-500" />;
      case "link": return <FileText className="h-6 w-6 text-purple-500" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };
  
  const handleResourceAction = (action: "download" | "favorite" | "upload", resource?: Resource) => {
    switch (action) {
      case "download":
        if (resource) {
          toast({
            title: "Download Started",
            description: `${resource.title} is being downloaded.`,
          });
        }
        break;
      case "favorite":
        if (resource) {
          toast({
            title: resource.isFavorite ? "Removed from Favorites" : "Added to Favorites",
            description: `${resource.title} has been ${resource.isFavorite ? "removed from" : "added to"} your favorites.`,
          });
        }
        break;
      case "upload":
        toast({
          title: "Upload Resource",
          description: "This feature will allow uploading new resources. Coming soon!",
        });
        break;
    }
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
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            Resource Hub
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Educational Resources</h2>
          <p className="text-muted-foreground">
            Access learning materials shared by teachers
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Grades</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredResources.length} resources
            </p>
          </div>
          
          <Button variant="default" onClick={() => handleResourceAction("upload")}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Resource
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <Card key={resource.id} className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(resource.type)}
                    <div className="flex-grow">
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{resource.subject}</Badge>
                        <Badge variant="outline">Grade {resource.grade}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Uploaded {new Date(resource.uploadedAt).toLocaleDateString()} by {resource.uploadedBy}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleResourceAction("favorite", resource)}
                  >
                    {resource.isFavorite ? "★ Favorited" : "☆ Favorite"}
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleResourceAction("download", resource)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">No resources found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedSubject("");
                setSelectedGrade("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResourceHub;
