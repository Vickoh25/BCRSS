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
    jobApplications: [],
    requests: [],
    reviews: [],
    currentUser: null,
    analytics: null,

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
    activeModal: null,     // null, 'share', 'postJob', 'borrow', 'apply', 'review', 'resetPassword'
    borrowItemTarget: null,
    applyJobTarget: null,
    reviewTarget: null,

    // UI - Password Reset
    resetPasswordUid: null,
    resetPasswordToken: null,
    resetPasswordState: 'form',  // 'form' | 'success' | 'error'
    resetPasswordError: '',
  },

  // ==================== INITIALISATION ====================
  async init() {
    // Step 0: Check for password reset URL params
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const token = urlParams.get('token');
    if (uid && token) {
      this.state.resetPasswordUid = uid;
      this.state.resetPasswordToken = token;
      this.state.resetPasswordState = 'form';
      this.state.resetPasswordError = '';
      this.state.activeModal = 'resetPassword';
      // Clean the URL without triggering a reload
      window.history.replaceState({}, '', window.location.pathname);
    }

    // Step 1: Clear stale localStorage data if no valid token
    if (!apiClient.token) {
      localStorage.removeItem('bcrss_current_user');
      localStorage.removeItem('bcrss_users');
      localStorage.removeItem('bcrss_resources');
      localStorage.removeItem('bcrss_jobs');
      localStorage.removeItem('bcrss_job_applications');
      localStorage.removeItem('bcrss_requests');
      localStorage.removeItem('bcrss_reviews');
      localStorage.removeItem('bcrss_current_tab');
      console.log('No auth token — cleared stale localStorage. Login/register to begin.');
    }

    // Step 2: Load what's left in storage
    this.loadFromStorage();

    // Step 3: Render immediately (shows landing page or cached data)
    this.bindGlobalEvents();
    this.render();

    // Step 4: Fetch fresh data from API in background
    try {
      await this.loadInitialData();
      this.render(); // Re-render with fresh data
    } catch (e) {
      console.warn('Background data sync failed:', e);
    }
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
        const [myReqs, recReqs, sentApps, receivedApps, myReviews, receivedReviews] = await Promise.all([
          apiClient.getMyBorrowRequests(),
          apiClient.getReceivedBorrowRequests(),
          apiClient.getMyJobApplications(),
          apiClient.getReceivedJobApplications(),
          apiClient.getMyReviews(),
          apiClient.getReceivedReviews()
        ]);
        s.requests = [...myReqs, ...recReqs];
        s.jobApplications = [...sentApps, ...receivedApps];
        s.reviews = [...myReviews, ...receivedReviews];
      } catch (e) {
        console.warn('Personal data fetch failed, dashboard data will be empty');
        s.requests = [];
        s.jobApplications = [];
      }

      // Admin: fetch all users
      if (s.currentUser.role === 'Admin') {
        try {
          const [users, allReviews] = await Promise.all([
            apiClient.listUsers(),
            apiClient.listReviews()
          ]);
          s.users = users;
          s.reviews = allReviews;
        } catch (e) {
          console.warn('Admin data fetch failed');
        }
      }
    }
  },

  loadFromStorage() {
    const s = this.state;
    try {
      const keys = ['bcrss_users', 'bcrss_current_user', 'bcrss_resources', 'bcrss_jobs', 'bcrss_job_applications', 'bcrss_requests', 'bcrss_reviews'];
      const [users, currentUser, resources, jobs, jobApplications, requests, reviews] = keys.map(k => {
        const saved = localStorage.getItem(k);
        return saved ? JSON.parse(saved) : null;
      });
      if (users) s.users = users;
      if (currentUser) s.currentUser = currentUser;
      if (resources) s.resources = resources;
      if (jobs) s.jobs = jobs;
      if (jobApplications) s.jobApplications = jobApplications;
      if (requests) s.requests = requests;
      if (reviews) s.reviews = reviews;

      // Restore the active tab so page refreshes don't reset navigation
      const savedTab = localStorage.getItem('bcrss_current_tab');
      if (savedTab) {
        // Don't restore protected tabs if user is not logged in
        const protectedTabs = ['dashboard', 'admin'];
        if (protectedTabs.includes(savedTab) && !s.currentUser) {
          s.currentTab = 'home';
        } else {
          s.currentTab = savedTab;
        }
      }
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
      localStorage.setItem('bcrss_job_applications', JSON.stringify(s.jobApplications));
      localStorage.setItem('bcrss_requests', JSON.stringify(s.requests));
      localStorage.setItem('bcrss_reviews', JSON.stringify(s.reviews));
      localStorage.setItem('bcrss_current_tab', s.currentTab);
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
      // Show landing page for unauthenticated users, homepage for authenticated users
      html += s.currentUser ? renderHomePage(s) : renderLandingPage(s);
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

    // Observe stat counters for animation (reuses pre-created observer)
    if (this._counterObserver) {
      document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        this._counterObserver.observe(el);
      });
    }

    this.saveToStorage();
  },

  renderModals() {
    const container = document.getElementById('modal-container');
    if (!container) return;
    const s = this.state;

    if (s.activeModal === 'share') {
      if (!s.currentUser) {
        container.innerHTML = renderLoginModal(s);
      } else {
        container.innerHTML = renderShareModal(s);
      }
    } else if (s.activeModal === 'postJob') {
      if (!s.currentUser) {
        container.innerHTML = renderLoginModal(s);
      } else {
        container.innerHTML = renderPostJobModal(s);
      }
    } else if (s.activeModal === 'borrow' && s.borrowItemTarget) {
      if (!s.currentUser) {
        container.innerHTML = renderLoginModal(s);
      } else {
        container.innerHTML = renderBorrowModal(s);
      }
    } else if (s.activeModal === 'apply' && s.applyJobTarget) {
      if (!s.currentUser) {
        container.innerHTML = renderLoginModal(s);
      } else {
        container.innerHTML = renderApplyModal(s);
      }
    } else if (s.activeModal === 'review' && s.reviewTarget) {
      if (!s.currentUser) {
        container.innerHTML = renderLoginModal(s);
      } else {
        container.innerHTML = renderReviewModal(s);
      }
    } else if (s.activeModal === 'login') {
      container.innerHTML = renderLoginModal(s);
    } else if (s.activeModal === 'register') {
      container.innerHTML = renderRegisterModal(s);
    } else if (s.activeModal === 'resetPassword') {
      container.innerHTML = renderResetPasswordModal(s);
    } else {
      container.innerHTML = '';
    }
  },

  // ==================== NAVIGATION ====================
  changeTab(tab) {
    // Block unauthenticated users from protected pages
    if ((tab === 'resources' || tab === 'jobs' || tab === 'dashboard') && !this.state.currentUser) {
      this.openModal('login');
      return;
    }
    // Block non-admins from accessing admin page
    if (tab === 'admin' && (!this.state.currentUser || this.state.currentUser.role !== 'Admin')) {
      this.openModal('login');
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
    if (tab === 'reports') {
      this.loadAnalytics();
    }
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
      const msg = err.message || '';
      if (msg.includes('Network error') || msg.includes('Failed to fetch')) {
        alert('Unable to reach the server. The backend may be starting up — please wait a moment and try again.');
      } else if (msg.includes('API Error 400')) {
        alert('Invalid username or password. Please try again.');
      } else if (msg.includes('API Error 404')) {
        alert('Login service unavailable. The server may be restarting — please try again in a moment.');
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
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

    if (data.password.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    try {
      const res = await apiClient.register(data);
      this.state.currentUser = apiClient.mapUser(res.user);
      this.state.activeModal = null;
      alert(`Account created! Welcome, ${this.state.currentUser.name}.`);
      this.init();
    } catch (err) {
      const msg = err.message || '';
      // Extract backend validation details from the error message
      let detail = msg;
      const apiMatch = msg.match(/API Error \d+: (.+)/);
      if (apiMatch) detail = apiMatch[1];

      if (msg.includes('Network error') || msg.includes('Failed to fetch')) {
        alert('Unable to reach the server. The backend may be starting up — please wait a moment and try again.');
      } else if (msg.includes('API Error 400')) {
        alert(`Registration failed: ${detail}`);
      } else if (msg.includes('API Error 404')) {
        alert('Registration service unavailable. The server may be restarting — please try again in a moment.');
      } else {
        alert(`Registration failed: ${detail}`);
      }
    }
  },

  async handleDownloadReport() {
    try {
      await apiClient.downloadReport();
    } catch (err) {
      alert(err.message || 'Failed to download report. Please try again later.');
    }
  },

  async handleLogout() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await apiClient.request('/auth/logout/', {
          method: 'POST',
          body: { refresh: refreshToken }
        });
      } catch (e) {
        console.warn('Backend logout failed (OK to ignore)');
      }
    }

    // Clear ALL state and localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('bcrss_current_user');
    localStorage.removeItem('bcrss_current_tab');
    apiClient.token = null;

    // Reset all state to default
    this.state.currentUser = null;
    this.state.currentTab = 'home';
    this.state.resources = [];
    this.state.jobs = [];
    this.state.jobApplications = [];
    this.state.requests = [];
    this.state.users = [];
    this.state.reviews = [];

    // Reload from API (public data only)
    await this.loadInitialData();
    this.render();
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
    this.state.reviewTarget = null;
    this._pendingShareImage = null;
    this.render();
  },

  openBorrowModal(itemId) {
    if (!this.state.currentUser) {
      this.openModal('login');
      return;
    }
    const item = this.state.resources.find(r => r.id === itemId);
    if (item) {
      this.state.borrowItemTarget = item;
      this.state.activeModal = 'borrow';
      this.render();
    }
  },

  openReviewModal(userId, userName, role = 'Borrower', resourceId = null) {
    if (!this.state.currentUser) {
      this.openModal('login');
      return;
    }
    if (!userId || userId === this.state.currentUser.id) return;
    this.state.reviewTarget = { userId, userName, role, resourceId };
    this.state.activeModal = 'review';
    this.render();
  },

  openApplyModal(jobId) {
    if (!this.state.currentUser) {
      this.openModal('login');
      return;
    }
    const job = this.state.jobs.find(j => j.id === jobId);
    if (job) {
      this.state.applyJobTarget = job;
      this.state.activeModal = 'apply';
      this.render();
    }
  },

  // ==================== PASSWORD RESET HANDLER ====================
  async handleForgotPassword() {
    const email = prompt('Enter your email address to receive a password reset link:');
    if (!email) return;
    try {
      await apiClient.request('/auth/password_reset/', {
        method: 'POST',
        body: { email }
      });
      alert('If an account exists with that email, a reset link has been sent. Check your inbox.');
    } catch (err) {
      alert('Failed to send reset email. Please try again.');
    }
  },

  async handleResetPassword(e) {
    e.preventDefault();
    const newPassword = document.getElementById('reset-new-password').value;
    const confirmPassword = document.getElementById('reset-confirm-password').value;
    const uid = this.state.resetPasswordUid;
    const token = this.state.resetPasswordToken;

    if (!uid || !token) {
      this.state.resetPasswordState = 'error';
      this.state.resetPasswordError = 'Invalid or missing reset link. Please request a new one.';
      this.render();
      return;
    }

    if (newPassword !== confirmPassword) {
      this.state.resetPasswordState = 'error';
      this.state.resetPasswordError = 'Passwords do not match.';
      this.render();
      return;
    }

    if (newPassword.length < 8) {
      this.state.resetPasswordState = 'error';
      this.state.resetPasswordError = 'Password must be at least 8 characters.';
      this.render();
      return;
    }

    try {
      await apiClient.confirmPasswordReset(uid, token, newPassword, confirmPassword);
      this.state.resetPasswordState = 'success';
      this.state.resetPasswordUid = null;
      this.state.resetPasswordToken = null;
      this.render();
    } catch (err) {
      this.state.resetPasswordState = 'error';
      this.state.resetPasswordError = err.message || 'Failed to reset password. The link may have expired.';
      this.render();
    }
  },

  // ==================== IMAGE HELPERS ====================
  _pendingShareImage: null,

  previewShareImage(input) {
    const file = input.files && input.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Validate file size (max 10MB raw, will compress)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image is too large. Please choose a smaller image (under 10MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      this._rawShareImage = ev.target.result;
      this._showCropUI();
    };
    reader.readAsDataURL(file);
  },

  // ==================== CROP UI ====================
  _cropDragging: false,
  _cropResizing: false,
  _cropBox: null,
  _cropImg: null,
  _cropStartX: 0,
  _cropStartY: 0,
  _cropStartBox: null,
  _cropAspect: 1,

  _showCropUI() {
    if (!this._rawShareImage) return;

    // Remove existing overlay
    const existing = document.getElementById('bcrss-crop-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'bcrss-crop-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;';

    overlay.innerHTML = `
      <div style="color:white;font-size:14px;font-weight:600;margin-bottom:8px;text-align:center;">Drag to position • Drag edges to resize</div>
      <div id="bcrss-crop-container" style="position:relative;overflow:hidden;border-radius:8px;background:#000;max-width:90vw;max-height:65vh;touch-action:none;">
        <img id="bcrss-crop-img" src="${this._rawShareImage}" style="display:block;width:100%;height:auto;pointer-events:none;user-select:none;-webkit-user-select:none;">
        <div id="bcrss-crop-box" style="position:absolute;border:2px solid white;cursor:move;background:rgba(255,255,255,0.1);box-shadow:0 0 0 9999px rgba(0,0,0,0.55);"></div>
      </div>
      <div style="display:flex;gap:12px;margin-top:12px;">
        <button id="bcrss-crop-cancel" style="padding:10px 24px;border-radius:8px;border:1px solid rgba(255,255,255,0.3);background:transparent;color:white;font-size:14px;cursor:pointer;">Cancel</button>
        <button id="bcrss-crop-confirm" style="padding:10px 24px;border-radius:8px;border:none;background:#1F7A5A;color:white;font-size:14px;font-weight:600;cursor:pointer;">Crop & Use</button>
      </div>
    `;

    document.body.appendChild(overlay);

    const img = document.getElementById('bcrss-crop-img');
    const container = document.getElementById('bcrss-crop-container');
    const box = document.getElementById('bcrss-crop-box');

    img.onload = () => {
      this._cropBox = box;
      this._cropImg = img;
      this._initCropBox(container, box);
      this._bindCropEvents(container, box);
    };
    if (img.complete) {
      this._cropBox = box;
      this._cropImg = img;
      this._initCropBox(container, box);
      this._bindCropEvents(container, box);
    }

    document.getElementById('bcrss-crop-cancel').onclick = () => this._cancelCrop();
    document.getElementById('bcrss-crop-confirm').onclick = () => this._confirmCrop();
  },

  _initCropBox(container, box) {
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;
    const size = Math.floor(Math.min(cw, ch) * 0.85);
    const side = Math.min(size, cw, ch);
    box.style.width = side + 'px';
    box.style.height = Math.round(side * this._cropAspect) + 'px';
    box.style.left = Math.round((cw - side) / 2) + 'px';
    box.style.top = Math.round((ch - side * this._cropAspect) / 2) + 'px';
  },

  _bindCropEvents(container, box) {
    const startDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._cropDragging = true;
      this._cropResizing = false;
      const pt = e.touches ? e.touches[0] : e;
      const rect = box.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      this._cropStartX = pt.clientX - rect.left;
      this._cropStartY = pt.clientY - rect.top;
      this._cropStartBox = {
        left: box.offsetLeft,
        top: box.offsetTop,
        width: box.offsetWidth,
        height: box.offsetHeight,
      };
    };

    const startResize = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._cropResizing = true;
      this._cropDragging = false;
      const pt = e.touches ? e.touches[0] : e;
      this._cropStartX = pt.clientX;
      this._cropStartY = pt.clientY;
      this._cropStartBox = {
        left: box.offsetLeft,
        top: box.offsetTop,
        width: box.offsetWidth,
        height: box.offsetHeight,
      };
    };

    const onMove = (e) => {
      const pt = e.touches ? e.touches[0] : e;
      if (this._cropDragging) {
        const cw = container.offsetWidth;
        const ch = container.offsetHeight;
        let newLeft = pt.clientX - container.getBoundingClientRect().left - this._cropStartX;
        let newTop = pt.clientY - container.getBoundingClientRect().top - this._cropStartY;
        const bw = this._cropStartBox.width;
        const bh = this._cropStartBox.height;
        newLeft = Math.max(0, Math.min(cw - bw, newLeft));
        newTop = Math.max(0, Math.min(ch - bh, newTop));
        box.style.left = Math.round(newLeft) + 'px';
        box.style.top = Math.round(newTop) + 'px';
        e.preventDefault();
      }
      if (this._cropResizing) {
        const dx = pt.clientX - this._cropStartX;
        const cw = container.offsetWidth;
        const ch = container.offsetHeight;
        let newW = this._cropStartBox.width + dx;
        newW = Math.max(60, Math.min(cw, newW));
        let newH = newW * this._cropAspect;
        if (newH > ch) { newH = ch; newW = newH / this._cropAspect; }
        newW = Math.max(60, newW);
        newH = Math.max(60, newH);
        box.style.width = Math.round(newW) + 'px';
        box.style.height = Math.round(newH) + 'px';
        box.style.left = this._cropStartBox.left + 'px';
        box.style.top = this._cropStartBox.top + 'px';
        e.preventDefault();
      }
    };

    const endDrag = () => { this._cropDragging = false; this._cropResizing = false; };

    box.addEventListener('mousedown', startDrag);
    box.addEventListener('touchstart', startDrag, { passive: false });
    box.addEventListener('touchmove', onMove, { passive: false });
    container.addEventListener('mousedown', startResize);
    container.addEventListener('touchstart', startResize, { passive: false });
    container.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  },

  _cancelCrop() {
    const overlay = document.getElementById('bcrss-crop-overlay');
    if (overlay) overlay.remove();
    this._rawShareImage = null;
    this._clearShareImageInputs();
  },

  _confirmCrop() {
    const img = document.getElementById('bcrss-crop-img');
    const box = document.getElementById('bcrss-crop-box');
    const container = document.getElementById('bcrss-crop-container');
    if (!img || !box || !container) { this._cancelCrop(); return; }

    const imgRect = img.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    const sx = (boxRect.left - imgRect.left) / imgRect.width * img.naturalWidth;
    const sy = (boxRect.top - imgRect.top) / imgRect.height * img.naturalHeight;
    const sw = boxRect.width / imgRect.width * img.naturalWidth;
    const sh = boxRect.height / imgRect.height * img.naturalHeight;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    const croppedData = canvas.toDataURL('image/jpeg', 0.92);

    const overlay = document.getElementById('bcrss-crop-overlay');
    if (overlay) overlay.remove();

    this.compressImage(croppedData, 800, 0.8).then((compressed) => {
      this._pendingShareImage = compressed;
      const preview = document.getElementById('share-image-preview');
      const previewImg = document.getElementById('share-image-img');
      const buttons = document.getElementById('share-image-buttons');
      if (preview && previewImg) {
        previewImg.src = compressed;
        preview.style.display = 'block';
      }
      if (buttons) buttons.style.display = 'none';
    });
  },

  openCropUI() {
    if (this._pendingShareImage) {
      this._rawShareImage = this._pendingShareImage;
      this._showCropUI();
    }
  },

  _clearShareImageInputs() {
    const inputGallery = document.getElementById('share-image-input');
    const inputCamera = document.getElementById('share-camera-input');
    if (inputGallery) inputGallery.value = '';
    if (inputCamera) inputCamera.value = '';
  },

  clearShareImage() {
    this._pendingShareImage = null;
    this._rawShareImage = null;
    const preview = document.getElementById('share-image-preview');
    const buttons = document.getElementById('share-image-buttons');
    if (preview) preview.style.display = 'none';
    if (buttons) buttons.style.display = 'flex';
    this._clearShareImageInputs();
  },

  compressImage(dataUrl, maxDim, quality) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
          else { w = Math.round(w * maxDim / h); h = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = dataUrl;
    });
  },

  saveResourceImage(resourceId, dataUrl) {
    try {
      localStorage.setItem(`bcrss_img_${resourceId}`, dataUrl);
    } catch (e) {
      console.warn('Could not save image (localStorage full?):', e);
    }
  },

  getResourceImage(resourceId) {
    return localStorage.getItem(`bcrss_img_${resourceId}`) || null;
  },

  // ==================== SHARE RESOURCE HANDLER ====================
  async handleShareResource(e) {
    e.preventDefault();
    if (!this.state.currentUser) return APP.openModal('login');

    const resourceId = `res-${Date.now()}`;
    const data = {
      id: resourceId,
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

      // Save uploaded image locally if one was selected
      if (this._pendingShareImage) {
        this.saveResourceImage(resourceId, this._pendingShareImage);
        this._pendingShareImage = null;
      }

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
  async handleApplyJob(e) {
    e.preventDefault();
    if (!this.state.currentUser) return APP.openModal('login');
    const job = this.state.applyJobTarget;
    if (!job) return;

    const pitch = document.getElementById('apply-pitch').value.trim();
    if (!pitch) {
      alert('Please write a brief pitch about your skills.');
      return;
    }

    try {
      await apiClient.applyForJob(job.id, { id: `app-${Date.now()}`, pitch });
      this.state.activeModal = null;
      this.state.applyJobTarget = null;
      alert(`Application submitted to ${job.postedBy}. They can now see it in their Dashboard.`);
      this.init();
    } catch (err) {
      alert(err.message || 'Failed to submit application.');
    }
  },

  async handleCreateReview(e) {
    e.preventDefault();
    if (!this.state.currentUser) return APP.openModal('login');
    const target = this.state.reviewTarget;
    if (!target) return;

    const data = {
      id: `rev-${Date.now()}`,
      target_user: target.userId,
      rating: Number(document.getElementById('review-rating').value),
      reviewer_role: document.getElementById('review-role').value,
      resource: target.resourceId,
      comment: document.getElementById('review-comment').value.trim()
    };

    if (!data.comment) {
      alert('Please write a short review.');
      return;
    }

    try {
      await apiClient.createReview(data);
      this.state.activeModal = null;
      this.state.reviewTarget = null;
      alert(`Review submitted for ${target.userName}.`);
      this.init();
    } catch (err) {
      alert(err.message || 'Failed to submit review.');
    }
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
  
  async sendReminder(requestId) {
    try {
      await apiClient.sendBorrowRequestReminder(requestId);
      alert('Reminder sent to borrower!');
      this.init();
    } catch (err) {
      alert('Failed to send reminder.');
    }
  },

  async raiseDispute(requestId) {
    const message = prompt('Please describe the issue:');
    if (!message) return;
    try {
      await apiClient.raiseDispute(requestId, message);
      alert('Dispute raised. A community manager will review it.');
      this.init();
    } catch (err) {
      alert('Failed to raise dispute.');
    }
  },

  async resolveDispute(requestId, status) {
    try {
      await apiClient.resolveDispute(requestId, status);
      alert('Dispute resolved.');
      this.init();
    } catch (err) {
      alert('Failed to resolve dispute.');
    }
  },

  async loadAnalytics() {
    if (!this.state.currentUser || this.state.currentUser.role !== 'Admin') return;
    try {
      this.state.analytics = await apiClient.getAnalytics();
      this.render();
    } catch (err) {
      console.warn('Failed to load analytics');
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

  // ==================== USER MANAGEMENT ====================
  async promoteUser(userId) {
    const user = this.state.users.find(u => u.id === userId);
    if (user && confirm(`Promote ${user.name} to Admin role?`)) {
      try {
        await apiClient.promoteToAdmin(userId);
        user.role = 'Admin';
        alert(`${user.name} is now an Admin.`);
        this.render();
      } catch (err) {
        alert('Failed to promote user: ' + err.message);
      }
    }
  },

  async demoteUser(userId) {
    const user = this.state.users.find(u => u.id === userId);
    if (user && confirm(`Demote ${user.name} to Member role?`)) {
      try {
        await apiClient.demoteToMember(userId);
        user.role = 'Member';
        alert(`${user.name} is now a Member.`);
        this.render();
      } catch (err) {
        alert('Failed to demote user: ' + err.message);
      }
    }
  },

  async deleteUserContent(userId) {
    const user = this.state.users.find(u => u.id === userId);
    if (!user || confirm(`Remove ALL content by ${user.name}? This will delete their resources, jobs, and reviews.`)) {
      const userResources = this.state.resources.filter(r => r.ownerId === userId);
      const userJobs = this.state.jobs.filter(j => j.postedById === userId);
      const userReviews = this.state.reviews.filter(r => r.reviewerName === user.name);

      let count = 0;

      // Delete resources
      for (const res of userResources) {
        try { await apiClient.deleteResource(res.id); count++; } catch (e) { /* skip */ }
      }

      // Delete jobs
      for (const job of userJobs) {
        try { await apiClient.deleteJob(job.id); count++; } catch (e) { /* skip */ }
      }

      // Delete reviews (apiClient.deleteReview doesn't exist — remove locally)
      this.state.reviews = this.state.reviews.filter(r => r.reviewerName !== user.name);

      // Clean up stale data
      this.state.resources = this.state.resources.filter(r => r.ownerId !== userId);
      this.state.jobs = this.state.jobs.filter(j => j.postedById !== userId);

      this.render();
      alert(`Removed ${count} items belonging to ${user.name}. Reviews cleaned locally.`);
    }
  },

  // ==================== REVIEW MODERATION ====================
  async deleteReview(reviewId) {
    if (confirm('Delete this review permanently?')) {
      try {
        await apiClient.deleteReview(reviewId);
        this.state.reviews = this.state.reviews.filter(r => r.id !== reviewId);
        alert('Review deleted.');
        this.render();
      } catch (err) {
        // Fallback: remove locally
        this.state.reviews = this.state.reviews.filter(r => r.id !== reviewId);
        alert('Review removed locally.');
        this.render();
      }
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

    // Scroll-based header shrink (glassmorphism nav)
    // Look up #app-header lazily — it's added to DOM by render()
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const header = document.getElementById('app-header');
          if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    // Re-render when window regains focus (in case other tabs changed localStorage)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Don't auto-reload to avoid flickering
      }
    });
  },


};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  APP.init();
});
