/*
  Ahmed Babatunde — Portfolio scripts
  - Mobile rail toggle
  - Scrollspy for rail nav
  - Reveal-on-scroll for sections
  - Signal-chart draw-in animation
  - Back-to-top button
*/

window.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile rail toggle ---------- */
  const rail = document.getElementById('rail');
  const navToggle = document.getElementById('navToggle');

  if (rail && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = rail.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    rail.querySelectorAll('.rail__link').forEach((link) => {
      link.addEventListener('click', () => {
        rail.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scrollspy: highlight active rail link ---------- */
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('href') === id);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- Reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const reveal = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => reveal.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Signal-chart draw-in ---------- */
  const trendPath = document.getElementById('trendPath');
  if (trendPath) {
    if (reduceMotion) {
      trendPath.style.strokeDasharray = 'none';
    } else {
      const length = trendPath.getTotalLength();
      trendPath.style.strokeDasharray = `${length}`;
      trendPath.style.strokeDashoffset = `${length}`;
      // Force layout, then animate.
      requestAnimationFrame(() => {
        trendPath.style.transition = 'stroke-dashoffset 1.1s ease';
        trendPath.style.strokeDashoffset = '0';
      });
    }
  }

  /* ---------- Back-to-top ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    const toggleToTop = () => {
      toTop.classList.toggle('is-visible', window.scrollY > 480);
    };
    toggleToTop();
    window.addEventListener('scroll', toggleToTop, { passive: true });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
});
