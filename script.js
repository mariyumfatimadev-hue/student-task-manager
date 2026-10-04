let tasks = [];

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const list = document.getElementById("task-list");

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task.title + " - " + task.description + " ";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(function (t) {
        return t.id !== task.id;
      });
      renderTasks();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  if (title === "") {
    return;
  }

  const task = {
    id: Date.now(),
    title: title,
    description: descInput.value,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  form.reset();
});