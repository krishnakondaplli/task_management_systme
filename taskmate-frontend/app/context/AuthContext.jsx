"use client";

import { useRouter } from "next/navigation";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage or token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("user");

    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setIsLoading(false);
  }, []);

  //   Login Function
  const login = async (email, password) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      console.error(err);
      throw error;
    }
  };

  //   Register Function
  const register = async (name, email, password) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      // console.log(res);
      if (!res.ok) throw new Error("Registation Failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("token", JSON.stringify(data.user));

      setUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //   Logout funciton

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };
  const loginFromDash = () => {
    router.push("/login");
  };
  const registerFromDash = () => {
    router.push("/register");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        loginFromDash,
        registerFromDash,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
