import {useMemo} from 'react'
import {Shape, ExtrudeGeometry} from 'three'
import LightSwitch from './LightSwitch.tsx'
import Laptop from './Laptop.tsx'

export default function StandardTable({
                                          position,
                                          rotation,
                                          hasSwitch,
                                          isOn,
                                          onToggle
                                      }: {
    position: [number, number, number]
    rotation?: number
    hasSwitch?: boolean
    isOn?: boolean
    onToggle?: () => void
}) {
    const tableWidth = 1.545
    const tableDepth = 0.8
    const tableHeight = 0.6
    const radius = 0.1

    // Создаем геометрию с закругленными краями только по вертикальной оси (передний и задний края)
    // Форма создается в плоскости XY, затем поворачивается на -90° вокруг X, чтобы лежать в плоскости XZ
    // После поворота: X формы -> X стола (ширина), Y формы -> -Z стола (глубина, инвертированная)
    const tabletopGeometry = useMemo(() => {
        const shape = new Shape()
        const halfWidth = tableWidth / 2
        const halfDepth = tableDepth / 2

        // Начинаем с левого заднего угла (после поворота: X = -halfWidth, Z = -halfDepth)
        // Инвертируем Y координаты, так как после поворота Y -> -Z
        shape.moveTo(-halfWidth, halfDepth - radius)

        // Левая сторона (прямая, по оси Z стола, но это Y формы)
        shape.lineTo(-halfWidth, -halfDepth + radius)

        // Передний край - закругленный (обращенный к людям, нижняя часть формы)
        shape.quadraticCurveTo(-halfWidth, -halfDepth, -halfWidth + radius, -halfDepth)
        shape.lineTo(halfWidth - radius, -halfDepth)
        shape.quadraticCurveTo(halfWidth, -halfDepth, halfWidth, -halfDepth + radius)

        // Правая сторона (прямая, по оси Z стола)
        shape.lineTo(halfWidth, halfDepth - radius)

        // Задний край - закругленный (верхняя часть формы)
        shape.quadraticCurveTo(halfWidth, halfDepth, halfWidth, halfDepth)
        shape.lineTo(-halfWidth + radius, halfDepth)
        shape.quadraticCurveTo(-halfWidth, halfDepth, -halfWidth, halfDepth)

        // Экструдируем форму на высоту столешницы (по оси Z формы, которая станет осью Y стола)
        return new ExtrudeGeometry(shape, {
            depth: 0.02,
            bevelEnabled: false
        })
    }, [tableWidth, tableDepth, radius])

    return (
        <group position={position} rotation={[0, rotation || 0, 0]}>
            {/* Столешница */}
            <mesh
                position={[0, tableHeight, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                geometry={tabletopGeometry}
                receiveShadow={true}
                castShadow={true}
            >
                <meshStandardMaterial color="#A0A0A0" roughness={0.7} metalness={0.2}/>
            </mesh>
            {/* Ножки стола */}
            <mesh position={[-tableWidth / 2 + 0.1, tableHeight / 2, -tableDepth / 2 + 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            <mesh position={[tableWidth / 2 - 0.1, tableHeight / 2, -tableDepth / 2 + 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            <mesh position={[-tableWidth / 2 + 0.1, tableHeight / 2, tableDepth / 2 - 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            <mesh position={[tableWidth / 2 - 0.1, tableHeight / 2, tableDepth / 2 - 0.1]} castShadow={true}>
                <boxGeometry args={[0.1, tableHeight, 0.1]}/>
                <meshStandardMaterial color="#FACD64" roughness={0.8}/>
            </mesh>
            {/* Выключатель на столе */}
            {hasSwitch && isOn !== undefined && onToggle && (
                <LightSwitch
                    position={[-2.1, tableHeight + 0.2, -0.38]}
                    isOn={isOn}
                    onToggle={onToggle}
                />
            )}
            {/* Ноутбук на столе */}
            <Laptop position={[0, tableHeight + 0.01, 0]}/>
        </group>
    )
}

