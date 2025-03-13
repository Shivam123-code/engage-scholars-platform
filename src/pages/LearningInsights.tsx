
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, ArrowLeft, Lightbulb, ArrowRight, BookOpen, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface StrengthOrWeakness {
  id: string;
  title: string;
  description: string;
  score: number;
  trend: "improving" | "declining" | "stable";
  relatedSkills: string[];
}

interface RecommendedResource {
  id: string;
  title: string;
  type: "video" | "activity" | "reading" | "practice";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  url: string;
}

const LearningInsights = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedChild, setSelectedChild] = useState("emily");
  
  // Mock data
  const childrenData = {
    emily: {
      name: "Emily",
      grade: "5",
      subjects: [
        { name: "Math", progress: 94, level: "advanced" },
        { name: "Science", progress: 88, level: "proficient" },
        { name: "English", progress: 91, level: "advanced" },
        { name: "History", progress: 82, level: "proficient" },
      ],
      strengths: [
        {
          id: "s1",
          title: "Mathematical Problem Solving",
          description: "Emily excels at applying math concepts to solve complex problems.",
          score: 94,
          trend: "improving",
          relatedSkills: ["Algebra", "Logic", "Critical Thinking"],
        },
        {
          id: "s2",
          title: "Reading Comprehension",
          description: "Shows strong ability to understand and interpret written text.",
          score: 91,
          trend: "stable",
          relatedSkills: ["Vocabulary", "Analysis", "Inference"],
        },
      ],
      weaknesses: [
        {
          id: "w1",
          title: "Historical Context Understanding",
          description: "Struggles to connect historical events with their broader context.",
          score: 72,
          trend: "improving",
          relatedSkills: ["Chronology", "Cause and Effect", "Cultural Awareness"],
        },
      ],
      recommendations: [
        {
          id: "r1",
          title: "Advanced Math Challenge Problems",
          type: "practice",
          difficulty: "advanced",
          estimatedTime: "20 min",
          url: "#",
        },
        {
          id: "r2",
          title: "Interactive History Timeline",
          type: "activity",
          difficulty: "intermediate",
          estimatedTime: "30 min",
          url: "#",
        },
        {
          id: "r3",
          title: "Science Experiment: Plant Growth Factors",
          type: "activity",
          difficulty: "intermediate",
          estimatedTime: "45 min",
          url: "#",
        },
      ],
    },
    jacob: {
      name: "Jacob",
      grade: "3",
      subjects: [
        { name: "Math", progress: 86, level: "proficient" },
        { name: "Science", progress: 92, level: "advanced" },
        { name: "English", progress: 79, level: "developing" },
        { name: "Art", progress: 95, level: "advanced" },
      ],
      strengths: [
        {
          id: "s1",
          title: "Scientific Inquiry",
          description: "Jacob demonstrates exceptional curiosity and inquiry skills in science.",
          score: 92,
          trend: "improving",
          relatedSkills: ["Observation", "Hypothesis Testing", "Data Analysis"],
        },
        {
          id: "s2",
          title: "Creative Expression",
          description: "Shows remarkable artistic ability and creative thinking.",
          score: 95,
          trend: "stable",
          relatedSkills: ["Visual Arts", "Spatial Reasoning", "Design"],
        },
      ],
      weaknesses: [
        {
          id: "w1",
          title: "Reading Fluency",
          description: "Reads at a slower pace than grade level expectations.",
          score: 76,
          trend: "improving",
          relatedSkills: ["Phonics", "Sight Words", "Pronunciation"],
        },
        {
          id: "w2",
          title: "Writing Structure",
          description: "Struggles with organizing written ideas in a clear structure.",
          score: 72,
          trend: "stable",
          relatedSkills: ["Grammar", "Paragraph Structure", "Sequencing"],
        },
      ],
      recommendations: [
        {
          id: "r1",
          title: "Daily Reading Practice with Audio Support",
          type: "practice",
          difficulty: "beginner",
          estimatedTime: "15 min",
          url: "#",
        },
        {
          id: "r2",
          title: "Interactive Writing Templates",
          type: "activity",
          difficulty: "beginner",
          estimatedTime: "20 min",
          url: "#",
        },
        {
          id: "r3",
          title: "Advanced Science Project: Ecosystem in a Bottle",
          type: "activity",
          difficulty: "advanced",
          estimatedTime: "60 min",
          url: "#",
        },
      ],
    },
  };
  
  const selectedChildData = selectedChild === "emily" ? childrenData.emily : childrenData.jacob;
  
  const handleGenerateInsights = () => {
    toast({
      title: "AI Analysis Running",
      description: "Analyzing recent academic data to generate fresh insights...",
    });
    
    // In a real implementation, this would trigger an API call to an AI service
    setTimeout(() => {
      toast({
        title: "New Insights Generated",
        description: `Updated learning recommendations for ${selectedChildData.name} are now available.`,
      });
    }, 2000);
  };
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case "advanced": return "bg-green-500";
      case "proficient": return "bg-blue-500";
      case "developing": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <Badge className="bg-green-500">▲ Improving</Badge>;
      case "declining": return <Badge className="bg-red-500">▼ Declining</Badge>;
      case "stable": return <Badge className="bg-blue-500">■ Stable</Badge>;
      default: return null;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "🎥";
      case "activity": return "🔍";
      case "reading": return "📚";
      case "practice": return "✏️";
      default: return "📝";
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
            <BrainCircuit className="h-6 w-6 mr-2 text-primary" />
            Learning Insights
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Personalized Learning Analysis</h2>
          <p className="text-muted-foreground">
            AI-powered insights to help your child succeed
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap gap-3">
          <Button
            variant={selectedChild === "emily" ? "default" : "outline"}
            onClick={() => setSelectedChild("emily")}
          >
            Emily (Grade 5)
          </Button>
          <Button
            variant={selectedChild === "jacob" ? "default" : "outline"}
            onClick={() => setSelectedChild("jacob")}
          >
            Jacob (Grade 3)
          </Button>
          
          <Button 
            variant="secondary" 
            className="ml-auto"
            onClick={handleGenerateInsights}
          >
            <BrainCircuit className="h-4 w-4 mr-2" />
            Generate New Insights
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>
                  {selectedChildData.name}'s academic progress by subject
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedChildData.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{subject.name}</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={subject.progress} className="h-2" />
                      <div 
                        className={`absolute top-0 h-2 w-1 ${getLevelColor(subject.level)} rounded-full`}
                        style={{ left: `${subject.progress}%`, transform: 'translateX(-50%)' }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Badge variant="outline" className="text-xs capitalize">
                        {subject.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="strengths">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="areas">Growth Areas</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="strengths" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                      Strengths & Talents
                    </CardTitle>
                    <CardDescription>Areas where {selectedChildData.name} excels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedChildData.strengths.map((strength) => (
                      <Card key={strength.id} className="border border-green-200">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{strength.title}</CardTitle>
                            {getTrendIcon(strength.trend)}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground mb-3">{strength.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {strength.relatedSkills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-green-50">{skill}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="w-full">
                            <div className="flex justify-between items-center text-sm">
                              <span>Mastery Level</span>
                              <span className="font-medium">{strength.score}%</span>
                            </div>
                            <Progress value={strength.score} className="h-2 mt-1" />
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="areas" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                      Growth Areas
                    </CardTitle>
                    <CardDescription>Areas where {selectedChildData.name} can improve</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedChildData.weaknesses.length > 0 ? (
                      selectedChildData.weaknesses.map((weakness) => (
                        <Card key={weakness.id} className="border border-blue-200">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{weakness.title}</CardTitle>
                              {getTrendIcon(weakness.trend)}
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground mb-3">{weakness.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {weakness.relatedSkills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="bg-blue-50">{skill}</Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <div className="w-full">
                              <div className="flex justify-between items-center text-sm">
                                <span>Current Level</span>
                                <span className="font-medium">{weakness.score}%</span>
                              </div>
                              <Progress value={weakness.score} className="h-2 mt-1" />
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No significant growth areas identified at this time.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      Personalized Recommendations
                    </CardTitle>
                    <CardDescription>AI-suggested resources tailored for {selectedChildData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedChildData.recommendations.map((resource) => (
                      <Card key={resource.id} className="border border-primary/20">
                        <CardHeader className="pb-2">
                          <div className="flex items-start">
                            <div className="text-2xl mr-3">{getTypeIcon(resource.type)}</div>
                            <div>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                                <Badge variant="outline" className="capitalize">{resource.difficulty}</Badge>
                                <Badge variant="outline">{resource.estimatedTime}</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardFooter className="flex justify-end pt-2">
                          <Button size="sm" variant="ghost" className="text-primary" asChild>
                            <a href={resource.url}>
                              Open Resource
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningInsights;
