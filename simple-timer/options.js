const nameInput = document.querySelector('#name-input');
const timeInput = document.querySelector('#time-input');
const saveBtn = document.querySelector('#save-btn');
chrome.storage.sync.get(['name'], (data) => {
  nameInput.value = data.name ?? '???';
  timeInput.value = data.notificationTime ?? 1000;
});

saveBtn.addEventListener('click', () => {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set({
    name,
    notificationTime,
  });
});
