(function () {
  // Navbar background on scroll
  const nav = document.getElementById('siteNav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal-on-scroll animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Typing effect for hero roles
  const typed = document.getElementById('typedRole');
  if (typed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let roles = [];
    try { roles = JSON.parse(typed.dataset.roles); } catch (e) { roles = []; }
    if (roles.length > 1) {
      let r = 0, c = roles[0].length, deleting = true;
      const tick = () => {
        const word = roles[r];
        typed.textContent = word.slice(0, c);
        if (deleting) {
          c--;
          if (c < 0) { deleting = false; r = (r + 1) % roles.length; c = 0; }
          setTimeout(tick, 40);
        } else {
          c++;
          if (c > roles[r].length) { deleting = true; c = roles[r].length; setTimeout(tick, 1800); return; }
          setTimeout(tick, 80);
        }
      };
      setTimeout(tick, 2000);
    }
  }

  // Portfolio category filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#projectGrid .project-card').forEach((card) => {
        const show = filter === 'All' || card.dataset.category === filter;
        card.classList.toggle('hide', !show);
        if (show) card.classList.add('visible');
      });
    });
  });

  // Copy email to clipboard
  const toast = document.getElementById('copyToast');
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
      }
    });
  });

  // Close mobile menu after clicking a link
  document.querySelectorAll('#navMenu .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})();
