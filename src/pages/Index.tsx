
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TravelForm from '@/components/TravelForm';
import TravelItinerary from '@/components/TravelItinerary';
import FlightDetails from '@/components/FlightDetails';
import GeminiKeyModal from '@/components/GeminiKeyModal';
import { useTravelPlanner } from '@/hooks/useTravelPlanner';
import { TravelPlannerResult } from '@/utils/gemini';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [travelPlanResult, setTravelPlanResult] = useState<TravelPlannerResult | null>(null);
  const { isLoading, apiKey, updateApiKey, planTravel, flightData } = useTravelPlanner();
  const [keyModalOpen, setKeyModalOpen] = useState(false);

  // Check if API key is missing and show modal on initial load
  useEffect(() => {
    if (!apiKey) {
      setKeyModalOpen(true);
    }
  }, [apiKey]);

  const handleGeneratePlan = async (formData: any) => {
    if (!apiKey) {
      setKeyModalOpen(true);
      return;
    }
    
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar apiKey={apiKey} updateApiKey={updateApiKey} />
      
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
            <h2 className="text-2xl md:text-3xl font-bold text-travel-900 mb-4">
              Plan Your Perfect Trip
            </h2>
            <p className="text-travel-600 max-w-2xl mx-auto">
              Enter your travel details below and our AI will generate a customized itinerary based on your preferences.
            </p>
          </div>
          
          {!apiKey && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
              <p className="text-yellow-800 text-sm">
                You need to set up your Gemini API key to use this feature.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setKeyModalOpen(true)}
                className="bg-white"
              >
                <Key className="mr-2 h-4 w-4" />
                Set API Key
              </Button>
            </div>
          )}
          
          <div className="glass-card bg-white/80 shadow-xl rounded-xl overflow-hidden border border-travel-100">
            <TravelForm 
              onSubmit={handleGeneratePlan}
              apiKey={apiKey}
              onApiKeyChange={updateApiKey}
              isLoading={isLoading}
            />
          </div>
        </motion.div>
        
        {isLoading && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass-card rounded-xl p-6 bg-white/70">
              <div className="flex items-center justify-center py-12">
                <div className="space-y-6 w-full max-w-md">
                  <div className="h-6 bg-travel-100 rounded-md loading-shimmer"></div>
                  <div className="h-32 bg-travel-100 rounded-md loading-shimmer"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-travel-100 rounded-md loading-shimmer"></div>
                    <div className="h-16 bg-travel-100 rounded-md loading-shimmer"></div>
                  </div>
                  <div className="h-24 bg-travel-100 rounded-md loading-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {travelPlanResult && !isLoading && (
          <div id="results" className="mt-16">
            <Separator className="my-8" />
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-travel-900 mb-4">
                Your Personalized Travel Plan
              </h2>
              <p className="text-travel-600 max-w-2xl mx-auto">
                Here's your AI-generated travel itinerary based on your preferences. Enjoy your trip!
              </p>
            </div>
            
            {flightData && (
              <div className="glass-card bg-white/80 rounded-xl overflow-hidden border border-travel-100 shadow-xl mb-8">
                <FlightDetails flightData={flightData} />
              </div>
            )}
            
            <div className="glass-card bg-white/80 rounded-xl overflow-hidden border border-travel-100 shadow-xl">
              <TravelItinerary data={travelPlanResult} />
            </div>
          </div>
        )}
      </div>

      <GeminiKeyModal 
        open={keyModalOpen}
        onOpenChange={setKeyModalOpen}
        currentApiKey={apiKey}
        onSave={updateApiKey}
      />
    </div>
  );
};

export default Index;
