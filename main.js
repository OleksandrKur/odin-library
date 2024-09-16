const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

}

Book.prototype.info = function (){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 324, "not read yet");

theHobbit.info(); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"

console.log(theHobbit.info());
function addBookToLibrary() {
  // do stuff here
}