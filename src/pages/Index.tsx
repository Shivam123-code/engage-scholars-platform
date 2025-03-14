
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Language selector */}
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {t.welcome}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t.tagline}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/login">
              <Button size="lg" className="neo-button">
                {t.getStarted}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">{t.communication}</h3>
            <p className="mt-2 text-muted-foreground">
              {t.communicationDesc}
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">{t.events}</h3>
            <p className="mt-2 text-muted-foreground">
              {t.eventsDesc}
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground">{t.progress}</h3>
            <p className="mt-2 text-muted-foreground">
              {t.progressDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
