/* ------------------------- */
/* Project  : Taskinator     */
/* File     : script.js      */
/* Author   : Vicente Garcia */
/* Date     : 02/22/2022     */
/* Modified : 02/22/2022     */
/* ------------------------- */
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var createTaskHandler = function(){
    var listItemEl = document.createElement("li");
    listItemEl.textContent = "This is a new task.";
    listItemEl.className = "task-item";
    tasksToDoEl.appendChild(listItemEl);
}
buttonEl.addEventListener("click", createTaskHandler);