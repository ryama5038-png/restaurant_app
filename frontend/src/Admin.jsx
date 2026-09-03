import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function Admin() {
  // 認証用ステート
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  // 投稿用ステート
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // 画像ファイル用ステートを追加
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ログイン処理
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const accessToken = response.data.access_token;

      setToken(accessToken);
      localStorage.setItem('adminToken', accessToken);
      setMessage('ログインに成功しました！');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      setMessage('ログインに失敗しました。ユーザー名かパスワードを確認してください。');
    } finally {
      setLoading(false);
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
    setMessage('ログアウトしました。');
  };

  // 投稿送信処理 (multipart/form-data形式で送信)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // FormData オブジェクトを構築
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('投稿が成功しました！');
      setTitle('');
      setContent('');
      setImage(null);
      // file input の選択をリセット
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
        setMessage('認証エラーまたはセッション切れです。再ログインしてください。');
        handleLogout();
      } else {
        setMessage('投稿に失敗しました。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2 className="text-2xl text-center border border-[#BBC8CE] py-3 mb-3 rounded-xl">
        管理者用 ダッシュボード
      </h2>
      <p className="font-mono p-2 mt-2 hover:text-[#FC1D08] mb-4 text-center">
        <Link to="/">← トップページへ戻る</Link>
      </p>

      {message && (
        <p style={{ color: message.includes('成功') ? 'green' : 'red', textAlign: 'center', marginBottom: '15px' }}>
          {message}
        </p>
      )}

      {!token ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 className="text-lg font-bold text-center">管理者ログイン</h3>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>ユーザー名:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-[#000000] p-3 rounded"
              style={{ width: '100%', fontSize: '16px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>パスワード:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-[#000000] p-3 rounded"
              style={{ width: '100%', fontSize: '16px' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '処理中...' : 'ログイン'}
          </button>
        </form>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span>ログイン中</span>
            <button
              onClick={handleLogout}
              style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#666', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              ログアウト
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>タイトル:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border border-[#000000] p-3 rounded"
                style={{ width: '100%', fontSize: '16px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>本文:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="5"
                className="border border-[#000000] p-3 rounded"
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>画像 (任意):</label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0] || null)}
                className="border border-[#000000] p-2 rounded"
                style={{ width: '100%', fontSize: '14px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? '送信中...' : '投稿する'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Admin;