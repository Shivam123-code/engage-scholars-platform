
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface AppLayoutProps {
  children: ReactNode;
  userRole?: 'parent' | 'teacher' | null;
  userName?: string;
  userAvatar?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  userRole = null,
  userName = '',
  userAvatar = ''
}) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
      />
      
      {/* Language Switcher for easy access on all pages */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
      <main className="flex-grow pt-16 transition-all duration-300 animate-fade-in">
        {children}
      </main>
      <footer className="py-6 px-4 border-t border-border/40 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} ParentConnect. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
