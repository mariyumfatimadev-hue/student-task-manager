let tasks = [];

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const list = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

function renderTasks() {
  list.innerHTML = "";

  const query = searchInput.value.toLowerCase();
  const visibleTasks = tasks.filter(function (task) {
    return task.title.toLowerCase().includes(query);
  });

  visibleTasks.forEach(function (task) {
    const li = document.createElement("li");

    let text = task.title;
    if (task.description) {
      text = text + " - " + task.description;
    }
    li.textContent = text + " ";

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
    description: descInput.value.trim(),
    completed: false
  };

  tasks.push(task);
  renderTasks();
  form.reset();
});

searchInput.addEventListener("input", renderTasks);