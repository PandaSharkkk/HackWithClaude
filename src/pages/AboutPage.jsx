import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Resourcia
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
              <p>
                Resourcia is designed to help residents and visitors of San Francisco
                easily find essential community resources. Whether you need food, shelter, water,
                restrooms, or repair services, our interactive map makes it simple to locate help nearby.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">What We Offer</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Food Banks:</strong> Free groceries and hot meals for individuals and families
                </li>
                <li>
                  <strong>Shelters:</strong> Emergency housing and support services
                </li>
                <li>
                  <strong>Medical:</strong> Free and low-cost healthcare clinics and services
                </li>
                <li>
                  <strong>Mental Health & Crisis:</strong> 24/7 crisis lines and mental health support
                </li>
                <li>
                  <strong>Hygiene:</strong> Showers, toiletries, and personal care facilities
                </li>
                <li>
                  <strong>Clothing:</strong> Free clothing and apparel assistance
                </li>
                <li>
                  <strong>ID & Documents:</strong> Help obtaining identification and important documents
                </li>
                <li>
                  <strong>Water Fountains:</strong> Public drinking water access points
                </li>
                <li>
                  <strong>Restrooms:</strong> Clean, public restroom facilities
                </li>
                <li>
                  <strong>Repair Cafes:</strong> Free repair help to save money and reduce waste
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to Use</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Browse the interactive map on the home page</li>
                <li>Filter resources by category using the sidebar buttons</li>
                <li>Click on map markers to see basic information</li>
                <li>Click "View Details" to get full information including hours and descriptions</li>
                <li>Use the AI chatbot for personalized resource recommendations</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">AI Assistant</h2>
              <p>
                Our chatbot can help you find resources based on your specific needs. Simply click
                the chat icon in the bottom-right corner and describe what you're looking for. The
                assistant will suggest relevant resources and provide quick access to their details.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Get Started</h2>
              <p className="mb-4">
                Ready to find the resources you need? Head back to the map and start exploring!
              </p>
              <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Resources
              </Link>
            </section>

            <section className="text-sm text-gray-600">
              <p>
                <strong>Note:</strong> This is an MVP (Minimum Viable Product) with static data.
                Resource information should be verified directly with the organizations.
                Hours and availability may change.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
