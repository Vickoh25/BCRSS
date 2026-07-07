/**
 * BCRSS - API Client
 * Handles all HTTP requests to the Django REST API
 */

const API_BASE_URL = 'http://localhost:8000/api';

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

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const headers = { ...this.getHeaders(), ...options.headers };
    const config = { method, headers };
    if (options.body) config.body = JSON.stringify(options.body);

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        if (response.status === 401) {
          this.token = null;
          localStorage.removeItem('auth_token');
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      if (response.status === 204) return {};
      return await response.json();
    } catch (error) {
      console.error(`Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // ========== USERS ==========
  getMe() { return this.request('/users/me/'); }
  getUser(id) { return this.request(`/users/${id}/`); }
  listUsers() { return this.request('/users/'); }
  promoteToAdmin(userId) { return this.request(`/users/${userId}/promote_to_admin/`, { method: 'POST' }); }
  demoteToMember(userId) { return this.request(`/users/${userId}/demote_to_member/`, { method: 'POST' }); }

  // ========== RESOURCES ==========
  listResources(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    return this.request(`/resources/?${query}`);
  }
  getResource(id) { return this.request(`/resources/${id}/`); }
  createResource(data) { return this.request('/resources/', { method: 'POST', body: data }); }
  updateResource(id, data) { return this.request(`/resources/${id}/`, { method: 'PUT', body: data }); }
  deleteResource(id) { return this.request(`/resources/${id}/`, { method: 'DELETE' }); }
  getMyResources() { return this.request('/resources/my_resources/'); }
  markResourceBorrowed(id) { return this.request(`/resources/${id}/mark_borrowed/`, { method: 'POST' }); }
  markResourceAvailable(id) { return this.request(`/resources/${id}/mark_available/`, { method: 'POST' }); }

  // ========== JOBS ==========
  listJobs(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    return this.request(`/jobs/?${query}`);
  }
  getJob(id) { return this.request(`/jobs/${id}/`); }
  createJob(data) { return this.request('/jobs/', { method: 'POST', body: data }); }
  updateJob(id, data) { return this.request(`/jobs/${id}/`, { method: 'PUT', body: data }); }
  deleteJob(id) { return this.request(`/jobs/${id}/`, { method: 'DELETE' }); }
  getMyJobs() { return this.request('/jobs/my_jobs/'); }
  markJobFilled(id) { return this.request(`/jobs/${id}/mark_filled/`, { method: 'POST' }); }
  markJobOpen(id) { return this.request(`/jobs/${id}/mark_open/`, { method: 'POST' }); }

  // ========== BORROW REQUESTS ==========
  listBorrowRequests(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    return this.request(`/borrow-requests/?${query}`);
  }
  getBorrowRequest(id) { return this.request(`/borrow-requests/${id}/`); }
  createBorrowRequest(data) { return this.request('/borrow-requests/', { method: 'POST', body: data }); }
  getMyBorrowRequests() { return this.request('/borrow-requests/my_requests/'); }
  getReceivedBorrowRequests() { return this.request('/borrow-requests/received_requests/'); }
  approveBorrowRequest(id) { return this.request(`/borrow-requests/${id}/approve/`, { method: 'POST' }); }
  declineBorrowRequest(id) { return this.request(`/borrow-requests/${id}/decline/`, { method: 'POST' }); }
  markBorrowRequestReturned(id) { return this.request(`/borrow-requests/${id}/mark_returned/`, { method: 'POST' }); }

  // ========== REVIEWS ==========
  listReviews(filters) {
    const query = filters ? new URLSearchParams(filters).toString() : '';
    return this.request(`/reviews/?${query}`);
  }
  getReview(id) { return this.request(`/reviews/${id}/`); }
  createReview(data) { return this.request('/reviews/', { method: 'POST', body: data }); }
  getMyReviews() { return this.request('/reviews/my_reviews/'); }
  getReceivedReviews() { return this.request('/reviews/received_reviews/'); }
  getUserRating(userId) { return this.request(`/reviews/user_rating/?user_id=${userId}`); }
  deleteReview(id) { return this.request(`/reviews/${id}/`, { method: 'DELETE' }); }
}

const apiClient = new APIClient();
