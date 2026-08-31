from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime

from database import database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Pydantic スキーマ
class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime

# --- API エンドポイント ---

@app.get("/api/info")
def get_info():
    return {
        "name": "Culinary Haven",
        "description": "旬の地場食材をふんだんに使った、心温まる創作イタリアンレストランです。",
        "address": "東京都渋谷区神南 1-2-3",
        "hours": "11:30 - 22:00 (L.O. 21:30)",
        "closed": "毎週月曜日",
        "phone": "03-1234-5678"
    }

# 【1】投稿の新規作成（管理者画面用）
@app.post("/api/posts", response_model=PostResponse)
async def create_post(post: PostCreate):
    # SQLを直接記述（RETURNING id で作成されたIDを取得）
    # :title や :content のようにプレースホルダーを使うことでSQLインジェクションを防止できます
    query = """
        INSERT INTO posts (title, content)
        VALUES (:title, :content)
        RETURNING id, title, content, created_at
    """
    values = {"title": post.title, "content": post.content}
    
    # fetch_one で挿入と同時に作成された1件のレコードを取得
    new_post = await database.fetch_one(query=query, values=values)
    return new_post

# 【2】投稿一覧の取得（「もっと見る」対応のページネーション）
@app.get("/api/posts", response_model=List[PostResponse])
async def get_posts(limit: int = 3, offset: int = 0):
    # SQLを直接記述
    query = """
        SELECT id, title, content, created_at
        FROM posts
        ORDER BY created_at DESC
        LIMIT :limit OFFSET :offset
    """
    values = {"limit": limit, "offset": offset}
    
    # fetch_all で複数件を取得
    posts = await database.fetch_all(query=query, values=values)
    return posts