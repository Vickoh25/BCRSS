/**
 * BCRSS - Component Renderers (2026 Redesign)
 * All UI component rendering functions and SVG icons
 */

// ==================== SVG ICONS (Lucide style) ====================
const Icons = {
  handshake: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M11 17a1 1 0 0 1-1 1H5l-2-4V6l2-2h4l2 2"/><path d="M13 6l2-2h4l2 4v8l-2 2h-4"/><path d="M11 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="m11 2-2 2v16l2 2"/><path d="M19 10v.5a2.5 2.5 0 0 1-5 0V10"/></svg>',
  heart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  arrowUpRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  dollarSign: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m6 9 6 6 6-6"/></svg>',
  chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m9 18 6-6-6-6"/></svg>',
  settings: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  logOut: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
  shovel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 22v-5l5-5 5 5-5 5Z"/><path d="M9.5 14.5 16 8"/><path d="m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2"/></svg>',
  bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  briefcase: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  wrench: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  clipboard: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
  refreshCw: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>',
  trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  trash2: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="20 6 9 17 4 12"/></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  messageSquare: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  imagePlus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 12v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6"/><line x1="15" x2="21" y1="6" y2="6"/><line x1="18" x2="18" y1="3" y2="9"/><circle cx="9" cy="13" r="2"/></svg>',
  hammer: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m15 12-8 8a4.7 4.7 0 0 1-6-6l8-8"/><path d="M12 3l6 6"/><path d="m15 6 3 3"/><path d="M9 12l6 6"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  flame: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
  layers: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m12 3 7 4-7 4-7-4 7-4Z"/><path d="m5 10 7 4 7-4"/><path d="m5 16 7 4 7-4"/></svg>',
  arrowRightLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>',
  alertCircle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
  award: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  shieldAlert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  send: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  globe: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  externalLink: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>',
  quote: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="icon"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>',
  thumbsUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>',
};

// ==================== ICON HELPER ====================
function icon(name, sizeClass = 'w-5 h-5') {
  const svg = Icons[name];
  if (!svg) return Icons.info;
  return svg.replace('class="icon"', `class="${sizeClass}"`);
}

// ==================== ITEM IMAGE PLACEHOLDER ====================
function renderItemImage(imageCode, category, sizeClass) {
  let bgClass = 'bg-[#f5f4ef] text-neutral-400';
  let IconComponent = null;

  if (category === 'farm tools' || ['sprayer', 'plough', 'wheelbarrow'].includes(imageCode)) {
    bgClass = 'bg-[#f0f7f2] text-primary';
    IconComponent = imageCode === 'sprayer' ? 'wrench' : imageCode === 'plough' ? 'shovel' : 'hammer';
  } else if (category === 'textbooks' || ['biology', 'computing'].includes(imageCode)) {
    bgClass = 'bg-[#f9f5eb] text-[#8c6239]';
    IconComponent = 'book';
  } else if (category === 'household items' || imageCode === 'lantern') {
    bgClass = 'bg-[#faf6f0] text-amber-600';
    IconComponent = imageCode === 'lantern' ? 'flame' : 'home';
  } else {
    IconComponent = 'wrench';
    bgClass = 'bg-[#f5f4ef] text-neutral-400';
  }

  return `<div class="icon-placeholder ${bgClass} ${sizeClass || 'h-44 w-full'}">
    <div class="icon-circle">
      ${icon(IconComponent, 'w-10 h-10')}
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
    { id: 'dashboard', label: 'Dashboard' }
  ];
  if (currentUser && currentUser.role === 'Admin') {
    navItems.push({ id: 'admin', label: 'Admin' });
  }

  const initials = currentUser
    ? currentUser.name.split(' ').map(n => n[0]).join('')
    : '';
  const firstLetter = currentUser ? currentUser.name[0] : '';

  return `
  <header class="app-header" id="app-header">
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
          </button>
        `).join('')}
      </nav>

      <!-- Desktop Actions -->
      <div class="header-actions">
        ${currentUser ? `
          <button class="share-btn" onclick="APP.openModal('share')">
            ${icon('plus', 'w-4 h-4')}
            <span>Share Resource</span>
          </button>
          <div class="relative" style="position:relative">
            <button class="profile-btn" onclick="APP.toggleUserDropdown()">
              <div class="avatar ${currentUser.avatarColor}">${initials}</div>
              ${icon('chevronDown', 'w-4 h-4')}
            </button>
            <div id="user-dropdown-menu"></div>
          </div>
        ` : `
          <button class="btn btn-ghost" onclick="APP.openModal('login')">Log In</button>
          <button class="btn btn-primary" onclick="APP.openModal('register')">Get Started</button>
        `}
      </div>

      <!-- Mobile -->
      <div class="mobile-actions md:hidden">
        ${currentUser ? `
          <div class="avatar-sm ${currentUser.avatarColor}">${firstLetter}</div>
        ` : ''}
        <button class="mobile-menu-btn" onclick="APP.toggleMobileMenu()">
          ${icon('menu', 'w-5 h-5')}
        </button>
      </div>
    </div>
    <div id="mobile-drawer" class="${state.mobileMenuOpen ? '' : 'hidden'}"></div>
  </header>`;
}

function renderUserDropdown(state) {
  const { currentUser } = state;
  if (!state.userDropdownOpen || !currentUser) return '';

  return `
  <div class="dropdown-overlay" onclick="APP.toggleUserDropdown()"></div>
  <div class="dropdown-menu">
    <div class="dropdown-header">
      <div class="font-semibold" style="color:var(--color-text);font-size:var(--fs-sm);word-break:break-word">${currentUser.name}</div>
      <div class="text-xs" style="color:var(--color-text-tertiary);word-break:break-word">${currentUser.email}</div>
      <div style="margin-top:var(--space-2);display:inline-flex;padding:2px 8px;border-radius:9999px;font-size:10px;font-weight:600;background:var(--color-primary-light);color:var(--color-primary)">${currentUser.role} Account</div>
    </div>

    <div class="dropdown-section">
      <button class="dropdown-item" onclick="APP.changeTab('dashboard'); APP.toggleUserDropdown();">
        ${icon('users', 'w-4 h-4')}<span>My Dashboard</span>
      </button>
      ${currentUser.role === 'Admin' ? `
      <button class="dropdown-item" onclick="APP.changeTab('admin'); APP.toggleUserDropdown();">
        ${icon('settings', 'w-4 h-4')}<span>Admin Panel</span>
      </button>` : ''}
    </div>

    <div style="padding:var(--space-1);border-top:1px solid var(--color-border-light)">
      <button class="dropdown-item" style="color:var(--color-error)"
        onclick="APP.handleLogout(); APP.toggleUserDropdown();">
        ${icon('logOut', 'w-4 h-4')}<span>Log Out</span>
      </button>
    </div>
  </div>`;
}

function renderMobileDrawer(state) {
  const { currentUser, currentTab } = state;
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resources', label: 'Resources' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'admin', label: 'Admin' }
  ];

  return `
  <div class="mobile-drawer">
    <div style="display:flex;flex-direction:column;gap:var(--space-1)">
      ${navItems.map(item => `
        <button style="width:100%;text-align:left;padding:var(--space-2) var(--space-3);border-radius:var(--radius-md);font-size:var(--fs-sm);font-weight:500;border:none;cursor:pointer;transition:all var(--duration-fast) ease;font-family:var(--font-sans);${currentTab === item.id ? 'background:var(--color-primary-light);color:var(--color-primary);' : 'background:transparent;color:var(--color-text-secondary);'}"
          onclick="APP.changeTab('${item.id}'); APP.toggleMobileMenu();">
          ${item.label}
        </button>
      `).join('')}
    </div>

    <div style="padding-top:var(--space-4);border-top:1px solid var(--color-border-light);margin-top:var(--space-4);display:flex;flex-direction:column;gap:var(--space-3)">
      <button class="btn btn-primary w-full" style="width:100%;justify-content:center"
        onclick="APP.openModal('share'); APP.toggleMobileMenu();">
        ${icon('plus', 'w-4 h-4')}<span>Share Resource</span>
      </button>
      ${!currentUser ? `
        <button class="btn btn-secondary w-full" style="width:100%;justify-content:center"
          onclick="APP.openModal('login'); APP.toggleMobileMenu();">
          Log In
        </button>
      ` : ''}
    </div>

    ${currentUser ? `
    <div style="padding-top:var(--space-3);margin-top:var(--space-3);border-top:1px solid var(--color-border-light)">
      <button class="dropdown-item" style="color:var(--color-error)"
        onclick="APP.handleLogout(); APP.toggleMobileMenu();">
        ${icon('logOut', 'w-4 h-4')}<span>Log Out</span>
      </button>
    </div>` : ''}
  </div>`;
}

// ==================== HOME PAGE ====================
function renderHomePage(state) {
  const { resources, jobs, currentUser } = state;
  const latestResources = resources.slice(0, 4);
  const openOpportunities = jobs.filter(j => j.status === 'Open').slice(0, 4);
  const stats = BCRSS.STATISTICS || {
    shared: '2,300+', sharedLabel: 'Resources Shared',
    students: '600+', studentsLabel: 'Students',
    tools: '450+', toolsLabel: 'Farm Tools',
    jobsPosted: '150+', jobsPostedLabel: 'Jobs Posted'
  };
  const testimonials = BCRSS.TESTIMONIALS || [];

  return `<div class="min-h-screen">

    <!-- 1. HERO -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div style="display:flex;flex-direction:column;gap:var(--space-6)">
            <div class="hero-badge">
              ${icon('heart', 'w-3.5 h-3.5')}
              <span class="hero-badge-text">Baraton Community</span>
            </div>
            <h1 class="hero-title">Share Resources,<br><span class="hero-title-highlight">Strengthen Community</span></h1>
            <p class="hero-desc">A platform for the Baraton community to share farm tools, textbooks, and discover opportunities — right in your neighborhood.</p>
            <div style="display:flex;flex-wrap:wrap;gap:var(--space-3);padding-top:var(--space-2)">
              <button class="btn btn-primary btn-lg" onclick="APP.changeTab('resources')">
                <span>Browse Resources</span>${icon('arrowRight', 'w-4 h-4')}
              </button>
              <button class="btn btn-secondary btn-lg" onclick="APP.openModal('share')">
                <span>Share Something</span>
              </button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-visual-glow"></div>
            <div class="hero-card" style="transform:rotate(-4deg) translateX(-20px) translateY(-10px);left:5%;top:5%">
              ${renderItemImage('biology', 'textbooks', 'h-28 w-52 rounded-lg mb-2')}
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#8c6239">Textbook</div>
              <div style="font-size:var(--fs-sm);font-weight:700;color:var(--color-text)">Campbell Biology</div>
            </div>
            <div class="hero-card" style="transform:rotate(3deg) translateX(30px) translateY(40px);right:5%;top:15%;z-index:10">
              ${renderItemImage('sprayer', 'farm tools', 'h-28 w-52 rounded-lg mb-2')}
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-primary)">Farm Equipment</div>
              <div style="font-size:var(--fs-sm);font-weight:700;color:var(--color-text)">Knapsack Sprayer</div>
            </div>
            <div class="hero-card" style="transform:rotate(-2deg) translateX(-10px) translateY(80px);left:10%;bottom:5%;z-index:5">
              <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2)">
                <div class="avatar bg-amber" style="width:40px;height:40px">EK</div>
                <div>
                  <div style="font-weight:600;font-size:var(--fs-sm);color:var(--color-text)">Eliud Kipchoge</div>
                  <div style="display:flex;align-items:center;gap:2px;margin-top:2px">
                    <span class="star filled" style="font-size:12px">★</span>
                    <span class="star filled" style="font-size:12px">★</span>
                    <span class="star filled" style="font-size:12px">★</span>
                    <span class="star filled" style="font-size:12px">★</span>
                    <span class="star filled" style="font-size:12px">★</span>
                    <span style="font-size:11px;color:var(--color-text-tertiary);margin-left:4px">5.0</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hero-card" style="transform:rotate(1deg) translateX(20px) translateY(60px);right:8%;bottom:8%;z-index:8">
              <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2)">
                <div style="padding:var(--space-2);border-radius:var(--radius-md);background:var(--color-primary-light)">
                  ${icon('briefcase', 'w-5 h-5 text-primary')}
                </div>
                <div>
                  <div style="font-weight:600;font-size:var(--fs-sm);color:var(--color-text)">Farm Hand Needed</div>
                  <div style="font-size:11px;color:var(--color-text-secondary)">Maize Harvest • KSh 500/day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. COMMUNITY STATISTICS -->
    <section class="stats-section" style="background:var(--color-primary-light);border-top:1px solid var(--color-border-light);border-bottom:1px solid var(--color-border-light)">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number" data-count="2300">${stats.shared}</div>
            <div class="stat-label">${stats.sharedLabel}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.students}</div>
            <div class="stat-label">${stats.studentsLabel}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.tools}</div>
            <div class="stat-label">${stats.toolsLabel}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.jobsPosted}</div>
            <div class="stat-label">${stats.jobsPostedLabel}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. FEATURES -->
    <section class="page-section py-20">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Everything You Need</h2>
          <p class="section-subtitle">Borrow, share, and connect with your community through a single trusted platform</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" onclick="APP.changeTab('resources')">
            <div class="feature-icon" style="background:var(--color-success-bg);color:var(--color-success)">${icon('shovel', 'w-6 h-6')}</div>
            <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-2)">Farm Tools &amp; Equipment</h3>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7">Borrow ploughs, sprayers, wheelbarrows, and more from your neighbors during off-seasons.</p>
          </div>
          <div class="feature-card" onclick="APP.changeTab('resources')">
            <div class="feature-icon" style="background:#f9f5eb;color:#8c6239">${icon('book', 'w-6 h-6')}</div>
            <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-2)">Textbooks &amp; Materials</h3>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7">Find academic books shared by fellow students. Lend course texts you no longer need.</p>
          </div>
          <div class="feature-card" onclick="APP.changeTab('jobs')">
            <div class="feature-icon" style="background:var(--info-bg, #eef2ff);color:var(--color-info, #4f46e5)">${icon('briefcase', 'w-6 h-6')}</div>
            <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-2)">Jobs &amp; Opportunities</h3>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7">Discover local casual labor, farm work gigs, and skills-sharing posts in Baraton.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. HOW IT WORKS -->
    <section class="page-section py-20" style="background:var(--neutral-100);border-top:1px solid var(--color-border-light);border-bottom:1px solid var(--color-border-light)">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">How It Works</h2>
          <p class="section-subtitle">Simple steps to share and borrow within the community safely and friction-free</p>
        </div>
        <div class="steps-grid">
          <div class="step-connector" style="left:12.5%;right:12.5%"></div>
          ${[
            { num: '1', title: 'List a Resource', desc: 'Post your tools, books, or items with details and availability.' },
            { num: '2', title: 'Browse & Discover', desc: 'Search available resources and jobs posted in your area.' },
            { num: '3', title: 'Request to Borrow', desc: 'Send a quick booking request with your preferred timeline.' },
            { num: '4', title: 'Rate & Review', desc: 'Build community trust by providing fair ratings and feedback.' }
          ].map(step => `
            <div class="step-item">
              <div class="step-number">${step.num}</div>
              <div class="step-title">${step.title}</div>
              <div class="step-desc">${step.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 5. FEATURED RESOURCES -->
    <section class="page-section py-20">
      <div class="container">
        <div class="flex" style="justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-8)">
          <div style="text-align:left">
            <h2 class="section-title" style="margin-bottom:var(--space-1)">Featured Resources</h2>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary)">Recently shared by community members</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="APP.changeTab('resources')">
            <span>View All</span>${icon('arrowRight', 'w-3.5 h-3.5')}
          </button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-6)">
          ${latestResources.length > 0
            ? latestResources.map(item => renderResourceCard(item, currentUser)).join('')
            : '<div style="text-align:center;padding:var(--space-10);color:var(--color-text-tertiary)">No resources available yet.</div>'
          }
        </div>
      </div>
    </section>

    <!-- 6. FEATURED JOBS -->
    <section class="page-section py-20" style="background:var(--neutral-100);border-top:1px solid var(--color-border-light)">
      <div class="container">
        <div class="flex" style="justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-8)">
          <div style="text-align:left">
            <h2 class="section-title" style="margin-bottom:var(--space-1)">Open Opportunities</h2>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary)">Jobs &amp; skill-sharing in Baraton neighborhood</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="APP.changeTab('jobs')">
            <span>View All</span>${icon('arrowRight', 'w-3.5 h-3.5')}
          </button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:var(--space-6)">
          ${openOpportunities.length > 0
            ? openOpportunities.map(job => renderJobCard(job, currentUser)).join('')
            : '<div style="text-align:center;padding:var(--space-10);color:var(--color-text-tertiary)">No opportunities available yet.</div>'
          }
        </div>
      </div>
    </section>

    <!-- 7. TESTIMONIALS -->
    ${testimonials.length > 0 ? `
    <section class="page-section py-20">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What Our Community Says</h2>
          <p class="section-subtitle">Real stories from real people in the Baraton community</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:var(--space-6)">
          ${testimonials.map(t => `
            <div class="testimonial-card">
              <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)">
                <div class="avatar ${t.avatar || 'bg-green'}">${t.initials || 'BC'}</div>
                <div>
                  <div style="font-weight:600;font-size:var(--fs-sm);color:var(--color-text)">${t.name}</div>
                  <div style="display:flex;align-items:center;gap:2px;margin-top:2px">
                    ${Array(5).fill('').map((_,i) => `<span class="star ${i < t.rating ? 'filled' : ''}" style="font-size:12px">★</span>`).join('')}
                  </div>
                </div>
              </div>
              <p style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7;font-style:italic">"${t.text}"</p>
              <div style="margin-top:var(--space-3);font-size:11px;color:var(--color-text-tertiary)">${t.role}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>` : ''}

    <!-- 8. BUILT ON TRUST -->
    <section class="page-section py-16" style="background:var(--neutral-100);border-top:1px solid var(--color-border-light)">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Built on Trust</h2>
          <p class="section-subtitle">Our rating system and community moderation ensure a safe and reliable sharing experience.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-6)">
          <div class="testimonial-card" style="text-align:center">
            <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:var(--color-primary-light);color:var(--color-primary);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('checkCircle', 'w-6 h-6')}</div>
            <h3 style="font-weight:700;font-size:var(--fs-base);color:var(--color-text);margin-bottom:var(--space-2)">Community Verified</h3>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7">Connect within a trusted local community around the university campus.</p>
          </div>
          <div class="testimonial-card" style="text-align:center">
            <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:var(--color-primary-light);color:var(--color-primary);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('shield', 'w-6 h-6')}</div>
            <h3 style="font-weight:700;font-size:var(--fs-base);color:var(--color-text);margin-bottom:var(--space-2)">Moderated Platform</h3>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7">Admins audit posts, approve borrows, and remove stale listings.</p>
          </div>
          <div class="testimonial-card" style="text-align:center">
            <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:var(--color-primary-light);color:var(--color-primary);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('star', 'w-6 h-6')}</div>
            <h3 style="font-weight:700;font-size:var(--fs-base);color:var(--color-text);margin-bottom:var(--space-2)">Peer Reviews</h3>
            <p style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7">Star-ratings after each transaction enforce accountability and trust.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. FOOTER -->
    <footer class="app-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
              <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-3)">
                <div style="width:36px;height:36px;border-radius:var(--radius-md);background:var(--color-primary);color:white;display:flex;align-items:center;justify-content:center">${icon('handshake', 'w-5 h-5')}</div>
                <span>BCRSS</span>
              </div>
            </div>
            <p class="footer-desc">Empowering the Baraton community through shared resources and opportunities. Built securely for neighborhood solidarity.</p>
          </div>
          <div>
            <div class="footer-heading">Quick Links</div>
            <ul class="footer-links">
              <li><a href="#" onclick="event.preventDefault();APP.changeTab('resources')">Resources</a></li>
              <li><a href="#" onclick="event.preventDefault();APP.changeTab('jobs')">Jobs</a></li>
              <li><a href="#" onclick="event.preventDefault();APP.changeTab('dashboard')">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-heading">Community</div>
            <ul class="footer-links">
              <li><a href="#" onclick="event.preventDefault();APP.openModal('share')">Share Resource</a></li>
              <li><a href="#" onclick="event.preventDefault();APP.openModal('postJob')">Post a Job</a></li>
              <li><a href="#" onclick="event.preventDefault();APP.openModal('register')">Join</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-heading">Contact</div>
            <ul class="footer-links">
              <li><a href="#">UEAB, Nandi County</a></li>
              <li><a href="#">bcrss@baraton.ac.ke</a></li>
              <li><a href="#">+254 712 345678</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>&copy; 2026 BCRSS — Baraton Community Resource Sharing System. All rights reserved.</div>
          <div style="display:flex;gap:var(--space-4)">
            <a href="#" style="color:var(--neutral-500);text-decoration:none;font-size:var(--fs-xs)">Privacy</a>
            <a href="#" style="color:var(--neutral-500);text-decoration:none;font-size:var(--fs-xs)">Terms</a>
          </div>
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
      (item.ownerName && item.ownerName.toLowerCase().includes(term));
    const matchesCategory = resourceCategory === 'All' || item.category === resourceCategory.toLowerCase();
    const matchesStatus = resourceStatus === 'All' || item.status === resourceStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return `<div class="page-section" style="min-height:100vh">
    <div class="container">
      <div class="flex" style="flex-direction:column;gap:var(--space-2);margin-bottom:var(--space-8)">
        <div class="flex" style="align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:var(--space-4)">
          <div>
            <h1 style="font-family:var(--font-serif);font-size:var(--fs-4xl);font-weight:700;color:var(--color-text);letter-spacing:-0.02em;line-height:1.1">Community Resources</h1>
            <p style="font-size:var(--fs-base);color:var(--color-text-secondary);margin-top:var(--space-1)">Browse tools, textbooks, and items shared by neighbors</p>
          </div>
          <button class="btn btn-primary" onclick="APP.openModal('share')">
            ${icon('plus', 'w-4 h-4')}<span>Share Resource</span>
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="grid grid-cols-1" style="gap:var(--space-3)">
          <div style="display:grid;grid-template-columns:1fr;gap:var(--space-3)">
            <div class="search-wrapper" style="grid-column:span 1">
              <span class="search-icon">${icon('search', 'w-4 h-4')}</span>
              <input type="text" class="search-input" placeholder="Search resources..." value="${state.resourceSearch}"
                oninput="APP.setResourceSearch(this.value)">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
              <select class="select-field" onchange="APP.setResourceCategory(this.value)">
                <option value="All" ${resourceCategory === 'All' ? 'selected' : ''}>All Categories</option>
                <option value="Farm Tools" ${resourceCategory === 'Farm Tools' ? 'selected' : ''}>Farm Tools</option>
                <option value="Textbooks" ${resourceCategory === 'Textbooks' ? 'selected' : ''}>Textbooks</option>
                <option value="Household Items" ${resourceCategory === 'Household Items' ? 'selected' : ''}>Household Items</option>
              </select>
              <select class="select-field" onchange="APP.setResourceStatus(this.value)">
                <option value="All" ${resourceStatus === 'All' ? 'selected' : ''}>All Status</option>
                <option value="Available" ${resourceStatus === 'Available' ? 'selected' : ''}>Available</option>
                <option value="Borrowed" ${resourceStatus === 'Borrowed' ? 'selected' : ''}>Borrowed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div style="width:64px;height:64px;background:var(--neutral-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('search', 'w-8 h-8')}</div>
          <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-1)">No resources found</h3>
          <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">We couldn't find any resources matching your search criteria.</p>
          <button class="btn btn-primary" onclick="APP.openModal('share')">${icon('plus', 'w-4 h-4')}<span>Share a Resource</span></button>
        </div>
      ` : `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--space-6)">
          ${filtered.map(item => renderResourceCard(item, currentUser)).join('')}
        </div>
      `}
    </div>
  </div>`;
}

function renderResourceCard(item, currentUser) {
  const isOwner = currentUser && item.ownerId === currentUser.id;
  const catClass = item.category === 'farm tools' ? 'cat-tag-farm' : item.category === 'textbooks' ? 'cat-tag-textbook' : 'cat-tag-household';

  return `<div class="resource-card group" onclick="event.stopPropagation()">
    <div class="resource-card-image">
      ${renderItemImage(item.imageCode, item.category, 'h-44 w-full')}
      <span style="position:absolute;top:var(--space-3);left:var(--space-3);z-index:10" class="badge ${item.status === 'Available' ? 'badge-available' : 'badge-borrowed'}">${item.status}</span>
      <span style="position:absolute;bottom:var(--space-3);right:var(--space-3);background:rgba(255,255,255,0.9);backdrop-filter:blur(4px);padding:2px 10px;border-radius:var(--radius-sm);border:1px solid var(--color-border);font-size:11px;font-weight:600;color:var(--color-text-secondary)">${item.condition}</span>
    </div>
    <div class="resource-card-body">
      <div class="resource-card-meta">
        <span class="cat-tag ${catClass}">${item.category}</span>
        <span style="color:var(--color-text-tertiary);font-size:12px">·</span>
        <span style="font-size:11px;color:var(--color-text-secondary);font-weight:500">${item.lendingType}</span>
      </div>
      <h3 class="line-clamp-1" style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-2)">${item.title}</h3>
      <p class="line-clamp-2" style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7;flex:1">${item.description}</p>

      <div style="margin-top:var(--space-4);padding-top:var(--space-3);border-top:1px solid var(--color-border-light);display:flex;flex-direction:column;gap:var(--space-2);font-size:var(--fs-xs);color:var(--color-text-tertiary)">
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          ${icon('mapPin', 'w-3.5 h-3.5')}<span>${item.location}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:var(--space-1)">
            ${icon('user', 'w-3 h-3')}<span style="font-weight:500;color:var(--color-text-secondary)">${isOwner ? 'You' : item.ownerName}</span>
          </div>
          <span>${item.listedDate}</span>
        </div>
      </div>

      ${item.status === 'Available'
        ? `<button style="width:100%;margin-top:var(--space-4);padding:var(--space-3);text-align:center;font-size:var(--fs-sm);font-weight:600;border-radius:var(--radius-md);transition:all var(--duration-fast) ease;cursor:pointer;border:none;${isOwner ? 'background:var(--neutral-100);color:var(--color-text-tertiary)' : 'background:var(--color-primary);color:white'}" ${isOwner ? 'disabled' : `onclick="APP.openBorrowModal('${item.id}')"`}>${isOwner ? 'Your Posted Resource' : 'Request to Borrow'}</button>`
        : `<button style="width:100%;margin-top:var(--space-4);padding:var(--space-3);text-align:center;font-size:var(--fs-sm);font-weight:600;border-radius:var(--radius-md);background:var(--neutral-100);color:var(--color-text-tertiary);border:none;cursor:not-allowed" disabled>Currently Borrowed</button>`
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
      (job.postedBy && job.postedBy.toLowerCase().includes(term));
    const matchesCategory = jobCategory === 'All' || job.category === jobCategory;
    return matchesSearch && matchesCategory;
  });

  return `<div class="page-section" style="min-height:100vh">
    <div class="container">
      <div class="flex" style="flex-direction:column;gap:var(--space-2);margin-bottom:var(--space-8)">
        <div class="flex" style="align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:var(--space-4)">
          <div>
            <h1 style="font-family:var(--font-serif);font-size:var(--fs-4xl);font-weight:700;color:var(--color-text);letter-spacing:-0.02em;line-height:1.1">Job &amp; Opportunity Board</h1>
            <p style="font-size:var(--fs-base);color:var(--color-text-secondary);margin-top:var(--space-1)">Find work or post opportunities in Baraton neighborhood</p>
          </div>
          <button class="btn btn-primary" onclick="APP.openModal('postJob')">
            ${icon('plus', 'w-4 h-4')}<span>Post Opportunity</span>
          </button>
        </div>
      </div>

      <div class="filter-bar">
        <div style="display:grid;grid-template-columns:1fr;gap:var(--space-3)">
          <div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--space-3)">
            <div class="search-wrapper">
              <span class="search-icon">${icon('search', 'w-4 h-4')}</span>
              <input type="text" class="search-input" placeholder="Search jobs..." value="${state.jobSearch}"
                oninput="APP.setJobSearch(this.value)">
            </div>
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
          <div style="width:64px;height:64px;background:var(--neutral-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('search', 'w-8 h-8')}</div>
          <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-1)">No opportunities found</h3>
          <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">We couldn't find any job posts matching your criteria.</p>
          <button class="btn btn-primary" onclick="APP.openModal('postJob')">${icon('plus', 'w-4 h-4')}<span>Post an Opportunity</span></button>
        </div>
      ` : `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:var(--space-6)">
          ${filtered.map(job => renderJobCard(job, currentUser)).join('')}
        </div>
      `}
    </div>
  </div>`;
}

function renderJobCard(job, currentUser) {
  const isOwner = currentUser && job.postedById === currentUser.id;
  const badgeColors = {
    'Skilled Trade': 'background:#eef2ff;color:#4f46e5',
    'Farm Work': 'background:var(--color-success-bg);color:var(--color-success)',
    'Tutoring': 'background:#f9f5eb;color:#8c6239',
    'Casual Labor': 'background:#fefae8;color:#b8860b'
  };
  const badgeColor = badgeColors[job.category] || 'background:var(--neutral-100);color:var(--color-text-secondary)';

  return `<div class="job-card group">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--space-3)">
      <div>
        <span class="cat-tag" style="${badgeColor}">${job.category}</span>
        <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-top:var(--space-3);transition:color var(--duration-fast) ease">${job.title}</h3>
      </div>
      <span class="badge ${job.status === 'Open' ? 'badge-open' : 'badge-filled'}">${job.status}</span>
    </div>
    <p class="line-clamp-3" style="font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:1.7;flex:1;margin-bottom:var(--space-4)">${job.description}</p>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);padding-top:var(--space-4);border-top:1px solid var(--color-border-light);font-size:var(--fs-xs);color:var(--color-text-tertiary)">
      <div style="display:flex;align-items:center;gap:var(--space-2)">${icon('mapPin', 'w-3.5 h-3.5')}<span>${job.location}</span></div>
      <div style="display:flex;align-items:center;gap:var(--space-2);justify-content:flex-end">${icon('dollarSign', 'w-3.5 h-3.5')}<span style="font-weight:600;color:var(--color-text)">${job.rate}</span></div>
      <div style="display:flex;align-items:center;gap:var(--space-2)">${icon('clock', 'w-3.5 h-3.5')}<span>${job.duration}</span></div>
      <div style="display:flex;align-items:center;gap:var(--space-2);justify-content:flex-end">${icon('user', 'w-3 h-3')}<span>By ${isOwner ? 'You' : job.postedBy}</span></div>
    </div>

    ${job.status === 'Open' ? `
      <button style="width:100%;margin-top:var(--space-4);padding:var(--space-3);text-align:center;font-size:var(--fs-sm);font-weight:600;border-radius:var(--radius-md);border:1px solid var(--color-border);background:transparent;color:var(--color-text-secondary);cursor:pointer;transition:all var(--duration-fast) ease"
        onmouseover="this.style.borderColor='var(--color-primary)';this.style.color='var(--color-primary)'"
        onmouseout="this.style.borderColor='';this.style.color=''"
        onclick="APP.openApplyModal('${job.id}')">
        Apply Now
      </button>
    ` : `
      <div style="width:100%;margin-top:var(--space-4);padding:var(--space-3);text-align:center;font-size:var(--fs-sm);font-weight:600;border-radius:var(--radius-md);background:var(--neutral-100);color:var(--color-text-tertiary)">Position Filled</div>
    `}
  </div>`;
}

// ==================== DASHBOARD PAGE ====================
function renderDashboardPage(state) {
  const { currentUser, requests, resources, jobs, reviews, dashboardSubTab } = state;
  if (!currentUser) {
    return `<div class="page-section" style="min-height:100vh"><div class="container">
      <div class="empty-state">
        <div style="width:64px;height:64px;background:var(--neutral-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('user', 'w-8 h-8')}</div>
        <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-1)">Sign in to view your dashboard</h3>
        <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">Log in or create an account to manage your resources, jobs, and requests.</p>
        <button class="btn btn-primary" onclick="APP.openModal('login')">Log In</button>
      </div>
    </div></div>`;
  }

  const myResources = resources.filter(r => r.ownerId === currentUser.id);
  const myJobs = jobs.filter(j => j.postedById === currentUser.id);
  const activeRequests = requests.filter(r => r.status === 'Pending' || r.status === 'Approved');

  return `<div class="page-section" style="min-height:100vh">
    <div class="container">
      <div style="margin-bottom:var(--space-8)">
        <h1 style="font-family:var(--font-serif);font-size:var(--fs-4xl);font-weight:700;color:var(--color-text);letter-spacing:-0.02em;line-height:1.1">Dashboard</h1>
        <p style="font-size:var(--fs-base);color:var(--color-text-secondary);margin-top:var(--space-1)">Welcome back, ${currentUser.name}</p>
      </div>

      <!-- Stats row -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-4);margin-bottom:var(--space-8)">
        <div class="metric-card">
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            <div class="metric-icon" style="background:var(--color-primary-light);color:var(--color-primary)">${icon('shovel', 'w-5 h-5')}</div>
            <div>
              <div style="font-size:var(--fs-2xl);font-weight:700;color:var(--color-text);line-height:1">${myResources.length}</div>
              <div style="font-size:var(--fs-xs);color:var(--color-text-tertiary)">Your Resources</div>
            </div>
          </div>
        </div>
        <div class="metric-card">
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            <div class="metric-icon" style="background:#eef2ff;color:#4f46e5">${icon('briefcase', 'w-5 h-5')}</div>
            <div>
              <div style="font-size:var(--fs-2xl);font-weight:700;color:var(--color-text);line-height:1">${myJobs.length}</div>
              <div style="font-size:var(--fs-xs);color:var(--color-text-tertiary)">Your Jobs</div>
            </div>
          </div>
        </div>
        <div class="metric-card">
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            <div class="metric-icon" style="background:#fefae8;color:#b8860b">${icon('refreshCw', 'w-5 h-5')}</div>
            <div>
              <div style="font-size:var(--fs-2xl);font-weight:700;color:var(--color-text);line-height:1">${activeRequests.length}</div>
              <div style="font-size:var(--fs-xs);color:var(--color-text-tertiary)">Active Requests</div>
            </div>
          </div>
        </div>
        <div class="metric-card">
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            <div class="metric-icon" style="background:var(--color-success-bg);color:var(--color-success)">${icon('star', 'w-5 h-5')}</div>
            <div>
              <div style="font-size:var(--fs-2xl);font-weight:700;color:var(--color-text);line-height:1">${reviews.length}</div>
              <div style="font-size:var(--fs-xs);color:var(--color-text-tertiary)">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="sub-tab-bar" style="margin-bottom:var(--space-6);flex-wrap:wrap">
        <button class="sub-tab-btn ${dashboardSubTab === 'requests' ? 'active' : ''}" onclick="APP.setDashboardTab('requests')">Requests</button>
        <button class="sub-tab-btn ${dashboardSubTab === 'items' ? 'active' : ''}" onclick="APP.setDashboardTab('items')">My Items</button>
        <button class="sub-tab-btn ${dashboardSubTab === 'jobs' ? 'active' : ''}" onclick="APP.setDashboardTab('jobs')">My Jobs</button>
      </div>

      ${dashboardSubTab === 'requests' ? renderDashboardRequests(state) : ''}
      ${dashboardSubTab === 'items' ? renderDashboardItems(state) : ''}
      ${dashboardSubTab === 'jobs' ? renderDashboardJobs(state) : ''}
    </div>
  </div>`;
}

function renderDashboardRequests(state) {
  const { currentUser, requests, resources } = state;
  const myRequests = requests.filter(r => r.requesterId === currentUser.id || r.ownerId === currentUser.id);

  if (myRequests.length === 0) {
    return `<div class="empty-state">
      <div style="width:64px;height:64px;background:var(--neutral-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('clipboard', 'w-8 h-8')}</div>
      <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-1)">No requests yet</h3>
      <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">When you request to borrow items, they'll appear here.</p>
      <button class="btn btn-primary" onclick="APP.changeTab('resources')">Browse Resources</button>
    </div>`;
  }

  return `
  <div class="table-container">
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Requester</th>
            <th>Dates</th>
            <th>Status</th>
            <th style="text-align:right">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${myRequests.map(req => {
            const isOwner = req.ownerId === currentUser.id;
            const statusColors = {
              'Pending': 'badge-pending', 'Approved': 'badge-approved',
              'Declined': 'badge-declined', 'Returned': 'badge-returned'
            };
            return `<tr>
              <td><span style="font-weight:500;color:var(--color-text);font-size:var(--fs-sm)">${req.itemTitle}</span></td>
              <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${req.requesterName}</td>
              <td style="color:var(--color-text-tertiary);font-size:var(--fs-sm)">${req.startDate} → ${req.endDate}</td>
              <td><span class="badge ${statusColors[req.status] || 'badge-pending'}">${req.status}</span></td>
              <td style="text-align:right">
                ${isOwner && req.status === 'Pending' ? `
                  <button class="btn btn-sm" style="background:var(--color-primary);color:white" onclick="APP.approveRequest('${req.id}');event.stopPropagation()">Approve</button>
                  <button class="btn btn-sm btn-secondary" onclick="APP.declineRequest('${req.id}');event.stopPropagation()">Decline</button>
                ` : isOwner && req.status === 'Approved' ? `
                  <button class="btn btn-sm btn-outline" onclick="APP.markReturned('${req.id}');event.stopPropagation()">Mark Returned</button>
                ` : `<span style="font-size:var(--fs-sm);color:var(--color-text-tertiary)">—</span>`}
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderDashboardItems(state) {
  const { currentUser, resources } = state;
  const myResources = resources.filter(r => r.ownerId === currentUser.id);

  if (myResources.length === 0) {
    return `<div class="empty-state">
      <div style="width:64px;height:64px;background:var(--neutral-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('shovel', 'w-8 h-8')}</div>
      <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-1)">No items shared yet</h3>
      <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">Share a resource with the community to see it here.</p>
      <button class="btn btn-primary" onclick="APP.openModal('share')">Share a Resource</button>
    </div>`;
  }

  return `
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--space-6)">
    ${myResources.map(item => renderResourceCard(item, currentUser)).join('')}
  </div>`;
}

function renderDashboardJobs(state) {
  const { currentUser, jobs } = state;
  const myJobs = jobs.filter(j => j.postedById === currentUser.id);

  if (myJobs.length === 0) {
    return `<div class="empty-state">
      <div style="width:64px;height:64px;background:var(--neutral-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">${icon('briefcase', 'w-8 h-8')}</div>
      <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text);margin-bottom:var(--space-1)">No jobs posted yet</h3>
      <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-bottom:var(--space-4)">Post an opportunity to find help in the community.</p>
      <button class="btn btn-primary" onclick="APP.openModal('postJob')">Post a Job</button>
    </div>`;
  }

  return `
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:var(--space-6)">
    ${myJobs.map(job => renderJobCard(job, currentUser)).join('')}
  </div>`;
}

// ==================== ADMIN PAGE ====================
function renderAdminPage(state) {
  const { currentUser, users, resources, jobs, reviews, requests, adminTab, adminSearch } = state;
  if (!currentUser || currentUser.role !== 'Admin') {
    return `<div class="page-section"><div class="container"><p>Access denied.</p></div></div>`;
  }

  const adminTabs = [
    { id: 'resources', label: 'Resources' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'requests', label: 'Requests' },
    { id: 'users', label: 'Users' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return `<div class="page-section" style="min-height:100vh">
    <div class="container">
      <h1 style="font-family:var(--font-serif);font-size:var(--fs-4xl);font-weight:700;color:var(--color-text);letter-spacing:-0.02em;margin-bottom:var(--space-1)">Admin Panel</h1>
      <p style="font-size:var(--fs-base);color:var(--color-text-secondary);margin-bottom:var(--space-8)">Manage all community content and users</p>

      <div style="display:flex;gap:var(--space-1);border-bottom:1px solid var(--color-border-light);margin-bottom:var(--space-8);flex-wrap:wrap">
        ${adminTabs.map(tab => `
          <button class="admin-tab-btn ${adminTab === tab.id ? 'active' : ''}" onclick="APP.setAdminTab('${tab.id}')">${tab.label}</button>
        `).join('')}
      </div>

      ${adminTab === 'resources' ? renderAdminResources(state) : ''}
      ${adminTab === 'jobs' ? renderAdminJobs(state) : ''}
      ${adminTab === 'requests' ? renderAdminRequests(state) : ''}
      ${adminTab === 'users' ? renderAdminUsers(state) : ''}
      ${adminTab === 'reviews' ? renderAdminReviews(state) : ''}
    </div>
  </div>`;
}

function renderAdminResources(state) {
  const { resources, adminSearch } = state;
  const filtered = resources.filter(r => !adminSearch || r.title.toLowerCase().includes(adminSearch.toLowerCase()));

  return `
  <div class="flex" style="margin-bottom:var(--space-6)">
    <div class="search-wrapper" style="max-width:400px">
      <span class="search-icon">${icon('search', 'w-4 h-4')}</span>              <input type="text" class="search-input" placeholder="Search resources..." value="${state.adminSearch}"
                oninput="APP.setAdminSearch(this.value)">
    </div>
  </div>
  <div class="table-container">
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Title</th><th>Owner</th><th>Category</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody>
          ${filtered.map(r => `<tr>
            <td><span style="font-weight:500;color:var(--color-text);font-size:var(--fs-sm)">${r.title}</span></td>
            <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${r.ownerName}</td>
            <td><span style="font-size:11px">${r.category}</span></td>
            <td><span class="badge ${r.status === 'Available' ? 'badge-available' : 'badge-borrowed'}">${r.status}</span></td>
            <td style="text-align:right">
              <button class="btn btn-sm" style="background:var(--color-error);color:white" onclick="APP.deleteResource('${r.id}')">Delete</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderAdminJobs(state) {
  const { jobs, adminSearch } = state;
  const filtered = jobs.filter(j => !adminSearch || j.title.toLowerCase().includes(adminSearch.toLowerCase()));

  return `
  <div class="flex" style="margin-bottom:var(--space-6)">
    <div class="search-wrapper" style="max-width:400px">
      <span class="search-icon">${icon('search', 'w-4 h-4')}</span>              <input type="text" class="search-input" placeholder="Search jobs..." value="${state.adminSearch}"
                oninput="APP.setAdminSearch(this.value)">
    </div>
  </div>
  <div class="table-container">
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Title</th><th>Posted By</th><th>Category</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody>
          ${filtered.map(j => `<tr>
            <td><span style="font-weight:500;color:var(--color-text);font-size:var(--fs-sm)">${j.title}</span></td>
            <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${j.postedBy}</td>
            <td><span style="font-size:11px">${j.category}</span></td>
            <td><span class="badge ${j.status === 'Open' ? 'badge-open' : 'badge-filled'}">${j.status}</span></td>
            <td style="text-align:right">
              <button class="btn btn-sm" style="background:var(--color-error);color:white" onclick="APP.deleteJob('${j.id}')">Delete</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderAdminRequests(state) {
  const { requests } = state;
  return `
  <div class="table-container">
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Item</th><th>Requester</th><th>Owner</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody>
          ${requests.length > 0 ? requests.map(req => `<tr>
            <td><span style="font-weight:500;color:var(--color-text);font-size:var(--fs-sm)">${req.itemTitle}</span></td>
            <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${req.requesterName}</td>
            <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${req.ownerId}</td>
            <td><span class="badge ${req.status === 'Pending' ? 'badge-pending' : req.status === 'Approved' ? 'badge-approved' : req.status === 'Declined' ? 'badge-declined' : 'badge-returned'}">${req.status}</span></td>
            <td style="text-align:right">
              <button class="btn btn-sm btn-outline" onclick="APP.deleteRequest('${req.id}')">Delete</button>
            </td>
          </tr>`).join('') : `<tr><td colspan="5" style="text-align:center;color:var(--color-text-tertiary);padding:var(--space-8)">No requests found.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderAdminUsers(state) {
  const { users, adminSearch } = state;
  const filtered = users.filter(u => !adminSearch ||
    u.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(adminSearch.toLowerCase()));

  return `
  <div class="flex" style="margin-bottom:var(--space-6)">
    <div class="search-wrapper" style="max-width:400px">
      <span class="search-icon">${icon('search', 'w-4 h-4')}</span>              <input type="text" class="search-input" placeholder="Search users..." value="${state.adminSearch}"
                oninput="APP.setAdminSearch(this.value)">
    </div>
  </div>
  <div class="table-container">
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Location</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody>
          ${filtered.map(u => `<tr>
            <td>
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <div class="avatar-sm ${u.avatarColor}">${u.name.split(' ').map(n => n[0]).join('')}</div>
                <span style="font-weight:500;color:var(--color-text);font-size:var(--fs-sm)">${u.name}</span>
              </div>
            </td>
            <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${u.email}</td>
            <td><span class="badge ${u.role === 'Admin' ? 'badge-admin' : 'badge-member'}">${u.role}</span></td>
            <td style="color:var(--color-text-tertiary);font-size:var(--fs-sm)">${u.location}</td>
            <td style="text-align:right">
              ${u.role === 'Admin'
                ? `<button class="btn btn-sm btn-outline" onclick="APP.demoteUser('${u.id}')">Demote</button>`
                : `<button class="btn btn-sm" style="background:var(--color-primary);color:white" onclick="APP.promoteUser('${u.id}')">Promote</button>`
              }
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderAdminReviews(state) {
  const { reviews } = state;
  return `
  <div class="table-container">
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Reviewer</th><th>For</th><th>Rating</th><th>Comment</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody>
          ${reviews.length > 0 ? reviews.map(r => `<tr>
            <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${r.reviewerName}</td>
            <td style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${r.targetName}</td>
            <td>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
            <td style="color:var(--color-text-tertiary);font-size:var(--fs-sm);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.comment}</td>
            <td style="text-align:right">
              <button class="btn btn-sm" style="background:var(--color-error);color:white" onclick="APP.deleteReview('${r.id}')">Delete</button>
            </td>
          </tr>`).join('') : `<tr><td colspan="5" style="text-align:center;color:var(--color-text-tertiary);padding:var(--space-8)">No reviews found.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ==================== MODALS ====================
function renderModalBase(title, bodyHtml, modalSize = 'md') {
  return `
  <div class="modal-overlay">
    <div class="modal-backdrop" onclick="APP.closeModal()"></div>
    <div class="modal-container">
      <div class="modal-panel modal-panel-${modalSize}">
        <div class="modal-header">
          <h3 style="font-family:var(--font-serif);font-size:var(--fs-lg);font-weight:700;color:var(--color-text)">${title}</h3>
          <button class="modal-close" onclick="APP.closeModal()">${icon('x', 'w-4 h-4')}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
      </div>
    </div>
  </div>`;
}

function renderShareModal(state) {
  if (!state.currentUser) return renderLoginModal(state);

  return renderModalBase('Share a Resource', `
    <form onsubmit="APP.handleShareResource(event)">
      <div style="display:flex;flex-direction:column;gap:var(--space-5)">
        <div>
          <label class="form-label">Resource Title</label>
          <input type="text" class="input-field" id="share-title" placeholder="e.g. Knapsack Sprayer (16L)" required>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
          <div>
            <label class="form-label">Category</label>
            <select class="select-field" id="share-category">
              <option value="farm tools">Farm Tools</option>
              <option value="textbooks">Textbooks</option>
              <option value="household items">Household Items</option>
            </select>
          </div>
          <div>
            <label class="form-label">Condition</label>
            <select class="select-field" id="share-condition">
              <option value="New">New</option>
              <option value="Good" selected>Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
        </div>
        <div>
          <label class="form-label">Description</label>
          <textarea class="textarea-field" id="share-description" rows="3" placeholder="Describe your item, its condition, and any special notes..." required></textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
          <div>
            <label class="form-label">Lending Type</label>
            <select class="select-field" id="share-lending-type">
              <option value="Borrowing">Borrowing</option>
              <option value="Donating">Donating</option>
            </select>
          </div>
          <div>
            <label class="form-label">Location</label>
            <input type="text" class="input-field" id="share-location" placeholder="e.g. Baraton Market Area" required>
          </div>
        </div>
        <div class="modal-footer" style="margin:0">
          <button type="button" class="btn btn-secondary" onclick="APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">${icon('plus', 'w-4 h-4')}<span>Share Resource</span></button>
        </div>
      </div>
    </form>
  `);
}

function renderPostJobModal(state) {
  if (!state.currentUser) return renderLoginModal(state);

  return renderModalBase('Post an Opportunity', `
    <form onsubmit="APP.handlePostJob(event)">
      <div style="display:flex;flex-direction:column;gap:var(--space-5)">
        <div>
          <label class="form-label">Job Title</label>
          <input type="text" class="input-field" id="job-title" placeholder="e.g. Farm Hand Needed for Maize Harvest" required>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
          <div>
            <label class="form-label">Category</label>
            <select class="select-field" id="job-category">
              <option value="Skilled Trade">Skilled Trade</option>
              <option value="Farm Work">Farm Work</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Casual Labor">Casual Labor</option>
            </select>
          </div>
          <div>
            <label class="form-label">Location</label>
            <input type="text" class="input-field" id="job-location" placeholder="e.g. Baraton Farm Area" required>
          </div>
        </div>
        <div>
          <label class="form-label">Description</label>
          <textarea class="textarea-field" id="job-description" rows="3" placeholder="Describe the work, expectations, and any special requirements..." required></textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4)">
          <div>
            <label class="form-label">Rate</label>
            <input type="text" class="input-field" id="job-rate" placeholder="e.g. KSh 500/day">
          </div>
          <div>
            <label class="form-label">Duration</label>
            <input type="text" class="input-field" id="job-duration" placeholder="e.g. 3 days">
          </div>
          <div>
            <label class="form-label">Contact Info</label>
            <input type="text" class="input-field" id="job-contact" placeholder="Phone or email">
          </div>
        </div>
        <div>
          <label class="form-label">Requirements</label>
          <div id="requirements-container"></div>
          <button type="button" class="btn btn-ghost btn-sm" style="margin-top:var(--space-2)" onclick="APP.addRequirementRow()">${icon('plus', 'w-3.5 h-3.5')}<span>Add Requirement</span></button>
        </div>
        <div class="modal-footer" style="margin:0">
          <button type="button" class="btn btn-secondary" onclick="APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">${icon('send', 'w-4 h-4')}<span>Post Opportunity</span></button>
        </div>
      </div>
    </form>
  `, 'lg');
}

function renderBorrowModal(state) {
  const item = state.borrowItemTarget;
  if (!item) return '';

  return renderModalBase(`Request: ${item.title}`, `
    <form onsubmit="APP.handleBorrowRequest(event)">
      <div style="display:flex;flex-direction:column;gap:var(--space-5)">
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);border-radius:var(--radius-md);background:var(--neutral-100)">
          <div style="width:48px;height:48px;border-radius:var(--radius-md);background:var(--color-primary-light);display:flex;align-items:center;justify-content:center">${icon('shovel', 'w-5 h-5 text-primary')}</div>
          <div>
            <div style="font-weight:600;color:var(--color-text);font-size:var(--fs-sm)">${item.title}</div>
            <div style="font-size:var(--fs-xs);color:var(--color-text-tertiary)">Owner: ${item.ownerName} · ${item.location}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
          <div>
            <label class="form-label">Start Date</label>
            <input type="date" class="input-field" id="borrow-start" required>
          </div>
          <div>
            <label class="form-label">Return Date</label>
            <input type="date" class="input-field" id="borrow-end" required>
          </div>
        </div>
        <div>
          <label class="form-label">Message to Owner</label>
          <textarea class="textarea-field" id="borrow-message" rows="3" placeholder="Introduce yourself and explain why you need this item..." required></textarea>
        </div>
        <div class="modal-footer" style="margin:0">
          <button type="button" class="btn btn-secondary" onclick="APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">${icon('send', 'w-4 h-4')}<span>Send Request</span></button>
        </div>
      </div>
    </form>
  `);
}

function renderApplyModal(state) {
  const job = state.applyJobTarget;
  if (!job) return '';

  return renderModalBase(`Apply: ${job.title}`, `
    <form onsubmit="APP.handleApplyJob(event)">
      <div style="display:flex;flex-direction:column;gap:var(--space-5)">
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);border-radius:var(--radius-md);background:var(--neutral-100)">
          <div style="width:48px;height:48px;border-radius:var(--radius-md);background:#eef2ff;display:flex;align-items:center;justify-content:center">${icon('briefcase', 'w-5 h-5')}</div>
          <div>
            <div style="font-weight:600;color:var(--color-text);font-size:var(--fs-sm)">${job.title}</div>
            <div style="font-size:var(--fs-xs);color:var(--color-text-tertiary)">${job.postedBy} · ${job.rate} · ${job.location}</div>
          </div>
        </div>
        <div>
          <label class="form-label">Your Pitch</label>
          <textarea class="textarea-field" id="apply-pitch" rows="4" placeholder="Tell the employer about your skills, experience, and why you're a good fit..." required></textarea>
        </div>
        <div class="modal-footer" style="margin:0">
          <button type="button" class="btn btn-secondary" onclick="APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">${icon('send', 'w-4 h-4')}<span>Submit Application</span></button>
        </div>
      </div>
    </form>
  `);
}

function renderLoginModal(state) {
  return renderModalBase('Welcome Back', `
    <form onsubmit="APP.handleLogin(event)">
      <div style="display:flex;flex-direction:column;gap:var(--space-5)">
        <div style="text-align:center;margin-bottom:var(--space-2)">
          <div style="width:56px;height:56px;border-radius:50%;background:var(--color-primary-light);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3)">${icon('user', 'w-6 h-6 text-primary')}</div>
          <h3 style="font-family:var(--font-serif);font-size:var(--fs-xl);font-weight:700;color:var(--color-text)">Log in to BCRSS</h3>
          <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-top:var(--space-1)">Access your dashboard and manage resources</p>
        </div>
        <div>
          <label class="form-label">Username</label>
          <input type="text" class="input-field" id="login-username" placeholder="Enter your username" required>
        </div>
        <div>
          <label class="form-label">Password</label>
          <input type="password" class="input-field" id="login-password" placeholder="Enter your password" required>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var(--space-2)">Log In</button>
        <p style="text-align:center;font-size:var(--fs-sm);color:var(--color-text-tertiary)">Don't have an account? <a href="#" onclick="event.preventDefault();APP.openModal('register')" style="color:var(--color-primary);font-weight:600">Sign up</a></p>
      </div>
    </form>
  `, 'sm');
}

function renderRegisterModal(state) {
  return renderModalBase('Create Account', `
    <form onsubmit="APP.handleRegister(event)">
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div style="text-align:center;margin-bottom:var(--space-1)">
          <div style="width:56px;height:56px;border-radius:50%;background:var(--color-primary-light);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3)">${icon('heart', 'w-6 h-6 text-primary')}</div>
          <h3 style="font-family:var(--font-serif);font-size:var(--fs-xl);font-weight:700;color:var(--color-text)">Join BCRSS</h3>
          <p style="font-size:var(--fs-sm);color:var(--color-text-tertiary);margin-top:var(--space-1)">Join the Baraton community sharing platform</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div>
            <label class="form-label">First Name</label>
            <input type="text" class="input-field" id="reg-first-name" placeholder="First name" required>
          </div>
          <div>
            <label class="form-label">Last Name</label>
            <input type="text" class="input-field" id="reg-last-name" placeholder="Last name" required>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div>
            <label class="form-label">Username</label>
            <input type="text" class="input-field" id="reg-username" placeholder="Choose a username" required>
          </div>
          <div>
            <label class="form-label">Email</label>
            <input type="email" class="input-field" id="reg-email" placeholder="you@example.com" required>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div>
            <label class="form-label">Location</label>
            <input type="text" class="input-field" id="reg-location" placeholder="e.g. UEAB Campus">
          </div>
          <div>
            <label class="form-label">Contact</label>
            <input type="text" class="input-field" id="reg-contact" placeholder="Phone number">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div>
            <label class="form-label">Password</label>
            <input type="password" class="input-field" id="reg-password" placeholder="Create password" required>
          </div>
          <div>
            <label class="form-label">Confirm Password</label>
            <input type="password" class="input-field" id="reg-password-confirm" placeholder="Confirm password" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var(--space-2)">Create Account</button>
        <p style="text-align:center;font-size:var(--fs-sm);color:var(--color-text-tertiary)">Already have an account? <a href="#" onclick="event.preventDefault();APP.openModal('login')" style="color:var(--color-primary);font-weight:600">Log in</a></p>
      </div>
    </form>
  `, 'lg');
}
