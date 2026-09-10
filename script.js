const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");

const tasks = [];

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    tasks.push(task);

    displayTasks();

    taskInput.value = "";
});


function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const taskElement = document.createElement("div");

        taskElement.classList.add("task");
        taskElement.classList.add(task.priority);

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const taskText = document.createElement("span");

        taskText.textContent =
            task.name + " - Priority: " + task.priority;

        taskElement.appendChild(taskText);


        const completeButton = document.createElement("button");

        completeButton.textContent = "Complete";

        completeButton.addEventListener("click", function() {

            task.completed = !task.completed;

            displayTasks();

        });

        taskElement.appendChild(completeButton);


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();

        });

        taskElement.appendChild(deleteButton);


        taskList.appendChild(taskElement);

    });

}