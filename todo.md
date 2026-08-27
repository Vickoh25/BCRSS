# Project TODO

## Backend - Django Models & Database Schema

- [x] User model with role-based access (Member/Admin)
- [x] Resource model with categories, conditions, lending types, status
- [x] JobOpportunity model with categories and status
- [x] JobApplication model with pitch and status tracking
- [x] BorrowRequest model with status tracking, disputes, reminders
- [x] Review model with ratings, role-based reviews, resource scoping
- [x] Admin configuration for all models
- [x] Database migrations applied
- [ ] Seed data / fixtures for development

## Backend - API Endpoints & Views

- [x] UserViewSet with admin promotion/demotion, analytics, PDF reports
- [x] ResourceViewSet with filtering, search, status management
- [x] JobOpportunityViewSet with full CRUD, filtering, job applications
- [x] BorrowRequestViewSet with approve/decline/return/reminder/dispute workflow
- [x] ReviewViewSet with rating, comment, average rating, resource reviews
- [x] AuthViewSet with register, login, logout, password reset/change, profile update
- [x] URL routing configuration (router + urlpatterns)
- [x] JWT authentication (SimpleJWT with token refresh & blacklisting)
- [x] Permission classes for role-based access (IsAuthenticated, AllowAny)
- [x] CORS configuration for Vercel frontend

## Backend - Additional Features

- [x] Email notifications for borrow requests (create, approve, decline, return, reminders)
- [x] Email notifications for disputes (raised, resolved)
- [x] Email notifications for job applications
- [x] Welcome email on registration
- [x] Password reset email with secure token
- [x] PDF report generation (community-wide for admins, personal for members)
- [x] Search functionality across resources and jobs (DRF SearchFilter)
- [x] Pagination for list endpoints (PageNumberPagination, page size 20)
- [ ] Cloudinary integration for image uploads (configured, not active)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit tests for all endpoints
- [ ] Integration tests

## Frontend - HTML/CSS/JavaScript

- [x] Landing page (unauthenticated) with hero, features, how-it-works, testimonials
- [x] User authentication pages (login, registration modals)
- [x] User profile display (in dashboard and dropdown)
- [x] Resource listing page with search, category, and status filters
- [x] Resource creation modal (Share Resource)
- [x] Resource detail cards with owner info
- [x] Job board page with search and category filters
- [x] Job creation modal (Post Job) with requirements
- [x] Job application modal with pitch
- [x] Borrow request workflow (request, approve, decline, return, reminder, dispute)
- [x] Review and rating submission modal
- [x] Dashboard with sub-tabs (requests, jobs, reviews)
- [x] Admin dashboard with user management, resource/job moderation, analytics
- [x] Admin PDF report download
- [x] Responsive design for mobile (mobile drawer menu)
- [x] Glassmorphism UI with CSS variables, Playfair Display + Inter fonts
- [x] SVG Lucide icons (inline)
- [x] localStorage persistence with API sync
- [ ] User profile edit page (update_profile endpoint exists, no dedicated page)

## Testing & Deployment

- [ ] API testing with Postman
- [ ] Unit tests (Django TestCase)
- [ ] Integration tests
- [ ] Load testing
- [ ] Security audit
- [ ] Database backup strategy
- [x] Deployment to Render (backend)
- [x] Deployment to Vercel (frontend)
- [ ] CI/CD pipeline setup
- [ ] Monitoring and logging

## Technical Stack

- [x] Backend: Python (Django 6.0.6)
- [x] API: Django REST Framework 3.14.0
- [x] Database: SQLite (dev) / PostgreSQL (prod via dj-database-url)
- [x] Authentication: JWT (djangorestframework-simplejwt)
- [x] Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
- [x] Notifications: Django Email Backend (SMTP)
- [x] CORS: django-cors-headers
- [x] Filtering: django-filter
- [x] Reports: ReportLab (PDF generation)
- [ ] File Storage: Cloudinary (configured, not active)
- [x] Version Control: Git and GitHub
- [x] Deployment: Render (backend) + Vercel (frontend)

## Style Direction

- [x] Elegant and polished visual design
- [x] Glassmorphism UI with backdrop blur effects
- [x] Consistent typography (Playfair Display serif + Inter sans)
- [x] CSS custom properties for theming
- [x] Responsive across devices
- [ ] Figma design files
