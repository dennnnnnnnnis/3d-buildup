import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = false, onSelect, name }) {
  const { scene } = useGLTF(url)
  const ref = useRef()
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

  useFrame((state) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <group 
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation()
        if (onSelect && groupRef.current) {
          onSelect(groupRef.current) // Pass the group reference
        }
      }}
      onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
      onPointerOut={(e) => (document.body.style.cursor = 'auto')}
    >
      <primitive 
        ref={ref}
        object={clonedScene} 
        scale={scale} 
        castShadow
        receiveShadow
      />
    </group>
  )
}

function ModelLoader({ models = [], onSelect }) {
  if (!models.length) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
    )
  }

  return (
    <>
      {models.map((model, index) => (
        <Model
          key={index}
          url={model.url}
          scale={model.scale || 1}
          position={model.position || [index * 3, 0, 0]}
          rotation={model.rotation || [0, 0, 0]}
          autoRotate={model.autoRotate || false}
          onSelect={onSelect}
          name={model.name || `model-${index}`}
        />
      ))}
    </>
  )
}

useGLTF.preload = (url) => useGLTF(url)

export default ModelLoader