// ====== Basic elements ======
const taskCard = document.getElementById("taskCard");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const addBtn = document.getElementById("addBtn");
const micBtn = document.getElementById("micBtn");
const micLabel = document.getElementById("micLabel");
const toast = document.getElementById("toast");

let tasks = [];

// ====== Utility: show toast ======
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// ====== Core logic: add & render tasks ======
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  // If you already have logic, call that here instead.
  tasks.push(trimmed);
  renderTasks();
  taskInput.value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  tasks.forEach((taskText, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    const delBtn = document.createElement("button");
    delBtn.className = "task-delete";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// ====== Event: typing flow ======
addBtn.addEventListener("click", () => {
  addTask(taskInput.value);
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask(taskInput.value);
  }
});

// Tap anywhere on card to focus input
taskCard.addEventListener("click", (e) => {
  // Prevent click on delete button from re-focusing
  if (e.target.closest(".task-delete")) return;
  taskInput.focus();
});

// ====== Voice recognition setup ======
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  micBtn.disabled = true;
  micLabel.textContent = "Voice not supported on this browser";
  showToast("Voice works best in Chrome on desktop/mobile.");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = true;

  micBtn.addEventListener("click", () => {
    try {
      recognition.start(); // browser will ask for mic permission here (first time)
    } catch (err) {
      // On some browsers calling start twice throws error
      console.warn("Recognition start error:", err);
    }
  });

  recognition.onstart = () => {
    micBtn.classList.add("listening");
    micLabel.textContent = "Listening... speak your task";
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    taskInput.value = transcript;
  };

  recognition.onerror = (event) => {
    micBtn.classList.remove("listening");
    micLabel.textContent = "Tap to speak";

    if (event.error === "not-allowed" || event.error === "denied") {
      showToast("Please allow microphone access in site settings.");
    } else {
      console.error("Speech recognition error:", event.error);
      showToast("Could not capture your voice. Try again.");
    }
  };

 recognition.onend = () => {
  micBtn.classList.remove("listening");
  micLabel.textContent = "Tap to speak";

  let text = taskInput.value.trim().toLowerCase();

  if (!text) return;

  // ---- DELETE voice command ----
  if (text.startsWith("delete ")) {
    const name = text.replace("delete", "").trim();

    const index = tasks.findIndex(t => t.toLowerCase() === name);

    if (index !== -1) {
      deleteTask(index);
      showToast("Task deleted by voice");
    } else {
      showToast("No matching task found");
    }

    taskInput.value = "";
    return;
  }

  // ---- ADD voice command ----
  addTask(text);
  showToast("Task added from voice");
  taskInput.value = "";
};

  };

// Initial render
renderTasks();
