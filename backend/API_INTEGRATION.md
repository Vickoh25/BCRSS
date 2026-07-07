# BCRSS Frontend-Backend API Integration Guide

This document describes how the React frontend integrates with the Django backend API.

## Setup

### 1. Configure Environment Variables

Create a `.env.local` file in the frontend root:

```env
VITE_API_URL=http://localhost:8000/api
```

For production:
```env
VITE_API_URL=https://your-production-api.com/api
```

### 2. Start Backend Server

```bash
cd /path/to/BCRSS
python manage.py migrate
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Start Frontend Server

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Client Usage

The API client is located at `src/api/client.ts` and provides a centralized interface for all backend calls.

### Import and Use

```typescript
import { apiClient } from '@/api/client';

// Get current user
const user = await apiClient.getMe();

// List resources with filters
const resources = await apiClient.listResources({ category: 'farm tools', status: 'Available' });

// Create a new resource
const newResource = await apiClient.createResource({
  title: 'Farm Sprayer',
  category: 'farm tools',
  condition: 'Good',
  description: 'Portable hand sprayer',
  lending_type: 'Borrowing',
  location: 'Baraton',
  status: 'Available',
  image_code: 'sprayer'
});
```

## Available API Endpoints

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get user details
- `GET /api/users/me/` - Get current user profile
- `POST /api/users/{id}/promote_to_admin/` - Promote to admin
- `POST /api/users/{id}/demote_to_member/` - Demote to member

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
- `GET /api/jobs/my_jobs/` - Get user's job postings
- `POST /api/jobs/{id}/mark_filled/` - Mark as filled
- `POST /api/jobs/{id}/mark_open/` - Mark as open

### Borrow Requests
- `GET /api/borrow-requests/` - List borrow requests
- `POST /api/borrow-requests/` - Create borrow request
- `GET /api/borrow-requests/{id}/` - Get request details
- `GET /api/borrow-requests/my_requests/` - Get user's requests
- `GET /api/borrow-requests/received_requests/` - Get received requests
- `POST /api/borrow-requests/{id}/approve/` - Approve request
- `POST /api/borrow-requests/{id}/decline/` - Decline request
- `POST /api/borrow-requests/{id}/mark_returned/` - Mark as returned

### Reviews
- `GET /api/reviews/` - List reviews
- `POST /api/reviews/` - Create review
- `GET /api/reviews/{id}/` - Get review details
- `GET /api/reviews/my_reviews/` - Get reviews given by user
- `GET /api/reviews/received_reviews/` - Get reviews received by user
- `GET /api/reviews/user_rating/?user_id={id}` - Get average rating for user
- `DELETE /api/reviews/{id}/` - Delete review

## Authentication

Currently, the API uses token-based authentication. The token is stored in localStorage as `auth_token`.

To implement authentication:

1. Add login endpoint to backend
2. Store token in localStorage after login
3. API client automatically includes token in Authorization header

## Error Handling

The API client automatically handles common errors:

- 401 Unauthorized: Clears token and redirects to login
- 4xx/5xx errors: Logs error and throws exception

Example error handling:

```typescript
try {
  const resource = await apiClient.getResource('invalid-id');
} catch (error) {
  console.error('Failed to fetch resource:', error);
  // Handle error in UI
}
```

## Filtering and Searching

Most list endpoints support filtering and searching:

```typescript
// Filter by category and status
const resources = await apiClient.listResources({
  category: 'farm tools',
  status: 'Available'
});

// Search by title
const jobs = await apiClient.listJobs({
  search: 'tutoring'
});

// Order by date
const reviews = await apiClient.listReviews({
  ordering: '-created_at'
});
```

## Migration from Mock Data

To replace mock data with API calls:

1. Replace `INITIAL_USERS` with `apiClient.listUsers()`
2. Replace `INITIAL_RESOURCES` with `apiClient.listResources()`
3. Replace `INITIAL_JOBS` with `apiClient.listJobs()`
4. Replace `INITIAL_REQUESTS` with `apiClient.getMyBorrowRequests()` and `apiClient.getReceivedBorrowRequests()`
5. Replace `INITIAL_REVIEWS` with `apiClient.listReviews()`

Example:

```typescript
// Before (mock data)
const [resources, setResources] = useState<ResourceItem[]>(() => {
  const saved = localStorage.getItem('bcrss_resources');
  return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
});

// After (API data)
const [resources, setResources] = useState<ResourceItem[]>([]);

useEffect(() => {
  const loadResources = async () => {
    try {
      const data = await apiClient.listResources();
      setResources(data.results);
    } catch (error) {
      console.error('Failed to load resources:', error);
    }
  };
  loadResources();
}, []);
```

## CORS Configuration

The backend is configured with CORS to allow requests from the frontend. If you encounter CORS errors:

1. Verify `CORS_ALLOWED_ORIGINS` in `bcrss_config/settings.py`
2. Add your frontend URL to the allowed origins list
3. Restart the backend server

## Troubleshooting

### API Connection Failed

- Verify backend is running: `python manage.py runserver`
- Check `VITE_API_URL` in `.env.local`
- Check browser console for detailed error messages

### 401 Unauthorized Errors

- Ensure authentication is implemented
- Verify token is being sent in Authorization header
- Check token expiration

### CORS Errors

- Add frontend URL to `CORS_ALLOWED_ORIGINS` in settings.py
- Verify backend is running on correct port
- Clear browser cache and restart

## Next Steps

1. Implement user authentication (login/register)
2. Update React components to use API client
3. Replace mock data with API calls
4. Add loading states and error handling
5. Test end-to-end integration
