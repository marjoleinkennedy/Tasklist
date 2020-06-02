// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();



function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)

    // Add task event   
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);

    // Remove all tasks
    clearBtn.addEventListener('click', removeTaskList)

    // Filter tasks
    filter.addEventListener('keyup', filterTasks)
}


// Get tasks from LS
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {

        const li = document.createElement('li');
        li.className = 'collection-item';


        // Create text node and append to
        li.appendChild(document.createTextNode(task));

        // Create new link element with icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //  Append link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });


}


// Add a task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add a task');
    }


    const li = document.createElement('li');
    li.className = 'collection-item';


    // Create text node and append to
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element with icon
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //  Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store task in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Delete a task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }

    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// clear task list
function removeTaskList(e) {
    if (confirm('Are you sure?')) {
        taskList.innerHTML = '';
    }

// Clear from LS
clearTasksFromLocalStorage();

}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}



function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }

            else {
                task.style.display = 'none';
            }

        });

}