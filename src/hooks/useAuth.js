import React, { createContext, useContext, useEffect, useState } from "react";

import LocalStorage from "../managers/LocalStorage";
import AuthApi from "../services/apis/Auth.Api";

const authContext = createContext();
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle side bar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const storedUser = LocalStorage.getUser();
    const storedToken = LocalStorage.getToken();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const signin = async (credentials) => {
    const response = await AuthApi.singIn(credentials);
    if (response.success) {
      setUser(response.user);
      setIsLoggedIn(true);
      LocalStorage.setUser(response.user);
      LocalStorage.setToken(response.token);
    }

    return { response };
  };
  // Logout function
  const logOut = async () => {
    LocalStorage.removeUser();
    LocalStorage.removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  const signout = () => {
    logOut();
  };

  return {
    user,
    signin,
    signout,
    isLoggedIn,
    setUser,
    setIsLoggedIn,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
  };
}
