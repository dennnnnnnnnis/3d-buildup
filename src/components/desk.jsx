import { useTexture, useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'

const DeskModel = ({ position, onSelect }) => {
  const { scene } = useGLTF('/models/desk.glb')
  const groupRef = useRef()
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone()
  
  // Traverse the scene to enable shadows
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
          onSelect(groupRef.current) // Pass the group reference
        }
      }}
      onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
      onPointerOut={(e) => (document.body.style.cursor = 'auto')}
    >
      <primitive object={clonedScene} scale={[1, 1, 1]} />
    </group>
  )
}

const Desk = ({ position = [-4, 0, -2], onSelect }) => {
  
  return (
    <Suspense fallback={null}>
      <DeskModel position={position} onSelect={onSelect} />
    </Suspense>
  )
}

// Preload the GLB model for better performance
useGLTF.preload('/models/desk.glb')

export default Desk