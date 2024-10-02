
class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = null;
  }
  changeReadStatus(){
    this.read = this.read === true ? false : true;
  }
  assignId(id){
    this.id = id;
  }
}

class Library{
  constructor(){
    this.library = [];
    this.idCount = 0;
  }
  addBook(book){
    this.library.push(book);
    this.idCount++;
    book.assignId(this.idCount);
  }
  removeBookById(id){
    let bookIndex = this.library.findIndex((element) => element.id === id); 
    this.library.splice(bookIndex, 1);
    console.log(this.library);
  }
  changeReadStatusById(id){
    let bookIndex = this.library.findIndex((element) => element.id === id); 
    this.library[bookIndex].changeReadStatus(bookIndex)
    console.log(this.library[bookIndex]);
  }

}


const Form = (function(){

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readInput = document.getElementById("read");
  const submitButton = document.getElementById("sumbit-button");
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
      alert("Need to fill all inputs");
      return;
    }
    const newBook = new Book(title, author, pages, read);
    myLibrary.addBook(newBook);
    Display.addBookToPage(newBook);
    clearForm();
  } 

  function clearForm(){
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
  }
})()

const myLibrary = new Library();
const Display = (function(){
  const table = document.getElementById("book-list").lastElementChild

  function addBookToPage(book) {
  
    addRow(book);
  
    function addRow(book){
      let tableRow = document.createElement("tr");
      tableRow.classList.add("table-row");
      table.appendChild(tableRow);
      addCell(book.title);
      addCell(book.author);
      addCell(book.pages);
      addCell(book.read ? "Finished" : "Not finished");
      createButton("🔄", book, "changeStatus", changeStatus);
      createButton("🚮", book, "deleteBook", removeBookFromPage);
  
  
      function addCell(text){
        let newCell = document.createElement("td");
        newCell.textContent = text;
        table.lastChild.appendChild(newCell);
      }
  
      function createButton(text, book, cssClass, buttonFunction){
        let buttonCell = document.createElement("td");
        let button = document.createElement("button");
        button.classList.add(cssClass);
        button.classList.add("button-small");
        button.innerHTML = text;
        button.setAttribute("data-id", book.id)
        button.onclick = function(event){
          buttonFunction(event.target);
          event.preventDefault();
        }
        table.lastChild.appendChild(buttonCell);
        buttonCell.appendChild(button);
      }
    }
    
  }

  function removeBookFromPage(removeButton){
    let currentBookId = Number(removeButton.getAttribute("data-id"));
    myLibrary.removeBookById(currentBookId);

    let currentRow = removeButton.parentElement.parentElement;
    currentRow.remove();
  }
  
  function changeStatus(changeButton){
    let currentBookId = Number(changeButton.getAttribute("data-id"));
    myLibrary.changeReadStatusById(currentBookId);
    let readStatusCell = changeButton.parentElement.previousSibling;

    readStatusCell.textContent = readStatusCell.textContent == "Not finished" ? "Finished" : "Not finished"
  }


  return{
    addBookToPage,
    removeBookFromPage,
  }
})()










