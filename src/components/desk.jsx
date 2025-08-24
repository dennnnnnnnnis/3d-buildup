import { useTexture, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

const DeskModel = ({ position }) => {
  // load the glb model
  const { scene } = useGLTF('/models/desk.glb')
  
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
    <group position={position}>
      <primitive object={clonedScene} scale={[1, 1, 1]} />
    </group>
  )
}

const Desk = ({ position = [-4, 0, -2] }) => {
  const walnutTexture = useTexture('/textures/walnut_diff_1k.jpg')
  
  return (
    <Suspense fallback={<FallbackDesk position={position} walnutTexture={walnutTexture} />}>
      <DeskModel position={position} />
    </Suspense>
  )
}

const FallbackDesk = ({ position, walnutTexture }) => {
  return (
    <group position={position}>
      {/* Desktop */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial 
          map={walnutTexture}
          color="#8B4513"
        />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-1.3, 0.35, -0.6]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[-1.3, 0.35, 0.6]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[1.3, 0.35, -0.6]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[1.3, 0.35, 0.6]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Left Drawer */}
      <mesh position={[-0.8, 0.3, 0]} castShadow>
        <boxGeometry args={[0.8, 0.3, 1.3]} />
        <meshStandardMaterial 
          map={walnutTexture}
          color="#654321"
        />
      </mesh>
      
      {/* Right Drawer */}
      <mesh position={[0.8, 0.3, 0]} castShadow>
        <boxGeometry args={[0.8, 0.3, 1.3]} />
        <meshStandardMaterial 
          map={walnutTexture}
          color="#654321"
        />
      </mesh>
      
      {/* Drawer Handles */}
      <mesh position={[-0.8, 0.3, 0.7]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.05]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      <mesh position={[0.8, 0.3, 0.7]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.05]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      {/* Monitor (simple representation) */}
      <mesh position={[0, 1.2, -0.3]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, 0.8, -0.3]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, 0.78, 0.3]} castShadow>
        <boxGeometry args={[0.8, 0.05, 0.3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[0.6, 0.78, 0.3]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.15]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  )
}

// Preload the GLB model for better performance
useGLTF.preload('/models/desk.glb')

export default Desk