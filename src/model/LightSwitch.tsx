import {useRef} from 'react'
import {Mesh} from 'three'

export default function LightSwitch({
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
        <group position={position} rotation={[0, -Math.PI / 2, 0]}>
            {/* Основание выключателя */}
            <mesh position={[0, 0, 0.01]}>
                <boxGeometry args={[0.15, 0.25, 0.02]}/>
                <meshStandardMaterial color="#E8E8E8" roughness={0.5}/>
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
                <boxGeometry args={[0.12, 0.1, 0.02]}/>
                <meshStandardMaterial
                    color={isOn ? "#96ee9a" : "#9E9E9E"}
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>
        </group>
    )
}

