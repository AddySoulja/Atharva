const tasks = document.querySelectorAll(".task");
const all_status = document.querySelectorAll(".status");
let append_task = document.querySelector("#open");
let draggableTask = null;

tasks.forEach((task) => {
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);
});

function del_task (e){
  // console.log(e.target.parentElement.parentElement);
  e.target.parentElement.parentElement.style.display = "none";
}

let isDraggable;

function dragStart(e) {
  // console.log(e.target.parentElement.classList[1]);
  isDraggable = e.target.parentElement.classList[1];
  draggableTask = this;
  // setTimeout(() => {
  //   this.style.display = "none";
  // }, 0);
  // console.log("dragStart");
}

function dragEnd() {
  draggableTask = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  // console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  // console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  // console.log("dragLeave");
}

function dragDrop(e) {
  if(isDraggable === e.target.id){
    this.style.border = "none";
    this.appendChild(draggableTask);
  }else{
    alert('failed');
  }
  // console.log(e.target.id);
  // console.log("dropped");
}

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};


/* create task  */
const task_submit = document.getElementById("task-submit");


function createTask() {

  const input_name = document.getElementById("task-name").value;
  const input_desc = document.querySelector("#task-description").value;

  const task_div = document.createElement("div");
  task_div.classList.add("task");
  task_div.draggable = "true";
  task_div.addEventListener("dragstart", dragStart);
  task_div.addEventListener("dragend", dragEnd);

  const header_div = document.createElement("div");
  header_div.setAttribute("id", "task-heading-task");
  header_div.innerHTML = input_name;

  const close_span = document.createElement("span");
  close_span.classList.add("close");
  close_span.onclick = del_task;
  const span_txt = document.createTextNode("\u00D7");
  close_span.appendChild(span_txt);

  header_div.appendChild(close_span);

  const desc_div = document.createElement("div");
  desc_div.setAttribute("id", "description");
  desc_div.innerHTML = input_desc;

  task_div.appendChild(header_div);
  task_div.appendChild(desc_div);

  append_task.appendChild(task_div);








  // const txt = document.createTextNode(input_val);

  // task_div.appendChild(txt);
  // task_div.classList.add("task");
  // task_div.setAttribute("draggable", "true");
  /* create span */
  // const span = document.createElement("span");
  // const span_txt = document.createTextNode("\u00D7");
  // span.classList.add("close");
  // span.appendChild(span_txt);

  // task_div.appendChild(span);

  // no_status.appendChild(task_div);

  // span.addEventListener("click", () => {
  //   span.parentElement.style.display = "none";
  // });
  //   console.log(task_div);

  // task_div.addEventListener("dragstart", dragStart);
  // task_div.addEventListener("dragend", dragEnd);

  // document.getElementById("task_input").value = "";
  // task-form.classList.remove("active");
  // overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");
task_submit.addEventListener("click", createTask);


close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});


