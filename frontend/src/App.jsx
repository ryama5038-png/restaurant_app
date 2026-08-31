import { useState, useEffect } from 'react'

export default function App() {
  const [info, setInfo] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // APIから店舗情報とお知らせを同時に取得
    Promise.all([
      fetch('http://localhost:8000/api/info').then((res) => res.json()),
      fetch('http://localhost:8000/api/posts').then((res) => res.json())
    ])
      .then(([infoData, postsData]) => {
        setInfo(infoData)
        setPosts(postsData)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        読み込み中...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ヒーローヘッダー */}
      <header className="bg-slate-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-wide mb-2">{info?.name}</h1>
        <p className="text-slate-400 max-w-xl mx-auto">{info?.description}</p>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {/* お知らせ・投稿セクション */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-amber-500 pb-2">
            お知らせ・新着情報
          </h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                  <span className="text-sm text-slate-400">{post.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{post.content}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 店舗情報セクション */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-amber-500 pb-2">
            店舗情報
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-semibold text-slate-500">住所</dt>
              <dd className="mt-1 text-slate-800">{info?.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">電話番号</dt>
              <dd className="mt-1 text-slate-800">{info?.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">営業時間</dt>
              <dd className="mt-1 text-slate-800">{info?.hours}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">定休日</dt>
              <dd className="mt-1 text-slate-800">{info?.closed}</dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  )
}