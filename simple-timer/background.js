chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['timer', 'isRunning'], (data) => {
    const time = data.timer ?? 0;
    const isRunning = data.isRunning ?? true;
    if (!isRunning) return;

    chrome.storage.local.set({ timer: time + 1 });

    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });

    chrome.storage.sync.get(['notificationTime'], (data) => {
      const notificationTime = data.notificationTime ?? 1000;

      if (time % notificationTime == 0) {
        this.registration.showNotification('Timer', {
          body: `${notificationTime} seconds passed - Timer: ${time + 1}`,
          icon: 'icon.png',
        });
      }
    });
  });
});

console.log(this);
