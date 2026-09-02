import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/posts', {
        title: title,
        content: content,
      });
      setMessage('投稿が成功しました！');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('投稿に失敗しました。');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2 className='text-2xl text-center border border-[#BBC8CE] py-3 mb-3 rounded-xl'>管理者用 お知らせ投稿</h2>
      <p className='font-mono p-2 mt-2 hover:text-[#FC1D08] mb-4 text-center'><Link to="/">← トップページへ戻る</Link></p>

      {message && <p style={{ color: message.includes('成功') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            className='border border-[#000000] p-3 rounded'
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>本文:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none' }}
        >
          投稿する
        </button>
      </form>
    </div>
  );
}

export default Admin;