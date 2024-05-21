export const getItemFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || null;
  }
  return null;
};

export const setItemInLocalStorage = (key: string, value: any | null) => {
  if (typeof window !== "undefined") {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }
};
