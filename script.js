const TaskList = function (container, callback) {
  this.template = document.querySelector(".template");
  this.tasks = {};
  let order = 0;

  this.addTask = function (text) {
    let task = this.template.cloneNode(true);
    task.addEventListener("click", markAsDone.bind(task));
    task
      .querySelector(".option")
      .addEventListener(
        "click",
        toggleOptions.bind(task.querySelector(".options"))
      );
    task.querySelector(".remove").addEventListener("click", remove.bind(task));
    task.querySelector(".edit").addEventListener("click", startEdit.bind(task));
    task
      .querySelector(".save")
      .addEventListener("click", saveChanges.bind(task));
    //window.addEventListener("click", toggleOptions.bind(false));

    task.classList.remove("template");
    task.querySelector("pre").textContent = text;
    document.querySelector(container).append(task);

    this.tasks[order++] = text;
    callback(this.tasks);
  };

  const markAsDone = function () {
    if (!this.classList.contains("editable")) {
      this.classList.toggle("done");
    }
  };

  const toggleOptions = function (event) {
    event.stopPropagation();
    let options = this;

    if (options === false) {
      options = document.querySelector(".options.active");
    }
    if (options) {
      console.log(options);
      options.classList.toggle("active");
    }
  };

  const remove = function (event) {
    event.stopPropagation();
    this.remove();
  };

  const startEdit = function (event) {
    event.stopPropagation();
    if (!this.classList.contains("done")) {
      this.querySelector("pre").setAttribute("contenteditable", true);
      this.classList.add("editable");
      this.querySelector(".options").classList.remove("active");
    }
  };

  const saveChanges = function (event) {
    event.stopPropagation();
    this.classList.remove("editable");
    if (this.querySelector("pre").textContent === "") {
      this.remove();
    }
    this.querySelector("pre").removeAttribute("contenteditable");
  };
};

let todo = new TaskList(".task-list", function (task_list) {
  localStorage.setItem("tasks", JSON.stringify(task_list));
});

document
  .querySelector(".new-task")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let textarea = this.querySelector("textarea");
    if (textarea.value !== "") {
      todo.addTask(textarea.value);
    }
    textarea.value = "";
  });

let tasks = JSON.parse(localStorage.getItem("tasks"));

if (!tasks) {
  tasks = {};
}

for (let i = 0; i < Object.keys(task).length; i++) {
  todo.addTask(tasks[i]);
}