import os
from databases import Database

# 1. 環境変数から DATABASE_URL を取得
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://user:password@db:5432/restaurant_db"
)

# 2. asyncpg 用のスキーム（postgresql+asyncpg://）へ置換
if DATABASE_URL.startswith("postgresql://"):
    ASYNC_DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
else:
    ASYNC_DATABASE_URL = DATABASE_URL

# 3. 非同期データベースインスタンスの作成のみ
database = Database(ASYNC_DATABASE_URL)
