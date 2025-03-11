
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  
  const handleLogin = (email: string, password: string) => {
    // This is a placeholder for actual authentication logic
    // For now, just show a toast to indicate login attempt
    toast({
      title: "Login Attempted",
      description: `Attempted login with ${email}. Authentication will be implemented in a future update.`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">ParentConnect</h1>
        <LoginForm onLogin={handleLogin} />
        
        <Card className="mt-8 glass-card">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2"><strong>For Demo Purposes:</strong></p>
              <p>You can enter any email and password to simulate login.</p>
              <p>Actual authentication will be implemented in future updates.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
