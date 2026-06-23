/* ============================================================
   KANWAL MARTIAL ARTS ACADEMY — Shared Components v2.0
   FIXED: header inject timing, mobile menu, BASE path, modal
   ============================================================ */

'use strict';

/* ---- BASE PATH (fixed for all nesting depths) ---- */
const BASE = (() => {
  const parts = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  // On Netlify/Apache with clean URLs, each page folder = 1 depth level
  if (parts.length === 0) return '';           // root /
  return Array(parts.length).fill('..').join('/'); // ../  or ../../  etc.
})();

const ROOT = BASE === '' ? '/' : BASE + '/';

/* ---- HEADER ---- */
function injectHeader() {
  const ph = document.getElementById('header-placeholder');
  if (!ph) return;

  ph.outerHTML = `
<header id="site-header" role="banner">
  <div class="header-inner">
    <a href="${ROOT}" class="site-logo" aria-label="Kanwal Martial Arts Academy Home">
      <div class="logo-icon" aria-hidden="true"><i class="fas fa-fist-raised"></i></div>
      <div class="logo-text">
        <span class="name">KANWAL <span style="color:var(--accent)">MARTIAL ARTS</span></span>
        <span class="tagline">Academy · Islamabad</span>
      </div>
    </a>
    <nav class="main-nav" role="navigation" aria-label="Main Navigation">
      <a href="${ROOT}">Home</a>
      <a href="${ROOT}about-us">About Us</a>
      <a href="${ROOT}trainer">Trainer</a>
      <a href="${ROOT}programs">Programs</a>
      <a href="${ROOT}gallery">Gallery</a>
      <a href="${ROOT}contact">Contact</a>
    </nav>
    <a href="${ROOT}register" class="btn-admission" aria-label="Register Now">
      <i class="fas fa-graduation-cap" aria-hidden="true"></i> Admissions Open
    </a>
    <button class="hamburger" id="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false" type="button">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="mobile-nav-overlay" id="mobile-overlay"></div>
<nav class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile Navigation">
  <button class="mobile-nav-close" id="mobile-close-btn" aria-label="Close menu" type="button">
    <i class="fas fa-times" aria-hidden="true"></i>
  </button>
  <div class="mobile-nav-logo">
    <div class="logo-icon" aria-hidden="true"><i class="fas fa-fist-raised"></i></div>
    <div class="logo-text">
      <span class="name" style="color:#fff;">KANWAL <span style="color:var(--accent)">MARTIAL ARTS</span></span>
    </div>
  </div>
  <a href="${ROOT}">Home</a>
  <a href="${ROOT}about-us">About Us</a>
  <a href="${ROOT}trainer">Trainer</a>
  <a href="${ROOT}programs">Programs</a>
  <a href="${ROOT}gallery">Gallery</a>
  <a href="${ROOT}contact">Contact</a>
  <a href="${ROOT}register" class="mobile-nav-cta">
    <i class="fas fa-graduation-cap" aria-hidden="true"></i> Register Now
  </a>
</nav>`;

  /* Attach hamburger events IMMEDIATELY after injecting */
  initMobileMenu();
  setActiveNav();
}

/* ---- MOBILE MENU (runs right after header inject) ---- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav  = document.getElementById('mobile-nav');
  const overlay    = document.getElementById('mobile-overlay');
  const closeBtn   = document.getElementById('mobile-close-btn');

  if (!hamburger || !mobileNav) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---- ACTIVE NAV LINK ---- */
function setActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.replace(/\/$/, '') || '/';
    // Exact match or ends with the same segment
    if (
      linkPath === path ||
      (linkPath !== '/' && linkPath !== '' && path.endsWith(linkPath.replace(/^.*\//, '/')))
    ) {
      link.classList.add('active');
    }
  });
}

/* ---- FOOTER ---- */
function injectFooter() {
  const ph = document.getElementById('footer-placeholder');
  if (!ph) return;
  ph.outerHTML = `
<footer id="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a href="${ROOT}" class="site-logo logo" aria-label="Home">
          <div class="logo-icon" aria-hidden="true"><i class="fas fa-fist-raised"></i></div>
          <div class="logo-text">
            <span class="name">KANWAL <span style="color:var(--accent)">MARTIAL ARTS</span></span>
            <span class="tagline">Academy · Islamabad</span>
          </div>
        </a>
        <p>Empowering individuals through professional martial arts training, self-defense education and fitness programs at Pakistan Sports Complex, Islamabad.</p>
        <div class="social-icons" role="list">
          <a href="https://facebook.com" class="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer" role="listitem"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
          <a href="https://instagram.com" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer" role="listitem"><i class="fab fa-instagram" aria-hidden="true"></i></a>
          <a href="https://youtube.com" class="social-icon" aria-label="YouTube" target="_blank" rel="noopener noreferrer" role="listitem"><i class="fab fa-youtube" aria-hidden="true"></i></a>
          <a href="https://wa.me/923135574088" class="social-icon" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" role="listitem"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul class="footer-links" role="list">
          <li><a href="${ROOT}">Home</a></li>
          <li><a href="${ROOT}about-us">About Us</a></li>
          <li><a href="${ROOT}trainer">Trainer</a></li>
          <li><a href="${ROOT}programs">Programs</a></li>
          <li><a href="${ROOT}gallery">Gallery</a></li>
          <li><a href="${ROOT}contact">Contact</a></li>
          <li><a href="${ROOT}register">Register</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Programs</h4>
        <ul class="footer-links" role="list">
          <li><a href="${ROOT}programs">Karate</a></li>
          <li><a href="${ROOT}programs">Self Defense</a></li>
          <li><a href="${ROOT}programs">Basic Kung Fu</a></li>
          <li><a href="${ROOT}programs">Fitness Training</a></li>
          <li><a href="${ROOT}programs">Gymnastics</a></li>
          <li><a href="${ROOT}programs">Summer Camp</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fas fa-phone" aria-hidden="true"></i></div>
          <p><a href="tel:+923135574088" style="color:rgba(255,255,255,0.6)">0313-5574088</a></p>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fas fa-map-marker-alt" aria-hidden="true"></i></div>
          <p>Pakistan Sports Complex, Liaqat Gymnasium, Srinagar Highway, Abpara, Islamabad</p>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fas fa-clock" aria-hidden="true"></i></div>
          <p>Thu &amp; Fri: 5:00 PM – 6:00 PM</p>
        </div>
        <a href="https://maps.google.com/?q=Pakistan+Sports+Complex+Islamabad" target="_blank" rel="noopener noreferrer" class="btn-secondary mt-2" style="font-size:0.8rem;padding:8px 16px;">
          <i class="fas fa-directions" aria-hidden="true"></i> Get Directions
        </a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="footer-bottom">
      <p>&copy; 2026 Kanwal Martial Arts Academy. All Rights Reserved.</p>
      <div class="footer-bottom-links">
        <a href="${ROOT}sitemap.xml">Sitemap</a>
        <a href="${ROOT}register">Register Now</a>
      </div>
    </div>
  </div>
</footer>

<!-- Scroll to Top -->
<button id="scroll-top" aria-label="Scroll to top"><i class="fas fa-chevron-up" aria-hidden="true"></i></button>

<!-- WhatsApp Float -->
<a href="https://wa.me/923135574088" id="whatsapp-float" aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-whatsapp" aria-hidden="true"></i>
</a>
`;
}

/* ---- LIGHTBOX ---- */
function injectLightbox() {
  if (document.getElementById('lightbox')) return;
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox"><i class="fas fa-times" aria-hidden="true"></i></button>
    <img id="lightbox-img" class="lightbox-img" src="" alt="" loading="lazy">
  `;
  document.body.appendChild(lb);
}

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  injectLightbox();
});
