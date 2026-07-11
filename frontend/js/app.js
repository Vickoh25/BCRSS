/**
 * BCRSS - Main Application
 * State management, routing, event handlers, and initialisation
 */

const APP = {
  // ==================== STATE ====================
  state: {
    // Data
    users: [],
    resources: [],
    jobs: [],
    requests: [],
    reviews: [],
    currentUser: null,

    // UI - Navigation
    currentTab: 'home',
    dashboardSubTab: 'requests',
    adminTab: 'resources',
    adminSearch: '',

    // UI - Filters
    resourceSearch: '',
    resourceCategory: 'All',
    resourceStatus: 'All',
    jobSearch: '',
    jobCategory: 'All',

    // UI - Dropdowns & Modals
    userDropdownOpen: false,
    mobileMenuOpen: false,
    activeModal: null,     // null, 'share', 'postJob', 'borrow', 'apply'
    borrowItemTarget: null,
    applyJobTarget: null,
  },

  // ==================== INITIALISATION ====================
  async init() {
    // Step 1: Clear stale localStorage data if no valid token
    if (!apiClient.token) {
      localStorage.removeItem('bcrss_current_user');
      localStorage.removeItem('bcrss_users');
      localStorage.removeItem('bcrss_resources');
      localStorage.removeItem('bcrss_jobs');
      localStorage.removeItem('bcrss_requests');
      localStorage.removeItem('bcrss_reviews');
      console.log('No auth token — cleared stale localStorage. Login/register to begin.');
    }

    // Step 2: Load what's left in storage (will be empty if token was missing)
    this.loadFromStorage();

    // Step 3: Fetch from API and handle auth
    await this.loadInitialData();

    // Step 4: Render
    this.render();
    this.bindGlobalEvents();
  },

  async loadInitialData() {
    const s = this.state;

    // Resolve current user from API if token exists (init already cleared stale storage)
    if (apiClient.token && !s.currentUser) {
      try {
        s.currentUser = await apiClient.getMe();
      } catch (e) {
        console.warn('Token invalid, clearing auth and starting fresh');
        apiClient.token = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        s.currentUser = null;
      }
    }

    // Fetch public data (resources + jobs) — these work without auth
    try {
      const [resources, jobs] = await Promise.all([
        apiClient.listResources(),
        apiClient.listJobs()
      ]);
      s.resources = resources;
      s.jobs = jobs;
    } catch (e) {
      console.warn('Public data fetch failed, using mock data');
      s.resources = BCRSS.INITIAL_RESOURCES;
      s.jobs = BCRSS.INITIAL_JOBS;
    }

    // If logged in, fetch personal data
    if (s.currentUser) {
      try {
        const [myReqs, recReqs] = await Promise.all([
          apiClient.getMyBorrowRequests(),
          apiClient.getReceivedBorrowRequests()
        ]);
        s.requests = [...myReqs, ...recReqs];
      } catch (e) {
        console.warn('Personal data fetch failed, requests will be empty');
        s.requests = [];
      }

      // Admin: fetch all users
      if (s.currentUser.role === 'Admin') {
        try {
          s.users = await apiClient.listUsers();
        } catch (e) {
          console.warn('User list fetch failed');
        }
      }
    }
  },

  loadFromStorage() {
    const s = this.state;
    try {
      const keys = ['bcrss_users', 'bcrss_current_user', 'bcrss_resources', 'bcrss_jobs', 'bcrss_requests', 'bcrss_reviews'];
      const [users, currentUser, resources, jobs, requests, reviews] = keys.map(k => {
        const saved = localStorage.getItem(k);
        return saved ? JSON.parse(saved) : null;
      });
      if (users) s.users = users;
      if (currentUser) s.currentUser = currentUser;
      if (resources) s.resources = resources;
      if (jobs) s.jobs = jobs;
      if (requests) s.requests = requests;
      if (reviews) s.reviews = reviews;
    } catch (e) {
      console.warn('Failed to load from localStorage:', e);
    }
  },

  saveToStorage() {
    const s = this.state;
    try {
      localStorage.setItem('bcrss_users', JSON.stringify(s.users));
      localStorage.setItem('bcrss_current_user', JSON.stringify(s.currentUser));
      localStorage.setItem('bcrss_resources', JSON.stringify(s.resources));
      localStorage.setItem('bcrss_jobs', JSON.stringify(s.jobs));
      localStorage.setItem('bcrss_requests', JSON.stringify(s.requests));
      localStorage.setItem('bcrss_reviews', JSON.stringify(s.reviews));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  },

  // ==================== RENDERING ====================
  render() {
    const app = document.getElementById('app');
    const s = this.state;

    let html = '';

    // Header
    html += renderHeader(s);

    // Main Content
    html += '<main class="flex-1">';
    if (s.currentTab === 'home') {
      html += renderHomePage(s);
    } else if (s.currentTab === 'resources') {
      html += renderResourcesPage(s);
    } else if (s.currentTab === 'jobs') {
      html += renderJobsPage(s);
    } else if (s.currentTab === 'dashboard') {
      html += renderDashboardPage(s);
    } else if (s.currentTab === 'admin') {
      html += renderAdminPage(s);
    }
    html += '</main>';

    app.innerHTML = html;

    // Render dropdown inside its container after header is mounted
    const dropdownContainer = document.getElementById('user-dropdown-menu');
    if (dropdownContainer) {
      dropdownContainer.innerHTML = renderUserDropdown(s);
    }

    // Render mobile drawer
    const drawerContainer = document.getElementById('mobile-drawer');
    if (drawerContainer) {
      drawerContainer.innerHTML = s.mobileMenuOpen ? renderMobileDrawer(s) : '';
    }

    // Render modals
    this.renderModals();

    this.saveToStorage();
  },

  renderModals() {
    const container = document.getElementById('modal-container');
    if (!container) return;
    const s = this.state;

    if (s.activeModal === 'share') {
      container.innerHTML = renderShareModal(s);
    } else if (s.activeModal === 'postJob') {
      container.innerHTML = renderPostJobModal(s);
    } else if (s.activeModal === 'borrow' && s.borrowItemTarget) {
      container.innerHTML = renderBorrowModal(s);
    } else if (s.activeModal === 'apply' && s.applyJobTarget) {
      container.innerHTML = renderApplyModal(s);
    } else if (s.activeModal === 'login') {
      container.innerHTML = renderLoginModal(s);
    } else if (s.activeModal === 'register') {
      container.innerHTML = renderRegisterModal(s);
    } else {
      container.innerHTML = '';
    }
  },

  // ==================== NAVIGATION ====================
  changeTab(tab) {
    // Block non-admins from accessing admin page
    if (tab === 'admin' && (!this.state.currentUser || this.state.currentUser.role !== 'Admin')) {
      this.state.currentTab = 'home';
      this.render();
      return;
    }
    this.state.currentTab = tab;
    this.state.userDropdownOpen = false;
    this.state.mobileMenuOpen = false;
    this.render();
  },

  setDashboardTab(tab) {
    this.state.dashboardSubTab = tab;
    this.render();
  },

  setAdminTab(tab) {
    this.state.adminTab = tab;
    this.state.adminSearch = '';
    this.render();
  },

  // ==================== FILTERS ====================
  setResourceSearch(value) {
    this.state.resourceSearch = value;
    this.render();
  },
  setResourceCategory(value) {
    this.state.resourceCategory = value;
    this.render();
  },
  setResourceStatus(value) {
    this.state.resourceStatus = value;
    this.render();
  },
  setJobSearch(value) {
    this.state.jobSearch = value;
    this.render();
  },
  setJobCategory(value) {
    this.state.jobCategory = value;
    this.render();
  },
  setAdminSearch(value) {
    this.state.adminSearch = value;
    this.render();
  },

  // ==================== USER MANAGEMENT ====================
  async handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    try {
      const res = await apiClient.login(username, password);
      this.state.currentUser = apiClient.mapUser(res.user);
      this.state.activeModal = null;
      alert(`Welcome back, ${this.state.currentUser.name}!`);
      this.init(); // Re-init to load data
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  },

  async handleRegister(e) {
    e.preventDefault();
    const data = {
      username: document.getElementById('reg-username').value,
      email: document.getElementById('reg-email').value,
      first_name: document.getElementById('reg-first-name').value,
      last_name: document.getElementById('reg-last-name').value,
      location: document.getElementById('reg-location').value,
      contact: document.getElementById('reg-contact').value,
      password: document.getElementById('reg-password').value,
      password_confirm: document.getElementById('reg-password-confirm').value,
    };

    if (data.password !== data.password_confirm) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const res = await apiClient.register(data);
      this.state.currentUser = apiClient.mapUser(res.user);
      this.state.activeModal = null;
      alert(`Account created! Welcome, ${this.state.currentUser.name}.`);
      this.init();
    } catch (err) {
      alert('Registration failed. Username or email might be taken.');
    }
  },

  async handleLogout() {
    try {
      await apiClient.logout();
      this.state.currentUser = null;
      this.state.currentTab = 'home';
      alert('Logged out successfully.');
      this.render();
    } catch (err) {
      console.error('Logout failed:', err);
      // Force clear if API fails
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      this.state.currentUser = null;
      this.render();
    }
  },

  toggleUserDropdown() {
    this.state.userDropdownOpen = !this.state.userDropdownOpen;
    this.render();
  },

  toggleMobileMenu() {
    this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
    this.render();
  },

  // ==================== MODALS ====================
  openModal(type) {
    this.state.activeModal = type;
    this.state.userDropdownOpen = false;
    this.render();
  },

  closeModal() {
    this.state.activeModal = null;
    this.state.borrowItemTarget = null;
    this.state.applyJobTarget = null;
    this.render();
  },

  openBorrowModal(itemId) {
    const item = this.state.resources.find(r => r.id === itemId);
    if (item) {
      this.state.borrowItemTarget = item;
      this.state.activeModal = 'borrow';
      this.render();
    }
  },

  openApplyModal(jobId) {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (job) {
      this.state.applyJobTarget = job;
      this.state.activeModal = 'apply';
      this.render();
    }
  },

  // ==================== SHARE RESOURCE HANDLER ====================
  async handleShareResource(e) {
    e.preventDefault();
    if (!this.state.currentUser) return APP.openModal('login');

    const data = {
      id: `res-${Date.now()}`,
      title: document.getElementById('share-title').value.trim(),
      category: document.getElementById('share-category').value,
      condition: document.getElementById('share-condition').value,
      description: document.getElementById('share-description').value.trim(),
      lending_type: document.getElementById('share-lending-type').value,
      location: document.getElementById('share-location').value.trim(),
      status: 'Available'
    };

    // Determine image code based on title keywords
    let imageCode = 'generic';
    const lowerTitle = data.title.toLowerCase();
    if (lowerTitle.includes('spray')) imageCode = 'sprayer';
    else if (lowerTitle.includes('lantern') || lowerTitle.includes('solar')) imageCode = 'lantern';
    else if (lowerTitle.includes('biol')) imageCode = 'biology';
    else if (lowerTitle.includes('plough') || lowerTitle.includes('jembe')) imageCode = 'plough';
    else if (lowerTitle.includes('comput') || lowerTitle.includes('insy')) imageCode = 'computing';
    else if (lowerTitle.includes('wheel')) imageCode = 'wheelbarrow';
    data.image_code = imageCode;

    try {
      await apiClient.createResource(data);
      this.state.activeModal = null;
      alert(`Fantastic! "${data.title}" has been successfully shared on the listing page!`);
      this.init();
    } catch (err) {
      alert('Failed to share resource. Please try again.');
    }
  },

  // ==================== POST JOB HANDLER ====================
  async handlePostJob(e) {
    e.preventDefault();
    if (!this.state.currentUser) return APP.openModal('login');

    const requirementInputs = document.querySelectorAll('.requirement-input');
    const requirements = Array.from(requirementInputs)
      .map(input => input.value.trim())
      .filter(val => val !== '');

    const data = {
      id: `job-${Date.now()}`,
      title: document.getElementById('job-title').value.trim(),
      category: document.getElementById('job-category').value,
      description: document.getElementById('job-description').value.trim(),
      location: document.getElementById('job-location').value.trim(),
      rate: document.getElementById('job-rate').value.trim(),
      duration: document.getElementById('job-duration').value.trim(),
      contact_info: document.getElementById('job-contact').value.trim(),
      requirements: requirements,
      status: 'Open'
    };

    try {
      await apiClient.createJob(data);
      this.state.activeModal = null;
      const reqSummary = requirements.length > 0 ? `\nRequirements: ${requirements.join(', ')}` : '\n(No special requirements)';
      alert(`Success! Your job post "${data.title}" is now visible on the board.${reqSummary}`);
      this.init();
    } catch (err) {
      alert('Failed to post job. Please check all fields.');
    }
  },

  // ==================== BORROW REQUEST HANDLER ====================
  async handleBorrowRequest(e) {
    e.preventDefault();
    if (!this.state.currentUser) return APP.openModal('login');
    const item = this.state.borrowItemTarget;
    if (!item) return;

    const data = {
      id: `req-${Date.now()}`,
      item: item.id,
      start_date: document.getElementById('borrow-start').value,
      end_date: document.getElementById('borrow-end').value,
      message: document.getElementById('borrow-message').value.trim()
    };

    if (new Date(data.start_date) > new Date(data.end_date)) {
      alert('Start Date cannot be after the Return Date.');
      return;
    }

    try {
      await apiClient.createBorrowRequest(data);
      this.state.activeModal = null;
      this.state.borrowItemTarget = null;
      alert(`Borrow request sent to ${item.ownerName}! Track its status in your Dashboard.`);
      this.init();
    } catch (err) {
      alert('Failed to send borrow request.');
    }
  },

  // ==================== APPLY JOB HANDLER ====================
  handleApplyJob(e) {
    e.preventDefault();
    const job = this.state.applyJobTarget;
    if (!job) return;

    const pitch = document.getElementById('apply-pitch').value.trim();
    if (!pitch) {
      alert('Please write a brief pitch about your skills.');
      return;
    }

    this.state.activeModal = null;
    this.state.applyJobTarget = null;
    alert(`Application submitted! A message has been sent to ${job.postedBy} with your summary:\n"${pitch}"`);
    this.render();
  },

  // ==================== DASHBOARD ACTIONS ====================
  async approveRequest(requestId) {
    try {
      await apiClient.approveBorrowRequest(requestId);
      alert(`You successfully Approved this borrow request!`);
      this.init();
    } catch (err) {
      alert('Failed to approve request.');
    }
  },

  async declineRequest(requestId) {
    try {
      await apiClient.declineBorrowRequest(requestId);
      alert('Declined request.');
      this.init();
    } catch (err) {
      alert('Failed to decline request.');
    }
  },

  async markReturned(requestId) {
    try {
      await apiClient.markBorrowRequestReturned(requestId);
      alert('Marked as returned!');
      this.init();
    } catch (err) {
      alert('Failed to mark as returned.');
    }
  },

  async toggleItemStatus(itemId) {
    const item = this.state.resources.find(r => r.id === itemId);
    if (!item) return;
    try {
      if (item.status === 'Available') {
        await apiClient.markResourceBorrowed(itemId);
      } else {
        await apiClient.markResourceAvailable(itemId);
      }
      this.init();
    } catch (err) {
      alert('Failed to update item status.');
    }
  },

  async toggleJobStatus(jobId) {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (!job) return;
    try {
      if (job.status === 'Open') {
        await apiClient.markJobFilled(jobId);
      } else {
        await apiClient.markJobOpen(jobId);
      }
      this.init();
    } catch (err) {
      alert('Failed to update job status.');
    }
  },

  // ==================== ADMIN ACTIONS ====================
  async deleteResource(itemId) {
    const item = this.state.resources.find(r => r.id === itemId);
    if (item && confirm(`Are you sure you want to delete ${item.title}?`)) {
      try {
        await apiClient.deleteResource(itemId);
        alert('Resource listing permanently moderated / removed.');
        this.init();
      } catch (err) {
        alert('Failed to delete resource.');
      }
    }
  },

  async deleteJob(jobId) {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (job && confirm(`Remove job listing: ${job.title}?`)) {
      try {
        await apiClient.deleteJob(jobId);
        alert('Job opportunity moderated / removed.');
        this.init();
      } catch (err) {
        alert('Failed to delete job.');
      }
    }
  },

  async deleteRequest(requestId) {
    if (confirm('Delete this request record?')) {
      // Backend typically doesn't allow deleting requests via ModelViewSet unless enabled
      // For now, let's keep it local or implement if needed
      this.state.requests = this.state.requests.filter(r => r.id !== requestId);
      this.render();
    }
  },

  // ==================== REQUIREMENTS HELPER ====================
  addRequirementRow() {
    const container = document.getElementById('requirements-container');
    if (!container) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'requirement-input input-field mt-2';
    input.placeholder = 'e.g. Bring your own tools, Valid ID required, KCSE certificate...';
    container.appendChild(input);
    input.focus();
  },

  removeRequirementRow(btn) {
    const row = btn.closest('.requirement-row');
    if (row) row.remove();
  },

  // ==================== GLOBAL EVENT BINDING ====================
  bindGlobalEvents() {
    // Close dropdown when clicking Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.state.activeModal) {
          this.closeModal();
        }
        if (this.state.userDropdownOpen) {
          this.state.userDropdownOpen = false;
          this.render();
        }
      }
    });

    // Re-render when window regains focus (in case other tabs changed localStorage)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Don't auto-reload to avoid flickering
      }
    });
  }
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  APP.init();
});
