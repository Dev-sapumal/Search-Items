let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
const container = document.getElementById('favoritesContainer');

    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.className = `notification-toast ${type} show`;
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function saveFavorites(newFavorites) {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    function clearAllFavorites() {
      if (favorites.length > 0) {
        favorites = [];
        saveFavorites(favorites);
        renderFavorites();
        showToast('All favorites cleared.', 'error');
      }
    }

    function renderFavorites() {
      container.innerHTML = '';
      if (favorites.length === 0) {
        container.innerHTML = '<p style="text-align:center;">No favorites yet.</p>';
        return;
      }

      favorites.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        const newIcon = item.New_item === 'yes' ? '<span class="new">New</span>' : '';

        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" onclick='openImageModal(${JSON.stringify(item).replace(/"/g, '&quot;')})'>
          <div class="card-body">
            <div class="card-title-line">
              <h2>${item.name} ${newIcon}</h2>
              <i class="fa-solid fa-heart favorite-icon"></i>
            </div>
            <p><strong>Full Name:</strong> ${item.fname}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Colors:</strong> ${item.colors}</p>
            <p><strong>Sizes:</strong> ${item.sizes}</p>
            <p><strong>For:</strong> ${item.forthe}</p>
            <p><strong>Stock:</strong> ${item.Stock}</p>
            <p><strong>Date:</strong> ${item.Date}</p>
            <button class="view-btn" onclick='openImageModal(${JSON.stringify(item).replace(/"/g, '&quot;')})'>${item.status}</button>
            <button class="remove-btn" data-id="${item.name}">Remove from Favorites</button>
          </div>
        `;
        container.appendChild(card);
      });

      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const name = btn.dataset.id;
          favorites = favorites.filter(item => item.name !== name);
          saveFavorites(favorites);
          renderFavorites();
          showToast(`${name} removed from favorites`, 'error');
        });
      });
    }

    // Modal logic
    const imageModal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const mainModalImage = document.getElementById('mainModalImage');
    const closeModal = document.getElementById('closeModal');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const thumbnailContainer = document.getElementById('thumbnailContainer');

    let currentImages = [];
    let currentImageIndex = 0;

    function getItemImages(item) {
      return [item.image, item.extraimage1, item.extraimage2, item.extraimage3].filter(Boolean);
    }

    function openImageModal(item) {
      currentImages = getItemImages(item);
      currentImageIndex = 0;
      modalTitle.textContent = `${item.name} - ${item.fname}`;
      updateModalImage();
      createThumbnails();
      imageModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function updateModalImage() {
      if (currentImages.length > 0) {
        mainModalImage.src = currentImages[currentImageIndex];
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
          thumb.classList.toggle('active', i === currentImageIndex);
        });
      }
    }

    function createThumbnails() {
      thumbnailContainer.innerHTML = '';
      currentImages.forEach((src, i) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = 'thumbnail';
        if (i === currentImageIndex) thumb.classList.add('active');
        thumb.addEventListener('click', () => {
          currentImageIndex = i;
          updateModalImage();
        });
        thumbnailContainer.appendChild(thumb);
      });
    }

    function navigateImage(direction) {
      currentImageIndex = direction === 'next'
        ? (currentImageIndex + 1) % currentImages.length
        : (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      updateModalImage();
    }

    closeModal.addEventListener('click', () => {
      imageModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    prevImage.addEventListener('click', () => navigateImage('prev'));
    nextImage.addEventListener('click', () => navigateImage('next'));

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (imageModal.style.display === 'flex') {
        if (e.key === 'Escape') imageModal.style.display = 'none';
        if (e.key === 'ArrowRight') navigateImage('next');
        if (e.key === 'ArrowLeft') navigateImage('prev');
      }
    });

    renderFavorites();


    function shareFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favorites.length === 0) {
    alert('No favorites to share.');
    return;
  }

  const shareText = favorites.map(item =>
    `• ${item.name} - ${item.fname} (${item.category})`
  ).join('\n');

  if (navigator.share) {
    navigator.share({
      title: 'My Favorite Items',
      text: `Here are my favorite items❤️:\n\n${shareText}`,
    }).catch(err => {
      console.error('Sharing failed:', err);
    });
  } else {
    copyToClipboard(shareText);
    alert('Favorites copied to clipboard. You can paste and share it manually.');
  }
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

