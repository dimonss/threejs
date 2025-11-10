import {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {Group} from 'three'
import Armchair from './Armchair.tsx'

interface PersonProps {
    position: [number, number, number]
    rotation?: number
    onModelLoad?: () => void
}

export default function Person({position, rotation, onModelLoad}: PersonProps) {
    const personRef = useRef<Group>(null)
    const scale= 0.7;
    useFrame(() => {
        if (personRef.current) {
            // Легкое покачивание головы
            personRef.current.rotation.y = (rotation || 0) + Math.sin(Date.now() * 0.001) * 0.1
        }
    })

    return (
        <group ref={personRef} position={position}>
            {/* Голова */}
            <mesh position={[0.1, 1.0, -0.05]} castShadow={true}>
                <sphereGeometry args={[0.2 * scale, 16, 16]}/>
                <meshStandardMaterial color="#FFDBAC" roughness={0.6}/>
            </mesh>
            {/* Тело */}
            <mesh position={[0.1, 0.6, 0]} castShadow={true} rotation={[-0.2,0,0]}>
                <boxGeometry args={[0.6 * scale, 0.8 * scale, 0.4 * scale]}/>
                <meshStandardMaterial color="#2C3E50" roughness={scale}/>
            </mesh>
            {/* Руки */}
            <mesh position={[-0.2 * scale, 0.7, 0]} castShadow={true} rotation={[-0.2,0,0]}>
                <boxGeometry args={[0.25 * scale, 0.5 * scale, 0.15 * scale]}/>
                <meshStandardMaterial color="#34495E" roughness={scale}/>
            </mesh>
            <mesh position={[0.5 * scale, 0.7, 0]} castShadow={true} rotation={[-0.2,0,0]}>
                <boxGeometry args={[0.25 * scale, 0.5 * scale, 0.15 * scale]}/>
                <meshStandardMaterial color="#34495E" roughness={scale}/>
            </mesh>
            {/* Кресло из модели */}
            <Armchair position={[0, -0.14, -0.15]} onLoad={onModelLoad}/>
        </group>
    )
}

