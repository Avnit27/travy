
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import TravelForm from '@/components/TravelForm';
import TravelItinerary from '@/components/TravelItinerary';
import { useTravelPlanner } from '@/hooks/useTravelPlanner';
import { TravelPlannerResult } from '@/utils/gemini';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const Index = () => {
  const [travelPlanResult, setTravelPlanResult] = useState<TravelPlannerResult | null>(null);
  const { isLoading, apiKey, updateApiKey, planTravel } = useTravelPlanner();

  const handleGeneratePlan = async (formData: any) => {
    const result = await planTravel(formData);
    if (result) {
      setTravelPlanResult(result);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        title="Your AI Travel Planner" 
        subtitle="Tell us where you want to go, and we'll create a personalized travel itinerary just for you." 
      />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Plan Your Perfect Trip
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enter your travel details below and our AI will generate a customized itinerary based on your preferences, 
              including activities, accommodations, and transportation options.
            </p>
          </div>
          
          <TravelForm 
            onSubmit={handleGeneratePlan}
            apiKey={apiKey}
            onApiKeyChange={updateApiKey}
            isLoading={isLoading}
          />
        </motion.div>
        
        {isLoading && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-center py-12">
                <div className="space-y-6 w-full max-w-md">
                  <div className="h-6 bg-gray-200 rounded-md loading-shimmer"></div>
                  <div className="h-32 bg-gray-200 rounded-md loading-shimmer"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-gray-200 rounded-md loading-shimmer"></div>
                    <div className="h-16 bg-gray-200 rounded-md loading-shimmer"></div>
                  </div>
                  <div className="h-24 bg-gray-200 rounded-md loading-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {travelPlanResult && !isLoading && (
          <div id="results" className="mt-16">
            <Separator className="my-8" />
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Your Personalized Travel Plan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here's your AI-generated travel itinerary based on your preferences. Enjoy your trip!
              </p>
            </div>
            <TravelItinerary data={travelPlanResult} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
