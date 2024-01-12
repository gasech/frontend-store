export const getItem = <T>(key: string): T | null => {
  try {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  } catch (error) {
    console.error("Error retrieving item from localStorage:", error);
    return null;
  }
};

export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving item to localStorage:", error);
  }
};
