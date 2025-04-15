import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data?.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile after successful update
  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password,
        rememberMe,
      });

      const { token, role } = res.data.user;

      // Check if role is 'admin'
      if (role !== "admin") {
        throw "Access denied: You are not authorized to login.";
      }

      // Save token in localStorage
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Fetch user profile
      await fetchUserProfile();

    } catch (err) {
      throw err.response?.data?.message || "Access denied!";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);