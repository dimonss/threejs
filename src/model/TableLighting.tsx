export default function TableLighting({isOn}: { isOn: boolean }) {
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
                        <boxGeometry args={[lightLength, 0.1, 0.1]}/>
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

