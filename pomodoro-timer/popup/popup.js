let tasks = [];

function updateTime() {
  chrome.storage.local.get(['timeOption', 'timer'], (res) => {
    const timeOption = res.timeOption;
    const time = document.querySelector('#time');
    const minuteNumber = timeOption - Math.ceil(res.timer / 60);
    const secondNumber = 60 - (res.timer % 60);

    const minute = minuteNumber === 0 ? '00' : `0${minuteNumber}`.slice(-2);
    const second = res.timer % 60 === 0 ? '00' : `0${secondNumber}`.slice(-2);

    time.innerHTML = `${minute}:${second}`;
  });
}
setInterval(updateTime, 1000);
updateTime();

const startTimerBtn = document.querySelector('#start-timer-btn');
startTimerBtn.addEventListener('click', () => {
  chrome.storage.local.get(['isRunning'], (res) => {
    const isRunningNew = !res.isRunning;
    chrome.storage.local.set(
      {
        isRunning: isRunningNew,
      },
      () => {
        startTimerBtn.innerHTML = isRunningNew ? 'Pause Timer' : 'Start Timer';
      }
    );
  });
});

const resetTimerBtn = document.querySelector('#reset-timer-btn');
resetTimerBtn.addEventListener('click', () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.innerHTML = 'Start Timer';
    }
  );
});

const addTaskBtn = document.querySelector('#add-task-btn');
addTaskBtn.addEventListener('click', () => addTask());

chrome.storage.sync.get(['tasks'], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function renderTasks() {
  const taskContainer = document.querySelector('#task-container');
  taskContainer.innerHTML = '';

  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement('div');
  const text = document.createElement('input');
  const deleteBtn = document.createElement('input');

  text.className = 'task-input';
  text.type = 'text';
  text.placeholder = 'Enter a task';
  text.value = tasks[taskNum];
  text.addEventListener('change', () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  deleteBtn.className = 'task-delete';
  deleteBtn.type = 'button';
  deleteBtn.value = 'X';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.querySelector('#task-container');
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push('');

  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}
