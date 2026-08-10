(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) root.dataset.theme = savedTheme;

  const updateThemeLabel = () => {
    const label = root.dataset.theme === 'dark'
      ? 'Cambiar a modo claro'
      : 'Cambiar a modo oscuro';
    toggle?.setAttribute('aria-label', label);
  };

  updateThemeLabel();

  toggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    updateThemeLabel();
  });

  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.site-nav');

  menuButton?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  const animationTargets = [
    ...document.querySelectorAll('.section, .values, .page-hero'),
  ];

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    animationTargets.forEach((element, index) => {
      element.classList.add('reveal-item');
      element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animationTargets.forEach((element) => observer.observe(element));
  }

  const floatingWhatsApp = document.createElement('a');
  floatingWhatsApp.className = 'floating-help';
  floatingWhatsApp.href = 'https://wa.me/529545434087?text=Hola%2C%20quisiera%20informaci%C3%B3n%20del%20Grupo%2024%20Horas%20Pinotepa%20de%20AA.';
  floatingWhatsApp.target = '_blank';
  floatingWhatsApp.rel = 'noopener';
  floatingWhatsApp.setAttribute('aria-label', 'Contactar por WhatsApp');
  floatingWhatsApp.textContent = '↗';
  document.body.append(floatingWhatsApp);
})();
