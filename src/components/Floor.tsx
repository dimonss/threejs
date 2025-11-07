export default function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={true}>
            <planeGeometry args={[20, 20]}/>
            <meshStandardMaterial color="#ECF0F1" roughness={0.9} metalness={0.1}/>
        </mesh>
    )
}

