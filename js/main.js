const addTodoForm = document.getElementById("todo-form");
const addTodoInput = document.getElementById("todo-input");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const editCancelButton = document.getElementById("cancel-edit-btn");
const toolbarEl = document.getElementById("toolbar");
const todoFilter = document.getElementById("filter");
const todoList = document.getElementById("todo-list");
let oldEditInput;

function createTask(e) {
  e.preventDefault();

  const addTodoInputValue = addTodoInput.value;

  if (addTodoInputValue) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = addTodoInputValue;
    todoContainer.appendChild(todoTitle);

    const finishButton = document.createElement("button");
    finishButton.classList.add("finish-todo");
    finishButton.innerHTML = "<i class='bx bx-check'></i>";
    todoContainer.appendChild(finishButton);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-todo");
    editButton.innerHTML = "<i class='bx bx-edit-alt'></i>";
    todoContainer.appendChild(editButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-todo");
    removeButton.innerHTML = "<i class='bx bxs-tag-x'></i>";
    todoContainer.appendChild(removeButton);

    todoList.appendChild(todoContainer);

    addTodoInput.focus();
    addTodoInput.value = "";
  }
}

function editTask(value) {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3");
    if (todoTitle.innerText === oldEditInput) {
      todoTitle.innerText = value;
    }
  });
  toggleForms();
}

function toggleForms() {
  const hideClass = "hide";

  addTodoForm.classList.toggle(hideClass);
  editForm.classList.toggle(hideClass);
  todoList.classList.toggle(hideClass);
}

addTodoForm.addEventListener("submit", createTask);
document.addEventListener("click", ({ target }) => {
  let targetEl = target;
  let parentTargetEl = target.closest("div");

  let todoTitle;

  if (parentTargetEl && parentTargetEl.querySelector("h3")) {
    todoTitle = parentTargetEl.querySelector("h3");
    editInput.value = todoTitle.innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentTargetEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("edit-todo")) {
    oldEditInput = parentTargetEl.innerText;
    toggleForms();
  }
  if (targetEl.classList.contains("remove-todo")) {
    parentTargetEl.remove();
  }
});

editCancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value;
  editTask(editInputValue);
});
