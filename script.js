
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const notFoundMessage = document.getElementById('notFound');
const clearBtn = document.querySelector('.clear-btn');

// Pagination constants
const itemsPerPage = 9;
let currentPage = 1;
let filteredItems = [];

const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination';
document.body.appendChild(paginationContainer);

// Sort data initially by newest date
const sortedAdventures = adventures.slice().sort((a, b) => new Date(b.Date) - new Date(a.Date));

function displayResults(items, page = 1) {
  resultsContainer.innerHTML = '';
  paginationContainer.innerHTML = '';

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = items.slice(startIndex, endIndex);

  if (itemsToShow.length === 0) {
    notFoundMessage.style.display = 'block';
    return;
  }
  notFoundMessage.style.display = 'none';

  // Show cards
  itemsToShow.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="card-body">
        <h2>${item.name}</h2>
        <p><strong>Full Name:</strong> ${item.fname}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Colors:</strong> ${item.colors}</p>
        <p><strong>Sizes:</strong> ${item.sizes}</p>
        <p><strong>For:</strong> ${item.forthe}</p>
        <p><strong>Stock:</strong> ${item.Stock}</p>
        <p><strong>New Item:</strong> ${item.New_item}</p>
        <p><strong>Date:</strong> ${item.Date}</p>
        <a href="${item.link}" target="_blank" class="view-btn">${item.status}</a>
      </div>
    `;
    resultsContainer.appendChild(card);
  });

  // Create page buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === page ? 'page-btn active' : 'page-btn';
    btn.addEventListener('click', () => {
      currentPage = i;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      displayResults(items, currentPage);
    });
    paginationContainer.appendChild(btn);
  }
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  filteredItems = sortedAdventures.filter(item =>
    item.name.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  filteredItems = sortedAdventures;
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

// Initial load
filteredItems = sortedAdventures;
displayResults(filteredItems, currentPage);
