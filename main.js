const myLibrary = [];
const table = document.getElementById("book-list").lastElementChild
const titleInput = document.getElementById("title")
const authorInput = document.getElementById("author")
const pagesInput = document.getElementById("pages")
const readInput = document.getElementById("read")
const submitButton = document.getElementById("sumbit-button")


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


function addBookToLibrary(book) {
  myLibrary.push(book);
  const lastBook = myLibrary[myLibrary.length - 1];

  table.appendChild(document.createElement("tr"));
  
  let titleCell = document.createElement("td");
  titleCell.textContent = lastBook.title;
  table.lastChild.appendChild(titleCell);
  
  let authorCell = document.createElement("td");
  authorCell.textContent = lastBook.author;
  table.lastChild.appendChild(authorCell);
  

  let pagesCell = document.createElement("td");
  pagesCell.textContent = lastBook.pages;
  table.lastChild.appendChild(pagesCell);


  let readStatusCell = document.createElement("td");
  readStatusCell.textContent = lastBook.read? "yes" : "no";
  table.lastChild.appendChild(readStatusCell);
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  processForm();
})

function processForm(){

  const title = titleInput.value; 
  const author = authorInput.value;
  const pages = pagesInput.value;  
  const read = readInput.checked ? true : false;

  if (title === "" || author === "" || pages === ""){
    return;
  }

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  clearForm();
}


function clearForm(){
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}