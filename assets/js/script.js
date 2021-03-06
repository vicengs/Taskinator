/* ------------------------- */
/* Project  : Taskinator     */
/* File     : script.js      */
/* Author   : Vicente Garcia */
/* Date     : 02/22/2022     */
/* Modified : 02/24/2022     */
/* ------------------------- */
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var tasks = [];
var createTaskActions = function(taskId, taskStatus){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // Create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    // Create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    // create dropdown
    var statusSelectEl = document.createElement("select");
    var statusChoices = ["To Do","In Progress","Completed"];
    for(var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        if (taskStatus===statusChoices[i].toLowerCase()){
            statusOptionEl.setAttribute("selected", "selected");
        }
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    };
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    return actionContainerEl;
};
var completeEditTask = function(taskName, taskType, taskId){
    // Find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    // Loop through tasks array and task object with new content
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        };
    };
    saveTasks(tasks);
    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}
var createTaskEl = function(taskDataObj){
    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // Add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // Add elements to parent
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(taskIdCounter, taskDataObj.status);
    listItemEl.appendChild(taskActionsEl);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks(tasks);
    if(taskDataObj.status === "to do"){
        tasksToDoEl.appendChild(listItemEl);
    }else if(taskDataObj.status === "in progress"){
        tasksInProgressEl.appendChild(listItemEl);
    }else{
        tasksCompletedEl.appendChild(listItemEl);
    };
    // Increase in one task counter to unique Id
    taskIdCounter++;
};
var taskFormHandler = function(event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // Validate info is not null
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    };
    formEl.reset();
    // Has data attribute, so get task id and call function to complete edit process
    var isEdit = formEl.hasAttribute("data-task-id");
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }else{
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    };
};
formEl.addEventListener("submit", taskFormHandler);
var editTask = function(taskId){
    // Get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};
var deleteTask = function(taskId){
    // Get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    taskSelected.remove();
    // Create new array to hold updated list of tasks
    var updatedTaskArr = [];
    // Loop through current tasks
    for(var i = 0; i < tasks.length; i++){
        // If tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if(tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        };
    };
    // Reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks(tasks);
};
var taskButtonHandler = function(event){
    // get target element from event
    var targetEl = event.target;
    var taskId = event.target.getAttribute("data-task-id");
    // Call to Update function
    if(targetEl.matches(".edit-btn")){
        editTask(taskId);
    };
    // Call to Delete function
    if(targetEl.matches(".delete-btn")){
        deleteTask(taskId);
    };
};
pageContentEl.addEventListener("click", taskButtonHandler);
var taskStatusChangeHandler = function(event){
    // Get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
    // Get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    // Find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }else if(statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    } else if(statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    };
    // update task's in tasks array
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        };
    };
    saveTasks(tasks);
};
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
var loadTasks = function(){
    var tasks1 = JSON.parse(localStorage.getItem('tasks'));
    if (tasks1){
        for(var i=0; i < tasks1.length; i++){
            /*taskIdCounter = JSON.parse(tasks1[i].id);
            var taskDataObj = {
                name: JSON.stringify(tasks1[i].name).replace(/"/g,""),
                type: JSON.stringify(tasks1[i].type).replace(/"/g,""),
                status: JSON.stringify(tasks1[i].status).replace(/"/g,"")
            };*/
            //createTaskEl(taskDataObj);
            createTaskEl(tasks1[i]);
        };
    }else{
        //tasks = [];
    };
}
loadTasks();
pageContentEl.addEventListener("change", taskStatusChangeHandler);