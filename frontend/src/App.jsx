function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      {/* 1. React の動作確認カード */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-sm w-full text-center shadow-xl space-y-4">
        
        {/* インジケーター（点滅アニメーション） */}
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            System Online
          </span>
        </div>

        <h1 className="text-2xl font-bold text-white tracking-wide">
          Restaurant app
        </h1>
        
        <p className="text-slate-400 text-sm">
          React + Vite + Tailwind CSS の接続テスト画面です。
        </p>

        {/* 2. Tailwind CSS（グラデーション・ホバー効果）のテストボタン */}
        <button 
          onClick={() => alert("React のイベント（JavaScript）も正常に動作しています！")}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
        >
          動作テスト（クリック）
        </button>
      </div>

      {/* 3. 足元のミニステータス */}
      <div className="mt-6 text-slate-500 text-xs font-mono">
        Status: 200 OK | Host: 0.0.0.0:3000
      </div>
    </div>
  )
}

export default App