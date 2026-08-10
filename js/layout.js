(() => {
  const root = document.documentElement;

  async function fetchMarkup(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
    return response.text();
  }

  async function includeComponent(selector, name) {
    const mount = document.querySelector(selector);
    if (!mount) return;

    try {
      mount.innerHTML = await fetchMarkup(`/components/${name}.html`);
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

  async function includeSections() {
    const mounts = [...document.querySelectorAll('[data-include]')];
    await Promise.all(mounts.map(async (mount) => {
      const name = mount.dataset.include;
      try {
        mount.innerHTML = await fetchMarkup(`/sections/${name}.html`);
      } catch (error) {
        console.error(error);
      }
    }));
  }

  Promise.all([
    includeComponent('[data-site-header]', 'header'),
    includeComponent('[data-site-footer]', 'footer'),
    includeSections(),
  ]).then(() => {
    root.dataset.layoutReady = 'true';
    document.dispatchEvent(new CustomEvent('site-layout-ready'));
  });
})();
