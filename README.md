# Baraton Community Resource Sharing System (BCRSS) - Django Backend

A comprehensive Django REST API backend for the Baraton Community Resource Sharing System, enabling community members to share tools, textbooks, and job opportunities.

## Technology Stack

- **Backend**: Django 6.0.6
- **API**: Django REST Framework 3.14.0
- **Database**: MySQL
- **File Storage**: Cloudinary
- **Email**: Django Email Backend (SMTP)
- **Version Control**: Git and GitHub
- **Deployment**: Render

## Project Structure

```
bcrss_backend/
├── bcrss_config/          # Django project configuration
│   ├── settings.py        # Settings with database, apps, middleware
│   ├── urls.py            # Main URL routing
│   └── wsgi.py            # WSGI application
├── users/                 # User management app
│   ├── models.py          # User model with role-based access
│   ├── views.py           # User API endpoints
│   ├── serializers.py     # User serializers
│   └── admin.py           # Django admin configuration
├── resources/             # Resource listing app
│   ├── models.py          # Resource model
│   ├── views.py           # Resource API endpoints
│   ├── serializers.py     # Resource serializers
│   └── admin.py           # Django admin configuration
├── jobs/                  # Job opportunities app
│   ├── models.py          # JobOpportunity model
│   ├── views.py           # Job API endpoints
│   ├── serializers.py     # Job serializers
│   └── admin.py           # Django admin configuration
├── borrow_requests/       # Borrow request management app
│   ├── models.py          # BorrowRequest model
│   ├── views.py           # Borrow request API endpoints
│   ├── serializers.py     # Borrow request serializers
│   └── admin.py           # Django admin configuration
├── reviews/               # Reviews and ratings app
│   ├── models.py          # Review model
│   ├── views.py           # Review API endpoints
│   ├── serializers.py     # Review serializers
│   └── admin.py           # Django admin configuration
├── templates/             # HTML templates
├── static/                # Static files (CSS, JavaScript, images)
├── media/                 # User-uploaded files
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables (not committed)
```

## Features Implemented

### 1. User Authentication & Role-Based Access
- Custom User model extending Django's AbstractUser
- Two roles: Member and Admin
- User profiles with location, contact, and avatar color
- Admin endpoints for user management

### 2. Resource Listings
- Create, read, update, delete (CRUD) operations for resources
- Categories: Farm Tools, Textbooks, Household Items
- Condition tracking: Excellent, Good, Fair
- Lending types: Borrowing, Donation
- Status management: Available, Borrowed
- Image codes for visual representation
- Search and filter capabilities

### 3. Job Opportunities Board
- Post and manage job listings
- Categories: Skilled Trade, Farm Work, Tutoring, Casual Labor
- Status tracking: Open, Filled
- Location-based job discovery
- Rate and duration information

### 4. Borrow Request System
- Members can submit borrow requests with date range and message
- Lenders can approve or decline requests
- Track borrowing periods
- Status management: Pending, Approved, Declined, Returned

### 5. Reviews and Ratings
- Star ratings (1-5) with written comments
- Role-based reviews: Lender, Borrower, Employer, Worker
- Unique constraint to prevent duplicate reviews
- User reputation tracking

### 6. Admin Panel
- User management (promote/demote roles)
- Resource moderation
- Job listing moderation
- Borrow request oversight
- Review management

## Installation & Setup

### Prerequisites
- Python 3.8+
- MySQL 5.7+
- pip or conda

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vickoh25/BCRSS.git
   cd BCRSS-backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file in the project root:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   
   # Database Configuration
   DB_NAME=bcrss_db
   DB_USER=root
   DB_PASSWORD=your-password
   DB_HOST=localhost
   DB_PORT=3306
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

5. **Create database**
   ```bash
   mysql -u root -p
   CREATE DATABASE bcrss_db;
   EXIT;
   ```

6. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

8. **Run development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get user details
- `GET /api/users/me/` - Get current user profile
- `POST /api/users/{id}/promote_to_admin/` - Promote to admin (admin only)
- `POST /api/users/{id}/demote_to_member/` - Demote to member (admin only)

### Resources
- `GET /api/resources/` - List resources (with filters)
- `POST /api/resources/` - Create resource
- `GET /api/resources/{id}/` - Get resource details
- `PUT /api/resources/{id}/` - Update resource
- `DELETE /api/resources/{id}/` - Delete resource
- `GET /api/resources/my_resources/` - Get user's resources
- `POST /api/resources/{id}/mark_borrowed/` - Mark as borrowed
- `POST /api/resources/{id}/mark_available/` - Mark as available

### Jobs
- `GET /api/jobs/` - List job opportunities (with filters)
- `POST /api/jobs/` - Create job posting
- `GET /api/jobs/{id}/` - Get job details
- `PUT /api/jobs/{id}/` - Update job posting
- `DELETE /api/jobs/{id}/` - Delete job posting

### Borrow Requests
- `GET /api/borrow-requests/` - List borrow requests
- `POST /api/borrow-requests/` - Create borrow request
- `GET /api/borrow-requests/{id}/` - Get request details
- `PUT /api/borrow-requests/{id}/` - Update request
- `DELETE /api/borrow-requests/{id}/` - Delete request

### Reviews
- `GET /api/reviews/` - List reviews
- `POST /api/reviews/` - Create review
- `GET /api/reviews/{id}/` - Get review details
- `PUT /api/reviews/{id}/` - Update review
- `DELETE /api/reviews/{id}/` - Delete review

## Database Models

### User
- id (auto-increment)
- username, email, password (from AbstractUser)
- role (Member/Admin)
- location, contact, avatar_color, bio
- created_at, updated_at

### Resource
- id (string primary key)
- title, category, condition, description
- lending_type, location
- owner (FK to User)
- status, image_code
- listed_date, created_at, updated_at

### JobOpportunity
- id (string primary key)
- title, category, status, description
- location, rate, duration
- posted_by (FK to User)
- posted_date, created_at, updated_at

### BorrowRequest
- id (string primary key)
- item (FK to Resource)
- requester, owner (FK to User)
- start_date, end_date
- status, message
- request_date, created_at, updated_at

### Review
- id (string primary key)
- rating, comment
- reviewer, target_user (FK to User)
- reviewer_role
- date, created_at, updated_at

## Next Steps

1. **Complete API Views**: Implement views for jobs, borrow_requests, and reviews apps
2. **URL Routing**: Configure URL patterns for all API endpoints
3. **Authentication**: Integrate with Manus OAuth or implement JWT authentication
4. **Frontend Integration**: Build HTML/CSS/JavaScript frontend
5. **Testing**: Write unit and integration tests
6. **Deployment**: Deploy to Render or chosen hosting platform
7. **Documentation**: Generate API documentation with Swagger/OpenAPI

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, contact Victor Okello (SVICON2311) at okellohvick@gmail.com
