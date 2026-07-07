# BCRSS Backend - Project Summary & Delivery

## Project Overview

**BCRSS** (Baraton Community Resource Sharing System) is a comprehensive platform for community resource sharing and job opportunities. The backend is built with Django REST Framework and provides a complete API for managing users, resources, jobs, borrow requests, and reviews.

## Technology Stack

- **Framework**: Django 6.0.6
- **API**: Django REST Framework 3.14.0
- **Database**: MySQL 5.7+ (via mysqlclient)
- **Authentication**: Token-based (Bearer)
- **CORS**: django-cors-headers
- **Image Processing**: Pillow 10.2.0+
- **Cloud Storage**: Cloudinary
- **Python Version**: 3.10+ (recommended 3.11 or 3.12)

## Project Structure

```
BCRSS/
├── bcrss_config/          # Django project settings
│   ├── settings.py        # Configuration (DB, CORS, apps)
│   ├── urls.py            # URL routing
│   └── wsgi.py            # WSGI application
├── users/                 # User management app
│   ├── models.py          # User model with role-based access
│   ├── serializers.py     # User serializers
│   ├── views.py           # User ViewSet
│   └── admin.py           # Admin configuration
├── resources/             # Resource listing app
│   ├── models.py          # Resource model
│   ├── serializers.py     # Resource serializers
│   ├── views.py           # Resource ViewSet
│   └── admin.py           # Admin configuration
├── jobs/                  # Job opportunities app
│   ├── models.py          # JobOpportunity model
│   ├── serializers.py     # Job serializers
│   ├── views.py           # Job ViewSet
│   └── admin.py           # Admin configuration
├── borrow_requests/       # Borrow request management
│   ├── models.py          # BorrowRequest model
│   ├── serializers.py     # Serializers
│   ├── views.py           # BorrowRequest ViewSet
│   └── admin.py           # Admin configuration
├── reviews/               # Reviews and ratings
│   ├── models.py          # Review model
│   ├── serializers.py     # Review serializers
│   ├── views.py           # Review ViewSet
│   └── admin.py           # Admin configuration
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── README.md              # Setup instructions
├── WINDOWS_SETUP.md       # Windows-specific setup
└── PROJECT_SUMMARY.md     # This file
```

## Implemented Features

### 1. User Management
- ✅ Custom User model with role-based access (Member/Admin)
- ✅ User profiles with location, contact, avatar colors
- ✅ Admin role management (promote/demote)
- ✅ User listing and filtering
- ✅ User authentication endpoints

### 2. Resource Listings
- ✅ Create, read, update, delete resources
- ✅ Resource categories (farm tools, textbooks, household items)
- ✅ Condition tracking (Excellent, Good, Fair)
- ✅ Lending types (Borrowing, Donation)
- ✅ Status management (Available, Borrowed)
- ✅ Filtering and search functionality
- ✅ Image code support for visual identification

### 3. Job Opportunities Board
- ✅ Create, read, update, delete job postings
- ✅ Job categories (Skilled Trade, Farm Work, Tutoring, Casual Labor)
- ✅ Status management (Open, Filled)
- ✅ Rate and duration tracking
- ✅ Location-based filtering
- ✅ Search and filtering

### 4. Borrow Request System
- ✅ Submit borrow requests with date ranges
- ✅ Request status workflow (Pending → Approved/Declined → Returned)
- ✅ Approval/decline by item owner
- ✅ Mark items as returned
- ✅ Automatic item status updates
- ✅ Request tracking for both parties

### 5. Reviews and Ratings
- ✅ 1-5 star rating system
- ✅ Written comments/feedback
- ✅ Role-based reviews (Lender, Borrower, Employer, Worker)
- ✅ Average rating calculation
- ✅ Review history tracking
- ✅ Prevent duplicate reviews

### 6. Admin Panel
- ✅ User management and role assignment
- ✅ Resource moderation (view, delete)
- ✅ Job posting moderation (view, delete)
- ✅ Review management
- ✅ System statistics and analytics

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/` | List all users |
| GET | `/api/users/{id}/` | Get user details |
| GET | `/api/users/me/` | Get current user |
| POST | `/api/users/{id}/promote_to_admin/` | Promote to admin |
| POST | `/api/users/{id}/demote_to_member/` | Demote to member |

### Resources
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources/` | List resources |
| POST | `/api/resources/` | Create resource |
| GET | `/api/resources/{id}/` | Get resource details |
| PUT | `/api/resources/{id}/` | Update resource |
| DELETE | `/api/resources/{id}/` | Delete resource |
| GET | `/api/resources/my_resources/` | Get user's resources |
| POST | `/api/resources/{id}/mark_borrowed/` | Mark as borrowed |
| POST | `/api/resources/{id}/mark_available/` | Mark as available |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs/` | List job opportunities |
| POST | `/api/jobs/` | Create job posting |
| GET | `/api/jobs/{id}/` | Get job details |
| PUT | `/api/jobs/{id}/` | Update job posting |
| DELETE | `/api/jobs/{id}/` | Delete job posting |
| GET | `/api/jobs/my_jobs/` | Get user's jobs |
| POST | `/api/jobs/{id}/mark_filled/` | Mark as filled |
| POST | `/api/jobs/{id}/mark_open/` | Mark as open |

### Borrow Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/borrow-requests/` | List requests |
| POST | `/api/borrow-requests/` | Create request |
| GET | `/api/borrow-requests/{id}/` | Get request details |
| GET | `/api/borrow-requests/my_requests/` | Get user's requests |
| GET | `/api/borrow-requests/received_requests/` | Get received requests |
| POST | `/api/borrow-requests/{id}/approve/` | Approve request |
| POST | `/api/borrow-requests/{id}/decline/` | Decline request |
| POST | `/api/borrow-requests/{id}/mark_returned/` | Mark as returned |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/` | List reviews |
| POST | `/api/reviews/` | Create review |
| GET | `/api/reviews/{id}/` | Get review details |
| GET | `/api/reviews/my_reviews/` | Get reviews given |
| GET | `/api/reviews/received_reviews/` | Get reviews received |
| GET | `/api/reviews/user_rating/?user_id={id}` | Get user rating |
| DELETE | `/api/reviews/{id}/` | Delete review |

## Database Schema

### Users Table
- id (Primary Key)
- openId (Unique OAuth identifier)
- name
- email
- phone
- location
- bio
- avatar_color
- role (Member/Admin)
- created_at
- updated_at
- last_signed_in

### Resources Table
- id (Primary Key)
- title
- category
- condition
- description
- lending_type
- location
- owner (Foreign Key to User)
- status
- image_code
- created_at
- updated_at

### JobOpportunity Table
- id (Primary Key)
- title
- category
- status
- description
- location
- rate
- duration
- posted_by (Foreign Key to User)
- contact_info
- created_at
- updated_at

### BorrowRequest Table
- id (Primary Key)
- item (Foreign Key to Resource)
- requester (Foreign Key to User)
- owner (Foreign Key to User)
- start_date
- end_date
- status
- message
- created_at
- updated_at

### Review Table
- id (Primary Key)
- reviewer (Foreign Key to User)
- target_user (Foreign Key to User)
- rating (1-5)
- comment
- reviewer_role
- created_at
- updated_at

## Installation & Setup

### Windows Setup
See `WINDOWS_SETUP.md` for detailed Windows-specific instructions.

### Linux/Mac Setup

```bash
# Clone repository
git clone https://github.com/Vickoh25/BCRSS.git
cd BCRSS

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## Configuration

### Environment Variables

Create a `.env` file with:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here

# Database
DB_NAME=bcrss_db
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Frontend Integration

The frontend is a React application that consumes this API. See `API_INTEGRATION.md` in the frontend directory for integration details.

### API Client
- Location: `frontend/src/api/client.ts`
- Provides centralized interface for all API calls
- Handles authentication and error handling
- Supports all endpoints

## Testing

### Run Tests
```bash
python manage.py test
```

### API Testing with cURL
```bash
# List resources
curl http://localhost:8000/api/resources/

# Create resource
curl -X POST http://localhost:8000/api/resources/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","category":"farm tools",...}'
```

### Testing Guide
See `TESTING_GUIDE.md` in the frontend directory for comprehensive testing procedures.

## Deployment

### Production Checklist
- [ ] Set `DEBUG=False` in settings
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set strong `SECRET_KEY`
- [ ] Configure production database
- [ ] Set up email service
- [ ] Configure Cloudinary
- [ ] Set up CORS for production domain
- [ ] Run migrations
- [ ] Collect static files
- [ ] Set up SSL/TLS
- [ ] Configure logging
- [ ] Set up monitoring

### Deployment Platforms
- Render
- Railway
- PythonAnywhere
- AWS (EC2, Lambda)
- Google Cloud Run
- Heroku

## Performance Optimization

- Database indexing on frequently queried fields
- Query optimization with select_related/prefetch_related
- Pagination for list endpoints
- Caching for user ratings
- Image optimization with Cloudinary

## Security Features

- ✅ CORS configuration
- ✅ CSRF protection
- ✅ SQL injection prevention (ORM)
- ✅ XSS prevention
- ✅ Password hashing
- ✅ Token-based authentication
- ✅ Role-based access control
- ✅ Input validation
- ✅ Rate limiting (can be added)

## Known Limitations

1. **Authentication**: Currently uses token-based auth. OAuth integration needed for production.
2. **Image Storage**: Uses Cloudinary. Local storage option available but not recommended for production.
3. **Email Notifications**: Email service must be configured for notifications to work.
4. **Scalability**: Single database instance. Horizontal scaling requires additional setup.

## Future Enhancements

1. **Real-time Notifications**: WebSocket integration for live updates
2. **Advanced Search**: Elasticsearch integration
3. **Messaging System**: Direct messaging between users
4. **Ratings Analytics**: Detailed user reputation system
5. **Mobile App**: Native iOS/Android apps
6. **Payment Integration**: For premium features
7. **Analytics Dashboard**: User behavior tracking
8. **Machine Learning**: Recommendation engine

## Support & Documentation

- **API Documentation**: Available at `/api/` (browsable API)
- **Setup Guide**: `README.md`
- **Windows Setup**: `WINDOWS_SETUP.md`
- **Integration Guide**: `API_INTEGRATION.md` (in frontend)
- **Testing Guide**: `TESTING_GUIDE.md` (in frontend)

## Repository

GitHub: https://github.com/Vickoh25/BCRSS

## License

MIT License

## Contributors

- Backend: Django REST Framework implementation
- Frontend: React with Vite
- Database: MySQL

## Contact & Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Project Status**: ✅ Backend Complete | ✅ API Implemented | ⏳ Frontend Integration In Progress

**Last Updated**: July 5, 2026
