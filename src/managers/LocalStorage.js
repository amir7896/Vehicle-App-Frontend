import { TOKEN, USER } from "../constants/appConstants";

class LocalStorage {
  static sharedInstance = new LocalStorage();

  constructor() {
    if (LocalStorage.sharedInstance != null) {
      return LocalStorage.sharedInstance;
    }
  }

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER));
    } catch (error) {
      throw error;
    }
  }

  setUser(value) {
    try {
      return localStorage.setItem(USER, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }

  removeUser() {
    try {
      return localStorage.removeItem(USER);
    } catch (error) {
      throw error;
    }
  }
  setToken(value) {
    try {
      return localStorage.setItem(TOKEN, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }
  getToken() {
    try {
      return JSON.parse(localStorage.getItem(TOKEN));
    } catch (error) {
      throw error;
    }
  }

  removeToken() {
    try {
      return localStorage.removeItem(TOKEN);
    } catch (error) {
      throw error;
    }
  }
  isLoggedIn() {
    return !!localStorage.getItem(TOKEN);
  }
}

export default LocalStorage.sharedInstance;
