
// Mock response from SerpAPI flights
export const getMockFlightData = () => {
  return {
    "best_flights": [
      {
        "flights": [
          {
            "departure_airport": {
              "name": "Chhatrapati Shivaji International Airport",
              "id": "BOM",
              "time": "07:30"
            },
            "arrival_airport": {
              "name": "Indira Gandhi International Airport",
              "id": "DEL",
              "time": "09:45"
            },
            "duration": 135, // 2h 15m
            "airplane": "Boeing 737-800",
            "airline": "IndiGo",
            "airline_logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/IndiGo_Airlines_logo.svg/200px-IndiGo_Airlines_logo.svg.png",
            "travel_class": "Economy",
            "flight_number": "6E-201",
            "extensions": ["Wi-Fi", "In-flight entertainment"],
            "legroom": "31 inches",
            "overnight": false,
            "often_delayed_by_over_30_min": false
          }
        ],
        "layovers": [],
        "total_duration": 135,
        "carbon_emissions": {
          "this_flight": 85000,
          "typical_for_this_route": 92000,
          "difference_percent": -8
        },
        "price": 3800,
        "type": "One way",
        "airline_logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/IndiGo_Airlines_logo.svg/200px-IndiGo_Airlines_logo.svg.png",
        "extensions": ["Refundable", "Free meal"]
      },
      {
        "flights": [
          {
            "departure_airport": {
              "name": "Chhatrapati Shivaji International Airport",
              "id": "BOM",
              "time": "12:15"
            },
            "arrival_airport": {
              "name": "Indira Gandhi International Airport",
              "id": "DEL",
              "time": "14:35"
            },
            "duration": 140, // 2h 20m
            "airplane": "Airbus A320",
            "airline": "Air India",
            "airline_logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Air_India_Logo.svg/200px-Air_India_Logo.svg.png",
            "travel_class": "Economy",
            "flight_number": "AI-865",
            "extensions": ["Wi-Fi", "Power outlets"],
            "legroom": "32 inches",
            "overnight": false,
            "often_delayed_by_over_30_min": true
          }
        ],
        "layovers": [],
        "total_duration": 140,
        "carbon_emissions": {
          "this_flight": 88000,
          "typical_for_this_route": 92000,
          "difference_percent": -4
        },
        "price": 4200,
        "type": "One way",
        "airline_logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Air_India_Logo.svg/200px-Air_India_Logo.svg.png",
        "extensions": ["Free cancellation", "Free meal"]
      }
    ],
    "price_insights": {
      "lowest_price": 3800,
      "price_level": "Low",
      "typical_price_range": [3500, 5000],
      "price_history": [
        [1709568000, 4500], // March 4
        [1711987200, 4200], // April 1
        [1714665600, 3800]  // May 2
      ]
    }
  };
};
