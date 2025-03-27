
/**
 * Utility functions for interacting with SerpAPI
 */

// Get SerpAPI key from localStorage
export const getSerpApiKey = (): string => {
  return localStorage.getItem('serpapi_key') || '';
};

// Set SerpAPI key in localStorage
export const setSerpApiKey = (key: string): void => {
  localStorage.setItem('serpapi_key', key);
};

// Clear SerpAPI key from localStorage
export const clearSerpApiKey = (): void => {
  localStorage.removeItem('serpapi_key');
};

// Fetch flight data from SerpAPI
export const fetchFlightData = async (params: {
  departure_id: string;
  arrival_id: string;
  outbound_date: string;
  api_key: string;
}) => {
  const { departure_id, arrival_id, outbound_date, api_key } = params;
  
  try {
    const url = `https://serpapi.com/search.json?engine=google_flights&type=2&departure_id=${departure_id}&arrival_id=${arrival_id}&outbound_date=${outbound_date}&currency=USD&hl=en&api_key=${api_key}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`SerpAPI returned ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};

// Get airport codes for popular destinations
export const getAirportCode = (city: string): string => {
  const airportCodes: Record<string, string> = {
    'new york': 'JFK',
    'los angeles': 'LAX',
    'chicago': 'ORD',
    'san francisco': 'SFO',
    'miami': 'MIA',
    'london': 'LHR',
    'paris': 'CDG',
    'tokyo': 'HND',
    'sydney': 'SYD',
    'dubai': 'DXB',
    'singapore': 'SIN',
    'delhi': 'DEL',
    'mumbai': 'BOM',
    'bangkok': 'BKK',
    'hanoi': 'HAN',
    'berlin': 'BER',
    'rome': 'FCO',
    'madrid': 'MAD',
    'toronto': 'YYZ',
    'mexico city': 'MEX',
    'shanghai': 'PVG',
    'beijing': 'PEK',
    'hong kong': 'HKG',
    'seoul': 'ICN',
    'amsterdam': 'AMS',
    'istanbul': 'IST',
    'cairo': 'CAI',
    'johannesburg': 'JNB',
    'rio de janeiro': 'GIG',
    'buenos aires': 'EZE',
  };
  
  // Try to match exact city name
  if (airportCodes[city.toLowerCase()]) {
    return airportCodes[city.toLowerCase()];
  }
  
  // Try to match partial city name
  const cityLower = city.toLowerCase();
  for (const [key, code] of Object.entries(airportCodes)) {
    if (cityLower.includes(key) || key.includes(cityLower)) {
      return code;
    }
  }
  
  // Default to a placeholder if no match is found
  return city.substring(0, 3).toUpperCase();
};
