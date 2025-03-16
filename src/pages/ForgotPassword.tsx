
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const ForgotPassword = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError(t.emailRequired || "Email is required");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t.emailInvalid || "Email is invalid");
      return;
    }
    
    setIsLoading(true);
    
    // This is a placeholder for actual password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: t.resetLinkSent || "Reset Link Sent",
        description: t.resetLinkSentDesc || "If an account exists with this email, you will receive a password reset link.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">ParentConnect</h1>
        
        {/* Language switcher at the top right */}
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isSubmitted ? (t.checkYourEmail || "Check Your Email") : (t.resetYourPassword || "Reset Your Password")}
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted 
                ? (t.resetEmailSent || "We've sent you a password reset link if the email exists in our system.")
                : (t.resetPasswordInstructions || "Enter your email and we'll send you a link to reset your password")}
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email || "Email"}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder || "name@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? "border-destructive" : ""}
                  />
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (t.sending || "Sending...") : (t.sendResetLink || "Send Reset Link")}
                </Button>
              </form>
            </CardContent>
          ) : (
            <CardContent>
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  {t.noEmailReceived || "Didn't receive an email? Check your spam folder or verify your email address."}
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  variant="outline"
                  className="w-full"
                >
                  {t.tryAnotherEmail || "Try another email"}
                </Button>
              </div>
            </CardContent>
          )}
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              {t.rememberPassword || "Remember your password?"}
              <Link to="/login" className="text-primary hover:underline ml-1">
                {t.backToLogin || "Back to Login"}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
