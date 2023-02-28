function Task(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
}

function Project(title) {
    this.title = title;
}

let today = {};
let thisWeek = {};

function addTaskToProject(projectName, taskTitle) {
    projectName[taskTitle.title] = taskTitle;
}

const addProjBtn = document.getElementById("addProjBtn");
const projectModal = document.getElementById("projectModal");
const submitProjBtn = document.getElementById("submitProject");
const projForm = document.getElementById("projForm");
const projTitle = document.getElementById("projName");
const projContainer = document.getElementById("projContainer");

const addTaskBtn = document.getElementById("addTaskBtn");

const overlay = document.getElementById("overlay");
const addTaskForm = document.getElementById("addTaskForm");
const submitTaskBtn = document.getElementById("submitTask");
const form = document.getElementById("form");
const taskTitle = document.getElementById("title");
const taskDescription = document.getElementById("description");
const taskDate = document.getElementById("date");
const tasksGrid = document.getElementById("tasksGrid");
const prioBtn = document.getElementsByName("priority");

function resetOverlay() {
    addTaskForm.classList.remove("active");
    overlay.classList.remove("active");
    projectModal.classList.remove("active");
}

addTaskBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    addTaskForm.classList.add("active");
});

overlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === overlay) {
        resetOverlay();
    }
});

function createTaskDiv(title, date) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    let taskCheckboxDiv = document.createElement("div");
    taskCheckboxDiv.classList.add("task_checkbox");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = title;
    let taskNameDiv = document.createElement("div");
    taskNameDiv.classList.add("task_title");
    taskNameDiv.innerText = title;
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");
    let descriptionBtn = document.createElement("button");
    descriptionBtn.innerText = "Description";
    descriptionBtn.id = "descBtn";
    let dateDiv = document.createElement("div");
    dateDiv.classList.add("task_date");
    dateDiv.innerText = date;
    let edit = document.createElement("img");
    edit.classList.add("edit");
    edit.src = "./images/pencil.svg";
    let remove = document.createElement("img");
    remove.classList.add("delete");
    remove.src = "./images/bin.svg";
    tasksGrid.appendChild(taskDiv);
    taskDiv.append(
        taskCheckboxDiv,
        taskNameDiv,
        descriptionDiv,
        dateDiv,
        edit,
        remove
    );
    taskCheckboxDiv.appendChild(checkbox);
    descriptionDiv.appendChild(descriptionBtn);
}

function createProject(title) {
    let p = document.createElement("p");
    p.innerText = title;
    projContainer.append(p);
}

submitTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (taskTitle.value === "") {
        taskTitle.setCustomValidity("Please fill out the task name field");
        return;
    }
    let priorityValue;
    for (let i = 0; i < prioBtn.length; i++) {
        if (prioBtn[i].checked) {
            priorityValue = prioBtn[i].value;
        }
    }
    console.log(priorityValue);
    let newTask = new Task(
        taskTitle.value,
        taskDescription.value,
        taskDate.value,
        priorityValue
    );
    addTaskToProject(today, newTask);
    createTaskDiv(taskTitle.value, taskDate.value);
    console.log(today);
    form.reset();
    resetOverlay();
});

addProjBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    projectModal.classList.add("active");
});

submitProjBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (projTitle.value === "") {
        projTitle.setCustomValidity("Please fill out the project name field");
        return;
    }
    const newProj = new Project(projTitle.value);
    console.log(newProj);
    createProject(projTitle.value);
    projForm.reset();
    resetOverlay();
});
