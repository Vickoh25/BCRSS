/**
 * BCRSS - Component Renderers
 * All UI component rendering functions and SVG icons
 */

// ==================== SVG ICONS ====================
const Icons = {
  handshake: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M11 17a1 1 0 0 1-1 1H5l-2-4V6l2-2h4l2 2"/><path d="M13 6l2-2h4l2 4v8l-2 2h-4"/><path d="M11 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="m11 2-2 2v16l2 2"/><path d="M19 10v.5a2.5 2.5 0 0 1-5 0V10"/></svg>',
  heart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  dollarSign: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m6 9 6 6 6-6"/></svg>',
  settings: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  logOut: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
  shovel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 22v-5l5-5 5 5-5 5Z"/><path d="M9.5 14.5 16 8"/><path d="m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2"/></svg>',
  bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  briefcase: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  wrench: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  shieldAlert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  award: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  clipboard: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
  refreshCw: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>',
  trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  trash2: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="20 6 9 17 4 12"/></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  messageSquare: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  send: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  imagePlus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 12v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6"/><line x1="15" x2="21" y1="6" y2="6"/><line x1="18" x2="18" y1="3" y2="9"/><circle cx="9" cy="13" r="2"/></svg>',
  hammer: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m15 12-8 8a4.7 4.7 0 0 1-6-6l8-8"/><path d="M12 3l6 6"/><path d="m15 6 3 3"/><path d="M9 12l6 6"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  flame: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
  layers: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m12 3 7 4-7 4-7-4 7-4Z"/><path d="m5 10 7 4 7-4"/><path d="m5 16 7 4 7-4"/></svg>',
  arrowRightLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>',
  alertCircle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
};

// Helper: wrap an icon in a container with size class
function icon(name, sizeClass = 'w-5 h-5') {
  const svg = Icons[name];
  if (!svg) return Icons.info;
  // Inject the size class into the SVG class attribute
  return svg.replace('class="icon"', `class="${sizeClass} stroke-current"`);
}

// ==================== ITEM IMAGE PLACEHOLDER ====================
function renderItemImage(imageCode, category, sizeClass) {
  let bgClass = 'bg-[#f5f4ef] text-stone-400';
  let IconComponent = null;

  if (category === 'farm tools' || ['sprayer', 'plough', 'wheelbarrow'].includes(imageCode)) {
    bgClass = 'bg-[#f4f6f4] text-primary';
    if (imageCode === 'sprayer') IconComponent = 'wrench';
    else if (imageCode === 'plough') IconComponent = 'shovel';
    else IconComponent = 'hammer';
  } else if (category === 'textbooks' || ['biology', 'computing'].includes(imageCode)) {
    bgClass = 'bg-[#f9f5eb] text-[#8c6239]';
    IconComponent = 'book';
  } else if (category === 'household items' || imageCode === 'lantern') {
    bgClass = 'bg-[#faf6f0] text-amber-600';
    IconComponent = imageCode === 'lantern' ? 'flame' : 'home';
  } else {
    IconComponent = 'wrench';
  }

  if (!IconComponent) IconComponent = 'wrench';

  return `<div class="icon-placeholder ${bgClass} ${sizeClass || 'h-48 w-full'}">
    <div class="bg-pattern">
      <div style="position:absolute;right:-32px;bottom:-32px;width:128px;height:128px;border-radius:50%;border:4px solid currentColor;opacity:0.1"></div>
      <div style="position:absolute;left:-16px;top:-16px;width:64px;height:64px;border-radius:50%;border:2px solid currentColor;opacity:0.1"></div>
    </div>
    <div class="icon-circle">
      ${icon(IconComponent, 'w-12 h-12')}
    </div>
  </div>`;
}

// ==================== HEADER ====================
function renderHeader(state) {
  const { currentUser, currentTab } = state;
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resources', label: 'Resources' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'admin', label: 'Admin' }
  ];

  const initials = currentUser ? currentUser.name.split(' ').map(n => n[0]).join('') : '';
  const firstLetter = currentUser ? currentUser.name[0] : '';

  return `
  <header class="app-header">
    <div class="container">
      <div class="app-header-inner">
        <!-- Logo -->
        <div class="logo" onclick="APP.changeTab('home')">
          <div class="logo-icon">${icon('handshake', 'w-5 h-5')}</div>
          <span class="logo-text">Baraton <span class="logo-accent">BCRSS</span></span>
        </div>

        <!-- Desktop Nav -->
        <nav class="nav-desktop">
          ${navItems.map(item => `
            <button class="nav-btn ${currentTab === item.id ? 'active' : ''}" onclick="APP.changeTab('${item.id}')">
              <span>${item.label}</span>
              ${item.id === 'admin' ? '<span class="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full"></span>' : ''}
            </button>
          `).join('')}
        </nav>

        <!-- Desktop Actions -->
        <div id="desktop-actions" class="hidden md:flex items-center gap-3">
          ${currentUser ? `
            <button class="share-btn" onclick="APP.openModal('share')">
              ${icon('plus', 'w-4 h-4')}
              <span>Share Resource</span>
            </button>
            <div class="relative" id="profile-dropdown-container">
              <button class="profile-btn" onclick="APP.toggleUserDropdown()">
                <div class="avatar ${currentUser.avatarColor}">${initials}</div>
                ${icon('chevronDown', 'w-4 h-4 text-medium')}
              </button>
              <div id="user-dropdown-menu"></div>
            </div>
          ` : `
            <button class="btn-secondary text-sm" onclick="APP.openModal('login')">Log In</button>
            <button class="btn-primary text-sm px-5" onclick="APP.openModal('register')">Get Started</button>
          `}
        </div>

        <!-- Mobile -->
        <div id="mobile-actions" class="flex md:hidden items-center gap-2">
          ${currentUser ? `
            <div class="avatar-sm ${currentUser.avatarColor}">${firstLetter}</div>
          ` : ''}
          <button class="mobile-menu-btn" onclick="APP.toggleMobileMenu()">
            ${icon('menu', 'w-6 h-6')}
          </button>
        </div>
      </div>
    </div>
    <div id="mobile-drawer" class="${state.mobileMenuOpen ? '' : 'hidden'}"></div>
  </header>`;
}

function renderUserDropdown(state) {
  const { currentUser } = state;
  if (!state.userDropdownOpen) return '';

  return `
  <div class="fixed inset-0 z-30" onclick="APP.toggleUserDropdown()"></div>
  <div class="dropdown-menu">
    <div class="dropdown-header">
      <div class="font-semibold text-dark text-sm break-words">${currentUser.name}</div>
      <div class="text-xs text-stone-500 break-words">${currentUser.email}</div>
      <div class="mt-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-light text-primary">${currentUser.role} Account</div>
    </div>

    <div class="dropdown-section">
      <button class="dropdown-item" onclick="APP.changeTab('admin'); APP.toggleUserDropdown();">
        ${icon('settings', 'w-4 h-4 text-stone-400')}<span>Admin Panel</span>
      </button>
      <button class="dropdown-item" onclick="APP.changeTab('dashboard'); APP.toggleUserDropdown();">
        ${icon('users', 'w-4 h-4 text-stone-400')}<span>My Dashboard</span>
      </button>
    </div>

    <div class="p-1 bg-stone-100/30">
      <button class="w-full text-left px-3.5 py-2.5 text-xs text-red-600 hover:bg-red-50 rounded-xl flex items-center space-x-2.5"
        onclick="APP.handleLogout(); APP.toggleUserDropdown();">
        ${icon('logOut', 'w-3.5 h-3.5')}<span>Log Out</span>
      </button>
    </div>
  </div>`;
}

function renderMobileDrawer(state) {
  const { currentUser, users, currentTab } = state;
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resources', label: 'Resources' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'admin', label: 'Admin' }
  ];

  return `
  <div class="mobile-drawer">
    <div class="space-y-1">
      ${navItems.map(item => `
        <button class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${currentTab === item.id ? 'bg-primary-light text-primary' : 'text-medium hover:bg-[#e2dfd5]/40'}"
          onclick="APP.changeTab('${item.id}'); APP.toggleMobileMenu();">
          ${item.label}
        </button>
      `).join('')}
    </div>

    <div class="pt-4 border-t border-[#e2dfd5] space-y-3 mt-4">
      <button class="w-full py-3 bg-primary text-white font-semibold rounded-xl text-center text-sm"
        onclick="APP.openModal('share'); APP.toggleMobileMenu();">
        Share Resource
      </button>
      <div class="bg-stone-50 rounded-xl p-3">
        <div class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">Active Simulator Role:</div>
        <div class="grid grid-cols-2 gap-1 bg-white p-1 rounded-lg border border-[#e2dfd5]">
          ${users.slice(0, 4).map(user => `
            <button class="px-2 py-1.5 rounded text-[11px] font-medium truncate ${currentUser.id === user.id ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-50'}"
              onclick="APP.switchUser('${user.id}'); APP.toggleMobileMenu();">
              ${user.name.split(' ')[0]}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// ==================== HOME PAGE ====================
function renderHomePage(state) {
  const { resources, jobs, currentUser } = state;
  const latestResources = resources.slice(0, 4);
  const openOpportunities = jobs.filter(j => j.status === 'Open').slice(0, 4);

  return `<div class="min-h-screen bg-[#faf9f6] text-[#2a2925] font-sans selection:bg-primary selection:text-white">

    <!-- 1. Hero -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="space-y-8 text-left">
            <div class="hero-badge">
              ${icon('heart', 'w-4 h-4 fill-current text-primary')}
              <span class="hero-badge-text">Baraton Community</span>
            </div>
            <h1 class="hero-title">Share Resources, <br><span class="hero-title-highlight">Strengthen Community</span></h1>
            <p class="hero-desc">A platform for the Baraton community to share farm tools, textbooks, and discover opportunities — right in your neighborhood. Empower local farms, households, and students.</p>
            <div class="flex flex-col sm:flex-row gap-4 pt-2">
              <button class="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-2xl flex items-center justify-center space-x-2 shadow-md transition-all hover:translate-y-[-2px] active:scale-[0.98]"
                onclick="APP.changeTab('resources')">
                <span>Browse Resources</span>${icon('arrowRight', 'w-5 h-5')}
              </button>
              <button class="px-8 py-4 bg-white border-2 border-[#e2dfd5] hover:border-stone-400 text-stone-700 font-semibold rounded-2xl flex items-center justify-center space-x-2 transition-all hover:bg-stone-50"
                onclick="APP.openModal('share')">
                <span>Share Something</span>
              </button>
            </div>
          </div>
          <div class="hidden lg:block">
            <div class="bento-visual">
              <div class="bento-glow"></div>
              <div class="bento-card" style="transform: rotate(-6deg) translateX(-30px) translateY(-20px);">
                ${renderItemImage('sprayer', 'farm tools', 'h-32 w-64 rounded-xl mb-3')}
                <div class="text-xs font-semibold uppercase text-primary">Farm Equipment</div>
                <div class="font-bold text-sm text-stone-800 mt-1">Knapsack Sprayer</div>
              </div>
              <div class="bento-card" style="transform: rotate(6deg) translateX(40px) translateY(50px);z-index:10;border-color:#d1fae5;">
                ${renderItemImage('biology', 'textbooks', 'h-32 w-64 rounded-xl mb-3')}
                <div class="text-xs font-semibold uppercase text-[#8c6239]">Textbooks</div>
                <div class="font-bold text-sm text-stone-800 mt-1">Biology 101 - Campbell</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Category Cards -->
    <section class="py-16 bg-[#faf9f6] border-t border-b border-[#e2dfd5]">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="feature-card" onclick="APP.changeTab('resources')">
            <div class="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">${icon('shovel', 'w-6 h-6')}</div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-3">Farm Tools &amp; Equipment</h3>
            <p class="text-stone-600 text-sm leading-relaxed">Borrow ploughs, sprayers, wheelbarrows, and more from your neighbors during off-seasons. Reduce costs and increase yields.</p>
          </div>
          <div class="feature-card" onclick="APP.changeTab('resources')">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6">${icon('bookOpen', 'w-6 h-6')}</div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-3">Textbooks &amp; Materials</h3>
            <p class="text-stone-600 text-sm leading-relaxed">Find academic books shared by fellow students. Lend or donate standard reading books or Course texts you no longer need.</p>
          </div>
          <div class="feature-card" onclick="APP.changeTab('jobs')">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">${icon('briefcase', 'w-6 h-6')}</div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-3">Jobs &amp; Opportunities</h3>
            <p class="text-stone-600 text-sm leading-relaxed">Discover local casual labor, farm work gigs, student tutoring, and skills-sharing posts directly within the Baraton area.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. How It Works -->
    <section class="py-20 bg-[#faf9f6]">
      <div class="container text-center">
        <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-3">How It Works</h2>
        <p class="text-stone-500 text-base max-w-md mx-auto mb-16">Simple steps to share and borrow within the community safely and friction-free</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          ${[
            { num: '1', title: 'List a Resource', desc: 'Post your tools, books, or items with photos, condition level, and availability details' },
            { num: '2', title: 'Browse &amp; Discover', desc: 'Search available tools, text resources, or casual jobs listed in Nandi County' },
            { num: '3', title: 'Request to Borrow', desc: 'Send a quick booking request to the owner with your specified lending timeline' },
            { num: '4', title: 'Rate &amp; Review', desc: 'Build community trust by providing fair ratings of your experience and the tools' }
          ].map(step => `
            <div class="flex flex-col items-center">
              <div class="step-number">${step.num}</div>
              <h4 class="font-serif font-bold text-lg text-stone-900 mb-2">${step.title}</h4>
              <p class="text-stone-500 text-xs sm:text-sm max-w-[200px] leading-relaxed">${step.desc}</p>
            </div>
          `).join('')}
          <div class="hidden lg:block absolute" style="left:15%;right:15%;top:24px;height:2px;background:#e7e5e4;z-index:-1"></div>
        </div>
      </div>
    </section>

    <!-- 4. Latest Resources -->
    <section class="py-20 border-t border-[#e2dfd5] bg-stone-50">
      <div class="container">
        <div class="flex justify-between items-end mb-12">
          <div class="text-left">
            <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">Latest Resources</h2>
            <p class="text-stone-500 text-sm mt-1">Recently shared by community members</p>
          </div>
          <button class="group flex items-center space-x-1 text-primary font-semibold text-sm hover:underline" onclick="APP.changeTab('resources')">
            <span>View All</span>${icon('arrowRight', 'w-4 h-4')}
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${latestResources.map(item => renderResourceCard(item, currentUser)).join('')}
        </div>
      </div>
    </section>

    <!-- 5. Open Opportunities -->
    <section class="py-20 bg-white border-t border-[#e2dfd5]">
      <div class="container">
        <div class="flex justify-between items-end mb-12">
          <div class="text-left">
            <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">Open Opportunities</h2>
            <p class="text-stone-500 text-sm mt-1">Jobs &amp; skill-sharing in Baraton neighborhood</p>
          </div>
          <button class="group flex items-center space-x-1 text-primary font-semibold text-sm hover:underline" onclick="APP.changeTab('jobs')">
            <span>View All</span>${icon('arrowRight', 'w-4 h-4')}
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          ${openOpportunities.map(job => renderJobCard(job, currentUser)).join('')}
        </div>
      </div>
    </section>

    <!-- 6. Built on Trust -->
    <section class="py-20 bg-[#faf9f6] border-t border-[#e2dfd5]">
      <div class="container text-center">
        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Built on Trust</h2>
        <p class="text-stone-500 text-base max-w-lg mx-auto mb-12">Our rating system and community moderation ensure a safe and reliable sharing experience.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl border border-[#e2dfd5]">
            <div class="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4">${icon('checkCircle', 'w-6 h-6')}</div>
            <h3 class="font-bold text-stone-800 mb-2">Community Verified</h3>
            <p class="text-stone-500 text-xs text-center max-w-xs leading-relaxed">Connect and exchange within a highly trusted local demographic around the university campus</p>
          </div>
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl border border-[#e2dfd5]">
            <div class="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4">${icon('shieldAlert', 'w-6 h-6')}</div>
            <h3 class="font-bold text-stone-800 mb-2">Moderated Platform</h3>
            <p class="text-stone-500 text-xs text-center max-w-xs leading-relaxed">System and designated managers can audit posts, approve borrows, remove stale listings, or flag issues</p>
          </div>
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl border border-[#e2dfd5]">
            <div class="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4">${icon('award', 'w-6 h-6')}</div>
            <h3 class="font-bold text-stone-800 mb-2">Peer Reviews</h3>
            <p class="text-stone-500 text-xs text-center max-w-xs leading-relaxed">Direct feedback loops and star-ratings given after each completed transaction enforce responsibility</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Footer -->
    <footer class="app-footer">
      <div class="container">
        <div class="flex items-center justify-center space-x-2 mb-6">
          <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
            ${icon('heart', 'w-4 h-4 fill-current')}
          </div>
          <span class="font-serif text-xl font-bold tracking-tight text-white">Baraton Community Resource Sharing System</span>
        </div>
        <p class="footer-text mb-6">Empowering the Baraton community through shared resources &amp; opportunities. Built securely for immediate neighborhood solidarity.</p>
        <div class="footer-meta space-y-1">
          <div>University of Eastern Africa, Baraton — School of Business</div>
          <div>Department of Information Systems and Computing • Nandi County, Kenya</div>
          <div class="footer-divider">&copy; 2026 BCRSS. All rights reserved • Victor Okello.</div>
        </div>
      </div>
    </footer>
  </div>`;
}

// ==================== RESOURCES PAGE ====================
function renderResourcesPage(state) {
  const { resources, currentUser, resourceSearch, resourceCategory, resourceStatus } = state;

  const filtered = resources.filter(item => {
    const term = resourceSearch.toLowerCase();
    const matchesSearch = !term || item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term) ||
      item.ownerName.toLowerCase().includes(term);
    const matchesCategory = resourceCategory === 'All' || item.category === resourceCategory.toLowerCase();
    const matchesStatus = resourceStatus === 'All' || item.status === resourceStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return `<div class="bg-page min-h-screen py-10">
    <div class="container">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 text-left">
        <div>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">Community Resources</h1>
          <p class="text-stone-500 text-sm sm:text-base mt-2">Browse tools, textbooks, and items shared by neighbors</p>
        </div>
        <button class="mt-4 md:mt-0 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all active:scale-95" onclick="APP.openModal('share')">
          ${icon('plus', 'w-4.5 h-4.5')}<span>Share Resource</span>
        </button>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div class="md:col-span-6 search-wrapper">
            ${icon('search', 'w-4.5 h-4.5 search-icon')}
            <input type="text" class="search-input" placeholder="Search resources..." value="${state.resourceSearch}"
              oninput="APP.setResourceSearch(this.value)">
          </div>
          <div class="md:col-span-3">
            <select class="select-field" onchange="APP.setResourceCategory(this.value)">
              <option value="All" ${resourceCategory === 'All' ? 'selected' : ''}>All Categories</option>
              <option value="Farm Tools" ${resourceCategory === 'Farm Tools' ? 'selected' : ''}>Farm Tools</option>
              <option value="Textbooks" ${resourceCategory === 'Textbooks' ? 'selected' : ''}>Textbooks</option>
              <option value="Household Items" ${resourceCategory === 'Household Items' ? 'selected' : ''}>Household Items</option>
            </select>
          </div>
          <div class="md:col-span-3">
            <select class="select-field" onchange="APP.setResourceStatus(this.value)">
              <option value="All" ${resourceStatus === 'All' ? 'selected' : ''}>All Status</option>
              <option value="Available" ${resourceStatus === 'Available' ? 'selected' : ''}>Available</option>
              <option value="Borrowed" ${resourceStatus === 'Borrowed' ? 'selected' : ''}>Borrowed</option>
            </select>
          </div>
        </div>
      </div>

      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">${icon('search', 'w-8 h-8 text-stone-300')}</div>
          <h3 class="font-serif text-lg font-bold text-stone-800">No resources found</h3>
          <p class="text-stone-400 text-sm mt-1 max-w-sm mx-auto">We couldn't find any resources matching your search criteria.</p>
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${filtered.map(item => renderResourceCard(item, currentUser)).join('')}
        </div>
      `}
    </div>
  </div>`;
}

function renderResourceCard(item, currentUser) {
  const isOwner = item.ownerId === currentUser.id;
  const catClass = item.category === 'farm tools' ? 'cat-tag-farm' : item.category === 'textbooks' ? 'cat-tag-textbook' : 'cat-tag-household';

  return `<div class="resource-card group" onclick="event.stopPropagation()">
    <div class="resource-card-image">
      ${renderItemImage(item.imageCode, item.category, 'h-48 w-full')}
      <span class="absolute top-4 left-4 badge ${item.status === 'Available' ? 'badge-available' : 'badge-borrowed'}">${item.status}</span>
      <span class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-stone-200 text-xs font-semibold text-stone-700 shadow-xs">${item.condition}</span>
    </div>
    <div class="resource-card-body">
      <div class="flex items-center space-x-2">
        <span class="cat-tag ${catClass}">${item.category}</span>
        <span class="text-stone-400 text-xs">•</span>
        <span class="text-stone-500 text-xs capitalize font-medium">${item.lendingType}</span>
      </div>
      <h3 class="font-serif text-xl font-bold text-stone-900 mt-3 line-clamp-1">${item.title}</h3>
      <p class="text-stone-600 text-sm mt-2.5 line-clamp-3 leading-relaxed flex-1">${item.description}</p>

      <div class="mt-5 pt-4 border-t border-stone-100 space-y-2.5 text-xs text-stone-500">
        <div class="flex items-center space-x-2 text-stone-600">
          ${icon('mapPin', 'w-4 h-4 text-stone-400 flex-shrink-0')}<span class="truncate">${item.location}</span>
        </div>
        <div class="flex items-center justify-between text-stone-500">
          <div class="flex items-center space-x-1.5">
            ${icon('user', 'w-3.5 h-3.5 text-stone-400')}<span class="font-medium">${isOwner ? 'You (Owner)' : item.ownerName}</span>
          </div>
          <span class="text-stone-400">${item.listedDate}</span>
        </div>
        ${!isOwner ? `
          <div class="bg-stone-50 p-2 rounded-lg border border-stone-200/50 flex justify-between items-center text-[11px] text-stone-500 mt-2">
            <span>Owner Contact:</span><span class="font-mono text-stone-700">${item.ownerContact}</span>
          </div>
        ` : ''}
      </div>

      ${item.status === 'Available'
        ? `<button class="w-full mt-5 py-2.5 text-center text-xs font-semibold rounded-xl transition-all ${isOwner ? 'bg-stone-100 text-stone-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white shadow-xs'}" ${isOwner ? 'disabled' : `onclick="APP.openBorrowModal('${item.id}')"`}>${isOwner ? 'Your Posted Resource' : 'Request to Borrow'}</button>`
        : '<button class="w-full mt-5 py-2.5 text-center text-xs font-semibold rounded-xl bg-stone-100 text-stone-400 cursor-not-allowed" disabled>Currently Borrowed</button>'
      }
    </div>
  </div>`;
}

// ==================== JOBS PAGE ====================
function renderJobsPage(state) {
  const { jobs, currentUser, jobSearch, jobCategory } = state;

  const filtered = jobs.filter(job => {
    const term = jobSearch.toLowerCase();
    const matchesSearch = !term || job.title.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) || job.location.toLowerCase().includes(term) ||
      job.postedBy.toLowerCase().includes(term);
    const matchesCategory = jobCategory === 'All' || job.category === jobCategory;
    return matchesSearch && matchesCategory;
  });

  return `<div class="bg-page min-h-screen py-10">
    <div class="container">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 text-left">
        <div>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">Job &amp; Opportunity Board</h1>
          <p class="text-stone-500 text-sm sm:text-base mt-2">Find work or post opportunities in Baraton neighborhood</p>
        </div>
        <button class="mt-4 md:mt-0 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all active:scale-95" onclick="APP.openModal('postJob')">
          ${icon('plus', 'w-4.5 h-4.5')}<span>Post Opportunity</span>
        </button>
      </div>

      <div class="filter-bar">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div class="md:col-span-8 search-wrapper">
            ${icon('search', 'w-4.5 h-4.5 search-icon')}
            <input type="text" class="search-input" placeholder="Search jobs..." value="${state.jobSearch}"
              oninput="APP.setJobSearch(this.value)">
          </div>
          <div class="md:col-span-4">
            <select class="select-field" onchange="APP.setJobCategory(this.value)">
              <option value="All" ${jobCategory === 'All' ? 'selected' : ''}>All Types</option>
              <option value="Skilled Trade" ${jobCategory === 'Skilled Trade' ? 'selected' : ''}>Skilled Trade</option>
              <option value="Farm Work" ${jobCategory === 'Farm Work' ? 'selected' : ''}>Farm Work</option>
              <option value="Tutoring" ${jobCategory === 'Tutoring' ? 'selected' : ''}>Tutoring</option>
              <option value="Casual Labor" ${jobCategory === 'Casual Labor' ? 'selected' : ''}>Casual Labor</option>
            </select>
          </div>
        </div>
      </div>

      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">${icon('search', 'w-8 h-8 text-stone-300')}</div>
          <h3 class="font-serif text-lg font-bold text-stone-800">No opportunities found</h3>
          <p class="text-stone-400 text-sm mt-1 max-w-sm mx-auto">We couldn't find any job posts.</p>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${filtered.map(job => renderJobCard(job, currentUser)).join('')}
        </div>
      `}
    </div>
  </div>`;
}

function renderJobCard(job, currentUser) {
  const isOwner = job.postedById === currentUser.id;
  const badgeColors = {
    'Skilled Trade': 'bg-orange-50 text-orange-800 border-orange-100',
    'Farm Work': 'bg-emerald-50 text-emerald-800 border-emerald-100',
    'Tutoring': 'bg-indigo-50 text-[#3f51b5] border-indigo-100',
    'Casual Labor': 'bg-amber-50 text-amber-800 border-amber-100'
  };
  const badgeColor = badgeColors[job.category] || 'bg-stone-100 text-stone-800 border-stone-200';

  return `<div class="job-card-white group">
    <div class="flex items-start justify-between">
      <div>
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor} mb-3.5">${job.category}</span>
        <h3 class="font-serif text-xl font-bold text-stone-900 group-hover:text-primary transition-colors leading-tight">${job.title}</h3>
      </div>
      <span class="px-2.5 py-0.5 rounded-full text-xs font-bold border ${job.status === 'Open' ? 'bg-green-50 text-primary border-emerald-100' : 'bg-stone-50 text-stone-400 border-stone-200'}">${job.status}</span>
    </div>
    <p class="text-stone-600 text-sm mt-4 line-clamp-4 leading-relaxed flex-1">${job.description}</p>

    <div class="grid grid-cols-2 gap-y-3.5 gap-x-4 mt-6 pt-4.5 border-t border-stone-100 text-xs text-stone-500">
      <div class="flex items-center space-x-2 text-stone-600">${icon('mapPin', 'w-4 h-4 text-stone-400 flex-shrink-0')}<span class="truncate">${job.location}</span></div>
      <div class="flex items-center space-x-2 justify-end">${icon('dollarSign', 'w-4 h-4 text-primary flex-shrink-0')}<span class="font-semibold text-stone-900">${job.rate}</span></div>
      <div class="flex items-center space-x-2">${icon('clock', 'w-4 h-4 text-stone-400 flex-shrink-0')}<span>Duration: ${job.duration}</span></div>
      <div class="flex items-center space-x-2 justify-end">${icon('user', 'w-3.5 h-3.5 text-stone-400 flex-shrink-0')}<span class="truncate">By ${isOwner ? 'You' : job.postedBy}</span></div>
    </div>

    ${!isOwner ? `
      <div class="bg-[#faf9f6] p-3 rounded-xl border border-[#e2dfd5]/80 text-[11px] text-stone-500 mt-4.5 flex items-center justify-between">
        <div class="flex items-center space-x-1">${icon('info', 'w-3.5 h-3.5 text-stone-400')}<span>Direct phone / email:</span></div>
        <span class="font-mono text-stone-800 font-semibold">${job.contactInfo}</span>
      </div>
    ` : ''}

    ${job.requirements && job.requirements.length > 0 ? `
      <div class="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
        <div class="flex items-center space-x-1.5 mb-2">${icon('alertCircle', 'w-3.5 h-3.5 text-amber-600')}<span class="text-xs font-semibold text-amber-800">Requirements</span></div>
        <ul class="space-y-1 text-xs text-amber-900">
          ${job.requirements.map(r => `<li class="flex items-start space-x-1.5">${icon('check', 'w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5')}<span>${r}</span></li>`).join('')}
        </ul>
      </div>
    ` : ''}

    ${job.status === 'Open'
      ? `<button class="w-full mt-4 py-2.5 text-center text-xs font-semibold rounded-xl transition-all ${isOwner ? 'bg-stone-100 text-stone-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white shadow-xs'}" ${isOwner ? 'disabled' : `onclick="APP.openApplyModal('${job.id}')"`}>${isOwner ? 'Your Posted Gig' : 'Apply / Contact Poster'}</button>`
      : '<button class="w-full mt-4 py-2.5 text-center text-xs font-semibold rounded-xl bg-stone-100 text-stone-400 cursor-not-allowed" disabled>Filled / Closed</button>'
    }
  </div>`;
}

// ==================== DASHBOARD PAGE ====================
function renderDashboardPage(state) {
  const { resources, jobs, requests, currentUser, dashboardSubTab } = state;

  const userResources = resources.filter(r => r.ownerId === currentUser.id);
  const userJobs = jobs.filter(j => j.postedById === currentUser.id);
  const incomingRequests = requests.filter(req => req.ownerId === currentUser.id);
  const outgoingRequests = requests.filter(req => req.requesterId === currentUser.id);
  const pendingIncoming = incomingRequests.filter(r => r.status === 'Pending').length;

  return `<div class="bg-page min-h-screen py-10">
    <div class="container text-left">
      <div class="mb-8">
        <h1 class="font-serif text-4xl font-bold tracking-tight text-stone-900">Dashboard</h1>
        <p class="text-stone-500 text-sm sm:text-base mt-2">Manage your resources, requests, and activity</p>
      </div>

      <!-- Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div class="metric-card flex items-center space-x-4">
          <div class="metric-icon bg-orange-50 text-orange-600">${icon('layers', 'w-6 h-6')}</div>
          <div><div class="text-3xl font-bold text-stone-900">${userResources.length}</div><div class="text-xs font-medium uppercase tracking-wide text-medium">My Resources</div></div>
        </div>
        <div class="metric-card flex items-center space-x-4">
          <div class="metric-icon bg-indigo-50 text-indigo-500">${icon('briefcase', 'w-6 h-6')}</div>
          <div><div class="text-3xl font-bold text-stone-900">${userJobs.length}</div><div class="text-xs font-medium uppercase tracking-wide text-medium">Jobs Posted</div></div>
        </div>
        <div class="metric-card flex items-center space-x-4">
          <div class="metric-icon bg-teal-50 text-teal-600">${icon('arrowRightLeft', 'w-6 h-6')}</div>
          <div><div class="text-3xl font-bold text-stone-900">${incomingRequests.length}</div><div class="text-xs font-medium uppercase tracking-wide text-medium">Borrow Offers</div></div>
        </div>
        <div class="metric-card flex items-center space-x-4">
          <div class="metric-icon bg-amber-50 text-amber-800">${icon('star', 'w-6 h-6')}</div>
          <div><div class="text-3xl font-bold text-stone-900">${outgoingRequests.length}</div><div class="text-xs font-medium uppercase tracking-wide text-medium">Requested Sent</div></div>
        </div>
      </div>

      <!-- Sub Tabs -->
      <div class="sub-tab-bar border-b border-[#e2dfd5] pb-px mb-8">
        ${[
          { id: 'requests', label: 'Borrow Requests', badge: pendingIncoming },
          { id: 'resources', label: 'My Resources' },
          { id: 'jobs', label: 'My Jobs' }
        ].map(tab => `
          <button class="sub-tab-btn ${dashboardSubTab === tab.id ? 'active' : ''}" onclick="APP.setDashboardTab('${tab.id}')">
            ${tab.label}${tab.badge > 0 ? `<span class="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white leading-none">${tab.badge}</span>` : ''}
          </button>
        `).join('')}
      </div>

      <!-- Tab Content -->
      ${dashboardSubTab === 'requests' ? renderDashboardRequests(incomingRequests, outgoingRequests) : ''}
      ${dashboardSubTab === 'resources' ? renderDashboardResources(userResources, state) : ''}
      ${dashboardSubTab === 'jobs' ? renderDashboardJobs(userJobs, state) : ''}
    </div>
  </div>`;
}

function renderDashboardRequests(incoming, outgoing) {
  return `<div class="space-y-10">
    <div class="dashboard-card">
      <h3 class="font-serif text-lg font-bold text-[#1c1c1c] mb-1">Incoming Requests (sent to you)</h3>
      <p class="text-stone-400 text-xs mb-6">Neighbors who want to borrow tools or materials you listed.</p>
      ${incoming.length === 0
        ? '<div class="py-12 text-center text-stone-400 text-sm font-medium">No borrow requests on your items yet</div>'
        : `<div class="divide-y divide-stone-100">${incoming.map(req => `
          <div class="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="space-y-1 text-left">
              <div class="flex items-center space-x-2">
                <span class="font-bold text-stone-800 text-base">${req.itemTitle}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${req.status === 'Pending' ? 'bg-amber-100 text-amber-800' : req.status === 'Approved' ? 'bg-emerald-100 text-primary' : req.status === 'Declined' ? 'bg-red-100 text-red-800' : 'bg-stone-100 text-stone-600'}">${req.status}</span>
              </div>
              <div class="text-xs text-stone-500">Requester: <span class="font-semibold text-stone-700">${req.requesterName}</span> (${req.requesterContact})</div>
              <div class="text-xs text-stone-500">Proposed dates: <span class="font-semibold text-stone-700">${req.startDate}</span> to <span class="font-semibold text-stone-700">${req.endDate}</span></div>
              ${req.message ? `<div class="text-xs text-primary bg-primary-xlight p-2 rounded-lg border border-primary/10 font-sans italic mt-1 max-w-xl">"${req.message}"</div>` : ''}
            </div>
            <div class="flex items-center gap-2">
              ${req.status === 'Pending' ? `
                <button class="btn-approve flex items-center space-x-1" onclick="APP.approveRequest('${req.id}')">${icon('check', 'w-3.5 h-3.5')}<span>Approve</span></button>
                <button class="btn-decline" onclick="APP.declineRequest('${req.id}')">Decline</button>
              ` : ''}
              ${req.status === 'Approved' ? `
                <button class="px-3 py-1.5 bg-primary-light text-primary hover:bg-primary/15 rounded-lg text-xs font-semibold flex items-center space-x-1" onclick="APP.markReturned('${req.id}')">${icon('checkCircle', 'w-3.5 h-3.5')}<span>Mark as Returned</span></button>
              ` : ''}
              ${req.status === 'Returned' ? `<span class="text-xs text-primary font-medium flex items-center space-x-1">${icon('check', 'w-4 h-4')}<span>Lending Cycle Completed</span></span>` : ''}
              ${req.status === 'Declined' ? `<span class="text-xs text-stone-400">Request Declined</span>` : ''}
            </div>
          </div>
        `).join('')}</div>`
      }
    </div>

    <div class="dashboard-card">
      <h3 class="font-serif text-lg font-bold text-[#1c1c1c] mb-1">My Outgoing Requests (you sent)</h3>
      <p class="text-stone-400 text-xs mb-6">Tools and materials you requested from other community members.</p>
      ${outgoing.length === 0
        ? '<div class="py-12 text-center text-stone-400 text-sm font-medium">You haven\'t requested any resources yet.</div>'
        : `<div class="divide-y divide-stone-100">${outgoing.map(req => `
          <div class="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-stone-800 text-base">${req.itemTitle}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${req.status === 'Pending' ? 'bg-amber-100 text-amber-800' : req.status === 'Approved' ? 'bg-emerald-100 text-primary' : req.status === 'Declined' ? 'bg-red-100 text-red-800' : 'bg-stone-100 text-stone-600'}">${req.status}</span>
              </div>
              <div class="text-xs text-stone-500 mt-1">Lending Dates: <span class="font-medium text-stone-700">${req.startDate} — ${req.endDate}</span></div>
            </div>
            ${req.status === 'Approved' ? `
              <div class="bg-[#e8f5e9] p-3 rounded-xl border border-emerald-100 max-w-sm text-left">
                <div class="text-xs font-semibold text-primary flex items-center space-x-1 mb-1">${icon('checkCircle', 'w-3.5 h-3.5')}<span>Request Approved!</span></div>
                <p class="text-[11px] text-stone-600">Please contact the owner to arrange pickup.</p>
              </div>
            ` : ''}
          </div>
        `).join('')}</div>`
      }
    </div>
  </div>`;
}

function renderDashboardResources(userResources, state) {
  return `<div class="dashboard-card">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="font-serif text-lg font-bold text-[#1c1c1c]">Your Listed Resources</h3>
        <p class="text-stone-400 text-xs">Tools, books, and items you made available for sharing</p>
      </div>
      <button class="px-4 py-2 bg-primary hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs" onclick="APP.openModal('share')">
        ${icon('plus', 'w-3.5 h-3.5')}<span>List an Item</span>
      </button>
    </div>
    ${userResources.length === 0
      ? `<div class="py-16 text-center"><p class="text-stone-400 text-sm font-medium">You haven't listed any resources yet.</p><button class="mt-4 px-4 py-2 text-primary border border-dashed border-primary hover:bg-primary-xlight rounded-xl text-xs font-semibold" onclick="APP.openModal('share')">List your first tool or textbook</button></div>`
      : `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${userResources.map(item => `
        <div class="border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
          ${renderItemImage(item.imageCode, item.category, 'h-32 w-full')}
          <div class="p-4 flex-1 flex flex-col text-left">
            <div class="flex items-center justify-between">
              <span class="cat-tag ${item.category === 'farm tools' ? 'cat-tag-farm' : item.category === 'textbooks' ? 'cat-tag-textbook' : 'cat-tag-household'}">${item.category}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.status === 'Available' ? 'bg-[#e8f5e9] text-primary' : 'bg-amber-100 text-amber-800'}">${item.status}</span>
            </div>
            <h4 class="font-serif font-bold text-stone-900 text-base mt-2 truncate">${item.title}</h4>
            <p class="text-xs text-stone-500 line-clamp-2 mt-1 flex-1">${item.description}</p>
            <div class="mt-4 pt-3 border-t border-stone-150 flex items-center justify-between">
              <button class="px-3 py-1.5 bg-[#e2dfd5]/50 hover:bg-[#e2dfd5]/80 text-stone-700 rounded-lg text-[11px] font-semibold" onclick="APP.toggleItemStatus('${item.id}')">Toggle Status</button>
              <span class="text-[10px] text-stone-400">Listed: ${item.listedDate}</span>
            </div>
          </div>
        </div>
      `).join('')}</div>`
    }
  </div>`;
}

function renderDashboardJobs(userJobs, state) {
  return `<div class="dashboard-card">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="font-serif text-lg font-bold text-[#1c1c1c]">Your Posted Opportunities</h3>
        <p class="text-stone-400 text-xs">Casual labor, farm work, and tutoring gigs you advertised</p>
      </div>
      <button class="px-4 py-2 bg-primary hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs" onclick="APP.openModal('postJob')">
        ${icon('plus', 'w-3.5 h-3.5')}<span>Post a Job</span>
      </button>
    </div>
    ${userJobs.length === 0
      ? `<div class="py-16 text-center"><p class="text-stone-400 text-sm font-medium">You haven't posted any job opportunities yet.</p><button class="mt-4 px-4 py-2 text-primary border border-dashed border-primary hover:bg-primary-xlight rounded-xl text-xs font-semibold" onclick="APP.openModal('postJob')">Create your first job post</button></div>`
      : `<div class="divide-y divide-stone-150">${userJobs.map(job => `
        <div class="py-4.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-bold text-stone-800 text-base">${job.title}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${job.status === 'Open' ? 'bg-green-100 text-primary' : 'bg-stone-100 text-stone-500'}">${job.status}</span>
            </div>
            <p class="text-xs text-stone-500 mt-1 max-w-xl">${job.description}</p>
            <div class="text-xs text-stone-400 mt-2 flex items-center space-x-4">
              <span>Rate: <span class="font-semibold text-stone-700">${job.rate}</span></span><span>•</span><span>Location: <span class="font-semibold text-stone-700">${job.location}</span></span>
            </div>
            ${job.requirements && job.requirements.length > 0 ? `
              <div class="mt-2 flex flex-wrap gap-1">
                ${job.requirements.map(r => `<span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">${r}</span>`).join('')}
              </div>
            ` : ''}
          </div>
          <button class="px-3.5 py-1.5 rounded-lg text-xs font-semibold ${job.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-primary'}" onclick="APP.toggleJobStatus('${job.id}')">${job.status === 'Open' ? 'Mark as Filled' : 'Reopen Post'}</button>
        </div>
      `).join('')}</div>`
    }
  </div>`;
}

// ==================== ADMIN PAGE ====================
function renderAdminPage(state) {
  const { resources, jobs, requests, users, reviews, adminTab } = state;
  const totalResources = resources.length;
  const availableResources = resources.filter(r => r.status === 'Available').length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(j => j.status === 'Open').length;
  const totalReviews = reviews.length;

  return `<div class="bg-page min-h-screen py-10">
    <div class="container text-left">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-12 h-12 rounded-xl bg-emerald-100 text-primary flex items-center justify-center">${icon('shield', 'w-6 h-6')}</div>
        <div>
          <h1 class="font-serif text-4xl font-bold tracking-tight text-stone-900">Admin Dashboard</h1>
          <p class="text-stone-500 text-sm">Baraton CRSS — Platform Management</p>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="metric-card flex justify-between items-center">
          <div><span class="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Total Resources</span><div class="text-3xl font-bold text-stone-900">${totalResources}</div><span class="text-stone-500 text-xs mt-1 block">${availableResources} available</span></div>
          <div class="w-10 h-10 rounded-lg bg-stone-50 text-stone-400 flex items-center justify-center border border-stone-200">${icon('clipboard', 'w-5 h-5')}</div>
        </div>
        <div class="metric-card flex justify-between items-center">
          <div><span class="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Borrow Requests</span><div class="text-3xl font-bold text-stone-900">${totalRequests}</div><span class="text-stone-500 text-xs mt-1 block">${pendingRequests} pending</span></div>
          <div class="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center border border-emerald-100">${icon('refreshCw', 'w-5 h-5 animate-spin-slow')}</div>
        </div>
        <div class="metric-card flex justify-between items-center">
          <div><span class="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Jobs Posted</span><div class="text-3xl font-bold text-stone-900">${totalJobs}</div><span class="text-stone-500 text-xs mt-1 block">${openJobs} open</span></div>
          <div class="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">${icon('users', 'w-5 h-5')}</div>
        </div>
        <div class="metric-card flex justify-between items-center">
          <div><span class="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Reviews</span><div class="text-3xl font-bold text-stone-900">${totalReviews}</div><span class="text-stone-500 text-xs mt-1 block">${totalReviews === 0 ? 'No reviews yet' : 'Trust score: 4.8★'}</span></div>
          <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">${icon('star', 'w-5 h-5 text-amber-400 fill-current')}</div>
        </div>
      </div>

      <!-- Admin Tabs -->
      <div class="flex flex-wrap gap-1 border-b border-[#e2dfd5] pb-px mb-8">
        ${[
          { id: 'resources', label: 'Resources', count: resources.length },
          { id: 'requests', label: 'Borrow Requests', count: requests.length },
          { id: 'jobs', label: 'Jobs', count: jobs.length },
          { id: 'users', label: 'Users', count: users.length },
          { id: 'reviews', label: 'Reviews', count: reviews.length }
        ].map(tab => `
          <button class="admin-tab-btn ${adminTab === tab.id ? 'active' : ''}" onclick="APP.setAdminTab('${tab.id}')">
            ${tab.label}<span class="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-stone-100 text-stone-600 font-bold border border-stone-200">${tab.count}</span>
          </button>
        `).join('')}
      </div>

      <!-- Search -->
      <div class="search-wrapper mb-6">
        ${icon('search', 'search-icon w-4 h-4')}
        <input type="text" class="search-input" placeholder="Search ${adminTab}..." value="${state.adminSearch}"
          oninput="APP.setAdminSearch(this.value)">
      </div>

      ${adminTab === 'resources' ? renderAdminResources(state) : ''}
      ${adminTab === 'requests' ? renderAdminRequests(state) : ''}
      ${adminTab === 'jobs' ? renderAdminJobs(state) : ''}
      ${adminTab === 'users' ? renderAdminUsers(users) : ''}
      ${adminTab === 'reviews' ? renderAdminReviews(reviews) : ''}
    </div>
  </div>`;
}

function renderAdminResources(state) {
  const { resources, adminSearch } = state;
  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
    r.ownerName.toLowerCase().includes(adminSearch.toLowerCase()) ||
    r.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return `<div class="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
    <table class="data-table">
      <thead><tr>
        <th>Title</th><th>Category</th><th>Owner</th><th>Status</th><th>Listed</th><th class="text-right">Actions</th>
      </tr></thead>
      <tbody>
        ${filtered.length === 0
          ? '<tr><td colspan="6" class="px-6 py-12 text-center text-stone-400">No resources found</td></tr>'
          : filtered.map(item => `
            <tr>
              <td class="font-semibold text-stone-800">${item.title}</td>
              <td><span class="cat-tag ${item.category === 'farm tools' ? 'cat-tag-farm' : item.category === 'textbooks' ? 'cat-tag-textbook' : 'cat-tag-household'}">${item.category}</span></td>
              <td class="text-stone-600">${item.ownerName}</td>
              <td>
                <select class="select-field-sm" onchange="APP.toggleItemStatus('${item.id}')">
                  <option value="Available" ${item.status === 'Available' ? 'selected' : ''}>Available</option>
                  <option value="Borrowed" ${item.status === 'Borrowed' ? 'selected' : ''}>Borrowed</option>
                </select>
              </td>
              <td class="text-xs text-stone-500">${item.listedDate}</td>
              <td class="text-right"><button class="btn-danger-sm" onclick="APP.deleteResource('${item.id}')">${icon('trash2', 'w-4 h-4')}</button></td>
            </tr>
          `).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderAdminRequests(state) {
  const { requests, adminSearch } = state;
  const filtered = requests.filter(r =>
    r.itemTitle.toLowerCase().includes(adminSearch.toLowerCase()) ||
    r.requesterName.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return `<div class="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
    <table class="data-table">
      <thead><tr>
        <th>Item</th><th>Requester</th><th>Dates Proposed</th><th>Status</th><th class="text-right">Actions</th>
      </tr></thead>
      <tbody>
        ${filtered.length === 0
          ? '<tr><td colspan="5" class="px-6 py-12 text-center text-stone-400">No requests found</td></tr>'
          : filtered.map(req => `
            <tr>
              <td class="font-semibold text-stone-800">${req.itemTitle}</td>
              <td class="text-stone-600"><div>${req.requesterName}</div><div class="text-[11px] text-stone-400">${req.requesterContact}</div></td>
              <td class="text-xs text-stone-500">${req.startDate} to ${req.endDate}</td>
              <td><span class="badge-sm ${req.status === 'Pending' ? 'bg-amber-100 text-amber-800' : req.status === 'Approved' ? 'bg-emerald-100 text-primary' : req.status === 'Declined' ? 'bg-red-100 text-red-800' : 'bg-stone-100 text-stone-600'}">${req.status}</span></td>
              <td class="text-right"><button class="btn-danger-sm" onclick="APP.deleteRequest('${req.id}')">${icon('trash2', 'w-4 h-4')}</button></td>
            </tr>
          `).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderAdminJobs(state) {
  const { jobs, adminSearch } = state;
  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
    j.postedBy.toLowerCase().includes(adminSearch.toLowerCase()) ||
    j.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return `<div class="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
    <table class="data-table">
      <thead><tr>
        <th>Title</th><th>Type/Category</th><th>Posted By</th><th>Rate</th><th>Status</th><th class="text-right">Actions</th>
      </tr></thead>
      <tbody>
        ${filtered.length === 0
          ? '<tr><td colspan="6" class="px-6 py-12 text-center text-stone-400">No jobs listed</td></tr>'
          : filtered.map(job => `
            <tr>
              <td class="font-semibold text-stone-800">${job.title}</td>
              <td><span class="text-[11px] font-semibold text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-100">${job.category}</span></td>
              <td class="text-stone-600">${job.postedBy}</td>
              <td class="text-xs text-stone-600 font-medium">${job.rate}</td>
              <td>
                <select class="select-field-sm" onchange="APP.toggleJobStatus('${job.id}')">
                  <option value="Open" ${job.status === 'Open' ? 'selected' : ''}>Open</option>
                  <option value="Filled" ${job.status === 'Filled' ? 'selected' : ''}>Filled</option>
                </select>
              </td>
              <td class="text-right"><button class="btn-danger-sm" onclick="APP.deleteJob('${job.id}')">${icon('trash2', 'w-4 h-4')}</button></td>
            </tr>
          `).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderAdminUsers(users) {
  return `<div class="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
    <table class="data-table">
      <thead><tr>
        <th>Name</th><th>Email</th><th>Location</th><th>Contact</th><th>Role</th>
      </tr></thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td class="font-bold text-stone-800 flex items-center space-x-2">
              <div class="avatar-sm ${user.avatarColor}">${user.name[0]}</div>
              <span>${user.name}</span>
            </td>
            <td class="text-stone-600 font-mono text-xs">${user.email}</td>
            <td class="text-stone-600">${user.location}</td>
            <td class="text-stone-500 text-xs font-mono">${user.contact}</td>
            <td><span class="badge-sm ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-stone-100 text-stone-600'}">${user.role}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderAdminReviews(reviews) {
  return `<div class="bg-white rounded-2xl border border-[#e2dfd5] p-6 shadow-xs max-w-3xl">
    <h3 class="font-serif text-lg font-bold text-[#1c1c1c] mb-6">Peer Exchange Ratings</h3>
    ${reviews.length === 0
      ? '<div class="py-12 text-center text-stone-400">No reviews have been left yet.</div>'
      : `<div class="space-y-6">${reviews.map(rev => `
        <div class="p-4 bg-[#faf9f6] border border-stone-200 rounded-xl space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="font-semibold text-stone-800 text-sm">${rev.reviewerName}</span>
              <span class="text-[10px] text-stone-400 capitalize bg-stone-100 border border-stone-200/50 rounded-sm px-1.5 py-px">${rev.reviewerRole}</span>
            </div>
            <span class="text-xs text-stone-400">${rev.date}</span>
          </div>
          <div class="flex items-center space-x-0.5">
            ${Array.from({length: 5}).map((_, i) => `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${i < rev.rating ? '#fbbf24' : 'none'}" stroke="${i < rev.rating ? '#fbbf24' : '#e7e5e4'}" stroke-width="2" class="w-4 h-4">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            `).join('')}
          </div>
          <p class="text-stone-600 text-xs italic font-serif leading-relaxed">"${rev.comment}"</p>
          <div class="text-[10px] text-stone-400">User reviewed: <span class="font-semibold text-stone-600">${rev.targetName}</span></div>
        </div>
      `).join('')}</div>`
    }
  </div>`;
}

// ==================== MODALS ====================
function renderShareModal(state) {
  const { currentUser } = state;
  return `
  <div class="modal-overlay">
    <div class="modal-backdrop" onclick="APP.closeModal()"></div>
    <div class="modal-container">
      <div class="modal-panel modal-panel-lg">
        <div class="modal-header">
          <h3 class="font-serif text-2xl font-bold text-stone-900">Share a Resource</h3>
          <button class="modal-close" onclick="APP.closeModal()">${icon('x', 'w-6 h-6')}</button>
        </div>
        <form class="modal-body" id="share-form" onsubmit="APP.handleShareResource(event)">
          <div class="space-y-1 text-left">
            <label class="form-label">Title *</label>
            <input type="text" class="input-field" id="share-title" placeholder="e.g. Hand Plough, Biology 101 Textbook" required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1 text-left">
              <label class="form-label">Category *</label>
              <select class="select-field" id="share-category">
                <option value="farm tools">Farm Tools</option>
                <option value="textbooks">Textbooks</option>
                <option value="household items">Household Items</option>
              </select>
            </div>
            <div class="space-y-1 text-left">
              <label class="form-label">Condition *</label>
              <select class="select-field" id="share-condition">
                <option value="Excellent">Excellent</option>
                <option value="Good" selected>Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Description *</label>
            <textarea class="textarea-field" id="share-description" rows="3" placeholder="Describe the item, how it can be used..." required></textarea>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1 text-left">
              <label class="form-label">Lending Type *</label>
              <select class="select-field" id="share-lending-type">
                <option value="Borrowing">For Borrowing</option>
                <option value="Donation">For Donation</option>
              </select>
            </div>
            <div class="space-y-1 text-left">
              <label class="form-label">Location *</label>
              <input type="text" class="input-field" id="share-location" placeholder="e.g. Near UEAB Main Gate" required>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1 text-left">
              <label class="form-label">Your Name *</label>
              <input type="text" class="input-field" id="share-owner-name" value="${currentUser ? currentUser.name : ''}" required>
            </div>
            <div class="space-y-1 text-left">
              <label class="form-label">Contact *</label>
              <input type="text" class="input-field" id="share-owner-contact" value="${currentUser ? currentUser.contact : ''}" required>
            </div>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Photos</label>
            <div class="upload-zone">
              ${icon('imagePlus', 'w-8 h-8 text-stone-400 mb-2')}
              <span class="text-xs font-semibold text-stone-500">Add Photos</span>
              <span class="text-[10px] text-stone-400 mt-1">PNG or JPEG up to 5MB (Illustrative icon fallback auto-assigned)</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" onclick="APP.closeModal()">Cancel</button>
            <button type="submit" class="btn-primary">List Resource</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}

function renderPostJobModal(state) {
  const { currentUser } = state;
  return `
  <div class="modal-overlay">
    <div class="modal-backdrop" onclick="APP.closeModal()"></div>
    <div class="modal-container">
      <div class="modal-panel modal-panel-md">
        <div class="modal-header">
          <h3 class="font-serif text-2xl font-bold text-stone-900">Post an Opportunity</h3>
          <button class="modal-close" onclick="APP.closeModal()">${icon('x', 'w-6 h-6')}</button>
        </div>
        <form class="modal-body" id="post-job-form" onsubmit="APP.handlePostJob(event)">
          <div class="space-y-1 text-left">
            <label class="form-label">Job Title *</label>
            <input type="text" class="input-field" id="job-title" placeholder="e.g. Farm Hand for Harvesting" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Category *</label>
            <select class="select-field" id="job-category">
              <option value="Skilled Trade">Skilled Trade</option>
              <option value="Farm Work" selected>Farm Work</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Casual Labor">Casual Labor</option>
            </select>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Description *</label>
            <textarea class="textarea-field" id="job-description" rows="3" placeholder="Provide details about the work..." required></textarea>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1 text-left">
              <label class="form-label">Location *</label>
              <input type="text" class="input-field" id="job-location" placeholder="e.g. Near Library, Upper Baraton" required>
            </div>
            <div class="space-y-1 text-left">
              <label class="form-label">Rate *</label>
              <input type="text" class="input-field" id="job-rate" placeholder="e.g. KSh 1,500/day" required>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1 text-left">
              <label class="form-label">Duration *</label>
              <input type="text" class="input-field" id="job-duration" placeholder="e.g. 2 days, Ongoing" required>
            </div>
            <div class="space-y-1 text-left">
              <label class="form-label">Contact Info *</label>
              <input type="text" class="input-field" id="job-contact" value="${currentUser ? currentUser.contact : ''}" required>
            </div>
          </div>
          <div class="space-y-3 text-left mt-2 pt-4 border-t border-stone-200">
            <div class="flex items-center justify-between">
              <label class="form-label mb-0">Job Requirements</label>
              <span class="text-xs text-stone-400">Add any documents, tools, or skills needed</span>
            </div>
            <div id="requirements-container">
              <div class="requirement-row flex items-center gap-2">
                <input type="text" class="requirement-input input-field" placeholder="e.g. Bring your own tools, Valid ID required, KCSE certificate...">
                <button type="button" class="text-stone-400 hover:text-red-500 transition-colors" onclick="APP.removeRequirementRow(this)" title="Remove">${icon('x', 'w-4 h-4')}</button>
              </div>
            </div>
            <button type="button" class="text-xs font-semibold text-primary hover:text-primary-hover flex items-center space-x-1 mt-1" onclick="APP.addRequirementRow()">
              ${icon('plus', 'w-3.5 h-3.5')}<span>Add another requirement</span>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" onclick="APP.closeModal()">Cancel</button>
            <button type="submit" class="btn-primary">Post Gigs Opportunity</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}

function renderBorrowModal(state) {
  const { borrowItemTarget, currentUser } = state;
  if (!borrowItemTarget) return '';

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const defaultEnd = new Date();
  defaultEnd.setDate(defaultEnd.getDate() + 4);
  const defaultEndStr = defaultEnd.toISOString().split('T')[0];

  return `
  <div class="modal-overlay">
    <div class="modal-backdrop" onclick="APP.closeModal()"></div>
    <div class="modal-container">
      <div class="modal-panel modal-panel-sm">
        <div class="modal-header">
          <div>
            <h3 class="font-serif text-xl font-bold text-stone-900">Request to Borrow</h3>
            <p class="text-xs text-stone-500 mt-1">Lending item: <span class="font-semibold text-stone-700">${borrowItemTarget.title}</span></p>
          </div>
          <button class="modal-close" onclick="APP.closeModal()">${icon('x', 'w-5 h-5')}</button>
        </div>
        <form class="modal-body" id="borrow-form" onsubmit="APP.handleBorrowRequest(event)">
          <div class="bg-primary-xlight p-3.5 rounded-xl border border-primary/15 text-xs text-stone-600 space-y-1">
            <div>Lender Name: <span class="font-bold text-stone-800">${borrowItemTarget.ownerName}</span></div>
            <div>Pick up area: <span class="font-semibold text-stone-700">${borrowItemTarget.location}</span></div>
            <div class="text-[10px] text-stone-400">Your registered contact numbers will be shared with the owner for security.</div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1 text-left">
              <label class="form-label">Start Date *</label>
              <input type="date" class="input-field-sm" id="borrow-start" value="${tomorrowStr}" required>
            </div>
            <div class="space-y-1 text-left">
              <label class="form-label">Return Date *</label>
              <input type="date" class="input-field-sm" id="borrow-end" value="${defaultEndStr}" required>
            </div>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Message to Lender *</label>
            <textarea class="textarea-field-sm" id="borrow-message" rows="3" placeholder="e.g., I need this for my farm. I will pick it up on Saturday..." required></textarea>
          </div>
          <div class="flex items-start space-x-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500">
            ${icon('heart', 'w-4 h-4 text-primary flex-shrink-0 mt-0.5')}
            <span>By making a request, you agree to treat this item with care and return it on or before the specified date.</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary-sm" onclick="APP.closeModal()">Cancel</button>
            <button type="submit" class="btn-primary-sm">Send Borrow Request</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}

function renderApplyModal(state) {
  const { applyJobTarget, currentUser } = state;
  if (!applyJobTarget) return '';

  return `
  <div class="modal-overlay">
    <div class="modal-backdrop" onclick="APP.closeModal()"></div>
    <div class="modal-container">
      <div class="modal-panel modal-panel-sm">
        <div class="modal-header">
          <div>
            <h3 class="font-serif text-xl font-bold text-stone-900">Contact &amp; Apply</h3>
            <p class="text-xs text-stone-500 mt-0.5">Opportunity: <span class="font-semibold text-stone-700">${applyJobTarget.title}</span></p>
          </div>
          <button class="modal-close" onclick="APP.closeModal()">${icon('x', 'w-5 h-5')}</button>
        </div>
        <form class="modal-body" id="apply-form" onsubmit="APP.handleApplyJob(event)">
          <div class="bg-amber-50/60 p-4 rounded-xl border border-amber-200/50 text-xs text-stone-700 space-y-2">
            <div class="flex items-center justify-between">
              <div>Posted by: <span class="font-bold text-stone-900">${applyJobTarget.postedBy}</span></div>
              <div class="flex items-center text-primary font-semibold gap-1">${icon('phone', 'w-3 h-3')}<span>${applyJobTarget.contactInfo}</span></div>
            </div>
            <div class="text-[11px] text-stone-500">Rate Offered: <span class="font-semibold text-stone-800">${applyJobTarget.rate}</span> (Duration: ${applyJobTarget.duration})</div>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Your Cover Note *</label>
            <textarea class="textarea-field-sm" id="apply-pitch" rows="4" placeholder="Describe your match for this job..." required></textarea>
          </div>
          <p class="text-[11px] text-stone-400">Note: Submitting sends an in-app trigger. You should also call or text the number above.</p>
          <div class="modal-footer">
            <button type="button" class="btn-secondary-sm" onclick="APP.closeModal()">Cancel</button>
            <button type="submit" class="btn-primary-sm flex items-center space-x-1">${icon('send', 'w-3.5 h-3.5')}<span>Submit Application</span></button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}

// ==================== AUTH MODALS ====================
function renderLoginModal(state) {
  return `
  <div class="modal-overlay">
    <div class="modal-backdrop" onclick="APP.closeModal()"></div>
    <div class="modal-container">
      <div class="modal-panel modal-panel-sm">
        <div class="modal-header">
          <h3 class="font-serif text-2xl font-bold text-stone-900">Welcome Back</h3>
          <button class="modal-close" onclick="APP.closeModal()">${icon('x', 'w-6 h-6')}</button>
        </div>
        <form class="modal-body space-y-4" id="login-form" onsubmit="APP.handleLogin(event)">
          <div class="space-y-1 text-left">
            <label class="form-label">Username</label>
            <input type="text" class="input-field" id="login-username" placeholder="Enter your username" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Password</label>
            <input type="password" class="input-field" id="login-password" placeholder="••••••••" required>
          </div>
          <div class="modal-footer pt-2">
            <button type="button" class="text-sm font-medium text-stone-500 hover:text-stone-800" onclick="APP.openModal('register')">Need an account? Sign up</button>
            <button type="submit" class="btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}

function renderRegisterModal(state) {
  return `
  <div class="modal-overlay">
    <div class="modal-backdrop" onclick="APP.closeModal()"></div>
    <div class="modal-container">
      <div class="modal-panel modal-panel-md">
        <div class="modal-header">
          <h3 class="font-serif text-2xl font-bold text-stone-900">Create Account</h3>
          <button class="modal-close" onclick="APP.closeModal()">${icon('x', 'w-6 h-6')}</button>
        </div>
        <form class="modal-body grid grid-cols-1 sm:grid-cols-2 gap-4" id="register-form" onsubmit="APP.handleRegister(event)">
          <div class="space-y-1 text-left">
            <label class="form-label">Username *</label>
            <input type="text" class="input-field" id="reg-username" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Email *</label>
            <input type="email" class="input-field" id="reg-email" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">First Name *</label>
            <input type="text" class="input-field" id="reg-first-name" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Last Name *</label>
            <input type="text" class="input-field" id="reg-last-name" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Location *</label>
            <input type="text" class="input-field" id="reg-location" placeholder="e.g. Upper Baraton" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Contact *</label>
            <input type="text" class="input-field" id="reg-contact" placeholder="+254..." required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Password *</label>
            <input type="password" class="input-field" id="reg-password" required>
          </div>
          <div class="space-y-1 text-left">
            <label class="form-label">Confirm Password *</label>
            <input type="password" class="input-field" id="reg-password-confirm" required>
          </div>
          <div class="sm:col-span-2 modal-footer mt-2">
            <button type="button" class="text-sm font-medium text-stone-500 hover:text-stone-800" onclick="APP.openModal('login')">Already have an account? Log in</button>
            <button type="submit" class="btn-primary">Register Account</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}
