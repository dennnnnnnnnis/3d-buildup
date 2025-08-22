import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/experience'

function App() {

  return (
    <div className='fixed inset-0 flex flex-col md:flex-row'>

      {/* Configuration and panel */}
      <div className='md:w-2/5 w-full h-1/3 md:h-full bg-white p-4'>
        <h2 className="text-xl font-bold mb-4">Room Configuration</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Furniture</h3>
            <ul className="text-sm text-gray-600">
              <li>• Bed with oak frame and white mattress</li>
              <li>• Desk with walnut finish and drawers</li>
              <li>• Monitor, keyboard, and mouse setup</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Controls</h3>
            <ul className="text-sm text-gray-600">
              <li>• Left click + drag to rotate view</li>
              <li>• Right click + drag to pan</li>
              <li>• Scroll to zoom in/out</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Materials</h3>
            <ul className="text-sm text-gray-600">
              <li>• Oak wood texture for bed frame</li>
              <li>• Walnut finish for desk surface</li>
              <li>• Matte flooring texture</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demonstration area */}
      <div className='md:w-3/5 w-full h-2/3 md:h-full'>
        <Canvas 
          shadows
          camera={{ position: [8, 6, 8], fov: 60 }}
        >
          <Experience />
        </Canvas>
      </div>
    </div>
  )
}

export default App
