import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import ModelLoader from './components/ModelLoader/ModelLoader'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>Dream team</h1>
        <p>The MBusiness Office</p>
      </div>
      <div className="canvas-container">
        <ModelLoader totalModels={6}>
          {(onModelLoad) => (
            <Canvas
              shadows="soft"
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <Scene onModelLoad={onModelLoad} />
              </Suspense>
            </Canvas>
          )}
        </ModelLoader>
      </div>
      <div className="controls-info">
        <p>🖱️ Left Click + Drag: Rotate | 🖱️ Right Click + Drag: Pan | 🔍 Scroll: Zoom</p>
      </div>
    </div>
  )
}

export default App

