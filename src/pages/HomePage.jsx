import { useState } from 'react';
import Header from '../components/Header';
import Map from '../components/Map';
import CategoryFilter from '../components/CategoryFilter';
import Chatbot from '../components/Chatbot';
import resourcesData from '../data/resources.json';

export default function HomePage() {
  // Initialize with all categories selected
  const [selectedCategories, setSelectedCategories] = useState([
    'food_bank',
    'water',
    'restroom',
    'shelter',
    'repair_cafe',
    'hygiene',
    'clothing',
    'medical',
    'mental_health_safety',
    'lost_id_docs'
  ]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar - Chatbot */}
        <div className="md:w-96 md:h-full bg-white border-r border-gray-200 flex flex-col order-2 md:order-1">
          <Chatbot />
        </div>

        {/* Right Area - Map with Filter on Top */}
        <div className="flex-1 order-1 md:order-2 h-96 md:h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="flex-1">
            <Map resources={resourcesData} selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}
