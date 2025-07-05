// const searchInput = document.getElementById('searchInput');
// const resultsContainer = document.getElementById('resultsContainer');
// const notFoundMessage = document.getElementById('notFound');
// const clearBtn = document.querySelector('.clear-btn');

// // Pagination setup
// const itemsPerPage = 1;
// let currentPage = 1;
// let filteredItems = [];

// // Create pagination container dynamically
// const paginationContainer = document.createElement('div');
// paginationContainer.className = 'pagination';
// document.body.appendChild(paginationContainer);

// // Sort by Date (newest first)
// const sortedAdventures = adventures.slice().sort((a, b) => new Date(b.Date) - new Date(a.Date));

// // Render visible items
// function displayResults(items, page = 1) {
//   resultsContainer.innerHTML = '';
//   const totalItems = items.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const itemsToShow = items.slice(startIndex, endIndex);

//   if (itemsToShow.length === 0) {
//     notFoundMessage.style.display = 'block';
//     paginationContainer.innerHTML = '';
//     return;
//   }

//   notFoundMessage.style.display = 'none';

//   itemsToShow.forEach(item => {
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.innerHTML = `
//       <img src="${item.image}" alt="${item.name}">
//       <div class="card-body">
//         <h2>${item.name}</h2>
//         <p><strong>Full Name:</strong> ${item.fname}</p>
//         <p><strong>Category:</strong> ${item.category}</p>
//         <p><strong>Colors:</strong> ${item.colors}</p>
//         <p><strong>Sizes:</strong> ${item.sizes}</p>
//         <p><strong>For:</strong> ${item.forthe}</p>
//         <p><strong>Stock:</strong> ${item.Stock}</p>
//         <p><strong>New Item:</strong> ${item.New_item}</p>
//         <p><strong>Date:</strong> ${item.Date}</p>
//         <a href="${item.link}" target="_blank" class="view-btn">${item.status}</a>
//       </div>
//     `;
//     resultsContainer.appendChild(card);
//   });

//   renderPagination(totalPages, page, items);
// }

// // Pagination buttons with ellipses
// function renderPagination(totalPages, currentPage, items) {
//   paginationContainer.innerHTML = '';

//   function createButton(pageNum, label = null) {
//     const btn = document.createElement('button');
//     btn.textContent = label || pageNum;
//     btn.className = pageNum === currentPage ? 'page-btn active' : 'page-btn';
//     btn.addEventListener('click', () => {
//       displayResults(items, pageNum);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     });
//     paginationContainer.appendChild(btn);
//   }

//   if (totalPages <= 5) {
//     for (let i = 1; i <= totalPages; i++) {
//       createButton(i);
//     }
//     return;
//   }

//   // Always show first page
//   createButton(1);

//   // Left ellipsis
//   if (currentPage > 3) {
//     const dots = document.createElement('span');
//     dots.textContent = '...';
//     paginationContainer.appendChild(dots);
//   }

//   // Middle range
//   let start = Math.max(2, currentPage - 1);
//   let end = Math.min(totalPages - 1, currentPage + 1);

//   if (currentPage === 1) {
//     end = 3;
//   }
//   if (currentPage === totalPages) {
//     start = totalPages - 2;
//   }

//   for (let i = start; i <= end; i++) {
//     if (i > 1 && i < totalPages) {
//       createButton(i);
//     }
//   }

//   // Right ellipsis
//   if (currentPage < totalPages - 2) {
//     const dots = document.createElement('span');
//     dots.textContent = '...';
//     paginationContainer.appendChild(dots);
//   }

//   // Always show last page
//   createButton(totalPages);
// }

// // Event Listeners
// searchInput.addEventListener('input', () => {
//   const query = searchInput.value.trim().toLowerCase();
//   filteredItems = sortedAdventures.filter(item =>
//     item.name.toLowerCase().includes(query)
//   );
//   currentPage = 1;
//   displayResults(filteredItems, currentPage);
// });

// clearBtn.addEventListener('click', () => {
//   searchInput.value = '';
//   filteredItems = sortedAdventures;
//   currentPage = 1;
//   displayResults(filteredItems, currentPage);
// });

// // Initial load
// filteredItems = sortedAdventures;
// displayResults(filteredItems, currentPage);

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const resultsContainer = document.getElementById('resultsContainer');
const notFoundMessage = document.getElementById('notFound');
const clearBtn = document.querySelector('.clear-btn');

// Pagination setup
const itemsPerPage = 5;
let currentPage = 1;
let filteredItems = [];

// Create pagination container
const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination';
document.body.appendChild(paginationContainer);

// Sort by Date (newest first)
const sortedAdventures = adventures.slice().sort((a, b) => new Date(b.Date) - new Date(a.Date));

// Populate dropdown
function populateCategoryFilter(data) {
  const categories = [...new Set(data.map(item => item.category.trim()))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Render items
function displayResults(items, page = 1) {
  resultsContainer.innerHTML = '';
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = items.slice(startIndex, endIndex);

  if (itemsToShow.length === 0) {
    notFoundMessage.style.display = 'block';
    paginationContainer.innerHTML = '';
    return;
  }

  notFoundMessage.style.display = 'none';

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

  renderPagination(totalPages, page, items);
}

// Render pagination
function renderPagination(totalPages, currentPage, items) {
  paginationContainer.innerHTML = '';

  function createButton(pageNum, label = null) {
    const btn = document.createElement('button');
    btn.textContent = label || pageNum;
    btn.className = pageNum === currentPage ? 'page-btn active' : 'page-btn';
    btn.addEventListener('click', () => {
      displayResults(items, pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(btn);
  }

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      createButton(i);
    }
    return;
  }

  createButton(1);

  if (currentPage > 3) {
    const dots = document.createElement('span');
    dots.textContent = '...';
    paginationContainer.appendChild(dots);
  }

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage === 1) end = 3;
  if (currentPage === totalPages) start = totalPages - 2;

  for (let i = start; i <= end; i++) {
    if (i > 1 && i < totalPages) createButton(i);
  }

  if (currentPage < totalPages - 2) {
    const dots = document.createElement('span');
    dots.textContent = '...';
    paginationContainer.appendChild(dots);
  }

  createButton(totalPages);
}

// Event: Search
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  filteredItems = sortedAdventures.filter(item =>
    item.name.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

// Event: Clear button
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  filteredItems = sortedAdventures;
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

// Event: Dropdown filter
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  if (selectedCategory === '') {
    filteredItems = sortedAdventures;
  } else {
    filteredItems = sortedAdventures.filter(item =>
      item.category.trim() === selectedCategory
    );
  }
  currentPage = 1;
  displayResults(filteredItems, currentPage);
});

// Initial load
populateCategoryFilter(sortedAdventures);
categoryFilter.value = '';
filteredItems = sortedAdventures;
displayResults(filteredItems, currentPage);
