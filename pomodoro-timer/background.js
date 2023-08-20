chrome.alarms.create('pomodoroTimer', {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pomodoroTimer') {
    chrome.storage.local.get(['timeOption', 'timer', 'isRunning'], (res) => {
      if (res.isRunning) {
        const timeOption = res.timeOption || 25;
        let timer = res.timer + 1;
        let isRunning = true;

        if (timer === 60 * timeOption) {
          this.registration.showNotification('Pomodoro Timer', {
            body: `${timeOption} minutes has passed!`,
            icon: 'icon.png',
          });

          timer = 0;
          isRunning = false;
        }

        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(['timer', 'isRunning'], (res) => {
  chrome.storage.local.set({
    timeOption: 'timeOption' in res ? res.timeOption : 25,
    timer: 'timer' in res ? res.timer : 0,
    isRunning: 'isRunning' in res ? res.isRunning : false,
  });
});
