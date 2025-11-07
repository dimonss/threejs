import LightSwitch from './LightSwitch.tsx'

interface ColumnProps {
    position: [number, number, number]
    isOn: boolean
    onToggle: () => void
}

export default function Column({position, isOn, onToggle}: ColumnProps) {
    const columnHeight = 2.8
    const columnSize = 0.5 // Размер квадратной колонны
    const switchHeight = 0.7 // Высота выключателя на колонне

    return (
        <group position={position}>
            {/* Колонна - квадратная */}
            <mesh position={[0, columnHeight / 2, 0]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[columnSize, columnHeight, columnSize]}/>
                <meshStandardMaterial color="#FFFFFF" roughness={0.6} metalness={0.1}/>
            </mesh>
            
            {/* Выключатель на колонне */}
            <LightSwitch
                position={[-columnSize / 2, switchHeight, 0]}
                isOn={isOn}
                onToggle={onToggle}
            />
        </group>
    )
}

