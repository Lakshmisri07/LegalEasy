# LegalEasy (Express + MySQL + Bootstrap)

A clean, minimal conversion of **LegalEasy** to an Express + MySQL backend with a Bootstrap 5 frontend.

## Quick Start

### 1) MySQL: create DB & table
Import the schema:
```sql
-- In MySQL
SOURCE backend/db/schema.sql;
```

Or run manually:
```sql
CREATE DATABASE IF NOT EXISTS legaleasy;
USE legaleasy;
CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content MEDIUMTEXT,
  tags VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2) Backend
```bash
cd backend
cp .env.example .env    # edit DB creds if needed
npm install
npm run dev             # runs on http://localhost:4000
```

### 3) Frontend
Just open `frontend/index.html` in your browser OR let Express serve it:
- When the backend runs, it also serves the frontend at `http://localhost:4000/`

### API
- `GET    /api/docs` — list documents
- `GET    /api/docs/:id` — get a document
- `POST   /api/docs` — create (`{ title, content?, tags? }`)
- `PUT    /api/docs/:id` — update (any of the fields)
- `DELETE /api/docs/:id` — delete

## Deploy notes
- Remember to set `.env` with your DB credentials.
- For Railway/Render/EC2, provision MySQL and set env vars accordingly.

## GitHub
This folder is ready to push:
```bash
git init
git remote add origin <your-repo-url>
git add .
git commit -m "LegalEasy: Express+MySQL backend, Bootstrap frontend"
git branch -M main
git push -u origin main
```
