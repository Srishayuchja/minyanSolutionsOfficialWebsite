// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (window.scrollY / total * 100) + '%';
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Navbar
const navbar = document.getElementById('navbar');

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav — IntersectionObserver
const activeNavObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, {
  rootMargin: `-${navbar.offsetHeight}px 0px -50% 0px`,
  threshold: 0
});
document.querySelectorAll('section[id]').forEach(s => activeNavObserver.observe(s));

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else { el.textContent = Math.floor(current); }
  }, 16);
}

// Stagger delays on grid children
function applyStagger(parent) {
  const children = parent.querySelectorAll(
    '.service-card, .project-card, .pstat-card, .tech-category, .tech-pill'
  );
  children.forEach((el, i) => {
    const cls = 'stagger-' + Math.min(i + 1, 6);
    el.classList.add(cls);
  });
}
document.querySelectorAll('.services-grid, .projects-grid, .project-stats, .tech-categories').forEach(applyStagger);

// Scroll reveal — assign variants by element type
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// Cards — fade up
document.querySelectorAll('.service-card, .project-card, .pstat-card, .contact-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Tech categories — scale in
document.querySelectorAll('.tech-category').forEach(el => {
  el.classList.add('reveal-scale');
  revealObserver.observe(el);
});

// About visual — slide from left
document.querySelectorAll('.about-visual').forEach(el => {
  el.classList.add('reveal-left');
  revealObserver.observe(el);
});

// About content — slide from right
document.querySelectorAll('.about-content').forEach(el => {
  el.classList.add('reveal-right');
  revealObserver.observe(el);
});

// Section headers — fade up
document.querySelectorAll('.section-header, .about-content .section-title').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.hero-stats, .project-stats').forEach(el => counterObserver.observe(el));

// Button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-el');
    const size = Math.max(this.offsetWidth, this.offsetHeight);
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Flip cards — tap to toggle on touch devices
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
    this.reset();
  }, 1400);
});

// Section-level reveal on scroll
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.section').forEach(sec => {
  sec.classList.add('section-hidden');
  sectionObserver.observe(sec);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
