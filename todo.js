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

const taskTemplate = document.querySelector('.task-list template');
const addItemButton = document.querySelector('.add-item-button');
const taskList = document.querySelector('.task-list');

let tasks = [];

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

  const dueDateTime = new Date(`${dueDate}T${dueTime}`);
  const priority = prioritySelect.value;

  titleInput.value = '';
  descriptionInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  prioritySelect.value = '';

  const task = new Task(title, description, dueDateTime, priority);

  // Now you can use the task instance
  popup.style.display = 'none';
  const taskElement = taskTemplate.content.cloneNode(true);
  const taskTitle = taskElement.querySelector('.task-title');
  taskTitle.textContent = title;
  const taskDescription = taskElement.querySelector('.task-description'); 
  taskDescription.textContent= description;
  taskElement.querySelector('.task').addEventListener('click', () => {
    taskDescription.classList.toggle('expanded');
    taskTitle.classList.toggle('expanded');
    taskElement.querySelector('.task-header').classList.toggle('expanded');
  });

  taskElement.querySelector('.task-complete-button').addEventListener('click', (event) => {
    const taskElement = event.target.closest('.task'); // Get the parent task element
    const taskIndex = tasks.indexOf(tasks.find((task) => task.element.contains(taskElement)));    
    
      tasks.splice(taskIndex, 1);
      taskElement.parentNode.removeChild(taskElement); // Remove the HTML element

  });
  tasks.push({ task: task, element:taskElement, countdown: taskElement.querySelector('.task-countdown') });
  updateCountdown(tasks[tasks.length - 1]);
  taskList.appendChild(taskElement);


});

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
