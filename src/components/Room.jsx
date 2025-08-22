import { useTexture } from '@react-three/drei'

const Room = () => {
  const matteTexture = useTexture('/textures/matte_1k.jpg')
  
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          map={matteTexture}
          color="#f5f5f5"
        />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 4, -10]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-10, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[10, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 9, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
    </group>
  )
}

export default Room
