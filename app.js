//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("add-item-section__input_task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("todo-section__list");//ul of #todo-section__list
var completedTasksHolder=document.getElementById("completed-section__list");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //form
    var form=document.createElement("form");//form
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //span
    var span=document.createElement("span");//span
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button

    span.innerText=taskString;
    span.className='card__task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="checkbox card__checkbox";
    editInput.type="text";
    editInput.className="input input_text card__input card__input_task";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="button card__button card__button_edit";
    editButton.setAttribute('type', 'button');

    deleteButton.className="button card__button card__button_delete";
    deleteButton.setAttribute('type', 'button');

    form.className="card";

    listItem.className="list__item";

    //and appending.
    form.appendChild(checkBox);
    form.appendChild(span);
    form.appendChild(editInput);
    form.appendChild(editButton);
    form.appendChild(deleteButton);
    listItem.appendChild(form);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var form=this.parentNode;

    var editInput=form.querySelector('.card__input_task');
    var span=form.querySelector(".card__task");
    var editBtn=form.querySelector(".card__button_edit");
    var containsClass=form.classList.contains("card_mode_edit");
    //If class of the parent is .card_mode_edit
    if(containsClass){

        //switch to .editmode
        //span becomes the inputs value.
        span.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=span.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    form.classList.toggle("card_mode_edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var form=this.parentNode;
    var listItem=form.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-section__list
    var form=this.parentNode;
    var listItem=form.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #todo-section__list.
    var form=this.parentNode;
    var listItem=form.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".card__checkbox");
    var editButton=taskListItem.querySelector(".card__button_edit");
    var deleteButton=taskListItem.querySelector(".card__button_delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.