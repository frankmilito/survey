export const clearStorage = () => localStorage.clear();

export const getItemFromStorage = (key) => {
  if (localStorage) {
    try {
      const item = localStorage.getItem(key);
      if (item) return JSON.parse(item);
    } catch (err) {
      console.error(`Error getting iten ${key} from localStorage`, err);
    }

    return null;
  }

  return null;
};

export const storeItem = (key, item) => {
  if (localStorage) {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.error(`Error storing item ${key} to localStorage`, err);
    }
  }
};

export const removeItemFromStorage = (key) => {
  if (localStorage) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing item ${key} from localStorage`, err);
    }
  }
};
