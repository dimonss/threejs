import LightSwitch from './LightSwitch.tsx'
import Laptop from './Laptop.tsx'

export default function StandardTable({
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
                <boxGeometry args={[tableWidth, 0.05, tableDepth]}/>
                <meshStandardMaterial color="#A0A0A0" roughness={0.7} metalness={0.2}/>
            </mesh>
            {/* Ножки стола */}
            <mesh position={[-tableWidth / 2 + 0.1, tableHeight / 2, -tableDepth / 2 + 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            <mesh position={[tableWidth / 2 - 0.1, tableHeight / 2, -tableDepth / 2 + 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            <mesh position={[-tableWidth / 2 + 0.1, tableHeight / 2, tableDepth / 2 - 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            <mesh position={[tableWidth / 2 - 0.1, tableHeight / 2, tableDepth / 2 - 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
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
            <Laptop position={[0, tableHeight + 0.01, 0]} rotete180={position[2] < 0}/>
        </group>
    )
}

