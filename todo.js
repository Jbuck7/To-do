const menuButton = document.querySelector('.main-menu-button');
const hiddenButtons = document.querySelectorAll('.hidden-button');
const addButton = document.querySelector('#add-button');
const popup = document.querySelector('.popup-bg');
const closePopup = document.querySelector('.close-button');

class Task {
  constructor(title, description,due_date,due_time,priority) {
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.due_time = due_time;
    this.isCompleted = false;
    this.priority = priority;
  }

  complete() {
    this.isCompleted = true;
  }
}

let tasks = [];

function addTask() {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const due_date = document.querySelector('#due_date').value;
  const priority = document.querySelector('#priority').value;
  const task = new Task(title, description,due_date,priority);
  tasks.push(task);
  renderTasks();
}

menuButton.addEventListener('click', () => {
    hiddenButtons.forEach(button => {
      // button.style.opacity = button.style.opacity === '0' ? '1' : '0';
      // button.style.pointerEvents = button.style.opacity === '1' ? 'auto' : 'none';
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
