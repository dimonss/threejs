import {useState} from 'react'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Floor from './model/Floor.tsx'
import OfficeTable from './model/officeTable/OfficeTable.tsx'
import TableLighting from './model/TableLighting.tsx'
import Person from './model/Person.tsx'
import Column from './model/Column.tsx'

interface SceneProps {
    onModelLoad?: () => void
}

export default function Scene({onModelLoad}: SceneProps) {
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
            <OfficeTable/>
            <TableLighting isOn={isLightOn}/>
            {/* Колонна с выключателем света */}
            <Column position={[-3, 0, 5]} isOn={isLightOn} onToggle={toggleLight}/>

            {/* 6 человек за столами - первый ряд */}
            {row1PersonPositions.map((person, index) => (
                <Person key={`row1-person-${index}`} position={person.position} rotation={person.rotation} onModelLoad={onModelLoad}/>
            ))}

            {/* 6 человек за столами - второй ряд */}
            {row2PersonPositions.map((person, index) => (
                <Person key={`row2-person-${index}`} position={person.position} rotation={person.rotation} onModelLoad={onModelLoad}/>
            ))}
        </>
    )
}
