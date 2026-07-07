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
  init() {
    this.loadFromStorage();
    this.setupDefaultData();
    this.render();
    this.bindGlobalEvents();
  },

  setupDefaultData() {
    const s = this.state;
    if (s.users.length === 0) {
      s.users = JSON.parse(JSON.stringify(BCRSS.INITIAL_USERS));
    }
    if (s.resources.length === 0) {
      s.resources = JSON.parse(JSON.stringify(BCRSS.INITIAL_RESOURCES));
    }
    if (s.jobs.length === 0) {
      s.jobs = JSON.parse(JSON.stringify(BCRSS.INITIAL_JOBS));
    }
    if (s.requests.length === 0) {
      s.requests = JSON.parse(JSON.stringify(BCRSS.INITIAL_REQUESTS));
    }
    if (s.reviews.length === 0) {
      s.reviews = JSON.parse(JSON.stringify(BCRSS.INITIAL_REVIEWS));
    }
    if (!s.currentUser) {
      s.currentUser = s.users[0];
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
    } else {
      container.innerHTML = '';
    }
  },

  // ==================== NAVIGATION ====================
  changeTab(tab) {
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
  switchUser(userId) {
    const user = this.state.users.find(u => u.id === userId);
    if (user) {
      this.state.currentUser = user;
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
  handleShareResource(e) {
    e.preventDefault();
    const title = document.getElementById('share-title').value.trim();
    const category = document.getElementById('share-category').value;
    const condition = document.getElementById('share-condition').value;
    const description = document.getElementById('share-description').value.trim();
    const lendingType = document.getElementById('share-lending-type').value;
    const location = document.getElementById('share-location').value.trim();
    const ownerName = document.getElementById('share-owner-name').value.trim();
    const ownerContact = document.getElementById('share-owner-contact').value.trim();

    if (!title || !description || !location || !ownerName || !ownerContact) {
      alert('Please fill in all required fields.');
      return;
    }

    // Determine image code based on title keywords
    let imageCode = 'generic';
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('spray')) imageCode = 'sprayer';
    else if (lowerTitle.includes('lantern') || lowerTitle.includes('solar')) imageCode = 'lantern';
    else if (lowerTitle.includes('biol')) imageCode = 'biology';
    else if (lowerTitle.includes('plough') || lowerTitle.includes('jembe')) imageCode = 'plough';
    else if (lowerTitle.includes('comput') || lowerTitle.includes('insy')) imageCode = 'computing';
    else if (lowerTitle.includes('wheel')) imageCode = 'wheelbarrow';

    const newItem = {
      id: `res-${Date.now()}`,
      title,
      category,
      condition,
      description,
      lendingType,
      location,
      ownerId: this.state.currentUser.id,
      ownerName,
      ownerContact,
      status: 'Available',
      listedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      imageCode
    };

    this.state.resources = [newItem, ...this.state.resources];
    this.state.activeModal = null;
    alert(`Fantastic! "${title}" has been successfully shared on the listing page!`);
    this.render();
  },

  // ==================== POST JOB HANDLER ====================
  handlePostJob(e) {
    e.preventDefault();
    const title = document.getElementById('job-title').value.trim();
    const category = document.getElementById('job-category').value;
    const description = document.getElementById('job-description').value.trim();
    const location = document.getElementById('job-location').value.trim();
    const rate = document.getElementById('job-rate').value.trim();
    const duration = document.getElementById('job-duration').value.trim();
    const contactInfo = document.getElementById('job-contact').value.trim();

    if (!title || !description || !location || !rate || !duration || !contactInfo) {
      alert('Please fill in all required fields.');
      return;
    }

    const newJob = {
      id: `job-${Date.now()}`,
      title,
      category,
      status: 'Open',
      description,
      location,
      rate,
      duration,
      postedBy: this.state.currentUser.name,
      postedById: this.state.currentUser.id,
      postedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      contactInfo
    };

    this.state.jobs = [newJob, ...this.state.jobs];
    this.state.activeModal = null;
    alert(`Success! Your job post "${title}" is now visible to helpers on the board.`);
    this.render();
  },

  // ==================== BORROW REQUEST HANDLER ====================
  handleBorrowRequest(e) {
    e.preventDefault();
    const item = this.state.borrowItemTarget;
    if (!item) return;

    const startDate = document.getElementById('borrow-start').value;
    const endDate = document.getElementById('borrow-end').value;
    const message = document.getElementById('borrow-message').value.trim();

    if (new Date(startDate) > new Date(endDate)) {
      alert('Start Date cannot be after the Return Date.');
      return;
    }

    const newRequest = {
      id: `req-${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      requesterId: this.state.currentUser.id,
      requesterName: this.state.currentUser.name,
      requesterContact: this.state.currentUser.contact,
      ownerId: item.ownerId,
      startDate,
      endDate,
      status: 'Pending',
      requestDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      message
    };

    this.state.requests = [newRequest, ...this.state.requests];
    this.state.activeModal = null;
    this.state.borrowItemTarget = null;
    alert(`Borrow request sent to ${item.ownerName}! Track its status in your Dashboard.`);
    this.render();
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
  approveRequest(requestId) {
    const s = this.state;
    s.requests = s.requests.map(r =>
      r.id === requestId ? { ...r, status: 'Approved' } : r
    );
    const req = s.requests.find(r => r.id === requestId);
    if (req) {
      s.resources = s.resources.map(item =>
        item.id === req.itemId ? { ...item, status: 'Borrowed' } : item
      );
    }
    alert(`You successfully Approved this borrow request!`);
    this.render();
  },

  declineRequest(requestId) {
    this.state.requests = this.state.requests.map(r =>
      r.id === requestId ? { ...r, status: 'Declined' } : r
    );
    alert('Declined request.');
    this.render();
  },

  markReturned(requestId) {
    const s = this.state;
    s.requests = s.requests.map(r =>
      r.id === requestId ? { ...r, status: 'Returned' } : r
    );
    const req = s.requests.find(r => r.id === requestId);
    if (req) {
      s.resources = s.resources.map(item =>
        item.id === req.itemId ? { ...item, status: 'Available' } : item
      );

      // Prompt for review
      const ratingComment = prompt('Leave a rating review for the partner borrower? Keep the community trusted!\nRate out of 5 stars:', '5');
      const commentText = prompt('Write some optional feedback about this rental transaction:', 'Perfect transaction, returned the tool fully cleaned and ready to go!');

      if (ratingComment && commentText) {
        const rating = Math.min(5, Math.max(1, parseInt(ratingComment) || 5));
        const newReview = {
          id: `rev-${Date.now()}`,
          rating,
          comment: commentText,
          reviewerName: s.currentUser.name,
          reviewerRole: s.currentUser.role,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          targetName: req.requesterName
        };
        s.reviews = [newReview, ...s.reviews];
        alert('Thank you! Your feedback is saved and updates community trust metrics.');
      }
    }
    this.render();
  },

  toggleItemStatus(itemId) {
    this.state.resources = this.state.resources.map(r =>
      r.id === itemId
        ? { ...r, status: r.status === 'Available' ? 'Borrowed' : 'Available' }
        : r
    );
    this.render();
  },

  toggleJobStatus(jobId) {
    this.state.jobs = this.state.jobs.map(j =>
      j.id === jobId
        ? { ...j, status: j.status === 'Open' ? 'Filled' : 'Open' }
        : j
    );
    this.render();
  },

  // ==================== ADMIN ACTIONS ====================
  deleteResource(itemId) {
    const item = this.state.resources.find(r => r.id === itemId);
    if (item && confirm(`Are you sure you want to delete ${item.title}?`)) {
      this.state.resources = this.state.resources.filter(r => r.id !== itemId);
      alert('Resource listing permanently moderated / removed.');
      this.render();
    }
  },

  deleteJob(jobId) {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (job && confirm(`Remove job listing: ${job.title}?`)) {
      this.state.jobs = this.state.jobs.filter(j => j.id !== jobId);
      alert('Job opportunity moderated / removed.');
      this.render();
    }
  },

  deleteRequest(requestId) {
    if (confirm('Delete this request record?')) {
      this.state.requests = this.state.requests.filter(r => r.id !== requestId);
      alert('Borrow ledger record deleted.');
      this.render();
    }
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
