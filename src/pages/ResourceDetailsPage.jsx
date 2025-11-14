import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import ResourceInfoCard from '../components/ResourceInfoCard';
import resourcesData from '../data/resources.json';

export default function ResourceDetailsPage() {
  const { id } = useParams();
  const resource = resourcesData.find(r => r.id === id);

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
            <p className="text-gray-600 mb-6">
              The resource you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Map
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Map
        </Link>
        <ResourceInfoCard resource={resource} />
      </div>
    </div>
  );
}
