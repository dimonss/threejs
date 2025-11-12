import {useMemo, useEffect, useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {Mesh, MeshStandardMaterial, Texture, Object3D, AnimationMixer} from 'three'

interface ArtemProps {
    position: [number, number, number]
    rotation?: number
    scale?: [number, number, number]
    onLoad?: () => void
}

export default function Salamat({position, rotation, scale = [1, 1, 1], onLoad}: ArtemProps) {
    // В Vite с base path '/threejs/' файлы из public доступны по /threejs/artem.glb
    // В dev-режиме Vite автоматически добавляет base path к файлам из public
    const baseUrl = import.meta.env.BASE_URL || '/'
    const modelPath = `${baseUrl}salamat.glb`.replace(/\/\//g, '/')
    const {scene, animations} = useGLTF(modelPath)
    const hasLoadedRef = useRef(false)
    const mixerRef = useRef<AnimationMixer | null>(null)

    useEffect(() => {
        if (scene && !hasLoadedRef.current) {
            hasLoadedRef.current = true
            // Небольшая задержка для гарантии, что модель полностью загружена
            setTimeout(() => {
                if (onLoad) {
                    onLoad()
                }
            }, 50)
        }
    }, [scene, onLoad, modelPath])

    // Настраиваем сцену (используем оригинальную для правильной работы анимаций)
    const configuredScene = useMemo(() => {
        if (!scene) return null
        const baseUrlForTextures = import.meta.env.BASE_URL || '/'

        // Настраиваем материалы и тени для всех мешей в модели
        scene.traverse((child: Object3D) => {
            // Проверяем, является ли объект Mesh через свойство type
            if (child.type === 'Mesh' && 'material' in child) {
                const mesh = child as Mesh
                mesh.castShadow = true
                mesh.receiveShadow = true

                // Исправляем пути к текстурам в материалах
                if (mesh.material) {
                    const material = mesh.material as MeshStandardMaterial

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

        return scene
    }, [scene])

    // Создаем mixer для анимаций и применяем их к оригинальной сцене
    useEffect(() => {
    if (configuredScene && animations && animations.length > 0) {
        const mixer = new AnimationMixer(configuredScene)
        mixerRef.current = mixer

        // Ищем анимацию по названию
        const seatClip = animations.find(a => a.name.toLowerCase().includes("seat"))

        if (seatClip) {
            const seatAction = mixer.clipAction(seatClip)
            seatAction.reset().play()
        }
    }

    // Очистка при размонтировании
    return () => {
        if (mixerRef.current) {
            mixerRef.current.stopAllAction()
            mixerRef.current.uncacheRoot(configuredScene!)
            mixerRef.current = null
        }
    }
}, [configuredScene, animations])

    // Обновляем анимацию каждый кадр
    useFrame((_, delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta)
        }
    })
    
    if (!configuredScene) return null

    return (
        <primitive 
            object={configuredScene} 
            position={position} 
            rotation={[0, rotation || 0, 0]}
            scale={scale}
        />
    )
}

