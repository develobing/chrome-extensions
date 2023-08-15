const timeElement = document.querySelector('#time');
const nameElement = document.querySelector('#name');
const timerElement = document.querySelector('#timer');

function updateTimeElements() {
  chrome.storage.local.get(['timer'], (data) => {
    const timer = data.timer ?? 0;
    timerElement.innerHTML = `Timer: ${timer}`;
  });

  const currentTime = new Date().toLocaleTimeString();
  timeElement.innerHTML = `The current time: ${currentTime}`;
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.storage.sync.get(['name'], (data) => {
  const name = data.name ?? '???';
  nameElement.innerHTML = `Your name is: ${name}`;
  return data.name;
});

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

startBtn.addEventListener('click', () => {
  chrome.storage.local.set({ isRunning: true });
});
stopBtn.addEventListener('click', () => {
  chrome.storage.local.set({ isRunning: false });
});
resetBtn.addEventListener('click', () => {
  chrome.storage.local.set({ timer: 0, isRunning: false });
});
