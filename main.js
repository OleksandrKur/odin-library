const myLibrary = [];
const table = document.getElementById("book-list").lastElementChild
const titleInput = document.getElementById("title")
const authorInput = document.getElementById("author")
const pagesInput = document.getElementById("pages")
const readInput = document.getElementById("read")
const submitButton = document.getElementById("sumbit-button")
const changeStatusButtons = document.getElementsByClassName("changeStatus");
const deleteEntryButtons = document.getElementsByClassName("deleteBook");
let idCount = 1;

function Book(title, author, pages, read) {
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = idCount++;
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  processForm();
})

function addBookToLibrary(book) {

  myLibrary.push(book);
  const lastBook = myLibrary[myLibrary.length - 1];

  addRow(lastBook);

  function addRow(lastBook){
    let tableRow = document.createElement("tr");
    tableRow.classList.add("table-row");
    table.appendChild(tableRow);
    addCell(lastBook.title);
    addCell(lastBook.author);
    addCell(lastBook.pages);
    addCell(lastBook.read ? "Finished" : "Not finished");
    createButton("🔄", lastBook.id, "changeStatus", changeStatus);
    createButton("🚮", lastBook.id, "deleteBook", removeBook);


    function addCell(text){
      let newCell = document.createElement("td");
      newCell.textContent = text;
      table.lastChild.appendChild(newCell);
    }

    function createButton(text, id, cssClass, buttonFunction){
      let buttonCell = document.createElement("td");
      let button = document.createElement("button");
      button.classList.add(cssClass);
      button.classList.add("button-small");
      button.innerHTML = text;
      button.setAttribute("data-id", id)
      button.onclick = function(event){
        buttonFunction(event.target);
        event.preventDefault();
      }
      table.lastChild.appendChild(buttonCell);
      buttonCell.appendChild(button);
    }
  }
  
}

function processForm(){

  const title = titleInput.value; 
  const author = authorInput.value;
  const pages = pagesInput.value;  
  const read = readInput.checked ? true : false;

  if (title === "" || author === "" || pages === ""){
    alert("Need to fill all inputs");
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

function removeBook(removeButton){
  let currentBookId = Number(removeButton.getAttribute("data-id"));
  
  let currentBookIndex = myLibrary.findIndex((element) => element.id === currentBookId); 
  myLibrary.splice(currentBookIndex, 1);

  let currentRow = removeButton.parentElement.parentElement;
  currentRow.remove();
}

function changeStatus(changeButton){
  let currentBookId = Number(changeButton.getAttribute("data-id"));
  let currentBookIndex = myLibrary.findIndex((element) => element.id === currentBookId);
  myLibrary[currentBookIndex].read = myLibrary[currentBookIndex].read == true ? false : true;
  let readStatusCell = changeButton.parentElement.previousSibling;
  readStatusCell.textContent = readStatusCell.textContent == "Not finished" ? "Finished" : "Not finished"
}