(() => {
  const componentUrl = (name) => `/components/${name}.html`;

  async function includeComponent(selector, name) {
    const mount = document.querySelector(selector);
    if (!mount) return;

    try {
      const response = await fetch(componentUrl(name));
      if (!response.ok) throw new Error(`No se pudo cargar ${name}`);
      mount.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
      return;
    }

    if (name === 'header') {
      const activePage = document.body.dataset.page;
      mount.querySelector(`[data-page-link="${activePage}"]`)?.setAttribute('aria-current', 'page');
      document.dispatchEvent(new CustomEvent('site-header-ready'));
    }
  }

  Promise.all([
    includeComponent('[data-site-header]', 'header'),
    includeComponent('[data-site-footer]', 'footer'),
  ]).then(() => document.dispatchEvent(new CustomEvent('site-layout-ready')));
})();
