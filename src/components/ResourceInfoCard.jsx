const categoryInfo = {
  food_bank: { icon: '🍎', color: 'bg-green-100 text-green-800', label: 'Food Bank' },
  water: { icon: '💧', color: 'bg-blue-100 text-blue-800', label: 'Water Fountain' },
  restroom: { icon: '🚻', color: 'bg-purple-100 text-purple-800', label: 'Restroom' },
  shelter: { icon: '🏠', color: 'bg-red-100 text-red-800', label: 'Shelter' },
  repair_cafe: { icon: '🔧', color: 'bg-amber-100 text-amber-800', label: 'Repair Cafe' },
};

export default function ResourceInfoCard({ resource }) {
  const categoryData = categoryInfo[resource.category] || {};

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${resource.latitude},${resource.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`${categoryData.color} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
            <span>{categoryData.icon}</span>
            <span>{categoryData.label}</span>
          </span>
        </div>
        <h1 className="text-3xl font-bold">{resource.name}</h1>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address
          </h2>
          <p className="text-gray-700">{resource.address}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hours
          </h2>
          <p className="text-gray-700">{resource.hours}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Description
          </h2>
          <p className="text-gray-700">{resource.description}</p>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={openInGoogleMaps}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Get Directions</span>
          </button>
        </div>
      </div>
    </div>
  );
}
