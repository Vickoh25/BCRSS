/**
 * BCRSS - API Client
 * Handles all HTTP requests to the Django REST API
 */

const DEFAULT_REMOTE_API_BASE_URL = 'https://bcrss-backend.onrender.com/api';
const API_BASE_URL = (() => {
  if (window.BCRSS_API_BASE_URL) return window.BCRSS_API_BASE_URL;
  const { hostname, origin } = window.location;
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';
  // For local testing, use port 8000
  return isLocalHost ? 'http://localhost:8000/api' : DEFAULT_REMOTE_API_BASE_URL;
})();
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
      requesterId: req.requester ? req.requester.id : null,
      requesterName: req.requester ? (req.requester.first_name ? `${req.requester.first_name} ${req.requester.last_name}` : req.requester.username) : 'Unknown',
      requesterContact: req.requester ? req.requester.contact : '',
      ownerId: req.owner ? req.owner.id : null,
      startDate: req.start_date,
      endDate: req.end_date,
      requestDate: req.request_date || req.created_at
    };
  }

  mapJobApplication(app) {
    if (!app) return null;
    const applicant = this.mapUser(app.applicant);
    const job = this.mapJob(app.job);
    return {
      ...app,
      job,
      jobId: job ? job.id : null,
      jobTitle: job ? job.title : 'Deleted Job',
      employerId: job ? job.postedById : null,
      employerName: job ? job.postedBy : 'Unknown',
      applicantId: applicant ? applicant.id : null,
      applicantName: applicant ? applicant.name : 'Unknown',
      applicantContact: applicant ? (applicant.contact || applicant.email) : '',
      appliedAt: app.applied_at
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
        // Build a human-readable message from DRF error format
        let errMsg = errBody.detail || errBody.error || errBody.non_field_errors?.join(', ') || '';
        if (!errMsg) {
          // DRF field errors: { "username": ["already exists"], "email": ["invalid"] }
          const fieldErrors = [];
          for (const [field, msgs] of Object.entries(errBody)) {
            if (Array.isArray(msgs)) {
              fieldErrors.push(`${field}: ${msgs.join(', ')}`);
            } else if (typeof msgs === 'string') {
              fieldErrors.push(`${field}: ${msgs}`);
            }
          }
          errMsg = fieldErrors.length > 0 ? fieldErrors.join('; ') : response.statusText;
        }
        throw new Error(`API Error ${response.status}: ${errMsg}`);
      }
      if (response.status === 204) return {};
      return await response.json();
    } catch (error) {
      if (error.message.startsWith('API Error')) throw error;
      console.error(`Request failed for ${endpoint}:`, error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error(`Network error for ${endpoint}. The backend may be starting up or unreachable.`);
      }
      if (error.name === 'TypeError' && error.message.includes('ERR_NAME_NOT_RESOLVED')) {
        throw new Error('Backend server is unreachable. It may be restarting on Render (free tier sleeps after inactivity).');
      }
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
    const res = await this.request('/auth/login/', { 
      method: 'POST', 
      body: { username, password } 
    });
  
    // Check both formats - nested and flat
    const accessToken = res.tokens?.access || res.access;
    const refreshToken = res.tokens?.refresh || res.refresh;
  
    if (accessToken) {
      this.token = accessToken;
      localStorage.setItem('auth_token', accessToken);
      console.log('✅ Token saved:', accessToken.substring(0, 20) + '...');
    }
  
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  
    if (!accessToken) {
      throw new Error('No access token in login response');
    }
  
    return res;
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
  async applyForJob(id, data) {
    const app = await this.request(`/jobs/${id}/apply/`, { method: 'POST', body: data });
    return this.mapJobApplication(app);
  }
  async getMyJobApplications() {
    const apps = await this.request('/jobs/my_applications/');
    return apps.map(app => this.mapJobApplication(app));
  }
  async getReceivedJobApplications() {
    const apps = await this.request('/jobs/received_applications/');
    return apps.map(app => this.mapJobApplication(app));
  }

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
  sendBorrowRequestReminder(id) { return this.request(`/borrow-requests/${id}/send_reminder/`, { method: 'POST' }); }
  raiseDispute(id, message) { return this.request(`/borrow-requests/${id}/raise_dispute/`, { method: 'POST', body: { message } }); }
  resolveDispute(id, status) { return this.request(`/borrow-requests/${id}/resolve_dispute/`, { method: 'POST', body: { status } }); }
  getAnalytics() { return this.request('/users/get_analytics/'); }

  async downloadReport() {
    const url = `${this.baseURL}/users/download_report/`;
    const makeRequest = () => fetch(url, { method: 'GET', headers: this.getHeaders() });

    try {
      let response = await makeRequest();

      if (response.status === 401 && this.token) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          response = await makeRequest();
        } else {
          throw new Error('Session expired. Please log in again.');
        }
      }

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.includes('application/json')) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.detail || errBody.error || 'Failed to download report');
        }
        throw new Error(`Failed to download report (${response.status})`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;

      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'BCRSS_Report.pdf';
      if (contentDisposition && contentDisposition.indexOf('filename=') !== -1) {
        filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Report download failed:', error);
      throw error;
    }
  }

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

  // ========== PASSWORD RESET ==========
  confirmPasswordReset(uidb64, token, newPassword, newPasswordConfirm) {
    return this.request('/auth/password_reset_confirm/', {
      method: 'POST',
      body: {
        uidb64,
        token,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      }
    });
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
