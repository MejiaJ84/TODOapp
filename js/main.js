var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("add");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    var isDataValid = true;
    var title = getInputId("title").value;
    if (title == "") {
        isDataValid = false;
        alert("Please enter a task.");
    }
    return isDataValid;
}
function getToDoItem() {
    var myItem = new ToDoItem();
    var titleInput = getInputId("title");
    myItem.title = titleInput.value;
    var dueDateInput = getInputId("due-date");
    myItem.dueDate = new Date(dueDateInput.value);
    var isCompleted = getInputId("is-complete");
    myItem.isCompleted = isCompleted.checked;
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    else {
        itemDiv.classList.add("incomplete");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var completeToDos = document.getElementById("complete-items");
        completeToDos.appendChild(itemDiv);
    }
    else {
        var incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
function markComplete() {
    var itemDiv = this;
    console.log(itemDiv);
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("complete-items");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}
function getInputId(id) {
    return document.getElementById(id);
}
