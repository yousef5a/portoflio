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
      username === "mohamedesam" &&
      password === "mohamed50esam50"
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
