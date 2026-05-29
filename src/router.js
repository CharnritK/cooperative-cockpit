// Simple client-side router for switching pages in the MVP.
// It updates the global state and delegates rendering to app.js.

(function () {
  /**
   * Navigate to the given page key.
   * @param {string} page
   */
  function navigate(page) {
    if (!page) return;
    if (window.appState.currentPage === page) return;
    window.appState.currentPage = page;
    updateNavHighlight(page);
    // Hide inspector by default; page rendering can show it when needed
    const inspector = document.getElementById('right-inspector');
    if (inspector) inspector.classList.add('hidden');
    // Call page renderer defined in app.js
    if (typeof window.renderPage === 'function') {
      window.renderPage(page);
    }
  }

  /**
   * Highlight the active navigation item.
   * @param {string} page
   */
  function updateNavHighlight(page) {
    const items = document.querySelectorAll('.nav-item');
    items.forEach((item) => {
      if (item.dataset.page === page) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'page');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });
  }

  // Expose navigate globally
  window.navigate = navigate;
})();
