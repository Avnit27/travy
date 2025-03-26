
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, DollarSign, Leaf } from 'lucide-react';

interface Flight {
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  extensions: string[];
}

interface FlightOption {
  flights: Flight[];
  total_duration: number;
  price: number;
  carbon_emissions: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  airline_logo: string;
}

interface FlightDetailsProps {
  flightData: {
    best_flights: FlightOption[];
    price_insights: {
      lowest_price: number;
      price_level: string;
      typical_price_range: number[];
    };
  };
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flightData }) => {
  if (!flightData || !flightData.best_flights || flightData.best_flights.length === 0) {
    return null;
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Plane className="mr-2 h-6 w-6 text-travel-500" />
        Flight Options
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          Best available flights for your trip
        </p>
        <div className="flex items-center mb-2">
          <span className="text-sm text-muted-foreground">Price range: </span>
          <span className="ml-1 font-medium">
            ₹{flightData.price_insights.typical_price_range[0]} - ₹{flightData.price_insights.typical_price_range[1]}
          </span>
          <Badge variant="outline" className="ml-2">
            {flightData.price_insights.price_level} prices
          </Badge>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        {flightData.best_flights.map((option, optionIndex) => (
          <Card key={optionIndex} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <img 
                  src={option.airline_logo} 
                  alt="Airline Logo" 
                  className="h-10 w-10 object-contain mr-3"
                />
                <div>
                  <div className="font-medium">{option.flights[0].airline}</div>
                  <div className="text-sm text-muted-foreground">
                    {option.flights[0].flight_number}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-travel-600">₹{option.price}</div>
                <div className="text-sm text-muted-foreground">per passenger</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Departure</div>
                <div className="font-medium">{option.flights[0].departure_airport.time}</div>
                <div className="text-sm truncate">{option.flights[0].departure_airport.id}</div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDuration(option.total_duration)}
                </div>
                <div className="w-full h-px bg-gray-200 my-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plane className="h-3 w-3 text-travel-500 transform rotate-90" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Direct</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Arrival</div>
                <div className="font-medium">{option.flights[0].arrival_airport.time}</div>
                <div className="text-sm truncate">{option.flights[0].arrival_airport.id}</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Leaf className="h-4 w-4 mr-1 text-green-500" />
                <span className={option.carbon_emissions.difference_percent < 0 ? "text-green-600" : "text-amber-600"}>
                  {Math.abs(option.carbon_emissions.difference_percent)}% {option.carbon_emissions.difference_percent < 0 ? "less" : "more"} CO₂
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {option.flights[0].extensions.map((ext, extIndex) => (
                  <Badge key={extIndex} variant="secondary" className="text-xs">
                    {ext}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightDetails;
