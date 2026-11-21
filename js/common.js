/* =========================================================
   OurSanctuary — shared script (loaded on every page)

   PAGES is the one list of pages. It builds:
     - the cards on the home hub (index.html)
     - the "← Home" top bar on every other page
     - the "Next" link at the bottom of every other page
   To add or reorder a page, edit this list only.
   Each page says which one it is with <body data-page="...">.
   ========================================================= */

const PAGES = [
  { id: 'story',     href: 'story.html',     title: 'Our Story',  desc: 'Memories of her, chapter by chapter',  icon: 'book' },
  { id: 'gallery',   href: 'gallery.html',   title: 'Gallery',    desc: 'Our highlights in polaroids',          icon: 'camera' },
  { id: 'music',     href: 'music.html',     title: 'Music',      desc: 'Our soundtrack & dedicated songs',     icon: 'music' },
  { id: 'open-when', href: 'open-when.html', title: 'Open When',  desc: 'Letters for every feeling',            icon: 'mail' },
  { id: 'plans',     href: 'plans.html',     title: 'Our Future', desc: 'Bucket list, our home, date ideas',    icon: 'home' },
  { id: 'vouchers',  href: 'vouchers.html',  title: 'Vouchers',   desc: 'Love coupons, yours to redeem',        icon: 'ticket' },
  { id: 'garden',    href: 'garden.html',    title: 'The Garden', desc: 'A little garden that grows for you',   icon: 'sprout' },
  { id: 'bouquet',   href: 'bouquet.html',   title: 'Bouquet',    desc: 'Tulips, each with a note',             icon: 'flower' },
  { id: 'cycle',     href: 'cycle.html',     title: 'Your Cycle', desc: 'Your rhythm, and how I can care',      icon: 'moon' },
];

/* Small line icons (24×24, drawn with the current text color) */
const ICONS = {
  book:   '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
  music:  '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  mail:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  home:   '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
  sprout: '<path d="M12 21v-9"/><path d="M12 12C12 8 9 5 4 5c0 4 3 7 8 7z"/><path d="M12 14c0-3 2.5-6 7-6 0 3.5-2.5 6-7 6z"/>',
  flower: '<path d="M12 13c-3 0-5-2.5-5-6 1.5 0 3 .5 3 .5L12 4l2 3.5s1.5-.5 3-.5c0 3.5-2 6-5 6z"/><path d="M12 13v8"/><path d="M12 18c-2 0-4-1-5-3"/><path d="M12 17c2 0 4-1 5-3"/>',
  moon:   '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  arrowLeft:  '<path d="M15 18l-6-6 6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* ---------- Top bar + next link on inner pages ---------- */
function buildPageChrome() {
  const id = document.body.dataset.page;
  if (!id || id === 'home') return;
  const index = PAGES.findIndex(p => p.id === id);
  const page = PAGES[index];

  const bar = document.createElement('header');
  bar.className = 'topbar';
  bar.innerHTML = `
    <a class="topbar__home" href="index.html" aria-label="Back to home">${icon('arrowLeft')}<span>Home</span></a>
    <span class="topbar__title">${page ? page.title : ''}</span>
    <span></span>`;
  document.body.prepend(bar);

  if (document.body.dataset.noNext !== undefined) return;
  const next = PAGES[index + 1];
  const link = document.createElement('a');
  link.className = 'next-page';
  link.href = next ? next.href : 'index.html';
  link.innerHTML = `<span><small>${next ? 'Next' : 'Back to'}</small><strong>${next ? next.title : 'Home'}</strong></span>${icon('arrowRight')}`;
  const footerSlot = document.getElementById('next-slot');
  (footerSlot || document.body).appendChild(link);
}

/* ---------- Home hub cards ---------- */
function buildHub() {
  const hub = document.getElementById('hub');
  if (!hub) return;
  hub.innerHTML = PAGES.map(p => `
    <a class="hub-card" href="${p.href}">
      <span class="hub-card__icon">${icon(p.icon)}</span>
      <span class="hub-card__title">${p.title}</span>
      <span class="hub-card__desc">${p.desc}</span>
    </a>`).join('');
}

/* ---------- Toast notifications ---------- */
function spawnNotification(title, message, iconText, autoCloseDelay = 0) {
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    document.body.appendChild(container);
  }
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.setAttribute('role', 'status');
  notif.innerHTML = `
    <div class="notification-icon">${iconText}</div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close" aria-label="Close" onclick="closeNotification(this)">✕</button>`;
  container.appendChild(notif);
  setTimeout(() => notif.classList.add('show'), 60);
  if (autoCloseDelay > 0) {
    setTimeout(() => { if (notif.parentElement) closeNotification(notif.querySelector('button')); }, autoCloseDelay);
  }
}

function closeNotification(btn) {
  const notif = btn.closest('.notification');
  notif.classList.remove('show');
  setTimeout(() => notif.remove(), 500);
}

/* ---------- Reveal cards gently as you scroll ---------- */
function setupReveal() {
  const items = document.querySelectorAll('.glass-card, .reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
}

/* ---------- Swaying tulips along the bottom (any page with #tulip-garden) ---------- */
function plantTulipGarden() {
  const garden = document.getElementById('tulip-garden');
  if (!garden) return;
  const tulipCount = window.innerWidth < 600 ? 22 : 35;
  const colors = ['#7c3aed', '#a855f7', '#d8b4fe', '#e9a8d0'];
  for (let i = 0; i < tulipCount; i++) {
    const tulip = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const height = 120 + Math.random() * 180;
    tulip.setAttribute('viewBox', '0 0 50 150');
    tulip.style.cssText = `
      position: absolute;
      bottom: -20px;
      left: ${Math.random() * 100}%;
      height: ${height}px;
      z-index: ${Math.floor(height)};
      transform-origin: bottom center;
      animation: sway ${4 + Math.random() * 2}s ease-in-out ${Math.random() * -5}s infinite;`;
    tulip.innerHTML = `
      <path d="M25 150 Q25 100 25 50" stroke="#5fb87a" stroke-width="3" fill="none" />
      <path d="M25 120 Q40 100 25 80" fill="#5fb87a" opacity="0.6" />
      <path d="M25 10 C10 10 5 40 25 65 C45 40 40 10 25 10 Z" fill="${colors[Math.floor(Math.random() * colors.length)]}" />`;
    garden.appendChild(tulip);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  plantTulipGarden();
  buildPageChrome();
  buildHub();
  setupReveal();
});
