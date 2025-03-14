
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare, Calendar, Home, LogOut, BrainCircuit, Users } from 'lucide-react';
import AnimatedLogo from '../ui/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

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
  const location = useLocation();
  const [notifications, setNotifications] = useState<{id: number, text: string}[]>([
    { id: 1, text: 'New message from Mr. Sharma' },
    { id: 2, text: 'Upcoming PTA meeting tomorrow' }
  ]);
  
  // Check if user is authenticated
  const isAuthenticated = !!userRole;
  
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Navigation items
  const navItems = isAuthenticated ? [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Messages', path: '/messaging', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="h-4 w-4 mr-2" /> },
    { name: 'Learning Insights', path: '/learning-insights', icon: <BrainCircuit className="h-4 w-4 mr-2" /> },
    { name: 'Community', path: '/community', icon: <Users className="h-4 w-4 mr-2" /> },
  ] : [
    { name: 'Home', path: '/', icon: null },
    { name: 'Features', path: '/#features', icon: null },
    { name: 'About', path: '/#about', icon: null },
  ];
  
  // Get appropriate dashboard path based on user role
  const getDashboardPath = () => {
    if (userRole === 'parent') return '/parent-dashboard';
    if (userRole === 'teacher') return '/teacher-dashboard';
    return '/';
  };
  
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
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                      ${location.pathname === getDashboardPath()
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/learning-insights"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                      ${location.pathname === '/learning-insights'
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    <BrainCircuit className="h-4 w-4 mr-2" />
                    Learning Insights
                  </Link>
                  <Link
                    to="/community"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                      ${location.pathname === '/community'
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Community
                  </Link>
                  <Link
                    to="/messaging"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                      ${location.pathname === '/messaging'
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messaging
                  </Link>
                </>
              ) : (
                navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                      ${location.pathname === item.path
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))
              )}
            </div>
          </div>
          
          {/* Right side items - auth or profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="border-b px-4 py-3">
                      <h4 className="text-sm font-semibold">Notifications</h4>
                    </div>
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className="px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                          >
                            <p className="text-sm">{notification.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center text-muted-foreground">
                        <p>No new notifications</p>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                
                {/* User menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-0" align="end">
                    <div className="p-4 border-b">
                      <div className="font-medium">{userName}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {userRole}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-muted-foreground"
                        asChild
                      >
                        <Link to="/profile">
                          Profile Settings
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative mr-2">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0" align="end">
                  <div className="border-b px-4 py-3">
                    <h4 className="text-sm font-semibold">Notifications</h4>
                  </div>
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className="px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                        >
                          <p className="text-sm">{notification.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-muted-foreground">
                      <p>No new notifications</p>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
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
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-panel">
          {isAuthenticated ? (
            <>
              <Link
                to={getDashboardPath()}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center
                  ${location.pathname === getDashboardPath()
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/learning-insights"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center
                  ${location.pathname === '/learning-insights'
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                <BrainCircuit className="h-4 w-4 mr-2" />
                Learning Insights
              </Link>
              <Link
                to="/community"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center
                  ${location.pathname === '/community'
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                <Users className="h-4 w-4 mr-2" />
                Community
              </Link>
              <Link
                to="/messaging"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center
                  ${location.pathname === '/messaging'
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messaging
              </Link>
            </>
          ) : (
            navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center
                  ${location.pathname === item.path
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))
          )}
          
          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-3 space-x-2">
                <Button variant="ghost" className="w-full justify-center" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button className="w-full justify-center" asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{userName}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="text-xs capitalize">
                      {userRole}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/5 hover:text-primary"
                >
                  Profile Settings
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/5"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
