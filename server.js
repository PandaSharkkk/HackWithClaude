import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
});

// Load resources data
const resourcesData = JSON.parse(
  fs.readFileSync(join(__dirname, 'src', 'data', 'resources.json'), 'utf8')
);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    console.log('Received chat request with', messages.length, 'messages');

    const additionalResources = {
      "resources": [
        {
          "id": "food_st_anthonys",
          "name": "St. Anthony's Dining Room",
          "category": "food",
          "website": "https://www.stanthonysf.org/services/dining-room/",
          "hours": "Open 7 days/week; Breakfast 7:00am; Lunch 10:00am–1:30pm; Afternoon hot meal 2:00pm (Mon–Fri)"
        },
        {
          "id": "food_glide",
          "name": "GLIDE Daily Free Meals",
          "category": "food",
          "website": "https://www.glide.org/programs/daily-free-meals/",
          "hours": "7 days/week; Breakfast 8–9am; Lunch 11:30am–1pm; Dinner 4–5pm"
        },
        {
          "id": "food_mission_hub",
          "name": "Mission Food Hub",
          "category": "food",
          "website": "https://www.missionfoodhub.org/",
          "hours": "Mon & Fri 1:00–6:00pm"
        },
        {
          "id": "shelter_msc_south",
          "name": "MSC-South Shelter",
          "category": "shelter",
          "website": "https://svdp-sf.org/what-we-do/msc-shelter/",
          "hours": "Daily intake/check-in 9:30am–8:00pm"
        },
        {
          "id": "shelter_next_door",
          "name": "Next Door Shelter",
          "category": "shelter",
          "website": "https://www.sf.gov/sign-adult-shelter-san-francisco",
          "hours": "Open 24/7 (bed availability varies)"
        },
        {
          "id": "shelter_sanctuary",
          "name": "Sanctuary Shelter",
          "category": "shelter",
          "website": "https://www.sf.gov/sign-adult-shelter-san-francisco",
          "hours": "Daily check-in 9:00am–10:00pm"
        },
        {
          "id": "medical_sf_free_clinic",
          "name": "San Francisco Free Clinic",
          "category": "medical",
          "website": "https://www.sffc.org/",
          "hours": "Mon–Fri 10:00am–4:30pm (appointment only)"
        },
        {
          "id": "medical_clinic_by_the_bay",
          "name": "Clinic by the Bay",
          "category": "medical",
          "website": "https://www.clinicbythebay.org/",
          "hours": "Mon 10am–5pm; Tue 12–8pm; Thu 10am–6pm (varies)"
        },
        {
          "id": "medical_city_clinic",
          "name": "City Clinic (SF)",
          "category": "medical",
          "website": "https://www.sf.gov/cityclinic-location",
          "hours": "Mon/Wed/Fri 8am–4pm; Tue 1–6pm; Thu 8–11am & 1–4pm"
        },
        {
          "id": "mental_sf_suicide_prevention",
          "name": "San Francisco Suicide Prevention Crisis Line",
          "category": "mental_health_safety",
          "website": "https://www.sfsuicide.org/about-988/",
          "hours": "24/7"
        },
        {
          "id": "mental_988",
          "name": "988 Suicide & Crisis Lifeline",
          "category": "mental_health_safety",
          "website": "https://988lifeline.org/",
          "hours": "24/7"
        },
        {
          "id": "mental_nami_sf",
          "name": "NAMI San Francisco Crisis Resources",
          "category": "mental_health_safety",
          "website": "https://www.namisf.org/crisis-resources",
          "hours": "Hours vary by hotline/team"
        },
        {
          "id": "docs_dmv_sf",
          "name": "California DMV – San Francisco Field Office",
          "category": "lost_id_docs",
          "website": "https://www.dmv.ca.gov/portal/field-office/san-francisco/",
          "hours": "Mon/Tue/Thu/Fri 8am–5pm; Wed 9am–5pm"
        },
        {
          "id": "docs_homeless_id_project",
          "name": "Homeless ID Project",
          "category": "lost_id_docs",
          "website": "https://www.homelessidproject.org/",
          "hours": "Hours by appointment (contact required)"
        },
        {
          "id": "water_sf_water_taps",
          "name": "SF Public Tap / Water Fountain Stations",
          "category": "water",
          "website": "https://www.sf.gov/water-access",
          "hours": "Public refill stations available around the city (map on SF Water Access page)"  
        },
        {
          "id": "restroom_sf_pit_stop",
          "name": "Pit Stop Public Toilet Program",
          "category": "restroom",
          "website": "https://sfpublicworks.org/services/pitstop",
          "hours": "Various sites, many daily; e.g., Market & Castro 8am–8pm, many others 24 hr or specific times"  
        },
        {
          "id": "dropin_mission_nrc",
          "name": "Mission Neighborhood Resource Center (Drop-In)",
          "category": "shelter_dropin",
          "website": "https://www.sf.gov/resource--2024--local-drop-centers-people-experiencing-homelessness-san-francisco",
          "hours": "Hours vary; for drop-in including restrooms, case management, lockers"  
        },
        {
          "id": "dropin_bayview_center",
          "name": "Bayview Drop-In Center",
          "category": "shelter_dropin",
          "website": "https://www.sf.gov/resource--2024--local-drop-centers-people-experiencing-homelessness-san-francisco",
          "hours": "Hours vary; call (415) 671-1100 for info"  
        },
        {
          "id": "hygiene_st_anthonys_hub",
          "name": "St. Anthony's Hygiene Hub",
          "category": "hygiene",
          "website": "https://www.stanthonysf.org/services/hygiene-hub/",
          "hours": "By appointment; includes showers & laundry"  
        },
        {
          "id": "dropin_mission_nrc",
          "name": "Mission Neighborhood Resource Center (Drop-In)",
          "category": "hygiene",
          "website": "https://www.sf.gov/resource--2024--local-drop-centers-people-experiencing-homelessness-san-francisco",
          "hours": "Hours vary by service – call (415) 869-7977"  
        },
        {
          "id": "dropin_bayview_center",
          "name": "Bayview Drop-In Center",
          "category": "hygiene",
          "website": "https://www.sf.gov/resource--2024--local-drop-centers-people-experiencing-homelessness-san-francisco",
          "hours": "Hours vary – call for current schedule"  
        },
        {
          "id": "clothing_st_anthonys_free_clothing",
          "name": "St. Anthony’s Free Clothing Program",
          "category": "clothing",
          "website": "https://sf-goso.org/support-services/free-clothing-program-supportive-services/",
          "hours": "Mon–Fri, sign-ups 7:30am–12pm; shopping spots ~8:15am–11:45am; family lottery 3:00–4:00pm"  
        },
        {
          "id": "clothing_cradles_to_crayons_sf",
          "name": "Cradles to Crayons – San Francisco",
          "category": "clothing",
          "website": "https://www.cradlestocrayons.org/",
          "hours": "Depends on program / drop-off; check website for details"  
        },
        {
          "id": "medical_sf_free_clinic_sffc",
          "name": "San Francisco Free Clinic (SFFC)",
          "category": "medical",
          "website": "https://sffc.org/primary-care",
          "hours": "Mon–Fri 10:00am–4:30pm (by appointment only)"  
        },
        {
          "id": "medical_healthright360_integrated",
          "name": "HealthRIGHT 360 – Integrated Care Center",
          "category": "medical",
          "website": "https://www.sfccc.org/healthright-360/",
          "hours": "Mon–Fri 8:45am–5:00pm"  
        },
        {
          "id": "medical_sos_street_outreach",
          "name": "Street Outreach Services (SFCCC / Health Care for the Homeless)",
          "category": "medical",
          "website": "https://www.sfccc.org/street-outreach",
          "hours": "Mobile van – outreach times vary; calls recommended for schedule"  
        },
        {
          "id": "medical_haight_ashbury_free_clinic",
          "name": "Haight Ashbury Free Medical Clinic",
          "category": "medical",
          "website": "https://healthysanfrancisco.org/wp-content/uploads/HSF_Medical_Home_Directory_ENG.pdf",
          "hours": "Mon–Thu 8:45am–8:00pm; Fri 12:00pm–5:00pm"  
        },
        {
          "id": "medical_housing_urban_health_clinic",
          "name": "Housing & Urban Health Clinic (HUHC)",
          "category": "medical",
          "website": "https://healthysanfrancisco.org/wp-content/uploads/HSF_Medical_Home_Directory_ENG.pdf",
          "hours": "M, Tu, W, F 8:30am–4:30pm; Thu 8:30am–12:00pm"  
        }
      ]
    };

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: `You are a helpful assistant for finding community resources in San Francisco.
You have access to the following resource categories:
- Food: Free meals and food banks
- Shelter: Emergency housing and overnight shelters
- Medical: Free and low-cost medical clinics
- Mental Health & Safety: Crisis lines and mental health support
- Lost ID/Docs: Help getting identification and documents
- Water: Public water fountains for drinking water
- Restrooms: Public restroom facilities
- Repair Cafes: Places where you can get items repaired for free

Here are the available resources in our database:
${JSON.stringify(resourcesData, null, 2)}

Additional community resources:
${JSON.stringify(additionalResources, null, 2)}

When someone asks for help, analyze their needs and recommend the most relevant resources.
Be empathetic, helpful, and provide specific resource names, addresses, hours, and website links when available.
Format your response in a conversational, supportive way. If you suggest resources, list them clearly with their hours and websites.`,
      messages: messages,
    });

    console.log('Successfully received response from Claude');

    res.json({
      content: response.content[0].text,
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({
      error: 'Failed to get response from Claude',
      message: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Anthropic API Key configured: ${process.env.VITE_ANTHROPIC_API_KEY ? 'Yes' : 'No'}`);
});
