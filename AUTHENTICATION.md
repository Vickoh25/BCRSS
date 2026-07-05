# BCRSS Authentication Documentation

## Overview

The BCRSS backend implements JWT (JSON Web Token) based authentication using `djangorestframework-simplejwt`. This provides secure, stateless authentication for all API endpoints.

## Authentication Features

- ✅ User registration with email validation
- ✅ User login with JWT tokens
- ✅ Token refresh mechanism
- ✅ Password change functionality
- ✅ Profile update
- ✅ Role-based access control (Member/Admin)
- ✅ Automatic token expiration and refresh

## Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register/`

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "password_confirm": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "location": "Baraton",
  "contact": "+254712345678"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 2,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "Member",
    "location": "Baraton",
    "contact": "+254712345678",
    "avatar_color": "bg-emerald-600 text-white",
    "bio": null,
    "created_at": "2026-07-05T18:00:00Z",
    "updated_at": "2026-07-05T18:00:00Z"
  },
  "tokens": {
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User

**Endpoint:** `POST /api/auth/login/`

**Request:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 2,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "Member",
    "first_name": "John",
    "last_name": "Doe",
    "location": "Baraton",
    "contact": "+254712345678",
    "avatar_color": "bg-emerald-600 text-white",
    "bio": null
  },
  "tokens": {
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User

**Endpoint:** `GET /api/auth/me/`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 2,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "Member",
  "location": "Baraton",
  "contact": "+254712345678",
  "avatar_color": "bg-emerald-600 text-white",
  "bio": null,
  "resources_count": 3,
  "jobs_count": 1,
  "reviews_count": 2,
  "created_at": "2026-07-05T18:00:00Z",
  "updated_at": "2026-07-05T18:00:00Z"
}
```

### 4. Logout User

**Endpoint:** `POST /api/auth/logout/`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "refresh": "<refresh_token>"
}
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

### 5. Change Password

**Endpoint:** `POST /api/auth/change_password/`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "old_password": "securepassword123",
  "new_password": "newsecurepassword456",
  "new_password_confirm": "newsecurepassword456"
}
```

**Response (200 OK):**
```json
{
  "message": "Password changed successfully"
}
```

### 6. Update Profile

**Endpoint:** `PUT /api/auth/update_profile/` or `PATCH /api/auth/update_profile/`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "newemail@example.com",
  "location": "Nairobi",
  "contact": "+254712345679",
  "avatar_color": "bg-blue-600 text-white",
  "bio": "I love sharing resources"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 2,
    "username": "john_doe",
    "email": "newemail@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "Member",
    "location": "Nairobi",
    "contact": "+254712345679",
    "avatar_color": "bg-blue-600 text-white",
    "bio": "I love sharing resources",
    "resources_count": 3,
    "jobs_count": 1,
    "reviews_count": 2,
    "created_at": "2026-07-05T18:00:00Z",
    "updated_at": "2026-07-05T18:00:00Z"
  }
}
```

### 7. Refresh Access Token

**Endpoint:** `POST /api/auth/refresh_token/`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "refresh": "<refresh_token>"
}
```

**Response (200 OK):**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## JWT Token Details

### Token Lifetime

- **Access Token**: 1 hour
- **Refresh Token**: 7 days

### Token Structure

Each JWT token contains the following claims:

```json
{
  "token_type": "access",
  "exp": 1234567890,
  "iat": 1234567800,
  "jti": "unique-token-id",
  "user_id": 2,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "Member"
}
```

## Using Tokens in Requests

All authenticated endpoints require the `Authorization` header with the access token:

```bash
curl -H "Authorization: Bearer <access_token>" http://localhost:8000/api/resources/
```

## Error Responses

### Invalid Credentials (401)
```json
{
  "detail": "Invalid credentials."
}
```

### Token Expired (401)
```json
{
  "detail": "Token is invalid or expired"
}
```

### Missing Authorization Header (401)
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### Permission Denied (403)
```json
{
  "detail": "You do not have permission to perform this action."
}
```

## Token Refresh Flow

1. User logs in and receives `access` and `refresh` tokens
2. User makes API requests with `access` token
3. When `access` token expires (1 hour), use `refresh` token to get a new `access` token
4. Call `POST /api/auth/refresh_token/` with the `refresh` token
5. Receive a new `access` token and continue making requests

## Security Best Practices

1. **Store tokens securely**
   - Access token: Store in memory or secure HTTP-only cookie
   - Refresh token: Store in secure HTTP-only cookie or secure storage

2. **Never expose tokens**
   - Don't log tokens
   - Don't send tokens in URLs
   - Don't commit tokens to version control

3. **Use HTTPS**
   - Always use HTTPS in production
   - Never send tokens over HTTP

4. **Token rotation**
   - Refresh tokens are automatically rotated on use
   - Old tokens are invalidated

5. **CORS configuration**
   - Frontend must be in allowed origins
   - Credentials must be included in requests

## Frontend Integration Example

### JavaScript/React

```javascript
// Login
const response = await fetch('http://localhost:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    password: 'securepassword123'
  })
});

const data = await response.json();
localStorage.setItem('access_token', data.tokens.access);
localStorage.setItem('refresh_token', data.tokens.refresh);

// Make authenticated request
const resourceResponse = await fetch('http://localhost:8000/api/resources/', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
});

// Refresh token
const refreshResponse = await fetch('http://localhost:8000/api/auth/refresh_token/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    refresh: localStorage.getItem('refresh_token')
  })
});

const refreshData = await refreshResponse.json();
localStorage.setItem('access_token', refreshData.access);
```

## Admin Endpoints

### Promote User to Admin

**Endpoint:** `POST /api/users/{user_id}/promote_to_admin/`

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Response (200 OK):**
```json
{
  "id": 2,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "Admin",
  ...
}
```

### Demote Admin to Member

**Endpoint:** `POST /api/users/{user_id}/demote_to_member/`

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Response (200 OK):**
```json
{
  "id": 2,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "Member",
  ...
}
```

## Testing Authentication

### Using cURL

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'

# Get current user
curl -H "Authorization: Bearer <access_token>" \
  http://localhost:8000/api/auth/me/

# Make authenticated request
curl -H "Authorization: Bearer <access_token>" \
  http://localhost:8000/api/resources/
```

## Troubleshooting

### Token Not Working

1. Check token expiration: `exp` claim in token
2. Verify token format: `Bearer <token>` in Authorization header
3. Check CORS configuration if frontend is on different domain
4. Verify user still exists in database

### Invalid Credentials

1. Check username/email spelling
2. Verify password is correct
3. Ensure user account is active
4. Check user role permissions for admin endpoints

### Token Expired

1. Use refresh token to get new access token
2. Call `POST /api/auth/refresh_token/`
3. Update access token in client storage

## Conclusion

The BCRSS authentication system provides secure, industry-standard JWT-based authentication with comprehensive user management features. Follow the security best practices and integration examples to build a secure application.
