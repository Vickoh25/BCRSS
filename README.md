# Baraton Community Resource Sharing System (BCRSS)

A web platform for neighborhood households, local farmers, traders, and chama groups in Baraton (Nandi County, Kenya) to list, discover, and exchange resources such as farm tools, textbooks, and casual job opportunities.

## Repository Structure

```
BCRSS/
├── backend/                  # Django REST Framework API
│   ├── bcrss_config/         # Django project settings & URLs
│   ├── users/                # User management app
│   ├── resources/            # Resource listing app
│   ├── jobs/                 # Job opportunities app
│   ├── borrow_requests/      # Borrow request management
│   ├── reviews/              # Reviews and ratings app
│   ├── manage.py             # Django management script
│   ├── requirements.txt      # Python dependencies
│   ├── API_INTEGRATION.md    # Frontend-backend integration guide
│   ├── AUTHENTICATION.md     # Auth documentation
│   ├── TESTING_GUIDE.md       # Testing procedures
│   ├── WINDOWS_SETUP.md      # Windows-specific setup
│   └── PROJECT_SUMMARY.md    # Backend project summary
├── frontend/                 # Vanilla HTML, CSS, JavaScript SPA
│   ├── index.html            # Main entry point
│   ├── css/
│   │   └── style.css         # Complete stylesheet
│   └── js/
│       ├── app.js            # Main application logic & state management
│       ├── components.js     # UI component renderers
│       ├── data.js           # Mock data & type definitions
│       └── api.js            # Backend API client
├── README.md                 # This file
├── .gitignore
└── todo.md
```

## Quick Start

### Backend (Django API)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

See `backend/PROJECT_SUMMARY.md` for full backend documentation.

### Frontend (HTML/CSS/JS)

Simply open `frontend/index.html` in a browser, or serve with any static file server:

```bash
cd frontend
python -m http.server 8080
```

The app will be available at `http://localhost:8080`

> **Note:** The frontend runs entirely in the browser with mock data and localStorage persistence. To connect it to the Django backend API, update the `API_BASE_URL` in `frontend/js/api.js`.

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Backend  | Python, Django 6.0.6, Django REST Framework |
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+)  |
| Database | MySQL (production) / SQLite (development)|
| Auth     | JWT (djangorestframework-simplejwt)     |

## Features

- **Resource Sharing** — List and borrow farm tools, textbooks, household items
- **Job Board** — Post and apply for casual labor, farm work, tutoring gigs
- **Borrow Requests** — Request, approve, decline, and track borrow cycles
- **Reviews & Ratings** — Star ratings and feedback after transactions
- **Admin Panel** — Platform management and moderation
- **Role Simulation** — Switch between user profiles to test different scenarios

## Project Status

✅ Backend API — Complete  
✅ Frontend SPA — Complete (vanilla HTML/CSS/JS)  
⏳ API Integration — In progress (mock data active, API client ready)  
⏳ Production Deployment — Pending

## License

MIT License
