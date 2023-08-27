import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  defaultOptions,
  getStoredOptions,
} from '../utils/storage';
import { fetchOpenWeatherData } from '../utils/api';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions(defaultOptions);

  chrome.contextMenus.create({
    contexts: ['selection'],
    id: 'weatherExtension',
    title: 'Add "%s" to weather extension',
  });

  chrome.alarms.create({
    periodInMinutes: 1 / 6,
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    const newCities = [...cities, event.selectionText];
    setStoredCities(newCities);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === '') return;

    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp);
      const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';
      const text = `${temp}${symbol}`;

      chrome.action.setBadgeText({ text });
      chrome.action.setBadgeBackgroundColor({ color: '#C13668' });
    });
  });
});
