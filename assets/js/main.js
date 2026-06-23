/* ============================================================
   KANWAL MARTIAL ARTS ACADEMY — Main JS v2.0
   FIXED: all event bindings use delegation (runs after inject)
   ============================================================ */

'use strict';

/* ---- PRELOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }
  }, 1600);
});

/* ---- STICKY HEADER (solid always, darker on scroll) ---- */
function handleScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });

/* ---- SCROLL TO TOP ---- */
document.addEventListener('click', (e) => {
  if (e.target.closest('#scroll-top')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

/* ---- ANIMATED COUNTERS ---- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

/* ---- TESTIMONIALS SWIPER ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.testimonials-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        768:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  /* ---- AOS ---- */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }
});

/* ---- GALLERY FILTER ---- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  const filter = btn.getAttribute('data-filter');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const show = filter === 'all' || item.getAttribute('data-category') === filter;
    item.style.display = show ? 'block' : 'none';
    if (show) {
      item.style.opacity = '0';
      requestAnimationFrame(() => {
        item.style.transition = 'opacity 0.4s';
        item.style.opacity = '1';
      });
    }
  });
});

/* ---- LIGHTBOX ---- */
document.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;
  const img = item.querySelector('img');
  if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});

document.addEventListener('click', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  if (e.target.closest('.lightbox-close') || e.target === lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

/* ---- GALLERY KEYBOARD A11Y ---- */
document.addEventListener('keydown', (e) => {
  const item = e.target.closest('.gallery-item');
  if (item && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    item.click();
  }
});

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#28a745';
      btn.style.borderColor = '#28a745';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

/* ---- NEWSLETTER FORM ---- */
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
    btn.style.background = '#28a745';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      newsletterForm.reset();
    }, 3000);
  });
}

/* ---- SMOOTH SCROLL for anchor links ---- */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ---- LAZY LOAD images ---- */
if ('IntersectionObserver' in window) {
  const lazyImgs = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImgs.forEach(img => imgObserver.observe(img));
}
