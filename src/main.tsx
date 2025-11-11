import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Подавляем ошибки React DevTools, связанные с определением версии React
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (
      event.message?.includes('Invalid argument not valid semver') ||
      event.message?.includes('react_devtools_backend') ||
      event.filename?.includes('react_devtools')
    ) {
      event.preventDefault() // Предотвращаем показ ошибки в консоли
      return false
    }
  }, true)

  // Также обрабатываем unhandledrejection для полноты
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason?.message?.includes('Invalid argument not valid semver') ||
      event.reason?.message?.includes('react_devtools_backend')
    ) {
      event.preventDefault()
    }
  })
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

