import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const categoryColors = {
  food_bank: '#10B981', // green
  water: '#3B82F6', // blue
  restroom: '#8B5CF6', // purple
  shelter: '#EF4444', // red
  repair_cafe: '#F59E0B', // amber
  hygiene: '#14B8A6', // teal
  clothing: '#EC4899', // pink
  medical: '#F43F5E', // rose
  mental_health_safety: '#6366F1', // indigo
  lost_id_docs: '#06B6D4', // cyan
};

export default function Map({ resources, selectedCategories }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const navigate = useNavigate();

  // If no categories selected, show nothing. If all selected, show all.
  const filteredResources = selectedCategories.length === 0
    ? []
    : resources.filter(r => selectedCategories.includes(r.category));

  const handleMarkerClick = (resource) => {
    setSelectedMarker(resource);
  };

  const handleInfoWindowClick = (resourceId) => {
    navigate(`/resource/${resourceId}`);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {filteredResources.map((resource) => (
          <Marker
            key={resource.id}
            position={{ lat: resource.latitude, lng: resource.longitude }}
            onClick={() => handleMarkerClick(resource)}
            icon={{
              path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
              scale: 10,
              fillColor: categoryColors[resource.category],
              fillOpacity: 0.8,
              strokeColor: '#fff',
              strokeWeight: 2,
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <h3 className="font-bold text-lg mb-1">{selectedMarker.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedMarker.address}</p>
              <button
                onClick={() => handleInfoWindowClick(selectedMarker.id)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View Details →
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
