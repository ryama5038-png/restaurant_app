# プロジェクト全体（サブディレクトリ含む）の .pyc と __pycache__ を Git の管理から外す
git rm -r --cached "*__pycache__*" "*.pyc"

#変更内容を一時退避
git stash

#対比していた変更内容を、もとに戻す
git stash pop

既にgitの管理対象(commit済み)のファイルを追跡から外し、以後追跡をやめる方法

git rm -r --cached "ファイル名"　

gitignoreに追加

