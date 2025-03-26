
import React from 'react';
import { TravelPlannerResult } from '@/utils/gemini';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Home, 
  Bus, 
  LightbulbIcon 
} from 'lucide-react';

interface TravelItineraryProps {
  data: TravelPlannerResult;
}

const TravelItinerary: React.FC<TravelItineraryProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-up">
      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Trip Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Estimated Budget</div>
            <div className="text-xl font-medium">{data.totalEstimatedCost}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Duration</div>
            <div className="text-xl font-medium">{data.itinerary.length} days</div>
          </div>
        </div>

        <Separator className="my-6" />
        
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <LightbulbIcon className="mr-2 h-5 w-5 text-travel-500" />
          Travel Tips
        </h3>
        <ul className="space-y-2 mb-6">
          {data.generalTips.map((tip, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="inline-block h-5 w-5 rounded-full bg-travel-100 text-travel-600 text-xs flex items-center justify-center mr-2 mt-0.5">
                {index + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-travel-500" />
            Daily Itinerary
          </h3>
          
          <div className="space-y-6">
            {data.itinerary.map((day) => (
              <div key={day.day} className="animate-fade-up" style={{ animationDelay: `${day.day * 100}ms` }}>
                <div className="flex items-center mb-3">
                  <div className="bg-travel-100 text-travel-800 font-medium px-3 py-1 rounded-md">
                    Day {day.day}
                  </div>
                  <div className="ml-3 text-sm text-muted-foreground">
                    {day.date}
                  </div>
                </div>
                
                <div className="space-y-4 pl-4 border-l-2 border-travel-100">
                  {day.activities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="relative pl-6 before:absolute before:left-[-9px] before:top-[10px] before:w-4 before:h-4 before:rounded-full before:bg-travel-200"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {activity.time}
                          </Badge>
                          <h4 className="font-medium mb-1">{activity.activity}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {activity.description}
                          </p>
                        </div>
                        <div className="space-y-1 text-sm">
                          {activity.location && (
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1 text-travel-500" />
                              <span>{activity.location}</span>
                            </div>
                          )}
                          {activity.cost && (
                            <div className="flex items-center">
                              <DollarSign className="h-3 w-3 mr-1 text-travel-500" />
                              <span>{activity.cost}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Home className="mr-2 h-5 w-5 text-travel-500" />
              Accommodation Suggestions
            </h3>
            <div className="space-y-4">
              {data.accommodationSuggestions.map((accommodation, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-medium mb-1">{accommodation.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {accommodation.description}
                  </p>
                  <div className="text-sm font-medium text-travel-600">
                    {accommodation.priceRange}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Bus className="mr-2 h-5 w-5 text-travel-500" />
              Transportation Options
            </h3>
            <div className="space-y-4">
              {data.transportationOptions.map((transport, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-medium mb-1">{transport.type}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {transport.description}
                  </p>
                  <div className="text-sm font-medium text-travel-600">
                    {transport.estimatedCost}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelItinerary;
