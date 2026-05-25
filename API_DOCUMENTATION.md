# Cretivox API Documentation

## 📋 Overview

**Project Type:** Next.js Portfolio Website (Frontend-only)  
**Environment:** Production & Development  
**Base URLs:**
- **Production:** `https://api.cretivox.dev` (configured)
- **Development:** `https://dummyjson.com` (testing)

---

## 🔐 Authentication API

### Overview
Currently, the Cretivox project uses **DummyJSON API** for authentication testing. This is configured via environment variables and can be swapped to your actual backend API.

### Environment Configuration

**File:** `.env.local`

```env
# API Configuration
NEXT_PUBLIC_CRETIVOX_API_URL=https://api.cretivox.dev/auth/login
# (Currently uses https://dummyjson.com/user/login for development)

# Test Credentials (DummyJSON)
# Username: emilys / Password: emilyspass
# Username: michaelw / Password: michaelwpass
# Username: sophiab / Password: sophiabpass
```

---

## 🔑 Authentication Endpoints

### POST `/user/login` or `/auth/login`

**Description:** Authenticate user and retrieve access token

**Endpoint:** 
```
POST https://dummyjson.com/user/login
POST https://api.cretivox.dev/auth/login (Production)
```

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "emilys",
  "password": "emilyspass"
}
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "username": "emilys",
  "email": "emily@example.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "gender": "female",
  "image": "https://dummyjson.com/icon/emilys/128",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 60
}
```

**Error Response (400/401):**
```json
{
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**Status Codes:**
| Code | Meaning |
|------|---------|
| `200` | Login successful, token returned |
| `400` | Bad request (missing fields) |
| `401` | Invalid credentials |
| `500` | Server error |

**Token Storage:**
- **Local Storage Key:** `cretivox_contact_token`
- **Token Type:** JWT (Bearer Token)
- **Expiration:** `expiresIn` value in response (seconds)

---

## 🔗 Integration Points

### 1. Login Modal Component
**File:** `components/ui/LoginModal.tsx`

**Functionality:**
- Handles user login
- Stores token in localStorage
- Unlocks Secret Projects section
- Enables email contact feature

**Implementation:**
```typescript
// Login request
const response = await fetch(
  process.env.NEXT_PUBLIC_CRETIVOX_API_URL,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }
);

// Store token
localStorage.setItem('cretivox_contact_token', response.accessToken);
```

### 2. Gated Content
**Files:**
- `components/sections/SecretProjects.tsx` - Locked projects (requires login)
- `components/sections/Contact.tsx` - Email contact (requires login)

**Token Verification:**
```typescript
// Check token in localStorage
const token = localStorage.getItem('cretivox_contact_token');
const isAuthenticated = !!token;
```

---

## 📱 Frontend API Usage

### Current Implementation

**Authentication Flow:**
```
User → LoginModal → POST /user/login → Token → localStorage → Access Gated Content
```

**Request/Response Handling:**
```typescript
// Example from LoginModal.tsx
try {
  const response = await fetch('https://dummyjson.com/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const data = await response.json();
    // Store token
    localStorage.setItem('cretivox_contact_token', data.accessToken);
    // Unlock content
    setIsAuthenticated(true);
  } else {
    // Handle error
    console.error('Login failed');
  }
} catch (error) {
  console.error('Network error:', error);
}
```

---

## 🚀 Suggested Backend API Structure

When implementing your own backend API (`https://api.cretivox.dev`), consider these endpoints:

### Authentication Endpoints

#### POST `/auth/login`
Login user with credentials
```json
Request:  { "username": "string", "password": "string" }
Response: { "accessToken": "string", "refreshToken": "string", "user": {...}, "expiresIn": "number" }
```

#### POST `/auth/refresh`
Refresh expired token
```json
Request:  { "refreshToken": "string" }
Response: { "accessToken": "string", "expiresIn": "number" }
```

#### POST `/auth/logout`
Logout user (invalidate token)
```json
Request:  { "token": "string" }
Response: { "message": "Logged out successfully" }
```

### User Endpoints

#### GET `/user/profile`
Get authenticated user profile
```json
Request Headers: Authorization: Bearer {token}
Response: { "id": "string", "username": "string", "email": "string", ... }
```

#### PUT `/user/profile`
Update user profile
```json
Request:  { "firstName": "string", "lastName": "string", ... }
Response: { "message": "Profile updated", "user": {...} }
```

### Projects Endpoints

#### GET `/projects/public`
Get all public projects
```json
Response: [
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "image": "string",
    "link": "string",
    "tags": ["string"]
  }
]
```

#### GET `/projects/secret`
Get secret/private projects (requires auth)
```json
Request Headers: Authorization: Bearer {token}
Response: [{ ...project data }]
```

### Contact Endpoints

#### POST `/contact/message`
Send contact form message
```json
Request: {
  "name": "string",
  "email": "string",
  "message": "string"
}
Response: { "message": "Message sent successfully", "id": "string" }
```

---

## 🔄 Token Management

### JWT Token Structure
Tokens are JWT format with Bearer authentication

**Usage in Requests:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Expiration Handling
- **Store:** Token expiration time (`expiresIn` seconds)
- **Check:** Before API calls, verify token hasn't expired
- **Refresh:** Call `/auth/refresh` endpoint with `refreshToken` when expired
- **Clear:** Remove token from localStorage on logout

**Example Implementation:**
```typescript
const isTokenExpired = () => {
  const token = localStorage.getItem('cretivox_contact_token');
  const expiresIn = localStorage.getItem('cretivox_token_expires');
  
  if (!token || !expiresIn) return true;
  
  return Date.now() > parseInt(expiresIn);
};
```

---

## 🧪 Testing

### Test Credentials (DummyJSON)
```
Username: emilys
Password: emilyspass
---
Username: michaelw
Password: michaelwpass
---
Username: sophiab
Password: sophiabpass
```

### cURL Examples

**Login Request:**
```bash
curl -X POST https://dummyjson.com/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "emilys",
    "password": "emilyspass"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "username": "emilys",
  "email": "emily@example.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "gender": "female",
  "image": "https://dummyjson.com/icon/emilys/128",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 60
}
```

---

## 📦 Dependencies

**API-Related Packages:**
- `next` (16.2.6) - Framework
- `react` (19.2.4) - UI Library
- Built-in `fetch` API (no external HTTP client needed)

**Note:** The project uses native `fetch` API for HTTP requests. No external libraries like axios are installed.

---

## 🛡️ Security Best Practices

### ✅ Implemented
- ✅ Token stored in localStorage
- ✅ POST requests for sensitive operations
- ✅ JSON headers on API calls
- ✅ Error handling for network failures

### 🔐 Recommended for Production
- 🔒 Use HTTPS only (enforce)
- 🔒 Store sensitive tokens in httpOnly cookies
- 🔒 Implement CORS properly on backend
- 🔒 Add request signing/verification
- 🔒 Rate limiting on login endpoint
- 🔒 Password hashing with bcrypt/argon2 on backend
- 🔒 Implement refresh token rotation
- 🔒 Add multi-factor authentication (MFA)

---

## 🐛 Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid credentials | Verify username/password |
| `400 Bad Request` | Missing fields | Include both username and password |
| `Network Error` | API unreachable | Check API URL, internet connection |
| `Token Expired` | Token passed expiration | Request new token with refresh endpoint |

### Implementation Pattern
```typescript
try {
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error(`Error ${response.status}:`, error.message);
    // Handle specific error codes
    if (response.status === 401) {
      // Clear token and redirect to login
    }
  }
} catch (error) {
  console.error('Network error:', error);
  // Show user-friendly message
}
```

---

## 📞 Contact & Support

For API integration issues:
- **Email:** contact@cretivox.dev (via Contact section)
- **GitHub:** [Your GitHub](https://github.com)
- **LinkedIn:** [Your LinkedIn](https://linkedin.com)

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | May 2026 | Initial API documentation for DummyJSON integration |

---

**Last Updated:** May 25, 2026  
**Project:** Cretivox Portfolio  
**Created for:** Muhammad Dhiya Ulhaq
