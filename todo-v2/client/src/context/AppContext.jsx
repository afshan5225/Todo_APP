import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  const checkSession = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/auth/me`, {
        withCredentials: true,
      });
      if (data.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  };

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/todo/all`, {
        withCredentials: true,
      });
      if (data.success && Array.isArray(data.todos)) {
        setTodo(data.todos);
      } else {
        setTodo([]);
        toast.error(data.message || "Failed to fetch todos");
      }
    } catch (err) {
      console.error(err);
      setTodo([]);
      toast.error(err.response?.data?.message || "Error fetching todos");
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${apiUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      setTodo([]);
      toast.success("Logged out!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await fetchTodos();
      setLoading(false);
    };
    init();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        todo,
        setTodo,
        loading,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
