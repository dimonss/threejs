import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei'
import { Mesh, Points, BufferGeometry, Float32BufferAttribute } from 'three'

function RotatingSphere() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[-3, 2, 0]}>
      <MeshDistortMaterial
        color="#ff6b6b"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
      />
    </Sphere>
  )
}

function RotatingBox() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4
      meshRef.current.rotation.z += delta * 0.6
    }
  })

  return (
    <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={[3, 2, 0]}>
      <meshStandardMaterial color="#4ecdc4" metalness={0.8} roughness={0.2} />
    </Box>
  )
}

function RotatingTorus() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Torus ref={meshRef} args={[1, 0.4, 16, 100]} position={[0, 2, 0]}>
      <meshStandardMaterial color="#ffe66d" metalness={0.7} roughness={0.3} />
    </Torus>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<Points<BufferGeometry>>(null)
  const particleCount = 100
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [particleCount])

  const geometry = useMemo(() => {
    const geom = new BufferGeometry()
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geom
  }, [positions])

  useFrame((_state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.1} color="#ffffff" />
    </points>
  )
}

function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#2c3e50" roughness={0.8} metalness={0.2} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow={true} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[10, 10, -10]} intensity={0.5} color="#4ecdc4" />
      
      <Plane />
      <RotatingSphere />
      <RotatingBox />
      <RotatingTorus />
      <FloatingParticles />
    </>
  )
}

