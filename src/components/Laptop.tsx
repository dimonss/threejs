export default function Laptop({position, rotete180}: { position: [number, number, number], rotete180: boolean }) {
    const laptopWidth = 0.35
    const laptopDepth = 0.25
    const laptopHeight = 0.02
    const screenHeight = 0.2
    return (
        <group position={position} rotation={[0, (rotete180 ? 3.14 : 0), 0]}>
            {/* Корпус ноутбука (клавиатура) */}
            <mesh position={[0, laptopHeight / 2, 0]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[laptopWidth, laptopHeight, laptopDepth]}/>
                <meshStandardMaterial color="#2C2C2C" roughness={0.6} metalness={0.3}/>
            </mesh>
            {/* Экран ноутбука */}
            <group
                position={[0, screenHeight / 2 + laptopHeight, -0.17]}
                rotation={[-Math.PI / 6, 0, 0]}
            >
                {/* Источник света от экрана - направленный вперед */}
                <spotLight
                    position={[0, 0, .72]}
                    rotation={[2, 2, 2]}
                    intensity={0.2}
                    color="#B0D4FF"
                    distance={1}
                    decay={1.5}
                    angle={Math.PI}
                    penumbra={0.3}
                />
                {/* Рама экрана */}
                <mesh position={[0, 0, -0.002]} castShadow={true}>
                    <boxGeometry args={[laptopWidth, screenHeight + 0.01, 0.015]}/>
                    <meshStandardMaterial color="#6A6A6A" roughness={0.8}/>
                </mesh>
            </group>
        </group>
    )
}

