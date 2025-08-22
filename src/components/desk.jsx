import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Desk = ({ position = [-4, 0, -2] }) => {
  const walnutTexture = useTexture('/textures/walnut_diff_1k.jpg')
  
  // Try to load the existing desk model, fallback to custom geometry
  let deskModel = null
  try {
    deskModel = useLoader(GLTFLoader, '/models/desk.glb')
  } catch (error) {
    console.log('Desk model not found, using custom geometry')
  }
  
  if (deskModel) {
    return (
      <group position={position}>
        <primitive object={deskModel.scene} scale={[1, 1, 1]} castShadow />
      </group>
    )
  }
  
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

export default Desk