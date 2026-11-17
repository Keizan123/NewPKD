/**
 * main.js — PKD (Persatuan Kucing Depok)
 * Shared JavaScript: navigasi, hamburger menu, utilitas umum
 */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // HAMBURGER MENU TOGGLE & MOBILE DRAWER OVERLAY
  // =============================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Buat backdrop overlay jika belum ada
  let navOverlay = document.querySelector('.mobile-nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'mobile-nav-overlay';
    document.body.appendChild(navOverlay);
  }

  function closeMobileMenu() {
    if (navMenu) {
      navMenu.classList.remove('open');
      navMenu.classList.remove('active');
    }
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (navOverlay) {
      navOverlay.classList.remove('active');
    }
    document.body.classList.remove('menu-open');
  }

  function openMobileMenu() {
    if (navMenu) {
      navMenu.classList.add('open');
      navMenu.classList.add('active');
    }
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (navOverlay) {
      navOverlay.classList.add('active');
    }
    document.body.classList.add('menu-open');
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Tutup menu saat klik overlay backdrop
    navOverlay.addEventListener('click', () => {
      closeMobileMenu();
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && !navOverlay.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // =============================================
  // ACTIVE NAV LINK DETECTION
  // =============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // =============================================
  // SCROLL REVEAL ANIMATION
  // =============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =============================================
  // HEADER SCROLL SHADOW
  // =============================================
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // =============================================
  // BACK TO TOP BUTTON
  // =============================================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Debounce function untuk mencegah terlalu banyak pemanggilan fungsi
 * @param {Function} func - Fungsi yang akan di-debounce
 * @param {number} delay - Delay dalam milidetik
 * @returns {Function}
 */
function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Normalisasi teks untuk pencarian (lowercase + hapus spasi ekstra)
 * @param {string} text
 * @returns {string}
 */
function normalizeSearch(text) {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}
