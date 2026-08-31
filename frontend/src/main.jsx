import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Tailwind CSS のエントリーポイント
import App from './App.jsx'

// <div id="root"> に <App /> を組み込む
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
