export const USER_STORAGE_KEY = "user";
const CHANNELS_STORAGE_PREFIX = "channels_";

export const getStoredJson = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const setStoredJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getChannelsStorageKey = (workspaceId) => `${CHANNELS_STORAGE_PREFIX}${workspaceId}`;

export const clearSessionCache = () => {
  localStorage.removeItem(USER_STORAGE_KEY);

  Object.keys(localStorage)
    .filter((key) => key.startsWith(CHANNELS_STORAGE_PREFIX))
    .forEach((key) => localStorage.removeItem(key));
};
