
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const Login = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = (email: string, password: string, role: string) => {
    setIsLoading(true);
    
    // This is a placeholder for actual authentication logic
    // Will be replaced with Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t.loggedInSuccessfully || "Logged In Successfully",
        description: `${t.welcomeBack || "Welcome back"}! ${t.loggedInAs || "You are logged in as a"} ${role}.`,
      });
      
      // Redirect based on role
      if (role === "parent") {
        navigate("/parent-dashboard");
      } else {
        navigate("/teacher-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">ParentConnect</h1>
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        
        {/* Language switcher at the top right */}
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        
        <Card className="mt-8 glass-card">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2"><strong>{t.forDemoPurposes || "For Demo Purposes"}:</strong></p>
              <p>{t.demoLoginInfo || "You can enter any email and password to simulate login."}</p>
              <p>{t.authImplementationNote || "Actual authentication will be implemented with Supabase."}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
