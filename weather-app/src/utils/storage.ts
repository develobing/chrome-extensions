import { OpenWeatherTempScale } from './api';

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  homeCity: string;
  tempScale: OpenWeatherTempScale;
  hasAutoOverlay: boolean;
}

export type LocalStorageKeys = keyof LocalStorage;

export const defaultOptions: LocalStorageOptions = {
  homeCity: '',
  tempScale: 'metric',
  hasAutoOverlay: false,
};

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = { cities };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, resolve);
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (vals: LocalStorage) => {
      resolve(vals.cities ?? []);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, resolve);
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options'];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (vals: LocalStorage) => {
      resolve(vals.options ?? defaultOptions);
    });
  });
}
