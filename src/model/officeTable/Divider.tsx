import { useMemo } from 'react'
import { Shape, ExtrudeGeometry } from 'three'
import { RoundedBox } from '@react-three/drei'

export default function Divider({position}: { position: [number, number, number] }) {
    const dividerWidth = 1.3
    const dividerHeight = 0.3
    const dividerDepth = 0.02
    const bracketSize = 0.08
    const bracketRadius = 0.02

    // Геометрия крепления с закругленным верхом и квадратным низом
    const bracketGeometry = useMemo(() => {
        const shape = new Shape()
        const halfWidth = bracketSize / 4
        const halfHeight = dividerHeight / 5

        // Начинаем с левого нижнего угла
        shape.moveTo(-halfWidth, -halfHeight)
        // Левая сторона (прямая)
        shape.lineTo(-halfWidth, halfHeight - bracketRadius)
        // Верхняя часть - закругленная
        shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth + bracketRadius, halfHeight)
        shape.lineTo(halfWidth - bracketRadius, halfHeight)
        shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth, halfHeight - bracketRadius)
        // Правая сторона (прямая)
        shape.lineTo(halfWidth, -halfHeight)
        // Нижняя часть (прямая)
        shape.lineTo(-halfWidth, -halfHeight)

        return new ExtrudeGeometry(shape, {
            depth: 0.03,
            bevelEnabled: false
        })
    }, [bracketSize, dividerHeight, bracketRadius])

    return (
        <group position={position}>
            {/* Основная перегородка */}
            <RoundedBox
                args={[dividerWidth, dividerHeight, dividerDepth]}
                radius={0.01}
                smoothness={4}
                receiveShadow={true}
                castShadow={true}
            >
                <meshStandardMaterial color="#CFFA78" roughness={0.8}/>
            </RoundedBox>
            {/* Левое белое крепление */}
            <mesh
                position={[-dividerWidth / 3, -0.12, -0.015]}
                geometry={bracketGeometry}
                castShadow={true}
            >
                <meshStandardMaterial color="#FFFFFF" roughness={0.6}/>
            </mesh>
            {/* Правое белое крепление */}
            <mesh
                position={[dividerWidth / 3, -0.12, -0.015]}
                geometry={bracketGeometry}
                castShadow={true}
            >
                <meshStandardMaterial color="#FFFFFF" roughness={0.6}/>
            </mesh>
        </group>
    )
}

