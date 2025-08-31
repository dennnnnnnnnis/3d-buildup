import { useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'

const BedModel = ({ position, onSelect }) => {
  const { scene } = useGLTF('/models/bed.glb')
  const groupRef = useRef()

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone()

  // Enable shadows
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        if (onSelect && groupRef.current) {
          onSelect(groupRef.current) // Pass the group reference, not the clicked object
        }
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <primitive object={clonedScene} scale={[1, 1, 1]} />
    </group>
  )
}

const Bed = ({ position = [3, 0, -6], onSelect }) => {
  return (
    <Suspense fallback={null}>
      <BedModel position={position} onSelect={onSelect} />
    </Suspense>
  )
}

// Preload for performance
useGLTF.preload('/models/bed.glb')

export default Bed