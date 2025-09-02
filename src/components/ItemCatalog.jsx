import { useState } from 'react'
import { items } from '../stores/catalog'

const ItemCatalog = ({ onItemSelect, onTabChange }) => {
  const [activeCategory, setActiveCategory] = useState('design')

  const handleTabChange = (categoryId) => {
    setActiveCategory(categoryId)
    if (onTabChange) {
      onTabChange(categoryId)
    }
  }

  const handleItemClick = (item) => {
    if (onItemSelect) {
      onItemSelect(item)
    }
  }

  // Get all items flattened for the Add Items view
  const allItems = Object.values(items).flat()
  
  const categories = [
    { id: 'floorplan', name: 'Edit Floorplan', icon: '🏠' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'add-items', name: 'Add Items', icon: '➕' }
  ]
  
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Category Navigation */}
      <div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-4 cursor-pointer flex items-center justify-between border-b border-gray-100 ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleTabChange(category.id)}
          >
            <span className="font-medium text-lg">{category.name}</span>
            <span className="text-2xl">{category.icon}</span>
          </div>
        ))}
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {/* adding item */}
        {activeCategory === 'add-items' ? (
          <div className="grid grid-cols-2 gap-4">
            {allItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-square bg-gray-100 rounded-md mb-2 flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden w-full h-full bg-gray-200 items-center justify-center text-gray-500 text-2xl">
                    📦
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800 text-center">{item.name}</p>
              </div>
            ))}
          </div>
          // if not adding item
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">{categories.find(c => c.id === activeCategory)?.icon}</div>
              <p className="text-lg font-medium">{categories.find(c => c.id === activeCategory)?.name}</p>
              <p className="text-gray-400 mt-2">Coming Soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemCatalog
