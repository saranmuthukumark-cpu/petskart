"use client";

import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return null;
      }

      const data = await response.json();
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    (async () => {
      await refreshSession();
      setLoading(false);
    })();
  }, [refreshSession]);

  // login and logout functions
  const login = async () => {
    const me = await refreshSession();
    if (me) {
      if (me.role === "admin") {
        router.push("/admin/admin-dashboard");
      } else {
        router.push("/");
      }
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }

    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
