export default function TableLegs({
    tableWidth,
    tableDepth,
    tableHeight
}: {
    tableWidth: number
    tableDepth: number
    tableHeight: number
}) {
    const legSize = 0.06
    const legOffset = 0.06

    return (
        <>
            {/* Front left leg */}
            <mesh
                position={[-tableWidth / 2 + legOffset, tableHeight / 2, -tableDepth / 2 + legOffset]}
                castShadow={true}
                rotation = {[Math.PI / 16, 0, -Math.PI / 16]}
            >
                <boxGeometry args={[legSize, tableHeight, legSize]} />
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>

            </mesh>
            {/* Front right leg */}
            <mesh
                position={[tableWidth / 2 - legOffset, tableHeight / 2, -tableDepth / 2 + legOffset]}
                castShadow={true}
                rotation = {[Math.PI / 16, 0, Math.PI / 16]}

            >
                <boxGeometry args={[legSize, tableHeight, legSize]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            {/* Back left leg */}
            <mesh
                position={[-tableWidth / 2 + legOffset, tableHeight / 2, tableDepth / 2 - legOffset]}
                castShadow={true}
                rotation = {[-Math.PI / 16, 0, -Math.PI / 16]}

            >
                <boxGeometry args={[legSize, tableHeight, legSize]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            {/* Back right leg */}
            <mesh
                position={[tableWidth / 2 - legOffset, tableHeight / 2, tableDepth / 2 - legOffset]}
                castShadow={true}
                rotation = {[-Math.PI / 16, 0, Math.PI / 16]}

            >
                <boxGeometry args={[legSize, tableHeight, legSize]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            {/* Back right leg */}
            <mesh
                position={[tableWidth / 6, tableHeight / 2, 0]}
                castShadow={true}
            >
                <boxGeometry args={[legSize, tableHeight, 0.6]}/>
                <meshStandardMaterial color="#A0A0A0" roughness={0.8}/>
            </mesh>
            <mesh
                position={[-tableWidth / 6, tableHeight / 2, 0]}
                castShadow={true}
            >
                <boxGeometry args={[legSize, tableHeight, 0.6]}/>
                <meshStandardMaterial color="#A0A0A0" roughness={0.8}/>
            </mesh>
        </>
    )
}

