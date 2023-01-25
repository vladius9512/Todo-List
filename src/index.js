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

const addTaskBtn = document.getElementById("addTaskBtn");
const overlay = document.getElementById("overlay");
const addTaskForm = document.getElementById("addTaskForm");

addTaskBtn.addEventListener("click", (e) => {
    const target = e.target;
    overlay.classList.add("active");
    addTaskForm.classList.add("active");
});

overlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === overlay) {
        addTaskForm.classList.remove("active");
        overlay.classList.remove("active");
    }
});
