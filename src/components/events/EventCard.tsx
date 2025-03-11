
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface EventProps {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
  attendees: number;
  totalSpots: number;
  isRsvpd?: boolean;
  onRsvp?: (id: string) => void;
  onCancelRsvp?: (id: string) => void;
}

const EventCard: React.FC<EventProps> = ({
  id,
  title,
  date,
  location,
  description,
  attendees,
  totalSpots,
  isRsvpd = false,
  onRsvp,
  onCancelRsvp
}) => {
  const isPastEvent = date < new Date();
  const isFull = attendees >= totalSpots;
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">
              {formatDistanceToNow(date, { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge variant={isPastEvent ? "outline" : isFull ? "destructive" : "default"}>
            {isPastEvent 
              ? "Past Event" 
              : isFull 
                ? "Full" 
                : `${attendees}/${totalSpots} Attending`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{attendees} attending</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {!isPastEvent && (
          isRsvpd ? (
            <Button 
              variant="outline" 
              onClick={() => onCancelRsvp?.(id)}
              className="w-full"
            >
              Cancel RSVP
            </Button>
          ) : (
            <Button 
              disabled={isFull} 
              onClick={() => onRsvp?.(id)}
              className="w-full"
            >
              {isFull ? "Event Full" : "RSVP"}
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
