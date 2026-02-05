# CodeLeap Network

Full stack project developed for an assessment, consisting of a CRUD posts application with React frontend and Django Rest Framework backend.

## Technologies

### Backend
- Python 3.12+ (or Python 3.11+ for Django 6.x compatibility)
- Django 5.2.11 (compatible with Python 3.11+)
- Django Rest Framework 3.16.1
- django-cors-headers 4.9.0
- SQLite3

### Frontend
- React 18.2.0
- TypeScript
- Vite 4.4.5
- React Query 3.39.3
- React Router DOM
- Lucide React (icons)
- Axios

## How to Run the Project

### 1. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Access

Open browser at: `http://localhost:3000`

