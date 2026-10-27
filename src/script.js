// Initial Mock Data
let books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', copies: 3 },
  { id: 2, title: '1984', author: 'George Orwell', isbn: '978-0451524935', copies: 2 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', copies: 1 }
];

let loans = [
  { id: 1, bookId: 1, bookTitle: 'To Kill a Mockingbird', borrower: 'Alice Smith', issueDate: '2026-10-01', dueDate: '2026-10-15', status: 'Borrowed' }
];

// DOM Elements
const booksList = document.getElementById('books-list');
const selectBook = document.getElementById('select-book');
const lendingList = document.getElementById('lending-list');
const addBookForm = document.getElementById('add-book-form');
const borrowBookForm = document.getElementById('borrow-book-form');
const searchInput = document.getElementById('search-input');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
  renderLendingList();
  populateBookDropdown();
});

// 1. Render Books Table (With Search Support)
function renderBooks(filterText = '') {
  booksList.innerHTML = '';
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(filterText.toLowerCase()) ||
    book.author.toLowerCase().includes(filterText.toLowerCase()) ||
    book.isbn.includes(filterText)
  );

  if (filteredBooks.length === 0) {
    booksList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8;">No books found</td></tr>`;
    return;
  }

  filteredBooks.forEach(book => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${book.title}</strong></td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><span class="badge ${book.copies > 0 ? 'badge-returned' : 'badge-borrowed'}">${book.copies} available</span></td>
      <td>
        <button onclick="removeBook(${book.id})" class="btn btn-danger">Remove</button>
      </td>
    `;
    booksList.appendChild(tr);
  });
}

// 2. Feature: Add Books
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const isbn = document.getElementById('book-isbn').value;
  const copies = parseInt(document.getElementById('book-copies').value);

  const newBook = {
    id: Date.now(),
    title,
    author,
    isbn,
    copies
  };

  books.push(newBook);
  addBookForm.reset();
  
  updateAllViews();
  alert('Book added successfully!');
});

// 3. Feature: Remove Books
function removeBook(id) {
  if (confirm('Are you sure you want to remove this book?')) {
    books = books.filter(book => book.id !== id);
    updateAllViews();
  }
}

// 4. Feature: Borrow Books
borrowBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const bookId = parseInt(selectBook.value);
  const borrower = document.getElementById('borrower-name').value;
  const dueDate = document.getElementById('due-date').value;

  const book = books.find(b => b.id === bookId);

  if (book && book.copies > 0) {
    // Decrease inventory stock
    book.copies -= 1;

    // Create loan record
    const today = new Date().toISOString().split('T')[0];
    const newLoan = {
      id: Date.now(),
      bookId: book.id,
      bookTitle: book.title,
      borrower,
      issueDate: today,
      dueDate,
      status: 'Borrowed'
    };

    loans.push(newLoan);
    borrowBookForm.reset();

    updateAllViews();
    alert(`"${book.title}" successfully issued to ${borrower}!`);
  } else {
    alert('Selected book is out of stock.');
  }
});

// 5. Feature: Book Lending (Return Workflow)
function renderLendingList() {
  lendingList.innerHTML = '';

  if (loans.length === 0) {
    lendingList.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8;">No active loans</td></tr>`;
    return;
  }

  loans.forEach(loan => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${loan.bookTitle}</strong></td>
      <td>${loan.borrower}</td>
      <td>${loan.issueDate}</td>
      <td>${loan.dueDate}</td>
      <td>
        <span class="badge ${loan.status === 'Borrowed' ? 'badge-borrowed' : 'badge-returned'}">
          ${loan.status}
        </span>
      </td>
      <td>
        ${loan.status === 'Borrowed' 
          ? `<button onclick="returnBook(${loan.id})" class="btn btn-action">Mark Returned</button>` 
          : `<span style="color:#94a3b8; font-size:0.85rem;">Completed</span>`}
      </td>
    `;
    lendingList.appendChild(tr);
  });
}

function returnBook(loanId) {
  const loan = loans.find(l => l.id === loanId);
  if (loan) {
    loan.status = 'Returned';

    // Restock the book
    const book = books.find(b => b.id === loan.bookId);
    if (book) {
      book.copies += 1;
    }

    updateAllViews();
    alert(`Book returned and inventory updated!`);
  }
}

// Helper: Populate Book Selection Dropdown
function populateBookDropdown() {
  selectBook.innerHTML = '<option value="">-- Choose an Available Book --</option>';
  
  books.filter(b => b.copies > 0).forEach(book => {
    const option = document.createElement('option');
    option.value = book.id;
    option.textContent = `${book.title} (${book.copies} left)`;
    selectBook.appendChild(option);
  });
}

// Helper: Live Search
searchInput.addEventListener('input', (e) => {
  renderBooks(e.target.value);
});

// Helper: Sync All Components
function updateAllViews() {
  renderBooks(searchInput.value);
  renderLendingList();
  populateBookDropdown();
}
