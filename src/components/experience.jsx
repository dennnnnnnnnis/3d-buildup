import { Suspense, useRef, useState, useEffect } from 'react'
import { OrbitControls, TransformControls } from '@react-three/drei'
import Room from './Room'
import Bed from './Bed'
import Desk from './desk'

const Experience = ({ onSelectionChange, onModeChange, mode, setMode }) => {
    const orbitRef = useRef()
    const transformRef = useRef()
    const [selected, setSelected] = useState(null)

    // Notify parent when selection changes
    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange(selected)
        }
    }, [selected, onSelectionChange])

    // Handle keyboard shortcuts for mode switching
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (selected) {
                switch (event.key.toLowerCase()) {
                    case 'g': // G for grab/move
                        setMode('translate')
                        break
                    case 'r': // R for rotate
                        setMode('rotate')
                        break
                    case 'escape': // Escape to deselect
                        setSelected(null)
                        break
                }
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [selected, setMode])

    // Handle background click to deselect
    const handleBackgroundClick = (event) => {
        // Only deselect if clicking on the background plane, not furniture
        if (event.object.name === 'background-plane') {
            setSelected(null)
        }
    }

    return (
        <Suspense fallback={null}>
            {/* Background mesh to capture clicks for deselection */}
            <mesh 
                name="background-plane"
                position={[0, -1, 0]} 
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={handleBackgroundClick}
                visible={false}
            >
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

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
            <Bed position={[3, 0, -6]} onSelect={(obj) => setSelected(obj)} />
            <Desk position={[-4, 0, -2]} onSelect={(obj) => setSelected(obj)} />
            
            {/* Camera Controls */}
            <OrbitControls
                ref={orbitRef}
                makeDefault
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={20}
            />

            {/* Transform Controls - only show when something is selected */}
            {selected && (
                <TransformControls
                    ref={transformRef}
                    object={selected}
                    mode={mode}
                    showY={false} // Only allow horizontal movement
                    space="local"
                    size={1}
                    onMouseDown={() => {
                        if (orbitRef.current) orbitRef.current.enabled = false
                    }}
                    onMouseUp={() => {
                        if (orbitRef.current) orbitRef.current.enabled = true
                    }}
                    rotationSnap={Math.PI / 12} // 15-degree rotation snaps
                />
            )}


        </Suspense>
    )
}

export default Experience