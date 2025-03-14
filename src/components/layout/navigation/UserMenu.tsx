
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface UserMenuProps {
  userName: string;
  userAvatar: string;
  userRole: 'parent' | 'teacher' | null;
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

const UserMenu: React.FC<UserMenuProps> = ({ userName, userAvatar, userRole }) => {
  return (
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
  );
};

export default UserMenu;
