import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Group, Mesh } from 'three'

// Один стандартный стол
function StandardTable({ 
  position, 
  hasSwitch, 
  isOn, 
  onToggle 
}: { 
  position: [number, number, number]
  hasSwitch?: boolean
  isOn?: boolean
  onToggle?: () => void
}) {
  const tableWidth = 1.545
  const tableDepth = 0.8
  const tableHeight = 0.6
  
  return (
    <group position={position}>
      {/* Столешница */}
      <mesh position={[0, tableHeight, 0]} receiveShadow={true} castShadow={true}>
        <boxGeometry args={[tableWidth, 0.05, tableDepth]} />
        <meshStandardMaterial color="#A0A0A0" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Ножки стола */}
      <mesh position={[-tableWidth/2 + 0.1, tableHeight/2, -tableDepth/2 + 0.1]} castShadow={true}>
        <boxGeometry args={[0.1, tableHeight, 0.1]} />
        <meshStandardMaterial color="#FACD64" roughness={0.8} />
      </mesh>
      <mesh position={[tableWidth/2 - 0.1, tableHeight/2, -tableDepth/2 + 0.1]} castShadow={true}>
        <boxGeometry args={[0.1, tableHeight, 0.1]} />
        <meshStandardMaterial color="#FACD64" roughness={0.8} />
      </mesh>
      <mesh position={[-tableWidth/2 + 0.1, tableHeight/2, tableDepth/2 - 0.1]} castShadow={true}>
        <boxGeometry args={[0.1, tableHeight, 0.1]} />
        <meshStandardMaterial color="#FACD64" roughness={0.8} />
      </mesh>
      <mesh position={[tableWidth/2 - 0.1, tableHeight/2, tableDepth/2 - 0.1]} castShadow={true}>
        <boxGeometry args={[0.1, tableHeight, 0.1]} />
        <meshStandardMaterial color="#FACD64" roughness={0.8} />
      </mesh>
      {/* Выключатель на столе */}
      {hasSwitch && isOn !== undefined && onToggle && (
        <LightSwitch 
          position={[-2.1, tableHeight + 0.2, -0.38]}
          isOn={isOn} 
          onToggle={onToggle}
        />
      )}
      {/* Ноутбук на столе */}
      <Laptop position={[0, tableHeight + 0.01, 0]} rotete180={position[2]<0}/>
    </group>
  )
}

// Ноутбук на столе
function Laptop({ position, rotete180 }: { position: [number, number, number], rotete180: boolean }) {
  const laptopWidth = 0.35
  const laptopDepth = 0.25
  const laptopHeight = 0.02
  const screenHeight = 0.2
  
  return (
    <group position={position} rotation={[0, (rotete180 ? 3.14 : 0), 0]}>
      {/* Корпус ноутбука (клавиатура) */}
      <mesh position={[0, laptopHeight / 2, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[laptopWidth, laptopHeight, laptopDepth]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Экран ноутбука */}
      <group 
        position={[0, screenHeight / 2 + laptopHeight, -0.17]}
        rotation={[-Math.PI / 6, 0, 0]}
      >
        <mesh castShadow={true}>
          <boxGeometry args={[laptopWidth - 0.02, screenHeight, 0.01]} />
          <meshStandardMaterial 
            color="#E0E0E0" 
            emissive="#B0D4FF" 
            emissiveIntensity={1.5}
            roughness={0.2}
          />
        </mesh>
        {/* Источник света от экрана */}
        <pointLight 
          position={[0, 0, 0.02]} 
          intensity={0.3} 
          color="#B0D4FF"
          distance={1}
          decay={2}
        />
        {/* Рама экрана */}
        <mesh position={[0, 0, -0.002]} castShadow={true}>
          <boxGeometry args={[laptopWidth, screenHeight + 0.01, 0.015]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

// Перегородка между рядами
function Divider({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} receiveShadow={true} castShadow={true}>
      <boxGeometry args={[1.3, 0.4, 0.05]} />
      <meshStandardMaterial color="#CFFA78" roughness={0.8} />
    </mesh>
  )
}

// Подсветка стола - продольные светильники над перегородками
function TableLighting({ isOn }: { isOn: boolean }) {
  const tableWidth = 1.5
  const spacing = 0.05
  const lightLength = 1.3 // Длина продольного светильника
  const lightHeight = 2.8 // Высота над перегородкой
  
  // Позиции для трех продольных светильников (над перегородками)
  const lightPositions: Array<[number, number, number]> = [
    [-tableWidth - spacing, lightHeight, 0],  // Левый
    [0, lightHeight, 0],                       // Центр
    [tableWidth + spacing, lightHeight, 0],   // Правый
  ]
  
  return (
    <group>
      {lightPositions.map((position, index) => (
        <group key={`light-${index}`} position={position}>
          {/* Продольный светильник */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[lightLength, 0.1, 0.1]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              emissive={isOn ? "#FFFFFF" : "#000000"}
              emissiveIntensity={isOn ? 1.5 : 1.5}
            />
          </mesh>
          {/* Источник света */}
          {isOn && (
            <pointLight 
              position={[0, 0, 0]} 
              intensity={1}
              color="#FFFFFF"
              distance={6}
              decay={0.4}
              castShadow={true}
            />
          )}
        </group>
      ))}
    </group>
  )
}

// Выключатель света
function LightSwitch({ 
  position, 
  isOn, 
  onToggle 
}: { 
  position: [number, number, number]
  isOn: boolean
  onToggle: () => void
}) {
  const switchRef = useRef<Mesh>(null)
  
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    onToggle()
  }

  return (
    <group position={position}>
      {/* Основание выключателя */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.15, 0.25, 0.02]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.5} />
      </mesh>
      {/* Кнопка выключателя */}
      <mesh 
        ref={switchRef}
        position={[0, isOn ? 0.05 : -0.05, 0.03]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <boxGeometry args={[0.12, 0.1, 0.02]} />
        <meshStandardMaterial 
          color={isOn ? "#96ee9a" : "#9E9E9E"}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}

// Большой стол из 6 стандартных столов
function OfficeTable({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) {
  const tableWidth = 1.5
  const spacing = 0.05 // Расстояние между столами (впритык)
  
  // Позиции для 6 столов: два ряда по три
  // Первый ряд (ближний к камере)
  const row1Positions: Array<[number, number, number]> = [
    [-tableWidth - spacing, 0, 0.4],  // Левый
    [0, 0, 0.4],                       // Центр (здесь будет выключатель)
    [tableWidth + spacing, 0, 0.4],    // Правый
  ]
  
  // Второй ряд (дальний от камеры)
  const row2Positions: Array<[number, number, number]> = [
    [-tableWidth - spacing, 0, -0.4],  // Левый
    [0, 0, -0.4],                       // Центр
    [tableWidth + spacing, 0, -0.4],   // Правый
  ]
  
  return (
    <group position={[0, 0, 0]}>
      {/* Первый ряд столов */}
      {row1Positions.map((pos, index) => (
        <StandardTable 
          key={`row1-${index}`} 
          position={pos}
          hasSwitch={index === 1} // Выключатель на центральном столе первого ряда
          isOn={isOn}
          onToggle={onToggle}
        />
      ))}
      
      {/* Второй ряд столов */}
      {row2Positions.map((pos, index) => (
        <StandardTable 
          key={`row2-${index}`} 
          position={pos}
        />
      ))}
      
      {/* Перегородки между рядами */}
      <Divider position={[-tableWidth - spacing, 0.85, 0]} />
      <Divider position={[0, 0.85, 0]} />
      <Divider position={[tableWidth + spacing, 0.85, 0]} />
    </group>
  )
}

// Человек за столом
function Person({ position, rotation }: { position: [number, number, number], rotation?: number }) {
  const personRef = useRef<Group>(null)
  
  useFrame(() => {
    if (personRef.current) {
      // Легкое покачивание головы
      personRef.current.rotation.y = (rotation || 0) + Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return (
    <group ref={personRef} position={position}>
      {/* Голова */}
      <mesh position={[0, 1.1, 0]} castShadow={true}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFDBAC" roughness={0.6} />
      </mesh>
      {/* Тело */}
      <mesh position={[0, 0.6, 0]} castShadow={true}>
        <boxGeometry args={[0.5, 0.8, 0.4]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.7} />
      </mesh>
      {/* Руки */}
      <mesh position={[-0.4, 0.7, 0]} castShadow={true}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#34495E" roughness={0.7} />
      </mesh>
      <mesh position={[0.4, 0.7, 0]} castShadow={true}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#34495E" roughness={0.7} />
      </mesh>
      {/* Стул */}
      <mesh position={[0, 0.2, 0]} castShadow={true}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial color="#7F8C8D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.35, -0.28]} rotation={[-Math.PI / 15, 0, 0]} castShadow={true}>
        <boxGeometry args={[0.5, 0.3, 0.05]}/>
        <meshStandardMaterial color="#7F8C8D" roughness={0.8} />
      </mesh>
    </group>
  )
}

// Пол
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={true}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#ECF0F1" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

export default function Scene() {
  const [isLightOn, setIsLightOn] = useState(true)
  const tableWidth = 1.5
  const spacing = 0.05
  
  const toggleLight = () => {
    setIsLightOn(!isLightOn)
  }
  
  // Позиции для 6 человек - по одному за каждый стол
  // Первый ряд (лицом к камере, смотрят на юг)
  const row1PersonPositions: Array<{ position: [number, number, number], rotation: number }> = [
    { position: [-tableWidth - spacing, 0, 0.6 + 0.6], rotation: Math.PI }, // Левый
    { position: [0, 0, 0.6 + 0.6], rotation: Math.PI },                     // Центр
    { position: [tableWidth + spacing, 0, 0.6 + 0.6], rotation: Math.PI },   // Правый
  ]
  
  // Второй ряд (лицом от камеры, смотрят на север)
  const row2PersonPositions: Array<{ position: [number, number, number], rotation: number }> = [
    { position: [-tableWidth - spacing, 0, -0.6 - 0.6], rotation: 0 }, // Левый
    { position: [0, 0, -0.6 - 0.6], rotation: 0 },                     // Центр
    { position: [tableWidth + spacing, 0, -0.6 - 0.6], rotation: 0 },     // Правый
  ]

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={50} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      
      {/* Фоновое освещение - всегда включено */}
      <ambientLight intensity={0.2} />
      {/* Офисная сцена */}
      <Floor />
      <OfficeTable isOn={isLightOn} onToggle={toggleLight} />
      <TableLighting isOn={isLightOn} />
      
      {/* 6 человек за столами - первый ряд */}
      {row1PersonPositions.map((person, index) => (
        <Person key={`row1-person-${index}`} position={person.position} rotation={person.rotation} />
      ))}
      
      {/* 6 человек за столами - второй ряд */}
      {row2PersonPositions.map((person, index) => (
        <Person key={`row2-person-${index}`} position={person.position} rotation={person.rotation} />
      ))}
    </>
  )
}
