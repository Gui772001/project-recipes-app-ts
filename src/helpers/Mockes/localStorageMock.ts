export const localStorageMock = (function () {
  let store = { inProgressRecipes: { meals: {}, cocktails: {} },
    doneRecipes: [],
    user: { email: {} } };

  return {
    getItem(key: string) {
      return store[key as keyof typeof store];
    },

    setItem(key: string, value: any) {
      store[key as keyof typeof store] = value;
    },

    clear() {
      store = { inProgressRecipes: { meals: {}, cocktails: {} },
        doneRecipes: [],
        user: { email: {} } };
    },

    removeItem(key: string) {
      delete store[key as keyof typeof store];
    },

    getAll() {
      return store;
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
