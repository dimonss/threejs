import { RoundedBox } from '@react-three/drei'

export default function Divider({position}: { position: [number, number, number] }) {
    return (
        <RoundedBox
            position={position}
            args={[1.3, 0.3, 0.02]}
            radius={0.01}
            smoothness={4}
            receiveShadow={true}
            castShadow={true}
        >
            <meshStandardMaterial color="#CFFA78" roughness={0.8}/>
        </RoundedBox>
    )
}

