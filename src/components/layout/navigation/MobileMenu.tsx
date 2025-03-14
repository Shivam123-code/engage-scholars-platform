
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { NavLinks } from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  userRole: 'parent' | 'teacher' | null;
  userName: string;
  userAvatar: string;
}

// Generate initials for avatar fallback
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  userRole, 
  userName, 
  userAvatar 
}) => {
  const isAuthenticated = !!userRole;
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-panel">
        <div className="space-y-1">
          <NavLinks userRole={userRole} isMobile={true} />
        </div>
        
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
  );
};

export default MobileMenu;
