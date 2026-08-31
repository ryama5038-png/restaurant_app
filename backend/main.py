from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# React(port 3000) からのアクセスを許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 店舗基本情報のデータ
INFO_DATA = {
    "name": "Culinary Haven",
    "description": "旬の地場食材をふんだんに使った、心温まる創作イタリアンレストランです。落ち着いた空間で特別なひとときをお過ごしください。",
    "address": "東京都渋谷区神南 1-2-3",
    "hours": "11:30 - 22:00 (L.O. 21:30)",
    "closed": "毎週月曜日",
    "phone": "03-1234-5678"
}

# お知らせ・投稿のダミーデータ
POSTS_DATA = [
    {
        "id": 1,
        "title": "秋の味覚フェア開催のお知らせ",
        "date": "2026-09-01",
        "content": "本日より季節限定の松茸とポルチーニ茸のリゾットが登場します。ぜひご賞味ください。"
    },
    {
        "id": 2,
        "title": "9月の定休日について",
        "date": "2026-08-28",
        "content": "今月の定休日は毎週月曜日と、第3火曜日（15日）となります。よろしくお願いいたします。"
    }
]

@app.get("/api/info")
def get_info():
    """店舗情報を返すエンドポイント"""
    return INFO_DATA

@app.get("/api/posts")
def get_posts():
    """お知らせ一覧を返すエンドポイント"""
    return POSTS_DATA

