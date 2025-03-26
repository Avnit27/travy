
// API key management - note this is a simplified approach for frontend only
let geminiApiKey = localStorage.getItem('geminiApiKey') || '';

export const setGeminiApiKey = (key: string) => {
  geminiApiKey = key;
  localStorage.setItem('geminiApiKey', key);
};

export const getGeminiApiKey = () => geminiApiKey;

export interface TravelPlannerInput {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
}

export interface TravelPlannerResult {
  itinerary: Array<{
    day: number;
    date: string;
    activities: Array<{
      time: string;
      activity: string;
      description: string;
      location?: string;
      cost?: string;
    }>;
  }>;
  totalEstimatedCost: string;
  generalTips: string[];
  accommodationSuggestions: Array<{
    name: string;
    description: string;
    priceRange: string;
  }>;
  transportationOptions: Array<{
    type: string;
    description: string;
    estimatedCost: string;
  }>;
}

export const generateTravelPlan = async (
  input: TravelPlannerInput
): Promise<TravelPlannerResult> => {
  if (!geminiApiKey) {
    throw new Error('Gemini API key is not set');
  }

  try {
    const prompt = `
    Act as a professional travel planner and create a detailed travel itinerary with the following details:
    
    Source: ${input.source}
    Destination: ${input.destination}
    Dates: From ${input.startDate} to ${input.endDate}
    Budget: ${input.budget}
    Number of Travelers: ${input.travelers}
    Interests: ${input.interests.join(', ')}
    
    Provide a day-by-day itinerary with activities, estimated costs, accommodation suggestions, transportation options, and general travel tips.
    
    Format your response as valid JSON matching this structure exactly:
    {
      "itinerary": [
        {
          "day": 1,
          "date": "YYYY-MM-DD",
          "activities": [
            {
              "time": "Morning/Afternoon/Evening",
              "activity": "Name of activity",
              "description": "Brief description",
              "location": "Location name",
              "cost": "Estimated cost"
            }
          ]
        }
      ],
      "totalEstimatedCost": "Total budget estimate",
      "generalTips": ["Tip 1", "Tip 2"],
      "accommodationSuggestions": [
        {
          "name": "Accommodation name",
          "description": "Brief description",
          "priceRange": "Price range"
        }
      ],
      "transportationOptions": [
        {
          "type": "Transportation type",
          "description": "Description",
          "estimatedCost": "Cost estimate"
        }
      ]
    }
    
    The response must be valid JSON without any additional text, formatting, or explanation.
    `;

    console.log('Sending request to Gemini API...');
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', data);
    
    // Extract the text from the response
    const text = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error('Error parsing JSON from Gemini response:', error);
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error generating travel plan:', error);
    throw error;
  }
};
