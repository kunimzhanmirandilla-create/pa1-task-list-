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

    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
    };

    tasks.sort(function(a, b) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    tasks.forEach(function(task, index) {

        const taskElement = document.createElement("div");

        taskElement.classList.add("task");
        taskElement.classList.add(task.priority);

        if (task.completed) {
            taskElement.classList.add("completed");
        }


        const taskHeader = document.createElement("div");
        taskHeader.classList.add("task-header");


        const taskName = document.createElement("span");
        taskName.classList.add("task-name");
        taskName.textContent = task.name;


        const priority = document.createElement("span");
        priority.classList.add("priority");

        priority.textContent =
            "Priority: " +
            task.priority.charAt(0).toUpperCase() +
            task.priority.slice(1);


        taskHeader.appendChild(taskName);
        taskHeader.appendChild(priority);


        const buttonArea = document.createElement("div");
        buttonArea.classList.add("task-buttons");


        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");

        if (task.completed) {
            completeButton.textContent = "Undo";
        } else {
            completeButton.textContent = "Complete";
        }

        completeButton.addEventListener("click", function() {

            task.completed = !task.completed;

            displayTasks();

        });


        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();

        });


        buttonArea.appendChild(completeButton);
        buttonArea.appendChild(deleteButton);


        taskElement.appendChild(taskHeader);
        taskElement.appendChild(buttonArea);


        taskList.appendChild(taskElement);

    });

}