import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 underline">
        画面の表示に成功しました！
      </h1>
    </div>
  )
}

// id="root" を取得して描画する処理を明示的に末尾に記述
const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}