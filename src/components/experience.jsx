import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import Room from './Room'
import Bed from './Bed'
import Desk from './desk'

const Experience = () => {
    return (
        <Suspense fallback={null}>
            {/* Enhanced Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight 
                position={[10, 10, 5]} 
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 5, 5]} intensity={0.5} />
            
            {/* Room Environment */}
            <Room />
            
            {/* Furniture */}
            <Bed position={[3, 0, -6]} />
            <Desk position={[-4, 0, -2]} />
            
            {/* Camera Controls */}
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={20}
            />
        </Suspense>
    )
}

export default Experience