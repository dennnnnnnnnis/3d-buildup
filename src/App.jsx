import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import './App.css'
import Experience from './components/experience'
import ItemCatalog from './components/ItemCatalog'

function App() {
  const [selectedObject, setSelectedObject] = useState(null)
  const [mode, setMode] = useState("translate")

  return (
    <div className='fixed inset-0 flex flex-col md:flex-row'>

      {/* Item Catalog Sidebar */}
      <div className='md:w-1/4 w-full h-1/3 md:h-full bg-white border-r border-gray-200'>
        <ItemCatalog />
      </div>

      {/* 3D Scene area */}
      <div className='md:w-3/4 w-full h-2/3 md:h-full relative'>
        <Canvas 
          shadows
          camera={{ position: [8, 6, 8], fov: 60 }}
        >
          <Experience 
            onSelectionChange={setSelectedObject}
            mode={mode}
            setMode={setMode}
          />
        </Canvas>

        {/* Fixed UI Instructions - Bottom Left */}
        {selectedObject && (
          <div 
            className="absolute bottom-5 left-5 z-50"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              minWidth: '250px'
            }}
          >
            <div style={{ marginBottom: '10px', color: '#4CAF50', fontWeight: 'bold' }}>
              🎯 Object Selected
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
              <button
                onClick={() => setMode('translate')}
                style={{
                  background: mode === 'translate' ? '#4CAF50' : '#333',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Move (G)
              </button>
              <button
                onClick={() => setMode('rotate')}
                style={{
                  background: mode === 'rotate' ? '#4CAF50' : '#333',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Rotate (R)
              </button>
            </div>
            <div style={{ fontSize: '12px', opacity: '0.8' }}>
              Press ESC to deselect • Click background to deselect
            </div>
          </div>
        )}

        {/* Fixed General Instructions - Bottom Right */}
        <div 
          className="absolute bottom-5 right-5 z-40"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '12px 18px',
            borderRadius: '8px',
            fontSize: '13px',
            textAlign: 'left',
            fontFamily: 'Arial, sans-serif',
            width: '400px',
            lineHeight: '1.4'
          }}
        >
          <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4CAF50' }}>
            🏠 Interactive Furniture Controls
          </div>
          <div style={{ marginBottom: '4px' }}>• Click furniture to select and show transform gizmos</div>
          <div style={{ marginBottom: '4px' }}>• Drag red/green arrows to move horizontally</div>
          <div style={{ marginBottom: '4px' }}>• Use rotate mode to rotate objects</div>
          <div style={{ opacity: '0.8', fontSize: '11px' }}>Keyboard: G (move) • R (rotate) • ESC (deselect)</div>
        </div>
      </div>
    </div>
  )
}

export default App
