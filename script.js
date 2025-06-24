const bookShelf = document.querySelector(".bookshelf");

const myLibrary = [];

function Book(name, author, page, read) {
  // the constructor...
  this.name = name;
  this.id = crypto.randomUUID();
  this.author = author;
  this.page = page;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBook();
}

function displayBook() {
  bookShelf.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "card");
    bookShelf.appendChild(bookCard);

    const book = myLibrary[i];

    const bookName = document.createElement("h1");
    bookName.textContent = myLibrary[i].name;

    const bookId = document.createElement("p");
    bookId.textContent = `ID: ${book.id}`;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `${book.author}`;

    const bookPage = document.createElement("p");
    bookPage.textContent = `${book.page} pages`;

    const bookRead = document.createElement("p");
    bookRead.textContent = `${book.read ? "Already read" : "Unread"}`;

    const btnArea = document.createElement("div");
    btnArea.setAttribute("class", "btn-area");

    const toggleRead = document.createElement("button");
    toggleRead.setAttribute("class", "toggle-btn");
    toggleRead.textContent = book.read ? "Mark as Unread" : "Mark as Read";

    toggleRead.addEventListener("click", () => {
      toggleReadStatus(book.id);
    });

    const deleteBook = document.createElement("button");
    deleteBook.setAttribute("class", "delete-btn");
    deleteBook.textContent = "Delete";

    deleteBook.addEventListener("click", () => {
      deleteBookFromLibrary(book.id);
    });

    bookCard.appendChild(bookName);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPage);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(btnArea);
    btnArea.appendChild(toggleRead);
    btnArea.appendChild(deleteBook);
  }
}

myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
myLibrary.push(new Book("1984", "George Orwell", 328, false));
myLibrary.push(new Book("Narnia", "C.S. Lewis", 308, false));

displayBook();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".open-button");
const closeButton = document.querySelector("dialog .close-button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

window.onclick = function (event) {
  if (event.target === dialog) {
    dialog.close();
  }
};

const bookForm = document.querySelector("form");

bookForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const author = formData.get("author");
  const page = formData.get("page");
  const read = formData.get("readStatus") === "read" ? true : false;

  addBookToLibrary(name, author, page, read);

  dialog.close();
  bookForm.reset();
}

function toggleReadStatus(bookId) {
  const book = myLibrary.find((book) => book.id === bookId);
  if (book) {
    book.read = !book.read;
    displayBook();
  }
}

function deleteBookFromLibrary(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBook();
  }
}
