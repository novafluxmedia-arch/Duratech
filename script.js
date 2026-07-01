// header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  });
  window.dispatchEvent(new Event('scroll'));

  // mobile nav
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // active nav link
  const current = (location.pathname.split('/').pop() || 'index.html');
  navLinks.querySelectorAll('a[data-key]').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // decorative icons shouldn't be announced twice by screen readers
  document.querySelectorAll('i[class*="fa-"]').forEach(i => i.setAttribute('aria-hidden', 'true'));

  // staggered reveal for grid/list groups; everything else reveals as a single block
  const staggerGroups = document.querySelectorAll('.pillars, .industries, .team-grid, .why-grid, .services-list, .timeline');
  staggerGroups.forEach(group => {
    group.classList.remove('reveal');
    Array.from(group.children).forEach((child, i) => {
      child.classList.add('stagger-child');
      child.style.transitionDelay = (Math.min(i, 5) * 60) + 'ms';
    });
  });

  // scroll reveal
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal, .stagger-child').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal, .stagger-child').forEach(el => el.classList.add('in'));
  }
