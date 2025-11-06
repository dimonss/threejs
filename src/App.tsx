import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>Three.js Office Scene</h1>
        <p>Office Meeting Room with 6 People</p>
      </div>
      <div className="canvas-container">
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>
      <div className="controls-info">
        <p>🖱️ Left Click + Drag: Rotate | 🖱️ Right Click + Drag: Pan | 🔍 Scroll: Zoom</p>
      </div>
    </div>
  )
}

export default App

