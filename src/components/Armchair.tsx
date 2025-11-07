import {useMemo} from 'react'
import {useGLTF} from '@react-three/drei'
import {Mesh, MeshStandardMaterial, Texture} from 'three'

export default function Armchair({position, rotation}: { position: [number, number, number], rotation?: number }) {
    // В Vite с base path '/threejs/' файлы из public доступны по /threejs/armchair.gltf
    // В dev-режиме Vite автоматически добавляет base path к файлам из public
    const baseUrl = import.meta.env.BASE_URL || '/'
    const modelPath = `${baseUrl}armchair.gltf`.replace(/\/\//g, '/')
    const {scene} = useGLTF(modelPath)

    // Клонируем и настраиваем сцену с помощью useMemo для оптимизации
    const clonedScene = useMemo(() => {
        const cloned = scene.clone()
        const baseUrlForTextures = import.meta.env.BASE_URL || '/'

        // Настраиваем материалы и тени для всех мешей в модели
        cloned.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true
                child.receiveShadow = true

                // Исправляем пути к текстурам в материалах
                if (child.material) {
                    const material = child.material as MeshStandardMaterial

                    // Функция для обновления пути текстуры
                    const updateTexturePath = (texture: Texture | null) => {
                        if (!texture) return

                        const image = texture.image as HTMLImageElement | HTMLCanvasElement | null
                        if (image && 'src' in image && image.src) {
                            const texturePath = image.src
                            // Если путь не абсолютный URL и не data URL
                            if (!texturePath.startsWith('http') && !texturePath.startsWith('data:')) {
                                // Извлекаем имя файла из пути
                                const fileName = texturePath.split('/').pop() || texturePath.split('\\').pop() || ''
                                if (fileName) {
                                    // Создаем новый путь с base URL
                                    const newPath = `${baseUrlForTextures}${fileName}`.replace(/\/\//g, '/')
                                    // Загружаем текстуру заново с правильным путем
                                    const img = new Image()
                                    img.crossOrigin = 'anonymous'
                                    img.onload = () => {
                                        texture.image = img
                                        texture.needsUpdate = true
                                    }
                                    img.src = newPath
                                }
                            }
                        }
                    }

                    // Обновляем все текстуры материала
                    updateTexturePath(material.map)
                    updateTexturePath(material.normalMap)
                    updateTexturePath(material.roughnessMap)
                    updateTexturePath(material.metalnessMap)
                    updateTexturePath(material.aoMap)
                    updateTexturePath(material.emissiveMap)

                    // Убеждаемся, что материал обновлен
                    material.needsUpdate = true
                }
            }
        })

        return cloned
    }, [scene])
    
    return (
        <primitive 
            object={clonedScene} 
            position={position} 
            rotation={[0, rotation || 0, 0]}
            scale={[1, 1, 1]}
        />
    )
}

