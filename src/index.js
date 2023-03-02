function Task(title, description, date, priority, finished) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.finished = finished || false;
    //this.projectName = projectName;
}

const projects = {
    today: {},
    thisWeek: {},
};

function addTaskToProject(projectName, task) {
    if (!projects[projectName]) {
        projects[projectName] = {};
    }
    projects[projectName][task.title] = task;
    console.log(projects);
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

function createElemWithClasses(elemType, classesName, src, id) {
    let output = document.createElement(elemType);
    if (src) {
        output.src = src;
    }
    if (id) {
        output.id = id;
    }
    if (classesName) {
        classesName.forEach((className) => {
            output.classList.add(className);
        });
    }
    return output;
}

function createTaskDiv(title, date, priority, finished) {
    let taskDiv = createElemWithClasses("div", ["task", priority]);
    let taskCheckboxDiv = createElemWithClasses("div", ["task_checkbox"]);
    let checkbox = createElemWithClasses("input", [title]);
    checkbox.type = "checkbox";
    checkbox.name = title;
    checkbox.checked = finished;
    if (finished) {
        taskDiv.classList.add("checked");
    }

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            taskDiv.classList.add("checked");
        } else {
            taskDiv.classList.remove("checked");
        }
    });

    let taskNameDiv = createElemWithClasses("div", ["task_title"]);
    taskNameDiv.innerText = title;
    let descriptionDiv = createElemWithClasses("div", ["description"]);
    let descriptionBtn = createElemWithClasses(
        "button",
        [undefined],
        undefined,
        "descBtn"
    );
    descriptionBtn.innerText = "Description";
    let dateDiv = createElemWithClasses("div", ["task_date"]);
    dateDiv.innerText = date;
    let edit = createElemWithClasses("img", ["edit"], "./images/pencil.svg");
    let remove = createElemWithClasses("img", ["delete"], "./images/bin.svg");

    remove.addEventListener("click", () => {
        tasksGrid.removeChild(taskDiv);
        delete today[title];
    });
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
    let newTask = new Task(
        taskTitle.value,
        taskDescription.value,
        taskDate.value,
        priorityValue
    );
    addTaskToProject("today", newTask);
    createTaskDiv(taskTitle.value, taskDate.value, priorityValue);
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
    projects[projTitle.value] = {};
    createProject(projTitle.value);
    projForm.reset();
    resetOverlay();
});

let task1 = new Task("work", "everyday", "2023-02-02", "high");
addTaskToProject("today", task1);
createTaskDiv("work", "2023-02-02", "high");
let task2 = new Task("read", "everyday", "2023-03-03", "medium", true);
addTaskToProject("today", task2);
createTaskDiv(task2.title, task2.date, task2.priority, task2.finished);

localStorage.setItem("myItems", JSON.stringify(projects));
console.log(JSON.parse(localStorage.getItem("myItems")));
