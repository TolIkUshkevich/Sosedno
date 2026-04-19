/* ============================================================
   app.js — Соседно Landing Page
   ============================================================ */

// ── Navbar scroll effect ─────────────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

// ── Mobile menu ──────────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('hamburgerIcon');
  if (!menu) return;
  menu.classList.toggle('open');
  if (icon) icon.textContent = menu.classList.contains('open') ? 'close' : 'menu';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('hamburgerIcon');
  if (!menu) return;
  menu.classList.remove('open');
  if (icon) icon.textContent = 'menu';
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const menu   = document.getElementById('mobileMenu');
  const btn    = document.getElementById('hamburgerBtn');
  if (!menu || !menu.classList.contains('open')) return;
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    closeMobileMenu();
  }
});

// ── Waitlist modal ───────────────────────────────────────────
function openWaitlist() {
  const overlay = document.getElementById('waitlistOverlay');
  if (!overlay) return;

  // Reset form to initial state on each open
  resetWaitlistForm();

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Trap focus inside modal
  requestAnimationFrame(() => {
    const firstInput = overlay.querySelector('input, button');
    if (firstInput) firstInput.focus();
  });
}

function closeWaitlist() {
  const overlay = document.getElementById('waitlistOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function resetWaitlistForm() {
  const form    = document.getElementById('waitlistForm');
  const success = document.getElementById('modalSuccess');
  if (form)    { form.style.display = 'flex'; form.reset(); }
  if (success) { success.style.display = 'none'; }

  // Reset contact field toggles
  const telegramWrap = document.getElementById('telegramFieldWrap');
  const phoneWrap    = document.getElementById('phoneFieldWrap');
  if (telegramWrap) telegramWrap.style.display = '';
  if (phoneWrap)    phoneWrap.style.display = 'none';
}

// Close on overlay backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('waitlistOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeWaitlist();
  });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeWaitlist();
});

// ── Contact field toggle (Telegram / Phone) ──────────────────
function toggleContactField() {
  const telegramWrap = document.getElementById('telegramFieldWrap');
  const phoneWrap    = document.getElementById('phoneFieldWrap');
  if (!telegramWrap || !phoneWrap) return;

  const showingTelegram = telegramWrap.style.display !== 'none';

  if (showingTelegram) {
    telegramWrap.style.display = 'none';
    phoneWrap.style.display = '';
    document.getElementById('wl-telegram').value = '';
  } else {
    telegramWrap.style.display = '';
    phoneWrap.style.display = 'none';
    document.getElementById('wl-phone').value = '';
  }
}

// ── Waitlist form submission ──────────────────────────────────
function submitWaitlist(event) {
  event.preventDefault();

  const form    = document.getElementById('waitlistForm');
  const success = document.getElementById('modalSuccess');
  const btn     = document.getElementById('submitBtn');

  // Basic validation
  const firstName = document.getElementById('wl-firstName').value.trim();
  const city      = document.getElementById('wl-city').value.trim();

  if (!firstName) {
    shakeField('wl-firstName');
    return;
  }
  if (!city) {
    shakeField('wl-city');
    return;
  }

  // Simulate async submit
  if (btn) {
    btn.textContent = 'Отправляем…';
    btn.disabled = true;
  }

  // Collect form data
  const data = {
    firstName,
    lastName:   document.getElementById('wl-lastName').value.trim(),
    city,
    telegram:   document.getElementById('wl-telegram').value.trim().replace(/^@/, ''),
    phone:      document.getElementById('wl-phone') ? document.getElementById('wl-phone').value.trim() : '',
    isStudent:  document.querySelector('input[name="wl-isStudent"]:checked')?.value || 'yes',
    source:     document.getElementById('wl-source').value,
    timestamp:  new Date().toISOString(),
  };

  // Store locally (for demo)
  try {
    const existing = JSON.parse(localStorage.getItem('sosedno_waitlist') || '[]');
    existing.push(data);
    localStorage.setItem('sosedno_waitlist', JSON.stringify(existing));
  } catch (_) { /* ignore */ }

  // Fake network delay
  setTimeout(() => {
    if (form)    form.style.display = 'none';
    if (success) success.style.display = 'flex';
    if (btn)     { btn.disabled = false; }
  }, 900);
}

// Shake animation for invalid fields
function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('input-shake');
  el.focus();
  el.addEventListener('animationend', () => el.classList.remove('input-shake'), { once: true });
}

// Add shake keyframe via JS (so no extra CSS file needed)
(function injectShakeCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
    .input-shake { animation: shake .4s ease; }
    input:invalid:not(:placeholder-shown) {
      box-shadow: inset 0 0 0 2px #9f403d;
    }
  `;
  document.head.appendChild(style);
})();

// ── Smooth scroll for anchor links ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navbarH = document.getElementById('navbar')?.offsetHeight ?? 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});

// ── FAQ accordion — close others on open ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });
});

// ── Intersection observer — subtle fade-in ───────────────────
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-up { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .fade-in-up.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.step-card, .bento-card, .use-card, .safety-card, .compat-feature'
  );
  targets.forEach(el => el.classList.add('fade-in-up'));

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(el => obs.observe(el));
  } else {
    // Fallback for old browsers
    targets.forEach(el => el.classList.add('visible'));
  }
});
