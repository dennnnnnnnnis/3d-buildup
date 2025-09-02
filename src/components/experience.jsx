import { Suspense, useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { OrbitControls, TransformControls, Environment, Center } from '@react-three/drei'
import Room from './Room'
import ModelLoader from '../ModelLoader'

const Experience = forwardRef(({ onSelectionChange, onModeChange, mode, setMode }, ref) => {
    const orbitRef = useRef()
    const transformRef = useRef()
    const [selected, setSelected] = useState(null)

    const [models, setModels] = useState([
        {
            url: '/models/Mallory Tufted Upholstered Sectional.glb',
            scale: 1,
            position: [0, 0, 0],
            autoRotate: false,
            name: 'Mallory Tufted Upholstered Sectional'
        }
    ])

    const clearModels = () => {
        models.forEach(model => URL.revokeObjectURL(model.url))
        setModels([])
    }

    const addModelFromCatalog = (catalogItem) => {
        const newModel = {
            url: catalogItem.model,
            scale: catalogItem.scale || 1,
            position: [0, 0, 0], // Center position
            autoRotate: false,
            name: catalogItem.name,
            id: `${catalogItem.id}-${Date.now()}`
        }
        setModels(prev => [...prev, newModel])
    }

    // Expose functions to parent component
    useImperativeHandle(ref, () => ({
        addModelFromCatalog,
        clearModels
    }))

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
                    case 's': // S for scale
                        setMode('scale')
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
            {/* Background mesh */}
            <mesh 
                name="background-plane"
                position={[0, -0.01, 0]} 
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={handleBackgroundClick}
                receiveShadow
            >
                <planeGeometry args={[25, 25]} />
                <meshStandardMaterial color="#444444" />
            </mesh>

            {/* Enhanced Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight 
                position={[10, 10, 5]} 
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />

            <Environment preset="studio" />
            
            {/* Room Environment */}
            {/* <Room /> */}
            
            {/* Models */}
            <ModelLoader models={models} onSelect={(obj) => setSelected(obj)} />
            
            {/* Camera Controls */}
            <OrbitControls
                ref={orbitRef}
                makeDefault
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                zoomSpeed={0.4}
                minDistance={5}
                maxDistance={30}
            />

            {/* Transform Controls - only show when something is selected */}
            {selected && (
                <TransformControls
                    ref={transformRef}
                    object={selected}
                    mode={mode}
                    showY={mode !== 'translate'} // Allow Y-axis for rotate and scale, restrict for translate
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
})

Experience.displayName = 'Experience'

export default Experience