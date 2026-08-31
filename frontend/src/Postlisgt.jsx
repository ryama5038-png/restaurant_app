import { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  useEffect(() => {
    const offset = (page - 1) * LIMIT;

    // Axios によるデータ取得
    axios.get('http://localhost:8000/api/posts', {
      params: {
        limit: LIMIT,
        offset: offset
      }
    })
    .then((response) => {
      // response.data に自動解析された JSON 形式のデータが入ります
      setPosts(response.data);
    })
    .catch((error) => {
      console.error("データ取得エラー:", error);
    });

  }, [page]);

  return (
    <div className="p-4 max-w-md mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">投稿一覧 (Page {page})</h2>

      <ul className="space-y-3 mb-6">
        {posts.map((post) => (
          <li key={post.id} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-blue-400">{post.title}</h3>
            <p className="text-sm text-slate-300">{post.content}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm transition cursor-pointer"
        >
          ← 新しい投稿
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={posts.length < LIMIT}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded text-sm transition cursor-pointer"
        >
          過去の投稿 →
        </button>
      </div>
    </div>
  );
}

export default PostList;
