
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from '../ui/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { NavLinks } from './navigation/NavLinks';
import NotificationsMenu from './navigation/NotificationsMenu';
import UserMenu from './navigation/UserMenu';
import MobileMenu from './navigation/MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavbarProps {
  userRole?: 'parent' | 'teacher' | null;
  userName?: string;
  userAvatar?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  userRole = null,
  userName = '',
  userAvatar = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState<{id: number, text: string}[]>([
    { id: 1, text: 'New message from Mr. Sharma' },
    { id: 2, text: 'Upcoming PTA meeting tomorrow' }
  ]);
  
  const { t } = useLanguage();
  
  // Check if user is authenticated
  const isAuthenticated = !!userRole;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <AnimatedLogo size="sm" />
              <span className="font-semibold text-lg tracking-tight transition-all">
                <span className="text-primary">Parent</span>
                <span className="text-accent">Connect</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block flex-1">
            <div className="ml-10 flex items-center space-x-4">
              <NavLinks userRole={userRole} showButtons={isAuthenticated} />
            </div>
          </div>
          
          {/* Right side items - auth or profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <NotificationsMenu notifications={notifications} />
                
                {/* User menu */}
                <UserMenu 
                  userName={userName} 
                  userAvatar={userAvatar} 
                  userRole={userRole} 
                />
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <NotificationsMenu notifications={notifications} />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isOpen} 
        userRole={userRole} 
        userName={userName} 
        userAvatar={userAvatar} 
      />
    </nav>
  );
};

export default Navbar;
