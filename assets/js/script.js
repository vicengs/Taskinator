/* ------------------------- */
/* Project  : Taskinator     */
/* File     : script.js      */
/* Author   : Vicente Garcia */
/* Date     : 02/22/2022     */
/* Modified : 02/24/2022     */
/* ------------------------- */
//var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var createTaskHandler = function(){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //listItemEl.textContent = taskNameInput;
    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // Add elements to parent
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
}
//buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler);