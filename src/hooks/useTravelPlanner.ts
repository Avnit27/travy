
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  TravelPlannerInput, 
  TravelPlannerResult, 
  generateTravelPlan,
  getGeminiApiKey,
  setGeminiApiKey
} from '@/utils/gemini';

interface UseTravelPlannerProps {
  onSuccess?: (result: TravelPlannerResult) => void;
}

export const useTravelPlanner = (props?: UseTravelPlannerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(getGeminiApiKey());
  const [travelPlan, setTravelPlan] = useState<TravelPlannerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateApiKey = (newKey: string) => {
    setApiKey(newKey);
    setGeminiApiKey(newKey);
    toast.success('Gemini API key updated');
  };

  const planTravel = async (input: TravelPlannerInput) => {
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
    error,
    apiKey,
    updateApiKey,
    planTravel
  };
};
