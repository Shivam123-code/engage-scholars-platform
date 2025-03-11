
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Welcome to ParentConnect
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Bridging the gap between parents and teachers for better student success
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/login">
              <Button size="lg" className="neo-button">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">Easy Communication</h3>
            <p className="mt-2 text-muted-foreground">
              Direct messaging between parents and teachers for seamless communication
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">Event Management</h3>
            <p className="mt-2 text-muted-foreground">
              Stay updated with school events and parent-teacher meetings
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">Student Progress</h3>
            <p className="mt-2 text-muted-foreground">
              Track your child's academic progress and achievements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
