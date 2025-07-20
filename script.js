
// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const resultsContainer = document.getElementById('resultsContainer');
const notFoundMessage = document.getElementById('notFound');
const clearBtn = document.querySelector('.clear-btn');

// Modal Elements
const imageModal = document.getElementById('imageModal');
const modalTitle = document.getElementById('modalTitle');
const mainModalImage = document.getElementById('mainModalImage');
const closeModal = document.getElementById('closeModal');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
const thumbnailContainer = document.getElementById('thumbnailContainer');

// Pagination
const itemsPerPage = 9;
let currentPage = 1;
let filteredItems = [];
let currentImages = [];
let currentImageIndex = 0;

// Pagination container
const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination';
document.body.appendChild(paginationContainer);

// Sort items
const sortedAdventures = adventures.slice().sort((a, b) => new Date(b.Date) - new Date(a.Date));

// Error fallback
function handleImageError(img, fallback = './source/placeholder.jpg') {
  img.onerror = null;
  img.src = fallback;
  img.alt = 'Image not found';
}

// Get images array for modal
function getItemImages(item) {
  return [item.image, item.extraimage1, item.extraimage2, item.extraimage3].filter(Boolean);
}

// Modal Controls
function openImageModal(item) {
  currentImages = getItemImages(item);
  currentImageIndex = 0;
  modalTitle.textContent = `${item.name} - ${item.fname}`;
  updateModalImage();
  createThumbnails();
  imageModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closeImageModal() {
  imageModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}
function updateModalImage() {
  if (currentImages.length > 0) {
    mainModalImage.src = currentImages[currentImageIndex];
    mainModalImage.onerror = () => handleImageError(mainModalImage);
    const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
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
    thumb.alt = `Image ${i + 1}`;
    if (i === currentImageIndex) thumb.classList.add('active');
    thumb.onerror = () => handleImageError(thumb);
    thumb.addEventListener('click', () => {
      currentImageIndex = i;
      updateModalImage();
    });
    thumbnailContainer.appendChild(thumb);
  });
}
function navigateImage(direction) {
  if (!currentImages.length) return;
  currentImageIndex = direction === 'next'
    ? (currentImageIndex + 1) % currentImages.length
    : (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  updateModalImage();
}

// Modal Events
closeModal?.addEventListener('click', closeImageModal);
prevImage?.addEventListener('click', () => navigateImage('prev'));
nextImage?.addEventListener('click', () => navigateImage('next'));
imageModal?.addEventListener('click', (e) => {
  if (e.target === imageModal) closeImageModal();
});
document.addEventListener('keydown', (e) => {
  if (imageModal.style.display === 'block') {
    if (e.key === 'Escape') closeImageModal();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  }
});

// Filter UI
function populateCategoryFilter(data) {
  const categories = [...new Set(data.map(item => item.category.trim()))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Display items
function displayResults(items, page = 1) {
  resultsContainer.innerHTML = '';
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const itemsToShow = items.slice(start, start + itemsPerPage);

  if (itemsToShow.length === 0) {
    notFoundMessage.style.display = 'block';
    paginationContainer.innerHTML = '';
    return;
  }

  notFoundMessage.style.display = 'none';

  itemsToShow.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    const isNew = item.New_item?.toLowerCase() === 'yes';
    const newIcon = isNew ? '<i class="fa-solid fa-star new-item-icon"></i><span class="new">New</span>' : '';

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onclick='openImageModal(${JSON.stringify(item).replace(/"/g, '&quot;')})'>
      <div class="card-body">
        <div class="card-title-line">
          <h2>${item.name} ${newIcon}</h2>
          <i class="fa-regular fa-heart favorite-icon" data-id="${item.name}"></i>
        </div>
        <p><strong>Full Name:</strong> ${item.fname}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Colors:</strong> ${item.colors}</p>
        <p><strong>Sizes:</strong> ${item.sizes}</p>
        <p><strong>For:</strong> ${item.forthe}</p>
        <p><strong>Stock:</strong> ${item.Stock}</p>
        <p><strong>Date:</strong> ${item.Date}</p>
                <p><strong>Price: </strong> ${item.price}</p>
        <button class="view-btn" onclick='openImageModal(${JSON.stringify(item).replace(/"/g, '&quot;')})'>${item.status}</button>
      </div>
    `;

    card.querySelector('img').onerror = () => handleImageError(card.querySelector('img'));
    resultsContainer.appendChild(card);
  });

  renderPagination(totalPages, page, items);
  setupFavoriteButtons();
}

// Pagination
function renderPagination(totalPages, currentPage, items) {
  paginationContainer.innerHTML = '';
  if (totalPages <= 1) return;

  function createButton(p) {
    const btn = document.createElement('button');
    btn.textContent = p;
    btn.className = p === currentPage ? 'page-btn active' : 'page-btn';
    btn.addEventListener('click', () => {
      displayResults(items, p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(btn);
  }

  createButton(1);
  if (currentPage > 3) paginationContainer.append('...');
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    createButton(i);
  }
  if (currentPage < totalPages - 2) paginationContainer.append('...');
  if (totalPages > 1) createButton(totalPages);
}

// Favorites
function setupFavoriteButtons() {
  document.querySelectorAll('.favorite-icon').forEach(icon => {
    const itemName = icon.dataset.id;
    const item = sortedAdventures.find(i => i.name === itemName);
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.some(f => f.name === item.name)) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
      icon.style.color = 'red';
    }

    icon.addEventListener('click', () => {
      favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const index = favorites.findIndex(f => f.name === item.name);
      if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = 'gray';
        showNotification(`${item.name} removed from favorites 🥺💔`, 'error');
      } else {
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = 'red';
        showNotification(`${item.name} ✨ added to favorites 🥳`, 'success');
      }
    });
  });
}

// Toast message
function showNotification(message, type = 'success') {
  const note = document.createElement('div');
  note.className = `notification-toast ${type}`;
  note.innerText = message;
  document.body.appendChild(note);

  setTimeout(() => {
    note.classList.add('show');
    setTimeout(() => {
      note.classList.remove('show');
      setTimeout(() => note.remove(), 300);
    }, 2500);
  }, 100);
}

// Search
searchInput?.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  filteredItems = sortedAdventures.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.fname.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

// Clear
clearBtn?.addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = '';
  filteredItems = sortedAdventures;
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

// Category change
categoryFilter?.addEventListener('change', () => {
  const selected = categoryFilter.value;
  filteredItems = selected === ''
    ? sortedAdventures
    : sortedAdventures.filter(i => i.category.trim() === selected);
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

// Init
populateCategoryFilter(sortedAdventures);
filteredItems = sortedAdventures;
displayResults(filteredItems, currentPage);


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
      text: `Here are my favorite items:\n\n${shareText}`,
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



function showWelcomePopup() {
  const today = new Date().toISOString().split('T')[0]; // e.g., "2025-07-20"
  const lastShownDate = localStorage.getItem('welcomeShownDate');

  if (lastShownDate !== today) {
    document.getElementById('welcomePopup').style.display = 'flex';
    localStorage.setItem('welcomeShownDate', today);
  }
}

function closeWelcomePopup() {
  document.getElementById('welcomePopup').style.display = 'none';
}

window.addEventListener('load', showWelcomePopup);
