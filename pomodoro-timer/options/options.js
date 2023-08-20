const timeOption = document.querySelector('#time-option');
timeOption.addEventListener('change', (event) => {
  const target = event.target;
  const value = target.value;

  if (value < 1 || value > 60) {
    timeOption.value = 25;
  }
});

const saveBtn = document.querySelector('#save-btn');
saveBtn.addEventListener('click', () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
  });
});

chrome.storage.local.get(['timeOption'], (res) => {
  timeOption.value = 'timeOption' in res ? res.timeOption : 25;
});
