
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Notification {
  id: number;
  text: string;
}

interface NotificationsMenuProps {
  notifications: Notification[];
}

const NotificationsMenu: React.FC<NotificationsMenuProps> = ({ notifications }) => {
  return (
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
  );
};

export default NotificationsMenu;
