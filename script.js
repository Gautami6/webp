const books = [
    { 
        id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", 
        rating: "★★★★★", desc: "A classic of 20th-century literature, exploring themes of wealth and obsession.",
        img: "https://covers.openlibrary.org/b/id/8432047-L.jpg" 
    },
    { 
        id: 2, title: "Frankenstein", author: "Mary Shelley", genre: "Classic", 
        rating: "★★★★☆", desc: "A masterpiece of gothic horror and the first true work of science fiction.",
        img: "https://covers.openlibrary.org/b/id/12818862-L.jpg" 
    },
    { 
        id: 3, title: "The Picture of Dorian Gray", author: "Oscar Wilde", genre: "Literary", 
        rating: "★★★★★", desc: "A moralistic tale of a man who trades his soul for eternal youth and beauty.",
        img: "https://covers.openlibrary.org/b/id/12640245-L.jpg" 
    },
    { 
        id: 4, title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", 
        rating: "★★★★☆", desc: "A terrifying vision of a controlled and consumerist future society.",
        img: "https://covers.openlibrary.org/b/id/8231938-L.jpg" 
    },
    { 
        id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", 
        rating: "★★★★★", desc: "The unforgettable journey of Bilbo Baggins through Middle-earth.",
        img: "https://covers.openlibrary.org/b/id/14555135-L.jpg" 
    }
];

let favorites = new Set();
let currentView = 'all'; // 'all' or 'favs'

function displayBooks() {
    const grid = document.getElementById('bookGrid');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeFilter = document.querySelector('.genre-btn.active').dataset.filter;

    let filtered = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
        const matchesGenre = activeFilter === 'all' || book.genre === activeFilter;
        const matchesView = currentView === 'all' || favorites.has(book.id);
        return matchesSearch && matchesGenre && matchesView;
    });

    grid.innerHTML = filtered.map(book => `
        <article class="book-card">
            <div class="cover-wrapper">
                <img src="${book.img}" alt="${book.title}">
            </div>
            <div class="book-info">
                <div class="rating">${book.rating}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-desc">${book.desc}</p>
                <button class="save-btn ${favorites.has(book.id) ? 'active' : ''}" onclick="toggleFavorite(${book.id})">
                    ${favorites.has(book.id) ? 'Remove from List' : 'Save to Reading List'}
                </button>
            </div>
        </article>
    `).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">No books found in this selection.</p>`;
    }
}

function showSection(view) {
    currentView = view;
    document.getElementById('allLink').classList.toggle('active', view === 'all');
    document.getElementById('favLink').classList.toggle('active', view === 'favs');
    document.getElementById('pageTitle').innerText = view === 'all' ? "Browse the Collection" : "Your Personal Archive";
    document.getElementById('genreNav').style.display = view === 'all' ? 'flex' : 'none';
    displayBooks();
}

function toggleFavorite(id) {
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    document.getElementById('favCount').innerText = favorites.size;
    displayBooks();
}

// Event Listeners
document.getElementById('searchInput').addEventListener('input', displayBooks);
document.querySelectorAll('.genre-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        displayBooks();
    });
});

// Initial Load
displayBooks();