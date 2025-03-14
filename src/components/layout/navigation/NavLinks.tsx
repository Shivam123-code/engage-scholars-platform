
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BrainCircuit, Users, MessageSquare, Calendar } from 'lucide-react';

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

interface NavLinksProps {
  userRole: 'parent' | 'teacher' | null;
  isMobile?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ userRole, isMobile = false }) => {
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
