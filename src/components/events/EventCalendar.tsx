
import React, { useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EventProps } from './EventCard';

interface CalendarEvent {
  date: Date;
  events: EventProps[];
}

interface EventCalendarProps {
  events: EventProps[];
  onSelectDate: (date: Date | undefined) => void;
  selectedDate?: Date;
}

const EventCalendar: React.FC<EventCalendarProps> = ({
  events,
  onSelectDate,
  selectedDate
}) => {
  // Group events by date for the calendar
  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, EventProps[]>();
    
    events.forEach(event => {
      const dateKey = event.date.toDateString();
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)?.push(event);
    });
    
    return grouped;
  }, [events]);
  
  // Generate event date markers for the calendar
  const eventDates = useMemo(() => {
    return Array.from(eventsByDate.keys()).map(dateString => new Date(dateString));
  }, [eventsByDate]);
  
  const getDayClassNames = (date: Date) => {
    const hasEvents = eventsByDate.has(date.toDateString());
    return hasEvents ? 'font-medium text-primary' : '';
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Event Calendar</CardTitle>
        <CardDescription>Select a date to view events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md border"
            modifiers={{
              event: eventDates,
            }}
            modifiersClassNames={{
              event: "border-2 border-primary"
            }}
            classNames={{
              day_today: "bg-primary/10",
              day_selected: "bg-primary text-primary-foreground",
              day: getDayClassNames
            }}
            components={{
              DayContent: ({ date }) => {
                const dateEvents = eventsByDate.get(date.toDateString());
                
                return (
                  <div className="relative h-full w-full p-2 flex items-center justify-center">
                    {date.getDate()}
                    {dateEvents && dateEvents.length > 0 && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </div>
                );
              },
            }}
          />
          
          {selectedDate && eventsByDate.has(selectedDate.toDateString()) && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">
                Events on {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <div className="space-y-2">
                {eventsByDate.get(selectedDate.toDateString())?.map((event) => (
                  <div 
                    key={event.id} 
                    className="p-2 rounded-md border border-border bg-background/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{event.title}</span>
                      <Badge variant="outline">
                        {event.date.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {event.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCalendar;
