"use strict";

// library array
let library = [
  {
    title: "Lord of The Rings",
    author: "J.R.R. Tolekin",
    pages: 320,
    isRead: false,
  },
  {
    title: "Harry Potter & The Cursed Child",
    author: "J.K. Rowling",
    pages: 340,
    isRead: false,
  },
];

// Book class
class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  // add book to library
  addBook() {
    library.push(this);
  }
}

// EVENT LISTENERS

class DOM {
  _container = document.querySelector(".books__container");
  _bookForm = document.querySelector(".book__form");

  constructor() {
    this._getLocalStorage();

    // display form for new book
    document
      .querySelector(".new__book")
      .addEventListener("click", this.displayForm);

    // close form on clicking X
    document
      .querySelector(".close-form")
      .addEventListener("click", this.closeForm);

    // submit new book form
    this._bookForm.addEventListener("submit", this.addNewBook.bind(this));

    // mark book as read or delete a book through event delegation
    document
      .querySelector(".books__container")
      .addEventListener("click", this.deleteOrToggle.bind(this));
  }

  renderBook(book) {
    const markup = `
        <div data-index=${library.indexOf(book)} class="book">
          <label class="title">${book.title}</label>
          <label class="author">By ${book.author}</label>
          <label class="pages">${book.pages} Pages</label>
          <label>
          <label class="switch">
          <input class="toggleRead" type="checkbox" /><span class="slider round"></span></label> Mark as Read</label>
          <button class="btn delete">Delete Book</button>
        </div>`;

    this._container.innerHTML += markup;
  }

  displayLibrary() {
    this._container.innerHTML = "";
    library.forEach((book) => this.renderBook(book));
  }

  displayForm() {
    document.querySelector(".open-form").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
  }

  closeForm() {
    document.querySelector(".open-form").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  }

  addNewBook(e) {
    e.preventDefault();

    // get all input values from the form
    const [title, author, pages] = document.querySelectorAll("input");

    // create a new book object with them & add that book to the library
    const newBook = new Book(title.value, author.value, pages.value, false);
    newBook.addBook();

    // call display books on library
    this.renderBook(newBook);

    this.closeForm();

    this._bookForm.reset();

    this._setLocalStorage();
  }

  deleteOrToggle(e) {
    // delete books function
    if (e.target.classList.contains("delete")) {
      const index = e.target.parentNode.dataset.index;

      library.splice(index, 1);

      this.displayLibrary();
    }

    // toggle read status
    if (e.target.classList.contains("toggleRead")) {
      // since checkbox is nested in label, get the parent dataset using closest
      const book = e.target.closest("div");

      const index = book.dataset.index;

      // change the read status of book
      library[index].isRead = e.target.checked;

      book
        .querySelectorAll("label")
        .forEach((label) => label.classList.toggle("marked"));
    }

    this._setLocalStorage();
  }

  _setLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("library"));

    if (!data) return this.displayLibrary();

    library = data;

    this.displayLibrary();
  }

  reset() {
    localStorage.removeItem("library");
  }
}

const dom = new DOM();
