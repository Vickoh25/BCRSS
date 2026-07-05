/**
 * API Client for BCRSS Backend
 * Handles all HTTP requests to the Django REST API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

class APIClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken() {
    this.token = localStorage.getItem('auth_token');
  }

  private saveToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const headers = { ...this.getHeaders(), ...options.headers };

    const config: RequestInit = {
      method,
      headers,
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.token = null;
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // ==================== USERS ====================

  async getMe() {
    return this.request('/users/me/');
  }

  async getUser(id: string) {
    return this.request(`/users/${id}/`);
  }

  async listUsers() {
    return this.request('/users/');
  }

  async promoteToAdmin(userId: string) {
    return this.request(`/users/${userId}/promote_to_admin/`, { method: 'POST' });
  }

  async demoteToMember(userId: string) {
    return this.request(`/users/${userId}/demote_to_member/`, { method: 'POST' });
  }

  // ==================== RESOURCES ====================

  async listResources(filters?: Record<string, any>) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/resources/?${query}`);
  }

  async getResource(id: string) {
    return this.request(`/resources/${id}/`);
  }

  async createResource(data: any) {
    return this.request('/resources/', { method: 'POST', body: data });
  }

  async updateResource(id: string, data: any) {
    return this.request(`/resources/${id}/`, { method: 'PUT', body: data });
  }

  async deleteResource(id: string) {
    return this.request(`/resources/${id}/`, { method: 'DELETE' });
  }

  async getMyResources() {
    return this.request('/resources/my_resources/');
  }

  async markResourceBorrowed(id: string) {
    return this.request(`/resources/${id}/mark_borrowed/`, { method: 'POST' });
  }

  async markResourceAvailable(id: string) {
    return this.request(`/resources/${id}/mark_available/`, { method: 'POST' });
  }

  // ==================== JOBS ====================

  async listJobs(filters?: Record<string, any>) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/jobs/?${query}`);
  }

  async getJob(id: string) {
    return this.request(`/jobs/${id}/`);
  }

  async createJob(data: any) {
    return this.request('/jobs/', { method: 'POST', body: data });
  }

  async updateJob(id: string, data: any) {
    return this.request(`/jobs/${id}/`, { method: 'PUT', body: data });
  }

  async deleteJob(id: string) {
    return this.request(`/jobs/${id}/`, { method: 'DELETE' });
  }

  async getMyJobs() {
    return this.request('/jobs/my_jobs/');
  }

  async markJobFilled(id: string) {
    return this.request(`/jobs/${id}/mark_filled/`, { method: 'POST' });
  }

  async markJobOpen(id: string) {
    return this.request(`/jobs/${id}/mark_open/`, { method: 'POST' });
  }

  // ==================== BORROW REQUESTS ====================

  async listBorrowRequests(filters?: Record<string, any>) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/borrow-requests/?${query}`);
  }

  async getBorrowRequest(id: string) {
    return this.request(`/borrow-requests/${id}/`);
  }

  async createBorrowRequest(data: any) {
    return this.request('/borrow-requests/', { method: 'POST', body: data });
  }

  async getMyBorrowRequests() {
    return this.request('/borrow-requests/my_requests/');
  }

  async getReceivedBorrowRequests() {
    return this.request('/borrow-requests/received_requests/');
  }

  async approveBorrowRequest(id: string) {
    return this.request(`/borrow-requests/${id}/approve/`, { method: 'POST' });
  }

  async declineBorrowRequest(id: string) {
    return this.request(`/borrow-requests/${id}/decline/`, { method: 'POST' });
  }

  async markBorrowRequestReturned(id: string) {
    return this.request(`/borrow-requests/${id}/mark_returned/`, { method: 'POST' });
  }

  // ==================== REVIEWS ====================

  async listReviews(filters?: Record<string, any>) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/reviews/?${query}`);
  }

  async getReview(id: string) {
    return this.request(`/reviews/${id}/`);
  }

  async createReview(data: any) {
    return this.request('/reviews/', { method: 'POST', body: data });
  }

  async getMyReviews() {
    return this.request('/reviews/my_reviews/');
  }

  async getReceivedReviews() {
    return this.request('/reviews/received_reviews/');
  }

  async getUserRating(userId: string) {
    return this.request(`/reviews/user_rating/?user_id=${userId}`);
  }

  async deleteReview(id: string) {
    return this.request(`/reviews/${id}/`, { method: 'DELETE' });
  }
}

export const apiClient = new APIClient();
