
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, Calendar as CalendarIcon, X, Key } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TravelPlannerInput } from '@/utils/gemini';
import { Checkbox } from '@/components/ui/checkbox';

interface TravelFormProps {
  onSubmit: (data: TravelPlannerInput & { includeFlights?: boolean }) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  isLoading: boolean;
}

const TravelForm: React.FC<TravelFormProps> = ({
  onSubmit,
  apiKey,
  onApiKeyChange,
  isLoading
}) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = useState('');
  const [includeFlights, setIncludeFlights] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      return;
    }
    
    onSubmit({
      source,
      destination,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      budget,
      travelers,
      interests,
      includeFlights
    });
  };
  
  const addInterest = () => {
    if (currentInterest.trim() && !interests.includes(currentInterest.trim())) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };
  
  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };
  
  return (
    <div className="glass-card rounded-xl p-6 max-w-2xl w-full mx-auto animate-fade-up">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="source" className="text-sm font-medium">
                Source
              </Label>
              <Input
                id="source"
                className="travel-input mt-1"
                placeholder="Where are you departing from?"
                value={source}
                onChange={e => setSource(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="destination" className="text-sm font-medium">
                Destination
              </Label>
              <Input
                id="destination"
                className="travel-input mt-1"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label className="text-sm font-medium">
                Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex-1">
              <Label className="text-sm font-medium">
                End Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={date => !startDate || date < startDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="budget" className="text-sm font-medium">
                Budget
              </Label>
              <Input
                id="budget"
                className="travel-input mt-1"
                placeholder="e.g. $3000"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="travelers" className="text-sm font-medium">
                Number of Travelers
              </Label>
              <Input
                id="travelers"
                className="travel-input mt-1"
                type="number"
                min="1"
                max="20"
                value={travelers}
                onChange={e => setTravelers(parseInt(e.target.value) || 1)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="interests" className="text-sm font-medium">
              Interests
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="interests"
                className="travel-input flex-1"
                placeholder="e.g. Hiking, Food, Museums"
                value={currentInterest}
                onChange={e => setCurrentInterest(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInterest();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={addInterest}
                variant="secondary"
              >
                Add
              </Button>
            </div>
            
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {interests.map(interest => (
                  <div 
                    key={interest}
                    className="bg-travel-100 text-travel-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {interest}
                    <button 
                      type="button" 
                      onClick={() => removeInterest(interest)}
                      className="text-travel-500 hover:text-travel-700 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="includeFlights" 
              checked={includeFlights}
              onCheckedChange={(checked) => setIncludeFlights(checked === true)}
            />
            <Label 
              htmlFor="includeFlights" 
              className="text-sm font-medium cursor-pointer"
            >
              Include flight information
            </Label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-travel-600 hover:bg-travel-700 transition-all duration-300 transform hover:scale-[1.01]"
          disabled={isLoading || !apiKey}
        >
          {isLoading ? 'Generating Travel Plan...' : 'Plan My Trip'}
        </Button>
      </form>
    </div>
  );
};

export default TravelForm;
