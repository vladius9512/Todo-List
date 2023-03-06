function Task(title, description, date, priority, projectName, finished) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.finished = finished || false;
    this.projectName = projectName;
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
}

const todayBtn = document.getElementById("today");
const thisWeekBtn = document.getElementById("thisWeek");

const addProjBtn = document.getElementById("addProjBtn");
const projectModal = document.getElementById("projectModal");
const submitProjBtn = document.getElementById("submitProject");
const projForm = document.getElementById("projForm");
const projTitle = document.getElementById("projName");
const projContainer = document.getElementById("projContainer");

const addTaskBtn = document.getElementById("addTaskBtn");

const descriptionOverlay = document.getElementById("descriptionBlock");
const overlay = document.getElementById("overlay");
const addTaskForm = document.getElementById("addTaskForm");
const submitTaskBtn = document.getElementById("submitTask");
const form = document.getElementById("form");
const taskTitle = document.getElementById("title");
const taskDescription = document.getElementById("description");
const taskDate = document.getElementById("date");
const tasksGrid = document.getElementById("tasksGrid");
const prioBtn = document.getElementsByName("priority");

todayBtn.addEventListener("click", () => {
    if (tasksGrid.classList.contains("today")) {
        return;
    }
    tasksGrid.innerHTML = "";
    tasksGrid.className = "today";
    generateTaskFromProject("today");
});

thisWeekBtn.addEventListener("click", () => {
    if (tasksGrid.classList.contains("thisWeek")) {
        return;
    }
    tasksGrid.innerHTML = "";
    tasksGrid.className = "thisWeek";
    generateTaskFromProject("thisWeek");
});

function resetOverlay() {
    addTaskForm.classList.remove("active");
    overlay.classList.remove("active");
    projectModal.classList.remove("active");
    descriptionOverlay.classList.remove("active");
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

descriptionOverlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === descriptionOverlay) {
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

function createDescriptionBlock(title, description, date, projectName) {
    const descDiv = createElemWithClasses("div", ["descriptionBlock"]);
    const taskTitle = createElemWithClasses("p");
    taskTitle.innerText = `Task title: ${title}`;
    const descriptionP = createElemWithClasses("p");
    descriptionP.innerText = `Task description: ${description}`;
    const dateP = createElemWithClasses("p");
    dateP.innerText = `Task date: ${date}`;
    const projectNameP = createElemWithClasses("p");
    projectNameP.innerText = `Task is in project: ${projectName}`;
    descDiv.append(taskTitle, descriptionP, dateP, projectNameP);
    return descDiv;
}

function createTaskDiv(title, date, priority, finished, description) {
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
            projects[tasksGrid.className][checkbox.name].finished = true;
        } else {
            taskDiv.classList.remove("checked");
            projects[tasksGrid.className][checkbox.name].finished = false;
        }
    });

    let taskNameDiv = createElemWithClasses("div", ["task_title"]);
    taskNameDiv.innerText = title;
    let descriptionDiv = createElemWithClasses("div", ["description"]);
    let descriptionBtn = createElemWithClasses(
        "button",
        undefined,
        undefined,
        "descBtn"
    );
    descriptionBtn.addEventListener("click", () => {
        descriptionOverlay.innerHTML = "";
        const descriptionBlockDiv = createDescriptionBlock(
            title,
            description,
            date,
            tasksGrid.className
        );
        descriptionOverlay.appendChild(descriptionBlockDiv);
        descriptionOverlay.classList.add("active");
    });
    descriptionBtn.innerText = "Description";
    let dateDiv = createElemWithClasses("div", ["task_date"]);
    dateDiv.innerText = date;
    let edit = createElemWithClasses("img", ["edit"], "./images/pencil.svg");
    let remove = createElemWithClasses("img", ["delete"], "./images/bin.svg");

    remove.addEventListener("click", () => {
        tasksGrid.removeChild(taskDiv);
        delete projects[tasksGrid.className][title];
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
    p.className = "projectsNames";
    p.addEventListener("click", () => {
        if (tasksGrid.classList.contains(title)) {
            return;
        }
        tasksGrid.innerHTML = "";
        tasksGrid.className = title;
        generateTaskFromProject(title);
    });
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
        priorityValue,
        tasksGrid.className
    );
    addTaskToProject(tasksGrid.className, newTask);
    createTaskDiv(
        taskTitle.value,
        taskDate.value,
        priorityValue,
        false,
        taskDescription.value
    );
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
        projTitle.reportValidity();
        return;
    }
    if (projects[projTitle.value]) {
        projTitle.setCustomValidity(
            "There is already a project with this name. Please use another name for your project"
        );
        projTitle.reportValidity();
        return;
    }
    projects[projTitle.value] = {};
    createProject(projTitle.value);
    projForm.reset();
    resetOverlay();
    console.log(projects);
});

let task1 = new Task("work", "everyday", "2023-02-02", "high", "today");
addTaskToProject("today", task1);
createTaskDiv(
    task1.title,
    task1.date,
    task1.priority,
    task1.finished,
    task1.description
);
let task2 = new Task("read", "everyday", "2023-03-03", "medium", "today", true);
addTaskToProject("today", task2);
createTaskDiv(
    task2.title,
    task2.date,
    task2.priority,
    task2.finished,
    task2.description
);

localStorage.setItem("myItems", JSON.stringify(projects));
//console.log(JSON.parse(localStorage.getItem("myItems")));

function generateTaskFromProject(projectName) {
    const ar = Object.values(projects[projectName]);
    for (let i = 0; i < ar.length; i++) {
        createTaskDiv(ar[i].title, ar[i].date, ar[i].priority, ar[i].finished);
    }
}
