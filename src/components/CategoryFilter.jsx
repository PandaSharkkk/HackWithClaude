const categories = [
  { id: 'all', label: 'All Resources', color: 'bg-gray-600', icon: '🗺️' },
  { id: 'food_bank', label: 'Food Banks', color: 'bg-green-600', icon: '🍎' },
  { id: 'water', label: 'Water', color: 'bg-blue-600', icon: '💧' },
  { id: 'restroom', label: 'Restrooms', color: 'bg-purple-600', icon: '🚻' },
  { id: 'shelter', label: 'Shelters', color: 'bg-red-600', icon: '🏠' },
  { id: 'repair_cafe', label: 'Repair Cafes', color: 'bg-amber-600', icon: '🔧' },
];

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Filter Resources</h2>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`${
              selectedCategory === category.id
                ? `${category.color} text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } px-4 py-3 rounded-lg font-medium transition-colors text-left flex items-center space-x-2`}
          >
            <span className="text-xl">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
