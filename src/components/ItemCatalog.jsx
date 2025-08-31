import { useState } from 'react'

const ItemCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('add-items')
  
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
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="font-medium text-lg">{category.name}</span>
            <span className="text-2xl">{category.icon}</span>
          </div>
        ))}
      </div>
      
      {/* Content Area - Coming Soon for all sections */}
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">{categories.find(c => c.id === activeCategory)?.icon}</div>
          <p className="text-lg font-medium">{categories.find(c => c.id === activeCategory)?.name}</p>
          <p className="text-gray-400 mt-2">Coming Soon</p>
        </div>
      </div>
    </div>
  )
}

export default ItemCatalog
