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
    addTitleCell(lastBook);
    addAuthorCell(lastBook);
    addPagesCell(lastBook);
    addReadStatusCell(lastBook);
    addChangeStatusCell(lastBook);
    addDeleteButtonCell(lastBook);

    function addTitleCell(lastBook){
      let titleCell = document.createElement("td");
      titleCell.textContent = lastBook.title;
      table.lastChild.appendChild(titleCell);
    }
    function addAuthorCell(lastBook){
      let authorCell = document.createElement("td");
      authorCell.textContent = lastBook.author;
      table.lastChild.appendChild(authorCell);
    }
    function addPagesCell(lastBook){
      let pagesCell = document.createElement("td");
      pagesCell.textContent = lastBook.pages;
      table.lastChild.appendChild(pagesCell);
    }
    function addReadStatusCell(lastBook){
      let readStatusCell = document.createElement("td");
      readStatusCell.textContent = lastBook.read? "yes" : "no";
      table.lastChild.appendChild(readStatusCell);
      
    }
    function addChangeStatusCell(lastBook){
      let changeStatusCell = document.createElement("td");
      let changeStatusButton = document.createElement("button");
      changeStatusButton.classList.add("changeStatus");
      changeStatusButton.innerHTML = "🔄"
      changeStatusButton.setAttribute("data-id", lastBook.id)
      changeStatusButton.onclick = function(event){
        changeStatus(event.target);
        event.preventDefault();
      }
      table.lastChild.appendChild(changeStatusCell);
      changeStatusCell.appendChild(changeStatusButton);
    }
    function addDeleteButtonCell(lastBook){
      let deleteBookCell = document.createElement("td");
      let deleteBookButton = document.createElement("button");
      deleteBookButton.classList.add("deleteBook");
      deleteBookButton.innerHTML = "🚮"
      deleteBookButton.setAttribute("data-id", lastBook.id);
      deleteBookButton.onclick = function(event){
        removeBook(event.target);
        
      }
      table.lastChild.appendChild(deleteBookCell);
      deleteBookCell.appendChild(deleteBookButton);
    }

    //                                          DELETE
    function addIdCell(lastBook){
      let idCell = document.createElement("td");
      idCell.textContent = lastBook.id;
      table.lastChild.appendChild(idCell);
      table.lastChild.appendChild(idCell);
    }
  }
  
}

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

function removeBook(removeButton){

  let currentBookId = Number(removeButton.getAttribute("data-id"));
  
  let currentBookIndex = myLibrary.findIndex((element) => element.id === currentBookId); 
  console.log(currentBookIndex);
  myLibrary.splice(currentBookIndex, 1);

  let currentRow = removeButton.parentElement.parentElement;
  currentRow.remove();
}

function changeStatus(changeButton){
  let currentBookId = Number(changeButton.getAttribute("data-id"));
  let currentBookIndex = myLibrary.findIndex((element) => element.id === currentBookId);
  myLibrary[currentBookIndex].read = myLibrary[currentBookIndex].read == true ? false : true;
  let readStatusCell = changeButton.parentElement.previousSibling;
  readStatusCell.textContent = readStatusCell.textContent == "yes" ? "no" : "yes"
  console.log(myLibrary[currentBookIndex]);
}