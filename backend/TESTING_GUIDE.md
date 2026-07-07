# BCRSS Frontend-Backend Integration Testing Guide

## Overview

This guide provides step-by-step instructions for testing the BCRSS application with the Django backend API. All features have been implemented and are ready for integration testing.

## Prerequisites

### Backend Setup
```bash
cd /path/to/BCRSS
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Create admin account
python manage.py runserver
```

### Frontend Setup
```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:8000`

## Testing Checklist

### 1. User Management

#### Test: Create User
- [ ] Navigate to admin panel at `http://localhost:8000/admin`
- [ ] Login with superuser credentials
- [ ] Create a new user with role "Member"
- [ ] Verify user appears in API response: `GET /api/users/`

#### Test: Promote to Admin
```bash
curl -X POST http://localhost:8000/api/users/{user_id}/promote_to_admin/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```
- [ ] User role changes from "Member" to "Admin"
- [ ] User can now access admin panel

#### Test: Demote to Member
```bash
curl -X POST http://localhost:8000/api/users/{user_id}/demote_to_member/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```
- [ ] User role changes from "Admin" to "Member"

### 2. Resource Listings

#### Test: Create Resource
```bash
curl -X POST http://localhost:8000/api/resources/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Farm Sprayer",
    "category": "farm tools",
    "condition": "Good",
    "description": "Portable hand sprayer for pesticides",
    "lending_type": "Borrowing",
    "location": "Baraton",
    "status": "Available",
    "image_code": "sprayer"
  }'
```
- [ ] Resource is created successfully
- [ ] Resource appears in listing with correct details
- [ ] Owner is set to current user

#### Test: List Resources with Filters
```bash
# All resources
curl http://localhost:8000/api/resources/

# Filter by category
curl "http://localhost:8000/api/resources/?category=farm%20tools"

# Filter by status
curl "http://localhost:8000/api/resources/?status=Available"

# Search by title
curl "http://localhost:8000/api/resources/?search=sprayer"
```
- [ ] Filtering works correctly
- [ ] Search returns relevant results
- [ ] Pagination works (if enabled)

#### Test: Update Resource
```bash
curl -X PUT http://localhost:8000/api/resources/{resource_id}/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Borrowed"
  }'
```
- [ ] Resource status updates
- [ ] Only owner can update their resource

#### Test: Delete Resource
```bash
curl -X DELETE http://localhost:8000/api/resources/{resource_id}/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Resource is deleted
- [ ] Resource no longer appears in listings
- [ ] Only owner or admin can delete

### 3. Job Opportunities

#### Test: Create Job
```bash
curl -X POST http://localhost:8000/api/jobs/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Farm Assistant Needed",
    "category": "Farm Work",
    "status": "Open",
    "description": "Need help with planting season",
    "location": "Baraton",
    "rate": "500 KES/day",
    "duration": "2 weeks",
    "contact_info": "+254712345678"
  }'
```
- [ ] Job is created successfully
- [ ] Job appears in listings
- [ ] Posted by is set to current user

#### Test: List Jobs with Filters
```bash
# All jobs
curl http://localhost:8000/api/jobs/

# Filter by category
curl "http://localhost:8000/api/jobs/?category=Farm%20Work"

# Filter by status
curl "http://localhost:8000/api/jobs/?status=Open"

# Search
curl "http://localhost:8000/api/jobs/?search=farm"
```
- [ ] Filtering works correctly
- [ ] Search returns relevant results

#### Test: Mark Job Filled
```bash
curl -X POST http://localhost:8000/api/jobs/{job_id}/mark_filled/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Job status changes to "Filled"
- [ ] Job no longer appears in "Open" listings

#### Test: Mark Job Open
```bash
curl -X POST http://localhost:8000/api/jobs/{job_id}/mark_open/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Job status changes to "Open"

### 4. Borrow Requests

#### Test: Create Borrow Request
```bash
curl -X POST http://localhost:8000/api/borrow-requests/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "item": {resource_id},
    "start_date": "2026-07-10",
    "end_date": "2026-07-15",
    "message": "I need this for my farm work"
  }'
```
- [ ] Borrow request is created
- [ ] Status is set to "Pending"
- [ ] Requester is set to current user

#### Test: Get My Requests
```bash
curl http://localhost:8000/api/borrow-requests/my_requests/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Returns only requests made by current user
- [ ] Includes all request details

#### Test: Get Received Requests
```bash
curl http://localhost:8000/api/borrow-requests/received_requests/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Returns only requests for current user's items
- [ ] Owner can see all pending requests

#### Test: Approve Request
```bash
curl -X POST http://localhost:8000/api/borrow-requests/{request_id}/approve/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Request status changes to "Approved"
- [ ] Associated resource status changes to "Borrowed"
- [ ] Only owner can approve

#### Test: Decline Request
```bash
curl -X POST http://localhost:8000/api/borrow-requests/{request_id}/decline/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Request status changes to "Declined"
- [ ] Resource remains "Available"

#### Test: Mark Returned
```bash
curl -X POST http://localhost:8000/api/borrow-requests/{request_id}/mark_returned/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Request status changes to "Returned"
- [ ] Associated resource status changes to "Available"

### 5. Reviews and Ratings

#### Test: Create Review
```bash
curl -X POST http://localhost:8000/api/reviews/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "target_user": {user_id},
    "rating": 5,
    "comment": "Excellent service!",
    "reviewer_role": "Lender"
  }'
```
- [ ] Review is created successfully
- [ ] Reviewer is set to current user
- [ ] Rating is between 1-5

#### Test: Get User Rating
```bash
curl "http://localhost:8000/api/reviews/user_rating/?user_id={user_id}"
```
- [ ] Returns average rating
- [ ] Returns number of reviews
- [ ] Calculation is correct

#### Test: Get My Reviews
```bash
curl http://localhost:8000/api/reviews/my_reviews/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Returns only reviews given by current user

#### Test: Get Received Reviews
```bash
curl http://localhost:8000/api/reviews/received_reviews/ \
  -H "Authorization: Bearer {token}"
```
- [ ] Returns only reviews about current user

### 6. Admin Panel

#### Test: View All Resources
- [ ] Admin can see all resources in system
- [ ] Can filter and search
- [ ] Can delete any resource

#### Test: View All Jobs
- [ ] Admin can see all job postings
- [ ] Can filter and search
- [ ] Can delete any job

#### Test: View All Users
- [ ] Admin can see all users
- [ ] Can promote/demote users
- [ ] Can view user statistics

#### Test: Moderate Content
- [ ] Admin can delete inappropriate resources
- [ ] Admin can delete inappropriate jobs
- [ ] Admin can delete inappropriate reviews

### 7. Frontend Integration

#### Test: Replace Mock Data
In `src/App.tsx`, replace mock data loading with API calls:

```typescript
// Before
const [resources, setResources] = useState<ResourceItem[]>(() => {
  const saved = localStorage.getItem('bcrss_resources');
  return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
});

// After
const [resources, setResources] = useState<ResourceItem[]>([]);

useEffect(() => {
  const loadResources = async () => {
    try {
      const data = await apiClient.listResources();
      setResources(data.results || data);
    } catch (error) {
      console.error('Failed to load resources:', error);
    }
  };
  loadResources();
}, []);
```

#### Test: Create Resource from UI
- [ ] User fills out "Share Resource" form
- [ ] Form data is sent to API
- [ ] Resource appears in listing
- [ ] Success message is shown

#### Test: Borrow Request Flow
- [ ] User clicks "Borrow" on resource
- [ ] Modal opens with date picker
- [ ] User submits request
- [ ] Request appears in dashboard
- [ ] Owner receives notification

#### Test: Job Application
- [ ] User clicks "Apply" on job
- [ ] Modal opens with application form
- [ ] User submits application
- [ ] Confirmation message is shown

## Performance Testing

### Load Testing
```bash
# Test with 100 concurrent requests
ab -n 100 -c 10 http://localhost:8000/api/resources/
```

### Response Time
- [ ] List endpoints respond in < 500ms
- [ ] Create endpoints respond in < 1000ms
- [ ] Search/filter endpoints respond in < 500ms

## Error Handling Testing

### Test 401 Unauthorized
```bash
curl http://localhost:8000/api/resources/ \
  -H "Authorization: Bearer invalid-token"
```
- [ ] Returns 401 error
- [ ] Frontend redirects to login

### Test 403 Forbidden
```bash
# Try to approve request as non-owner
curl -X POST http://localhost:8000/api/borrow-requests/{request_id}/approve/ \
  -H "Authorization: Bearer {other_user_token}"
```
- [ ] Returns 403 error
- [ ] Error message is displayed

### Test 404 Not Found
```bash
curl http://localhost:8000/api/resources/invalid-id/
```
- [ ] Returns 404 error
- [ ] Graceful error handling

### Test Validation Errors
```bash
# Missing required field
curl -X POST http://localhost:8000/api/resources/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'
```
- [ ] Returns 400 with validation errors
- [ ] Error messages are clear

## Browser Testing

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG standards
- [ ] Forms have proper labels

## Security Testing

- [ ] SQL injection attempts are blocked
- [ ] XSS attempts are prevented
- [ ] CSRF protection is enabled
- [ ] Sensitive data is not logged
- [ ] Passwords are hashed

## Deployment Testing

### Local Deployment
- [ ] Backend runs without errors
- [ ] Frontend builds successfully
- [ ] API calls work correctly

### Production Deployment
- [ ] Environment variables are set correctly
- [ ] Database migrations run successfully
- [ ] Static files are served correctly
- [ ] CORS is configured properly

## Troubleshooting

### Common Issues

**CORS Error**
- Solution: Add frontend URL to `CORS_ALLOWED_ORIGINS` in settings.py

**401 Unauthorized**
- Solution: Ensure token is being sent in Authorization header

**Database Connection Error**
- Solution: Check `DATABASE_URL` and MySQL is running

**API Not Responding**
- Solution: Verify backend is running on port 8000

## Sign-Off

- [ ] All tests passed
- [ ] No critical bugs found
- [ ] Performance is acceptable
- [ ] Security vulnerabilities addressed
- [ ] Documentation is complete
- [ ] Ready for production deployment

## Next Steps

1. Update all React components to use API client
2. Implement proper authentication flow
3. Add loading states and error handling
4. Deploy to production
5. Monitor for issues
