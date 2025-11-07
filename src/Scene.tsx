import {useState} from 'react'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Floor from './components/Floor'
import OfficeTable from './components/OfficeTable'
import TableLighting from './components/TableLighting'
import Person from './components/Person'

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
        {position: [-tableWidth - spacing, 0, 0.6 + 0.6], rotation: Math.PI}, // Левый
        {position: [0, 0, 0.6 + 0.6], rotation: Math.PI},                     // Центр
        {position: [tableWidth + spacing, 0, 0.6 + 0.6], rotation: Math.PI},   // Правый
    ]

    // Второй ряд (лицом от камеры, смотрят на север)
    const row2PersonPositions: Array<{ position: [number, number, number], rotation: number }> = [
        {position: [-tableWidth - spacing, 0, -0.6 - 0.6], rotation: 0}, // Левый
        {position: [0, 0, -0.6 - 0.6], rotation: 0},                     // Центр
        {position: [tableWidth + spacing, 0, -0.6 - 0.6], rotation: 0},     // Правый
    ]

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={50}/>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>

            {/* Фоновое освещение - всегда включено */}
            <ambientLight intensity={0.2}/>
            {/* Офисная сцена */}
            <Floor/>
            <OfficeTable isOn={isLightOn} onToggle={toggleLight}/>
            <TableLighting isOn={isLightOn}/>

            {/* 6 человек за столами - первый ряд */}
            {row1PersonPositions.map((person, index) => (
                <Person key={`row1-person-${index}`} position={person.position} rotation={person.rotation}/>
            ))}

            {/* 6 человек за столами - второй ряд */}
            {row2PersonPositions.map((person, index) => (
                <Person key={`row2-person-${index}`} position={person.position} rotation={person.rotation}/>
            ))}
        </>
    )
}
