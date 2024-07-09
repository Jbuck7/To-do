const menuButton = document.querySelector('.main-menu-button');
const hiddenButtons = document.querySelectorAll('.hidden-button');
const addButton = document.querySelector('#add-button');
const popup = document.querySelector('.popup-bg');
const closePopup = document.querySelector('.close-button');

const titleInput = document.querySelector('.input-title');
const descriptionInput = document.querySelector('.input-description');
const dateInput = document.querySelector('.input-date');
const timeInput = document.querySelector('.input-time');
const prioritySelect = document.querySelector('.input-priority');

const taskTemplate = document.querySelector('#task-template');
const addItemButton = document.querySelector('.add-item-button');
const taskList = document.querySelector('.task-list');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);
tasks.forEach(task => {
  task.element = addTask(task.task);
  task.countdown = task.element.querySelector('.task-countdown');
  taskList.appendChild(task.element);
  updateCountdown(task);
});

class Task {
  constructor(title, description,due_date_time,priority) {
    this.title = title;
    this.description = description;
    this.due_date_time = due_date_time;
    this.priority = priority;
  }

}

addItemButton.addEventListener('click', () => {
  const title = titleInput.value;
  const description = descriptionInput.value;
  const dueDate = dateInput.value || Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());  
  const dueTime = timeInput.value || "23:59"; // use midnight if empty 

  const dueDateTime = new Date(`${dueDate}T${dueTime}`).getTime();  
  const priority = prioritySelect.value;

  titleInput.value = '';
  descriptionInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  prioritySelect.value = '';

  const task = new Task(title, description, dueDateTime, priority);
  popup.style.display = 'none';

  const taskElement = addTask(task);
  const taskCountdown = taskElement.querySelector('.task-countdown');
  taskList.appendChild(taskElement);
  tasks.push({ task: task, element:taskElement, countdown:taskCountdown  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(tasks);

});


function addTask(task) {
  console.log("addTask");
  // Now you can use the task instance
  const taskElement = taskTemplate.content.cloneNode(true);
  const taskTitle = taskElement.querySelector('.task-title');
  const taskHeader = taskElement.querySelector('.task-header');
  const taskDescription = taskElement.querySelector('.task-description'); 
  taskTitle.textContent = task.title;
  taskDescription.textContent= task.description;

  taskElement.querySelector('.task').addEventListener('click', () => {
    taskDescription.classList.toggle('expanded');
    taskTitle.classList.toggle('expanded');
    taskHeader.classList.toggle('expanded');
  });

  taskElement.querySelector('.task-complete-button').addEventListener('click', (event) => {
    const taskElement = event.target.closest('.task'); // Get the parent task element
    const taskIndex = tasks.indexOf(tasks.find(task => task.element === taskElement));
    
    tasks.splice(taskIndex, 1); // Remove the task from the tasks array
      taskElement.parentNode.removeChild(taskElement); // Remove the HTML element
      localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
  });
  

  return taskElement;
}







// Update the countdowns every second
setInterval(() => {
  tasks.forEach((i) => {
    updateCountdown(i);
  });
}, 1000);

function updateCountdown(task) {
  
  const dueDateTime = task.task.due_date_time;
  const countdownElement = task.countdown;
  const now = new Date();
  const diff = dueDateTime - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let countdownText = "";
  if (days != 0) {
    countdownText += `${days}D `;
  }
  if (hours != 0) {
    countdownText += `${hours}H `;
  }
  if (minutes != 0) {
    countdownText += `${minutes}M `;
  }
  if (seconds != 0) {
    countdownText += `${seconds}S`;
  }

  countdownElement.textContent = countdownText.trim();
  // ... calculate and update the countdown text ...
}



menuButton.addEventListener('click', () => {
    hiddenButtons.forEach(button => {
      button.classList.toggle('hidden-button');
      button.classList.toggle('visible-button');
    });
});

addButton.addEventListener('click', () => {
  popup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});
