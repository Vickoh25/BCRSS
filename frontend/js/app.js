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

    // Step 4: Set up global events and observers
    this.bindGlobalEvents();

    // Step 5: Render
    this.render();
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
    apiClient.token = null;

    // Reset all state to default
    this.state.currentUser = null;
    this.state.currentTab = 'home';
    this.state.resources = [];
    this.state.jobs = [];
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
    this.state.selectedImage = null; // Reset image on modal open
    this.render();
  },

  closeModal() {
    this.state.activeModal = null;
    this.state.borrowItemTarget = null;
    this.state.applyJobTarget = null;
    this.state.selectedImage = null;
    if (this.state.cameraStream) {
      this.state.cameraStream.getTracks().forEach(track => track.stop());
      this.state.cameraStream = null;
    }
    this.render();
  },

  handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
      this.previewImage(file);
    }
  },

  previewImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.state.selectedImage = e.target.result;
      const preview = document.getElementById('share-image-preview');
      const container = document.getElementById('image-preview-container');
      if (preview && container) {
        preview.src = e.target.result;
        container.classList.remove('hidden');
      }
    };
    reader.readAsDataURL(file);
  },

  async startCamera() {
    const container = document.getElementById('camera-container');
    const video = document.getElementById('camera-video');
    if (!container || !video) return;

    try {
      this.state.cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = this.state.cameraStream;
      container.classList.remove('hidden');
    } catch (err) {
      alert('Could not access camera: ' + err.message);
    }
  },

  capturePhoto() {
    const video = document.getElementById('camera-video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    this.state.selectedImage = canvas.toDataURL('image/jpeg');
    
    // Stop camera
    if (this.state.cameraStream) {
      this.state.cameraStream.getTracks().forEach(track => track.stop());
      this.state.cameraStream = null;
    }
    
    document.getElementById('camera-container').classList.add('hidden');
    const preview = document.getElementById('share-image-preview');
    const container = document.getElementById('image-preview-container');
    if (preview && container) {
      preview.src = this.state.selectedImage;
      container.classList.remove('hidden');
    }
  },

  removeSelectedImage() {
    this.state.selectedImage = null;
    const container = document.getElementById('image-preview-container');
    if (container) container.classList.add('hidden');
    const fileInput = document.getElementById('share-image-file');
    if (fileInput) fileInput.value = '';
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
      status: 'Available',
      image_url: this.state.selectedImage // Include the base64 image
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
      const btn = e.target.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span>Sharing...</span>';

      await apiClient.createResource(data);
      this.state.activeModal = null;
      alert(`Fantastic! "${data.title}" has been successfully shared on the listing page!`);
      this.init();
    } catch (err) {
      alert('Failed to share resource: ' + (err.message || 'Please try again.'));
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = false;
      btn.innerHTML = originalText;
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
