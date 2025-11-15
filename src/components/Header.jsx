import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/resourcia_logo.png"
              alt="Resourcia Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold">Resourcia</span>
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
