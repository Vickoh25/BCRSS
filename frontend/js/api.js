/**
 * BCRSS - API Client
 * Handles all HTTP requests to the Django REST API
 */

const API_BASE_URL = 'https://bcrss-backend.onrender.com/api';

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Helper to map backend user to frontend shape
  mapUser(u) {
    if (!u) return null;
    return {
      id: u.id,
      name: u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : u.username,
      email: u.email,
      role: u.role || 'Member',
      location: u.location || '',
      contact: u.contact || '',
      avatarColor: u.avatar_color || '#3f51b5',
      bio: u.bio || '',
      username: u.username
    };
  }

  // Helper to map backend job to frontend shape
  mapJob(j) {
    if (!j) return null;
    return {
      ...j,
      postedBy: j.posted_by ? (j.posted_by.first_name ? `${j.posted_by.first_name} ${j.posted_by.last_name}` : j.posted_by.username) : 'Unknown',
      postedById: j.posted_by ? j.posted_by.id : null,
      postedDate: j.posted_date || j.created_at,
      contactInfo: j.contact_info
    };
  }

  // Helper to map backend resource to frontend shape
  mapResource(r) {
    if (!r) return null;
    return {
      ...r,
      ownerId: r.owner ? r.owner.id : null,
      ownerName: r.owner ? (r.owner.first_name ? `${r.owner.first_name} ${r.owner.last_name}` : r.owner.username) : 'Unknown',
      ownerContact: r.owner ? r.owner.contact : '',
      listedDate: r.listed_date || r.created_at,
      imageCode: r.image_code || 'generic',
      lendingType: r.lending_type
    };
  }

  // Helper to map backend request to frontend shape
  mapRequest(req) {
    if (!req) return null;
    return {
      ...req,
      itemTitle: req.item ? req.item.title : 'Deleted Item',
      requesterName: req.requester ? (req.requester.first_name ? `${req.requester.first_name} ${req.requester.last_name}` : req.requester.username) : 'Unknown',
      requesterContact: req.requester ? req.requester.contact : '',
      ownerId: req.owner ? req.owner.id : null,
      startDate: req.start_date,
      endDate: req.end_date,
      requestDate: req.request_date || req.created_at
    };
  }

  async refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return false;
    try {
      const response = await fetch(`${this.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });
      if (!response.ok) {
        this.token = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        return false;
      }
      const data = await response.json();
      this.token = data.access;
      localStorage.setItem('auth_token', this.token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const headers = { ...this.getHeaders(), ...options.headers };
    const config = { method, headers };
    if (options.body) config.body = JSON.stringify(options.body);

    try {
      let response = await fetch(url, config);

      // Handle 401 with token refresh
      if (response.status === 401 && this.token && endpoint !== '/token/refresh/') {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          config.headers = { ...this.getHeaders(), ...options.headers };
          response = await fetch(url, config);
        } else {
          throw new Error('Session expired. Please log in again.');
        }
      }

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(`API Error ${response.status}: ${errBody.detail || errBody.non_field_errors?.join(', ') || response.statusText}`);
      }
      if (response.status === 204) return {};
      return await response.json();
    } catch (error) {
      if (error.message.startsWith('API Error')) throw error;
      console.error(`Request failed for ${endpoint}:`, error);
      throw new Error(`Network error for ${endpoint}. Is the backend running?`);
    }
  }

  // ========== AUTH ==========
  async register(data) {
    const res = await this.request('/auth/register/', { method: 'POST', body: data });
    if (res.tokens) {
      this.token = res.tokens.access;
      localStorage.setItem('auth_token', this.token);
      localStorage.setItem('refresh_token', res.tokens.refresh);
    }
    return res;
  }

  async login(username, password) {
    const res = await this.request('/auth/login/', { method: 'POST', body: { username, password } });
    if (res.tokens) {
      this.token = res.tokens.access;
      localStorage.setItem('auth_token', this.token);
      localStorage.setItem('refresh_token', res.tokens.refresh);
    }
    return res;
  }

  async verifyEmail(token, uid) {
    return await this.request('/auth/verify_email/', { method: 'POST', body: { token, uid } });
  }

  async logout() {
    const refreshToken = localStorage.getItem('refresh_token');
    await this.request('/auth/logout/', { method: 'POST', body: { refresh: refreshToken } });
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  // ========== USERS ==========
  async getMe() { 
    const u = await this.request('/auth/me/'); 
    return this.mapUser(u);
  }
  async getUser(id) { 
    const u = await this.request(`/users/${id}/`);
    return this.mapUser(u);
  }
  async listUsers() { 
    const data = await this.request('/users/admin_list/');
    const users = data.results || data;
    return users.map(u => this.mapUser(u));
  }
  promoteToAdmin(userId) { return this.request(`/users/${userId}/promote_to_admin/`, { method: 'POST' }); }
  demoteToMember(userId) { return this.request(`/users/${userId}/demote_to_member/`, { method: 'POST' }); }

  // ========== RESOURCES ==========
  async listResources(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    const items = await this.request(`/resources/?${query}`);
    return (items.results || items).map(r => this.mapResource(r));
  }
  async getResource(id) { 
    const r = await this.request(`/resources/${id}/`); 
    return this.mapResource(r);
  }
  createResource(data) { return this.request('/resources/', { method: 'POST', body: data }); }
  updateResource(id, data) { return this.request(`/resources/${id}/`, { method: 'PUT', body: data }); }
  deleteResource(id) { return this.request(`/resources/${id}/`, { method: 'DELETE' }); }
  async getMyResources() { 
    const items = await this.request('/resources/my_resources/'); 
    return items.map(r => this.mapResource(r));
  }
  markResourceBorrowed(id) { return this.request(`/resources/${id}/mark_borrowed/`, { method: 'POST' }); }
  markResourceAvailable(id) { return this.request(`/resources/${id}/mark_available/`, { method: 'POST' }); }

  // ========== JOBS ==========
  async listJobs(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    const jobs = await this.request(`/jobs/?${query}`);
    return (jobs.results || jobs).map(j => this.mapJob(j));
  }
  async getJob(id) { 
    const j = await this.request(`/jobs/${id}/`); 
    return this.mapJob(j);
  }
  createJob(data) { return this.request('/jobs/', { method: 'POST', body: data }); }
  updateJob(id, data) { return this.request(`/jobs/${id}/`, { method: 'PUT', body: data }); }
  deleteJob(id) { return this.request(`/jobs/${id}/`, { method: 'DELETE' }); }
  async getMyJobs() { 
    const jobs = await this.request('/jobs/my_jobs/'); 
    return jobs.map(j => this.mapJob(j));
  }
  markJobFilled(id) { return this.request(`/jobs/${id}/mark_filled/`, { method: 'POST' }); }
  markJobOpen(id) { return this.request(`/jobs/${id}/mark_open/`, { method: 'POST' }); }

  // ========== BORROW REQUESTS ==========
  async listBorrowRequests(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    const reqs = await this.request(`/borrow-requests/?${query}`);
    return (reqs.results || reqs).map(req => this.mapRequest(req));
  }
  async getBorrowRequest(id) { 
    const req = await this.request(`/borrow-requests/${id}/`); 
    return this.mapRequest(req);
  }
  createBorrowRequest(data) { return this.request('/borrow-requests/', { method: 'POST', body: data }); }
  async getMyBorrowRequests() { 
    const reqs = await this.request('/borrow-requests/my_requests/'); 
    return reqs.map(req => this.mapRequest(req));
  }
  async getReceivedBorrowRequests() { 
    const reqs = await this.request('/borrow-requests/received_requests/'); 
    return reqs.map(req => this.mapRequest(req));
  }
  approveBorrowRequest(id) { return this.request(`/borrow-requests/${id}/approve/`, { method: 'POST' }); }
  declineBorrowRequest(id) { return this.request(`/borrow-requests/${id}/decline/`, { method: 'POST' }); }
  markBorrowRequestReturned(id) { return this.request(`/borrow-requests/${id}/mark_returned/`, { method: 'POST' }); }

  // Helper to map backend review to frontend shape
  mapReview(rev) {
    if (!rev) return null;
    return {
      ...rev,
      reviewerName: rev.reviewer ? (rev.reviewer.first_name ? `${rev.reviewer.first_name} ${rev.reviewer.last_name}` : rev.reviewer.username) : 'Unknown',
      reviewerRole: rev.reviewer_role,
      date: rev.date || rev.created_at,
      targetName: rev.target_user ? (rev.target_user.first_name ? `${rev.target_user.first_name} ${rev.target_user.last_name}` : rev.target_user.username) : 'Unknown'
    };
  }

  // ========== REVIEWS ==========
  async listReviews(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    const reviews = await this.request(`/reviews/?${query}`);
    return (reviews.results || reviews).map(rev => this.mapReview(rev));
  }
  async getReview(id) { 
    const rev = await this.request(`/reviews/${id}/`); 
    return this.mapReview(rev);
  }
  createReview(data) { return this.request('/reviews/', { method: 'POST', body: data }); }
  async getMyReviews() { 
    const reviews = await this.request('/reviews/my_reviews/'); 
    return reviews.map(rev => this.mapReview(rev));
  }
  async getReceivedReviews() { 
    const reviews = await this.request('/reviews/received_reviews/'); 
    return reviews.map(rev => this.mapReview(rev));
  }
  getUserRating(userId) { return this.request(`/reviews/user_rating/?user_id=${userId}`); }
  deleteReview(id) { return this.request(`/reviews/${id}/`, { method: 'DELETE' }); }
}

const apiClient = new APIClient();
