# Setup Guide

## Getting Your Google Maps API Key

The app requires a Google Maps API key to display the map. Here's how to get one:

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" at the top
4. Click "New Project"
5. Enter a project name (e.g., "Community Resource Map")
6. Click "Create"

### Step 2: Enable the Maps JavaScript API

1. In the Google Cloud Console, make sure your new project is selected
2. Go to "APIs & Services" > "Library" (or click [here](https://console.cloud.google.com/apis/library))
3. Search for "Maps JavaScript API"
4. Click on "Maps JavaScript API"
5. Click "Enable"

### Step 3: Create an API Key

1. Go to "APIs & Services" > "Credentials" (or click [here](https://console.cloud.google.com/apis/credentials))
2. Click "+ CREATE CREDENTIALS" at the top
3. Select "API key"
4. Your API key will be created and displayed
5. Copy the API key

### Step 4: (Recommended) Restrict Your API Key

For security, you should restrict your API key:

1. Click "Edit API key" (or the pencil icon next to your key)
2. Under "API restrictions":
   - Select "Restrict key"
   - Check only "Maps JavaScript API"
3. Under "Application restrictions" (for production):
   - Select "HTTP referrers (web sites)"
   - Add your domain (e.g., `yourdomain.com/*`)
   - For local development, add: `http://localhost:5173/*`
4. Click "Save"

### Step 5: Add the API Key to Your Project

1. Open the `.env` file in your project root
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
   ```
3. Save the file
4. Restart the development server if it's already running

### Step 6: Verify It Works

1. Start the development server: `npm run dev`
2. Open `http://localhost:5173` in your browser
3. You should see the Google Map centered on San Francisco with resource markers

## Free Tier Information

Google Maps provides a generous free tier:
- $200 monthly credit (covers ~28,000 map loads)
- After that: $7 per 1,000 map loads
- You'll need to enable billing, but you won't be charged unless you exceed the free tier

## Troubleshooting

### Map not loading
- Check that you copied the entire API key correctly
- Make sure you enabled the "Maps JavaScript API" (not just "Maps API")
- Check the browser console for error messages
- Verify your API key restrictions allow localhost

### "This page can't load Google Maps correctly"
- Your API key may have billing disabled
- Check that the Maps JavaScript API is enabled
- Verify your API key in the Google Cloud Console

### Need to change the API key later?
Just edit the `.env` file and restart the dev server.

## Alternative: No API Key (Limited Testing)

If you want to test the app without a Google Maps API key:
- The map component will show an error, but the rest of the app will work
- The chatbot, category filters, and routing will all function normally
- You just won't see the actual map or markers

## Next Steps

Once your map is working:
1. Try the category filters to show different resource types
2. Click on markers to see InfoWindows
3. Click "View Details" to navigate to resource detail pages
4. Test the chatbot by asking for resources
5. Customize the resources in `src/data/resources.json`
