export const setWithExpiry = (key, value, ttl) => {
  const now = new Date();

  // Create an object with the value and the expiry time
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = key => {
  const itemStr = localStorage.getItem(key);

  // If the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // Compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, remove it from storage and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

export const removeLocalStorageItem = key => {
  localStorage.removeItem(key);
};
