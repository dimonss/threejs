import {useState} from 'react'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Floor from './model/Floor.tsx'
import OfficeTable from './model/officeTable/OfficeTable.tsx'
import TableLighting from './model/TableLighting.tsx'
import Column from './model/Column.tsx'
import Artem from './model/Artem.tsx'
import Dmitrii from './model/Dmitrii.tsx'
import Armchair from './model/Armchair.tsx'

interface SceneProps {
    onModelLoad?: () => void
}

export default function Scene({onModelLoad}: SceneProps) {
    const [isLightOn, setIsLightOn] = useState(true)
    const tableWidth = 1.55
    const spacing = 0

    const toggleLight = () => {
        setIsLightOn(!isLightOn)
    }

    // Позиции для стульев (перед столами)
    // Первый ряд - стулья перед столами (z больше, так как ближе к камере)
    const row1ChairPositions = [
        [-tableWidth+0.1, 0, 0.5 + 0.6],  // Левый
        [0.1, 0, 0.5 + 0.6],                      // Центр
        [tableWidth + spacing+0.1, 0, 0.5 + 0.6],   // Правый
    ]

    // Второй ряд - стулья перед столами (z меньше, так как дальше от камеры)
    const row2ChairPositions = [
        [-tableWidth - spacing - 0.1, 0, -0.8],  // Левый
        [-0.1, 0, -0.8],                       // Центр
        [tableWidth + spacing - 0.1, 0, -0.8],   // Правый
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

            {/* Стулья первого ряда */}
            {row1ChairPositions.map((chairPos, index) => (
                <Armchair 
                    key={`row1-chair-${index}`} 
                    position={[chairPos[0], chairPos[1] - 0.14, chairPos[2] - 0.15]}
                    rotation={Math.PI}
                    onLoad={onModelLoad}
                />
            ))}

            {/* Стулья второго ряда */}
            {row2ChairPositions.map((chairPos, index) => (
                <Armchair 
                    key={`row2-chair-${index}`} 
                    position={[chairPos[0], chairPos[1] - 0.14, chairPos[2] - 0.15]}
                    rotation={0}
                    onLoad={onModelLoad}
                />
            ))}

            {/* Artem на первом ряду правом стуле */}
            <Artem 
                position={[row1ChairPositions[2][0] - 0.1, row1ChairPositions[2][1] - 0.15, row1ChairPositions[2][2] - 0.17]}
                rotation={Math.PI}
                scale={[0.8, 0.8, 0.8]}
                onLoad={onModelLoad}
            />

            {/* Dmitrii на втором ряду центральном стуле */}
            <Dmitrii 
                position={[row2ChairPositions[1][0] - 0.25, row2ChairPositions[1][1], row2ChairPositions[1][2] - 0.35]} 
                rotation={0}
                scale={[0.9, 0.9, 0.9]}
                onLoad={onModelLoad}
            />
        </>
    )
}