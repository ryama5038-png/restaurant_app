import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);         // 現在のページ番号（1始まり）
  const [hasNext, setHasNext] = useState(true); // 次のページが存在するか
  const LIMIT = 5;

  // ページ番号（page）が変わるたびにデータを再取得
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (currentPage) => {
    // ページ番号から offset を計算 (1ページ目: 0, 2ページ目: 5, ...)
    const currentOffset = (currentPage - 1) * LIMIT;

    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts?limit=${LIMIT}&offset=${currentOffset}`
      );
      const fetchedPosts = response.data;

      // ★ 追記ではなく、取得した5件で配列を完全に上書き
      setPosts(fetchedPosts);

      // 取得件数が LIMIT(5件) 未満なら「次のページ」は存在しない
      setHasNext(fetchedPosts.length === LIMIT);
    } catch (error) {
      console.error('投稿の取得に失敗しました:', error);
    }
  };

  // 前のページへ（新しい投稿側に戻る）
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // 次のページへ（古い投稿へ進む）
  const handleNextPage = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">お知らせ一覧</h1>

      {/* 投稿一覧の表示 */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <h2 className="text-lg font-semibold mt-1">{post.title}</h2>
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">{post.content}</p>
          </div>
        ))}
      </div>

      {/* ページネーションコントロール */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          ← 新しい投稿（前のページ）
        </button>

        <span className="text-sm text-gray-600 font-medium">
          {page} ページ目
        </span>

        <button
          onClick={handleNextPage}
          disabled={!hasNext}
          className={`px-4 py-2 rounded-md ${
            !hasNext
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          古い投稿（次のページ） →
        </button>
      </div>
    </div>
  );
}

export default Home;