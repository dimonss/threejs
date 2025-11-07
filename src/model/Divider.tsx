export default function Divider({position}: { position: [number, number, number] }) {
    return (
        <mesh position={position} receiveShadow={true} castShadow={true}>
            <boxGeometry args={[1.3, 0.4, 0.05]}/>
            <meshStandardMaterial color="#CFFA78" roughness={0.8}/>
        </mesh>
    )
}

