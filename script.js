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
    bookAuthor.textContent = `Author: ${book.author}`;

    const bookPage = document.createElement("p");
    bookPage.textContent = `Page: ${book.page}`;

    const bookRead = document.createElement("p");
    bookRead.textContent = `Status: ${book.read ? "Already read" : "Not yet"}`;

    bookCard.appendChild(bookName);
    bookCard.appendChild(bookId);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPage);
    bookCard.appendChild(bookRead);

    bookCard.addEventListener("mouseenter", () => {
      bookCard.classList.add("hovered");
    });
  }
}

myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
myLibrary.push(new Book("1984", "George Orwell", 328, false));
myLibrary.push(new Book("Narnia", "C.S. Lewis", 308, false));

displayBook();
