// @ts-ignore: Ignoring issue with datepicker lack of intellisense
const picker = datepicker("#due-date"); 
picker.setMin(new Date()); // Set to current date

const todokey = "todo";

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

window.onload = function(){
    let addItem = document.getElementById("add");
    addItem.onclick = main;
    
    // Load saved item
    loadSavedItem();
}

function loadSavedItem(){
    let itemArray = getToDoItems(); // reads from web storage

    // going through a loop to display each index
    for(let i = 0; i < itemArray.length; i++){
        displayToDoItem(itemArray[i]);
    }
}


function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

function isValid():boolean{
    let isDataValid = true;

    let title = getInputId("title").value;
    if(title == ""){
        isDataValid = false;
        alert("Please enter a task.");
    }
    return isDataValid;

}

/**
 * get all input off form and wrap in 
 * a todo item object
 */
function getToDoItem():ToDoItem{
    let myItem = new ToDoItem();

    // title
    let titleInput = getInputId("title"); // get the title html element
    myItem.title = titleInput.value; // stores the value of the title element as the objects title

    // due date
    let dueDateInput = getInputId("due-date");
    myItem.dueDate = new Date(dueDateInput.value); // converts string into date

    // isCompleted
    let isCompleted = getInputId("is-complete");
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

/**
 * 
 * @param item display given todo item on the webpage
 */
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    // itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // <div class="completed"></div> or empty <div></div>
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markComplete;

    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }
    else{
        itemDiv.classList.add("incomplete");
    }

    /*
        <div class = "completed">
            <h3>Gym</h3>
            <p>Everyday!!!</p>
        </div>
    */
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let completeToDos = document.getElementById("complete-items");
        completeToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function markComplete(){
    let itemDiv = <HTMLElement>this;
    console.log(itemDiv);
    itemDiv.classList.add("completed")

    let completedItems = document.getElementById("complete-items");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);

}

function saveToDo(item:ToDoItem):void{
    let currItems = getToDoItems();
    if(currItems == null){ // no items found
        currItems = new Array();
    }
    currItems.push(item); // add new items to current ones

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

/**
 * get stored todo items or
 * null if none found
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

function getInputId(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}