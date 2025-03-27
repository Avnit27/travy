
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  TravelPlannerInput, 
  TravelPlannerResult, 
  generateTravelPlan,
  getGeminiApiKey,
  setGeminiApiKey
} from '@/utils/gemini';
import { getMockFlightData } from '@/utils/mockFlightData';
import { 
  getSerpApiKey, 
  setSerpApiKey, 
  fetchFlightData,
  getAirportCode
} from '@/utils/serpapi';

interface UseTravelPlannerProps {
  onSuccess?: (result: TravelPlannerResult) => void;
}

export const useTravelPlanner = (props?: UseTravelPlannerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(getGeminiApiKey());
  const [serpApiKey, setSerpApiKey] = useState(getSerpApiKey());
  const [travelPlan, setTravelPlan] = useState<TravelPlannerResult | null>(null);
  const [flightData, setFlightData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const updateApiKey = (newKey: string) => {
    setApiKey(newKey);
    setGeminiApiKey(newKey);
    toast.success('Gemini API key updated');
  };

  const updateSerpApiKey = (newKey: string) => {
    setSerpApiKey(newKey);
    setSerpApiKey(newKey);
    toast.success('SerpAPI key updated');
  };

  const fetchRealFlightData = async (input: TravelPlannerInput) => {
    if (!serpApiKey) {
      // If no SerpAPI key, use mock data
      return getMockFlightData();
    }

    try {
      // Get airport codes for source and destination
      const departureId = getAirportCode(input.source);
      const arrivalId = getAirportCode(input.destination);
      
      // Format date for API
      const outboundDate = input.startDate;
      
      // Fetch flight data
      const data = await fetchFlightData({
        departure_id: departureId,
        arrival_id: arrivalId,
        outbound_date: outboundDate,
        api_key: serpApiKey
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching flight data from SerpAPI:', error);
      toast.error('Could not fetch flight data from SerpAPI. Using mock data instead.');
      // Fallback to mock data
      return getMockFlightData();
    }
  };

  const planTravel = async (input: TravelPlannerInput & { includeFlights?: boolean }) => {
    if (!apiKey) {
      setError('Please set your Gemini API key first');
      toast.error('Gemini API key is not set');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateTravelPlan(input);
      setTravelPlan(result);
      
      // If flight information is requested, fetch it
      if (input.includeFlights) {
        try {
          const flights = await fetchRealFlightData(input);
          setFlightData(flights);
        } catch (error) {
          console.error('Error fetching flight data:', error);
          // Fallback to mock data
          const flights = getMockFlightData();
          setFlightData(flights);
        }
      } else {
        setFlightData(null);
      }
      
      toast.success('Travel plan generated successfully!');
      
      if (props?.onSuccess) {
        props.onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Error generating travel plan: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    travelPlan,
    flightData,
    error,
    apiKey,
    serpApiKey,
    updateApiKey,
    updateSerpApiKey,
    planTravel
  };
};
