import { useState, useRef, ReactNode } from 'react'
import './ModelLoader.css'

interface ModelLoaderProps {
  totalModels?: number
  children: (onModelLoad: () => void) => ReactNode
}

export default function ModelLoader({ totalModels = 6, children }: ModelLoaderProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const loadedCountRef = useRef(0)

  const handleModelLoad = () => {
    loadedCountRef.current += 1
    const progress = Math.min((loadedCountRef.current / totalModels) * 100, 100)
    
    setLoadingProgress(progress)
    
    if (loadedCountRef.current >= totalModels) {
      // Небольшая задержка перед скрытием лоадера для плавности
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
  }

  return (
    <>
      {isLoading && (
        <div 
          className="loader-overlay" 
          style={{ 
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
        >
          <div className="loader-container">
            <div className="loader-spinner"></div>
            <div className="loader-text">
              <p>Loading 3D models...</p>
              <p className="loader-progress">{Math.round(loadingProgress)}%</p>
            </div>
          </div>
        </div>
      )}
      {children(handleModelLoad)}
    </>
  )
}

