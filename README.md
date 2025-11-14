# SF Community Resource Map MVP

A web application that displays community resources (food banks, water fountains, restrooms, shelters, repair cafes) on an interactive map of San Francisco. Features an integrated AI chatbot to help users find resources.

## Features

- **Interactive Google Map** - Browse San Francisco community resources on an interactive map
- **Category Filtering** - Filter resources by type (food, water, restrooms, shelters, repair cafes)
- **Resource Details** - Click markers to view full information about each resource
- **AI Chatbot Assistant** - Get personalized resource recommendations via chat
- **Responsive Design** - Works on desktop and mobile devices
- **Direct Navigation** - Get directions to resources via Google Maps

## Tech Stack

- **Frontend:** React 18 with Vite
- **Routing:** React Router v6
- **Styling:** TailwindCSS
- **Maps:** Google Maps JavaScript API via @react-google-maps/api
- **State Management:** React hooks

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Google Maps API key (see setup instructions below)

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Set up your Google Maps API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API"
   - Create credentials (API key)
   - Copy your API key
   - Open `.env` file and replace `YOUR_API_KEY_HERE` with your actual API key:
     ```
     VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
     ```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Project Structure

```
community-resource-map/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx
│   │   ├── Map.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── ChatbotWidget.jsx
│   │   └── ResourceInfoCard.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ResourceDetailsPage.jsx
│   ├── data/               # Static data
│   │   └── resources.json  # Resource database
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables (API keys)
├── .env.example          # Example env file
└── README.md
```

## Usage

### Browsing Resources

1. Open the app to see the map centered on San Francisco
2. Use the filter buttons on the left to show specific resource types
3. Click on map markers to see basic info
4. Click "View Details" to see full information about a resource
5. Click "Get Directions" to open navigation in Google Maps

### Using the Chatbot

1. Click the blue chat bubble in the bottom-right corner
2. Type your question (e.g., "I need food" or "Where can I find shelter?")
3. The chatbot will suggest relevant resources
4. Click on suggested resources to view their details

### Sample Chatbot Queries

- "I'm hungry" or "I need food"
- "Where can I find shelter?"
- "I need a restroom"
- "Where can I get water?"
- "Can you help me fix something?"

## Resource Data

The app currently uses static data from `src/data/resources.json`. Each resource includes:

- **id:** Unique identifier
- **name:** Resource name
- **category:** food_bank | water | restroom | shelter | repair_cafe
- **address:** Street address
- **latitude/longitude:** GPS coordinates
- **hours:** Operating hours
- **description:** Details about the resource

## Customization

### Adding New Resources

Edit `src/data/resources.json` and add new entries following the existing format:

```json
{
  "id": "16",
  "name": "New Resource",
  "category": "food_bank",
  "address": "123 Main St, San Francisco, CA 94102",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "hours": "Mon-Fri 9AM-5PM",
  "description": "Description of the resource"
}
```

### Changing Map Center/Zoom

Edit `src/components/Map.jsx`:

```javascript
const center = {
  lat: 37.7749,  // Change latitude
  lng: -122.4194, // Change longitude
};

// In GoogleMap component
zoom={12}  // Change zoom level (higher = closer)
```

### Customizing Categories

Edit the `categories` array in `src/components/CategoryFilter.jsx` to add/remove categories.

## Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## Stretch Goals / Future Enhancements

- [ ] Real AI backend (OpenAI API or RAG)
- [ ] User location detection and "near me" features
- [ ] Crowdsourced updates (user-submitted resources)
- [ ] Admin panel for managing resources
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Search functionality
- [ ] Save favorite resources
- [ ] Mobile app (React Native)

## License

MIT

## Contributing

This is an MVP project. Feel free to fork and enhance it!

## Support

For issues or questions, please check:
- Google Maps API documentation: https://developers.google.com/maps/documentation
- React documentation: https://react.dev
- Vite documentation: https://vitejs.dev

## Acknowledgments

Built with React, Vite, TailwindCSS, and Google Maps API to help connect people with community resources in San Francisco.
