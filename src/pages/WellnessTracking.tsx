
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart } from "@/components/ui/charts";
import { ArrowLeft, HeartPulse, Smile, Brain, Coffee, Moon, Utensils, Activity, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WellnessTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedChild, setSelectedChild] = useState("emily");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  
  // Mock data
  const wellnessData = {
    emily: {
      name: "Emily",
      grade: "5",
      currentMetrics: {
        sleep: { hours: 8.5, target: 9, quality: "good" },
        mood: { score: 85, trends: ["stable", "positive mornings"] },
        energy: { score: 78, trends: ["afternoon dip"] },
        focus: { score: 82, trends: ["strong in morning", "declines after lunch"] },
        nutrition: { score: 88, trends: ["consistent", "good variety"] },
      },
      sleepHistory: [
        { date: "2023-06-01", hours: 8.2 },
        { date: "2023-06-02", hours: 9.0 },
        { date: "2023-06-03", hours: 8.7 },
        { date: "2023-06-04", hours: 8.5 },
        { date: "2023-06-05", hours: 7.9 },
        { date: "2023-06-06", hours: 8.4 },
        { date: "2023-06-07", hours: 8.8 },
      ],
      moodHistory: [
        { date: "2023-06-01", score: 80 },
        { date: "2023-06-02", score: 85 },
        { date: "2023-06-03", score: 90 },
        { date: "2023-06-04", score: 75 },
        { date: "2023-06-05", score: 85 },
        { date: "2023-06-06", score: 88 },
        { date: "2023-06-07", score: 85 },
      ],
      recommendations: [
        "Maintain consistent sleep schedule on weekends",
        "Consider a short afternoon break to address energy dip",
        "Continue with varied breakfast options for sustained energy",
      ],
      correlations: [
        { factor: "Sleep Quality", impact: "Strong positive correlation with test performance" },
        { factor: "Physical Activity", impact: "Moderate positive correlation with focus and mood" },
        { factor: "Screen Time", impact: "Moderate negative correlation with sleep quality" },
      ],
    },
    jacob: {
      name: "Jacob",
      grade: "3",
      currentMetrics: {
        sleep: { hours: 9.2, target: 10, quality: "fair" },
        mood: { score: 75, trends: ["variable", "afternoon improvement"] },
        energy: { score: 82, trends: ["morning sluggishness"] },
        focus: { score: 70, trends: ["struggles after 2pm"] },
        nutrition: { score: 80, trends: ["picky eater", "good breakfast"] },
      },
      sleepHistory: [
        { date: "2023-06-01", hours: 9.0 },
        { date: "2023-06-02", hours: 9.5 },
        { date: "2023-06-03", hours: 8.8 },
        { date: "2023-06-04", hours: 9.2 },
        { date: "2023-06-05", hours: 9.0 },
        { date: "2023-06-06", hours: 9.5 },
        { date: "2023-06-07", hours: 9.2 },
      ],
      moodHistory: [
        { date: "2023-06-01", score: 70 },
        { date: "2023-06-02", score: 75 },
        { date: "2023-06-03", score: 80 },
        { date: "2023-06-04", score: 65 },
        { date: "2023-06-05", score: 75 },
        { date: "2023-06-06", score: 85 },
        { date: "2023-06-07", score: 75 },
      ],
      recommendations: [
        "Try a 10-minute morning stretching routine to boost energy",
        "Consider introducing a wider variety of foods gradually",
        "Implement a dedicated quiet reading time in the afternoon",
      ],
      correlations: [
        { factor: "Breakfast Quality", impact: "Strong positive correlation with morning focus" },
        { factor: "Outdoor Time", impact: "Strong positive correlation with mood and sleep quality" },
        { factor: "Regular Routine", impact: "Moderate positive correlation with overall well-being" },
      ],
    },
  };
  
  const selectedChildData = selectedChild === "emily" ? wellnessData.emily : wellnessData.jacob;
  
  const sleepChartData = {
    data: selectedChildData.sleepHistory.map(item => ({
      name: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      sleep: item.hours,
    })),
  };
  
  const moodChartData = {
    data: selectedChildData.moodHistory.map(item => ({
      name: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      mood: item.score,
    })),
  };
  
  const handleAddWellnessData = () => {
    toast({
      title: "Add Wellness Data",
      description: "This feature would allow adding new wellness measurements. Coming soon!",
    });
  };
  
  const getMetricColor = (value: number, type: string) => {
    if (type === "sleep") {
      if (value >= 90) return "bg-green-500";
      if (value >= 75) return "bg-yellow-500";
      return "bg-red-500";
    }
    
    if (value >= 80) return "bg-green-500";
    if (value >= 70) return "bg-yellow-500";
    return "bg-red-500";
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
            <HeartPulse className="h-6 w-6 mr-2 text-primary" />
            Wellness Tracking
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Student Well-being</h2>
          <p className="text-muted-foreground">
            Track and support your child's holistic development
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-8">
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
          
          <div className="flex gap-2 ml-auto">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleAddWellnessData}>
              <Plus className="h-4 w-4 mr-2" />
              Add Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Daily Wellness</CardTitle>
                <CardDescription>
                  Current wellness metrics for {selectedChildData.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="font-medium">Sleep</span>
                    </div>
                    <span className="text-sm">{selectedChildData.currentMetrics.sleep.hours} hrs</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={(selectedChildData.currentMetrics.sleep.hours / selectedChildData.currentMetrics.sleep.target) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Quality: {selectedChildData.currentMetrics.sleep.quality}</span>
                    <span>Target: {selectedChildData.currentMetrics.sleep.target} hrs</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Smile className="h-5 w-5 mr-2 text-yellow-500" />
                      <span className="font-medium">Mood</span>
                    </div>
                    <span className="text-sm">{selectedChildData.currentMetrics.mood.score}/100</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={selectedChildData.currentMetrics.mood.score} 
                      className={`h-2 ${getMetricColor(selectedChildData.currentMetrics.mood.score, "mood")}`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedChildData.currentMetrics.mood.trends.map((trend, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{trend}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-red-500" />
                      <span className="font-medium">Energy</span>
                    </div>
                    <span className="text-sm">{selectedChildData.currentMetrics.energy.score}/100</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={selectedChildData.currentMetrics.energy.score} 
                      className={`h-2 ${getMetricColor(selectedChildData.currentMetrics.energy.score, "energy")}`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedChildData.currentMetrics.energy.trends.map((trend, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{trend}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-500" />
                      <span className="font-medium">Focus</span>
                    </div>
                    <span className="text-sm">{selectedChildData.currentMetrics.focus.score}/100</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={selectedChildData.currentMetrics.focus.score} 
                      className={`h-2 ${getMetricColor(selectedChildData.currentMetrics.focus.score, "focus")}`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedChildData.currentMetrics.focus.trends.map((trend, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{trend}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Utensils className="h-5 w-5 mr-2 text-green-500" />
                      <span className="font-medium">Nutrition</span>
                    </div>
                    <span className="text-sm">{selectedChildData.currentMetrics.nutrition.score}/100</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={selectedChildData.currentMetrics.nutrition.score} 
                      className={`h-2 ${getMetricColor(selectedChildData.currentMetrics.nutrition.score, "nutrition")}`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedChildData.currentMetrics.nutrition.trends.map((trend, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{trend}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Patterns</CardTitle>
                  <CardDescription>Hours of sleep per night</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <AreaChart
                      data={sleepChartData.data}
                      categories={["sleep"]}
                      index="name"
                      colors={["blue"]}
                      valueFormatter={(value) => `${value}hrs`}
                      yAxisWidth={30}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mood Trends</CardTitle>
                  <CardDescription>Daily mood scores (scale: 0-100)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <BarChart
                      data={moodChartData.data}
                      categories={["mood"]}
                      index="name"
                      colors={["yellow"]}
                      valueFormatter={(value) => `${value}`}
                      yAxisWidth={30}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Insights</CardTitle>
                  <CardDescription>Personalized recommendations based on patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-medium">Recommendations</h3>
                    <ul className="space-y-2">
                      {selectedChildData.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Academic Correlations</h3>
                    <div className="space-y-2">
                      {selectedChildData.correlations.map((corr, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-medium">{corr.factor}:</span> {corr.impact}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WellnessTracking;
