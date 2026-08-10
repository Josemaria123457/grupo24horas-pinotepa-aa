(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.dataset.theme = savedTheme;

  function initialiseHeader() {
    const toggle = document.querySelector('[data-theme-toggle]');
    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.site-nav');

    const updateThemeLabel = () => {
      toggle?.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    };
    updateThemeLabel();

    toggle?.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', root.dataset.theme);
      updateThemeLabel();
    });

    menuButton?.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }));
  }

  function initialiseAnimations() {
    const targets = [...document.querySelectorAll('.section, .values, .page-hero')];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    targets.forEach((element, index) => {
      element.classList.add('reveal-item');
      element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    });

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.1 });

    targets.forEach((element) => observer.observe(element));
  }

  function addFloatingWhatsApp() {
    if (document.querySelector('.floating-help')) return;
    const link = document.createElement('a');
    link.className = 'floating-help';
    link.href = 'https://wa.me/529545434087?text=Hola%2C%20quisiera%20informaci%C3%B3n%20del%20Grupo%2024%20Horas%20Pinotepa%20de%20AA.';
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', 'Contactar por WhatsApp');
    link.textContent = '↗';
    document.body.append(link);
  }

  document.addEventListener('site-header-ready', initialiseHeader, { once: true });
  document.addEventListener('site-layout-ready', () => {
    initialiseAnimations();
    addFloatingWhatsApp();
  }, { once: true });

  if (root.dataset.layoutReady === 'true') {
    initialiseHeader();
    initialiseAnimations();
    addFloatingWhatsApp();
  }
})();
