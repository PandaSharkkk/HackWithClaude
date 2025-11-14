import { useState } from 'react';
import Header from '../components/Header';
import Map from '../components/Map';
import CategoryFilter from '../components/CategoryFilter';
import ChatbotWidget from '../components/ChatbotWidget';
import resourcesData from '../data/resources.json';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-80 md:h-full overflow-y-auto p-4 order-2 md:order-1">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="flex-1 order-1 md:order-2 h-96 md:h-full">
          <Map resources={resourcesData} selectedCategory={selectedCategory} />
        </div>
      </div>
      <ChatbotWidget />
    </div>
  );
}
