import { useTexture } from '@react-three/drei'

const Bed = ({ position = [3, 0, -6] }) => {
  const oakTexture = useTexture('/textures/oak_veneer_01_diff_1k.jpg')
  
  return (
    <group position={position}>
      {/* Bed Frame Base */}
      <mesh position={[0, -0.7, 0]} castShadow>
        <boxGeometry args={[4, 0.3, 6]} />
        <meshStandardMaterial 
          map={oakTexture}
          color="#8B4513"
        />
      </mesh>
      
      {/* Mattress */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[3.8, 0.4, 5.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Headboard */}
      <mesh position={[0, 0.5, -2.8]} castShadow>
        <boxGeometry args={[4, 2, 0.2]} />
        <meshStandardMaterial 
          map={oakTexture}
          color="#8B4513"
        />
      </mesh>
      
      {/* Bed Legs */}
      <mesh position={[-1.8, -0.9, -2.8]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          map={oakTexture}
          color="#654321"
        />
      </mesh>
      
      <mesh position={[1.8, -0.9, -2.8]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          map={oakTexture}
          color="#654321"
        />
      </mesh>
      
      <mesh position={[-1.8, -0.9, 2.8]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          map={oakTexture}
          color="#654321"
        />
      </mesh>
      
      <mesh position={[1.8, -0.9, 2.8]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          map={oakTexture}
          color="#654321"
        />
      </mesh>
      
      {/* Pillow */}
      <mesh position={[0, 0.1, -2]} castShadow>
        <boxGeometry args={[1.5, 0.3, 0.8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Blanket */}
      <mesh position={[0, 0, 1]} castShadow>
        <boxGeometry args={[3.6, 0.1, 3]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
    </group>
  )
}

export default Bed
