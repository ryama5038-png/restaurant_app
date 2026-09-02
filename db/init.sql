-- テーブルの作成
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ダミーデータのインサート
INSERT INTO posts (title, content) VALUES
('秋の味覚フェア開催のお知らせ', '本日より季節限定の松茸とポルチーニ茸のリゾットが登場します。'),
('9月の定休日について', '今月の定休日は毎週月曜日と、第3火曜日（15日）となります。'),
('新シェフ就任のご挨拶', 'このたび、本場イタリアで修行を積んだ新しいシェフを迎えることとなりました。'),
('ランチメニューリニューアル！', '平日限定のパスタランチセットがよりお得にリニューアルしました。');

-- 管理者テーブルの作成
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- テスト用初期アカウントの挿入 (ユーザー名: admin, パスワード: adminpassword123)
-- ※実際の運用環境では適切なパスワードハッシュに変更してください
INSERT INTO admins (username, hashed_password)
VALUES (
    'admin',
    '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW'
) ON CONFLICT (username) DO NOTHING;
