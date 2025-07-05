const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const notFoundMessage = document.getElementById('notFound');
const clearBtn = document.querySelector('.clear-btn');

function displayResults(filteredItems) {
  resultsContainer.innerHTML = '';
  if (filteredItems.length === 0) {
    notFoundMessage.style.display = 'block';
    return;
  }
  notFoundMessage.style.display = 'none';

  filteredItems.forEach(item => {
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
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = adventures.filter(item =>
    item.name.toLowerCase().includes(query)
  );
  displayResults(filtered);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  displayResults(adventures);
});

// Load all initially
displayResults(adventures);
