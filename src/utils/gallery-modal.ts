export function initializeModal(galleryGrid: HTMLElement) {
  const modal = document.getElementById('gallery-modal');
  const modalContent = modal?.querySelector('.modal-content');
  let currentIndex = -1;

  async function loadGalleryItem(url: string) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const galleryItem = doc.getElementById('gallery-item');
      
      if (galleryItem && modalContent) {
        modalContent.innerHTML = '';
        modalContent.appendChild(galleryItem);
      }
    } catch (error) {
      console.error('Error loading gallery item:', error);
    }
  }

  function openModal(url: string, index: number) {
    if (!modal) return;
    
    currentIndex = index;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    loadGalleryItem(url);
    
    // Update URL without navigation
    window.history.pushState({ modalOpen: true }, '', url);

    // Emit gallery navigation event for tracking
    const event = new CustomEvent('gallery:navigation', {
      detail: {
        url: url,
        title: document.title
      }
    });
    document.dispatchEvent(event);
  }

  function closeModal() {
    if (!modal) return;
    
    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentIndex = -1;
    
    // Check if #gallery-grid has a data-tag or data-category attribute and update URL accordingly
    const galleryGrid = document.getElementById('gallery-grid');
    const urlPath = galleryGrid.getAttribute('data-tag') || galleryGrid.getAttribute('data-category') ? `/gallery/${galleryGrid.getAttribute('data-tag') || galleryGrid.getAttribute('data-category')}/` : '/gallery/';
    
    // Update URL and history
    window.history.pushState({ modalOpen: false }, '', urlPath);
  }

  // Event delegation for gallery item clicks
  galleryGrid.addEventListener('click', (e) => {
    const galleryItem = (e.target as Element).closest('a[data-gallery-item]');
    if (galleryItem) {
      e.preventDefault();
      e.stopPropagation();
      
      // Prevent Astro's view transitions
      if (e.currentTarget instanceof HTMLElement) {
        e.currentTarget.setAttribute('data-astro-reload', '');
      }
      
      const url = galleryItem.getAttribute('href');
      const index = Array.from(galleryGrid.children).findIndex(
        item => item.contains(galleryItem)
      );
      
      if (url) openModal(url, index);
      return false;
    }
  }, { capture: true });

  // Close modal on click outside or close button
  modal?.addEventListener('click', (e) => {
    if (e.target === modal || (e.target as Element).classList.contains('modal-close')) {
      closeModal();
    }
  });

  // Navigation buttons
  const prevButton = modal?.querySelector('.nav-button.prev');
  const nextButton = modal?.querySelector('.nav-button.next');

  prevButton?.addEventListener('click', () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      const prevItem = galleryGrid.children[newIndex].querySelector('[data-gallery-item]');
      if (prevItem instanceof HTMLElement) {
        const url = prevItem.getAttribute('href');
        if (url) openModal(url, newIndex);
      }
    }
  });

  nextButton?.addEventListener('click', () => {
    const newIndex = currentIndex + 1;
    if (newIndex < galleryGrid.children.length) {
      const nextItem = galleryGrid.children[newIndex].querySelector('[data-gallery-item]');
      if (nextItem instanceof HTMLElement) {
        const url = nextItem.getAttribute('href');
        if (url) openModal(url, newIndex);
      }
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('open')) return;

    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevButton?.click();
        break;
      case 'ArrowRight':
        nextButton?.click();
        break;
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state?.modalOpen) {
      const url = window.location.pathname;
      openModal(url, currentIndex);
    } else {
      closeModal();
    }
  });
}
