import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const LIMIT = 5;

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (currentPage) => {
    const currentOffset = (currentPage - 1) * LIMIT;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts?limit=${LIMIT}&offset=${currentOffset}`
      );
      const fetchedPosts = response.data;
      setPosts(fetchedPosts);
      setHasNext(fetchedPosts.length === LIMIT);
    } catch (error) {
      console.error('投稿の取得に失敗しました:', error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* ナビゲーションバー */}
      <nav className="bg-stone-900 text-stone-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-serif tracking-widest font-bold text-amber-500">
            Trattoria Culinary
          </span>
          <div className="space-x-6 text-sm">
            <a href="#about" className="hover:text-amber-400 transition">お店について</a>
            <a href="#menu" className="hover:text-amber-400 transition">メニュー</a>
            <a href="#news" className="hover:text-amber-400 transition">お知らせ</a>
            <Link
              to="/admin"
              className="px-3 py-1.5 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-stone-900 rounded transition text-xs"
            >
              管理画面
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション（メインビジュアル枠） */}
      <header className="relative bg-stone-800 text-white py-24 px-6 text-center shadow-inner">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-amber-400 font-serif tracking-widest text-sm uppercase">Authentic Italian Dining</p>
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide font-extrabold leading-tight">
            素材の命を織りなす、<br />心温まるひとときを。
          </h1>
          <p className="text-stone-300 text-sm md:text-base pt-2">
            旬の地場食材と本場イタリアの技法が生み出す創作ディナー
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        {/* コンセプト / お店について */}
        <section id="about" className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-wider">Concept</h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto"></div>
          <p className="text-stone-600 leading-relaxed text-sm md:text-base">
            当店では、地元農家から毎朝届く新鮮な有機野菜と、シェフが厳選した旬の素材を中心に使用しております。落ち着いた空間の中で、大切な人と心地よい時間をお過ごしください。
          </p>
        </section>

        {/* ダミーメニューセクション */}
        <section id="menu" className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-wider">Special Menu</h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto"></div>
            <p className="text-xs text-stone-500 uppercase tracking-widest">おすすめ料理</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* メニューカード 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200/80">
              {/* 後で写真を入れられるダミー領域 */}
              <div className="h-40 bg-stone-200 flex items-center justify-center text-stone-400 text-xs font-serif">
                [ Photo: パスタ ]
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-stone-900">ポルチーニ茸の生パスタ</h3>
                <p className="text-xs text-stone-500">濃厚なクリームソースと芳醇なキノコの香り。</p>
                <p className="text-sm font-serif text-amber-600 font-bold">¥1,850</p>
              </div>
            </div>

            {/* メニューカード 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200/80">
              <div className="h-40 bg-stone-200 flex items-center justify-center text-stone-400 text-xs font-serif">
                [ Photo: メイン肉料理 ]
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-stone-900">黒毛和牛のロッシーニ風</h3>
                <p className="text-xs text-stone-500">表面を香ばしく焼き上げた極上フィレ肉。</p>
                <p className="text-sm font-serif text-amber-600 font-bold">¥3,200</p>
              </div>
            </div>

            {/* メニューカード 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200/80">
              <div className="h-40 bg-stone-200 flex items-center justify-center text-stone-400 text-xs font-serif">
                [ Photo: デザート ]
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-stone-900">自家製クラシックティラミス</h3>
                <p className="text-xs text-stone-500">マスカルポーネのなめらかな口当たり。</p>
                <p className="text-sm font-serif text-amber-600 font-bold">¥750</p>
              </div>
            </div>
          </div>
        </section>

        {/* 動的お知らせセクション（API連携部分） */}
        <section id="news" className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-stone-200/80">
          <div className="flex justify-between items-end border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-wider">News & Topics</h2>
              <p className="text-xs text-stone-500 tracking-widest mt-1">お知らせ・新着情報</p>
            </div>
            <span className="text-xs text-stone-400 font-serif">Page {page}</span>
          </div>

          <div className="divide-y divide-stone-100">
            {posts.map((post) => (
              <article key={post.id} className="py-5 first:pt-0 last:pb-0 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-800 hover:text-amber-600 transition">
                  {post.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </article>
            ))}
          </div>

          {/* ページネーション */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-100">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 text-xs font-medium rounded transition ${
                page === 1
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-800 text-white hover:bg-stone-700'
              }`}
            >
              ← 新しいお知らせ
            </button>

            <button
              onClick={() => hasNext && setPage(page + 1)}
              disabled={!hasNext}
              className={`px-4 py-2 text-xs font-medium rounded transition ${
                !hasNext
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-800 text-white hover:bg-stone-700'
              }`}
            >
              過去のお知らせ →
            </button>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-12 px-6 mt-20 border-t border-stone-800">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <p className="text-stone-200 font-serif text-base font-bold text-amber-500">Trattoria Culinary</p>
            <p>〒150-0041 東京都渋谷区神南 1-2-3</p>
            <p>TEL: 03-1234-5678</p>
          </div>
          <div className="space-y-2 md:text-right">
            <p>営業時間: 11:30 - 22:00 (L.O. 21:30)</p>
            <p>定休日: 毎週月曜日</p>
            <p className="pt-4 text-stone-600">© 2026 Trattoria Culinary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;