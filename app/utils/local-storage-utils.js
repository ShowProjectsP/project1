export const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromLocalStorage = (key) => {
	localStorage.removeItem(key);
};