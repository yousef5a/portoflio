import { useState, useEffect } from "react";

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (username, password) => {
    if (
      username === import.meta.env.VITE_ADMIN_USER &&
      password === import.meta.env.VITE_ADMIN_PASS
    ) {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
}
