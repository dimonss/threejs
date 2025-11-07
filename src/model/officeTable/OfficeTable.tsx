import StandardTable from './StandardTable.tsx'
import Divider from './Divider.tsx'
import TableLegs from "./TableLegs.tsx";

export default function OfficeTable({isOn, onToggle}: { isOn: boolean, onToggle: () => void }) {
    const tableWidth = 1.5
    const spacing = 0.05 // Расстояние между столами (впритык)

    // Позиции для 6 столов: два ряда по три
    // Первый ряд (ближний к камере)
    const row1Positions: Array<[number, number, number]> = [
        [-tableWidth - spacing, 0, 0.4],  // Левый
        [0, 0, 0.4],                       // Центр (здесь будет выключатель)
        [tableWidth + spacing, 0, 0.4],    // Правый
    ]

    // Второй ряд (дальний от камеры)
    const row2Positions: Array<[number, number, number]> = [
        [-tableWidth - spacing, 0, -0.4],  // Левый
        [0, 0, -0.4],                       // Центр
        [tableWidth + spacing, 0, -0.4],   // Правый
    ]

    return (
        <group position={[0, 0, 0]}>
            {/* Первый ряд столов */}
            {row1Positions.map((pos, index) => (
                <StandardTable
                    key={`row1-${index}`}
                    position={pos}
                    hasSwitch={index === 1} // Выключатель на центральном столе первого ряда
                    isOn={isOn}
                    onToggle={onToggle}
                />
            ))}

            {/* Второй ряд столов */}
            {row2Positions.map((pos, index) => (
                <StandardTable
                    key={`row2-${index}`}
                    position={pos}
                    rotation={Math.PI}
                />
            ))}

            {/* Перегородки между рядами */}
            <Divider position={[-tableWidth - spacing, 0.79, 0]}/>
            <Divider position={[0, 0.79, 0]}/>
            <Divider position={[tableWidth + spacing, 0.79, 0]}/>
            {/* Ножки стола */}
            <TableLegs tableWidth={4.6} tableDepth={1.55} tableHeight={0.6}/>
        </group>
    )
}

