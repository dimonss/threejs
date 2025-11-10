import {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {Group} from 'three'
import Armchair from './Armchair.tsx'
import Dmitrii from './Dmitrii.tsx'

interface PersonProps {
    position: [number, number, number]
    rotation?: number
    onModelLoad?: () => void
}

export default function Person({position, rotation, onModelLoad}: PersonProps) {
    const personRef = useRef<Group>(null)

    // Легкое покачивание головы
    useFrame(() => {
        if (personRef.current) {
            personRef.current.rotation.y = (rotation || 0) + Math.sin(Date.now() * 0.001) * 0.1
        }
    })

    return (
        <group ref={personRef} position={position}>
            {/* Модель человека */}
            <Dmitrii 
                position={[-0.25, 0.0, -0.35]}
                // rotation={rotation}
                scale={[0.9, 0.9, 0.9]}
                onLoad={onModelLoad}
            />
            {/* Кресло из модели */}
            <Armchair position={[0, -0.14, -0.15]} onLoad={onModelLoad}/>
        </group>
    )
}

