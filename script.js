"use strict";

const container = document.querySelector(".books__container");
const bookForm = document.querySelector(".book__form");
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

// EVENT LISTENERS

// display form for new book
document.querySelector(".new__book").addEventListener("click", displayForm);

// close form on clicking X
document.querySelector(".close-form").addEventListener("click", closeForm);

// submit new book form
document.querySelector(".book__form").addEventListener("submit", addNewBook);

// mark book as read or delete a book through event delegation
document
  .querySelector(".books__container")
  .addEventListener("click", deleteOrToggle);

// FUNCTIONS

// books contructor
function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// add books function
function addBook(book) {
  library.push(book);
}

function displayLibrary() {
  container.innerHTML = "";
  library.forEach((book) => renderBook(book));
}

function renderBook(book) {
  const markup = `
      <div data-index=${library.indexOf(book)} class="book">
        <label class="title">${book.title}</label>
        <label class="author">By ${book.author}</label>
        <label class="pages">${book.pages} Pages</label>
        <label><input type="checkbox" class="toggleRead" ${
          book.isRead ? "checked" : ""
        }/> Mark as Read</label>
        <button class="btn delete">Delete Book</button>
      </div>`;

  container.innerHTML += markup;
}

function displayForm() {
  document.querySelector(".open-form").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
}

function closeForm() {
  document.querySelector(".open-form").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
}

function addNewBook(e) {
  e.preventDefault();

  // get all input values from the form
  const [title, author, pages] = document.querySelectorAll("input");

  // create a new book object with them & add that book to the library
  const newBook = new Book(title.value, author.value, pages.value, false);
  addBook(newBook);

  // call display books on library
  renderBook(newBook);

  closeForm();
}

function deleteOrToggle(e) {
  // delete books function
  if (e.target.classList.contains("delete")) {
    const index = e.target.parentNode.dataset.index;

    library.splice(index, 1);

    displayLibrary();
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
}

displayLibrary();
