import { useState, useEffect } from 'react';

const categories = [
  { id: 'food_bank', label: 'Food Banks', color: 'bg-green-600', icon: '🍎' },
  { id: 'water', label: 'Water', color: 'bg-blue-600', icon: '💧' },
  { id: 'restroom', label: 'Restrooms', color: 'bg-purple-600', icon: '🚻' },
  { id: 'shelter', label: 'Shelters', color: 'bg-red-600', icon: '🏠' },
  { id: 'repair_cafe', label: 'Repair Cafes', color: 'bg-amber-600', icon: '🔧' },
  { id: 'hygiene', label: 'Hygiene', color: 'bg-teal-600', icon: '🧼' },
  { id: 'clothing', label: 'Clothing', color: 'bg-pink-600', icon: '👕' },
  { id: 'medical', label: 'Medical', color: 'bg-rose-600', icon: '🏥' },
  { id: 'mental_health_safety', label: 'Mental Health & Crisis', color: 'bg-indigo-600', icon: '🆘' },
  { id: 'lost_id_docs', label: 'ID & Documents', color: 'bg-cyan-600', icon: '📋' },
];

export default function CategoryFilter({ selectedCategories, setSelectedCategories }) {
  const [isOpen, setIsOpen] = useState(false);
  // Temporary state for selections before applying
  const [tempSelectedCategories, setTempSelectedCategories] = useState(selectedCategories);

  // Sync temp state when actual selected categories change externally
  useEffect(() => {
    setTempSelectedCategories(selectedCategories);
  }, [selectedCategories]);

  const toggleCategory = (categoryId) => {
    if (tempSelectedCategories.includes(categoryId)) {
      setTempSelectedCategories(tempSelectedCategories.filter(id => id !== categoryId));
    } else {
      setTempSelectedCategories([...tempSelectedCategories, categoryId]);
    }
  };

  const selectAll = () => {
    setTempSelectedCategories(categories.map(c => c.id));
  };

  const clearAll = () => {
    setTempSelectedCategories([]);
  };

  const applyFilters = () => {
    setSelectedCategories(tempSelectedCategories);
    setIsOpen(false);
  };

  const cancelChanges = () => {
    setTempSelectedCategories(selectedCategories);
    setIsOpen(false);
  };

  const selectedCount = selectedCategories.length;
  const tempCount = tempSelectedCategories.length;
  const allSelected = selectedCount === categories.length;
  const hasChanges = JSON.stringify(tempSelectedCategories.sort()) !== JSON.stringify(selectedCategories.sort());

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Filter Resources</h2>

      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-between"
      >
        <span>
          {selectedCount === 0
            ? 'No filters selected'
            : allSelected
            ? 'All Resources'
            : `${selectedCount} ${selectedCount === 1 ? 'filter' : 'filters'} selected`}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-lg">
          {/* Select All / Clear All */}
          <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <button
              onClick={selectAll}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Category Checkboxes */}
          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => {
              const isSelected = tempSelectedCategories.includes(category.id);
              return (
                <label
                  key={category.id}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCategory(category.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-2xl">{category.icon}</span>
                  <span className="ml-2 text-gray-700 font-medium flex-1">
                    {category.label}
                  </span>
                  {isSelected && (
                    <span className={`${category.color} text-white text-xs px-2 py-1 rounded-full`}>
                      Selected
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          {/* Apply/Cancel Buttons */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex gap-2">
            <button
              onClick={cancelChanges}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                hasChanges
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!hasChanges}
            >
              Apply Filters {tempCount > 0 && `(${tempCount})`}
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {selectedCount > 0 && !allSelected && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId);
              if (!category) return null;
              return (
                <span
                  key={categoryId}
                  className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                  <button
                    onClick={() => {
                      const newCategories = selectedCategories.filter(id => id !== categoryId);
                      setSelectedCategories(newCategories);
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
