
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BrainCircuit, Users, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isMobile?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const baseClasses = `rounded-md text-sm font-medium transition-colors flex items-center
    ${isActive
      ? 'text-primary bg-primary/5'
      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
    }`;
    
  const mobileClasses = `block px-3 py-2 ${baseClasses}`;
  const desktopClasses = `px-3 py-2 ${baseClasses}`;
  
  return (
    <Link
      to={to}
      className={isMobile ? mobileClasses : desktopClasses}
    >
      {icon}
      {children}
    </Link>
  );
};

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      asChild
      className="ml-2"
    >
      <Link to={to} className="flex items-center gap-2">
        {icon}
        <span>{children}</span>
      </Link>
    </Button>
  );
};

interface NavLinksProps {
  userRole: 'parent' | 'teacher' | null;
  isMobile?: boolean;
  showButtons?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ userRole, isMobile = false, showButtons = false }) => {
  // Get appropriate dashboard path based on user role
  const getDashboardPath = () => {
    if (userRole === 'parent') return '/parent-dashboard';
    if (userRole === 'teacher') return '/teacher-dashboard';
    return '/';
  };
  
  const isAuthenticated = !!userRole;
  
  const iconClasses = "h-4 w-4 mr-2";
  
  if (isAuthenticated) {
    return (
      <>
        <NavLink to={getDashboardPath()} icon={<Home className={iconClasses} />} isMobile={isMobile}>
          Dashboard
        </NavLink>
        <NavLink to="/learning-insights" icon={<BrainCircuit className={iconClasses} />} isMobile={isMobile}>
          Learning Insights
        </NavLink>
        <NavLink to="/community" icon={<Users className={iconClasses} />} isMobile={isMobile}>
          Community
        </NavLink>
        <NavLink to="/messaging" icon={<MessageSquare className={iconClasses} />} isMobile={isMobile}>
          Messaging
        </NavLink>
        
        {showButtons && !isMobile && (
          <div className="ml-auto flex gap-2">
            <NavButton to="/learning-insights" icon={<BrainCircuit className="h-4 w-4" />}>
              Insights
            </NavButton>
            <NavButton to="/community" icon={<Users className="h-4 w-4" />}>
              Community
            </NavButton>
            <NavButton to="/messaging" icon={<MessageSquare className="h-4 w-4" />}>
              Messages
            </NavButton>
          </div>
        )}
      </>
    );
  }
  
  // Public navigation items
  return (
    <>
      <NavLink to="/" icon={null} isMobile={isMobile}>
        Home
      </NavLink>
      <NavLink to="/#features" icon={null} isMobile={isMobile}>
        Features
      </NavLink>
      <NavLink to="/#about" icon={null} isMobile={isMobile}>
        About
      </NavLink>
    </>
  );
};
