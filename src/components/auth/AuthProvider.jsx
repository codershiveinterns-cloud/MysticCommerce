"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await requestJson("/api/auth/me");
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => refreshUser());
  }, [refreshUser]);

  const login = useCallback(async (credentials) => {
    const data = await requestJson("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setUser(data.user);
    return data.user;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      async register(payload) {
        await requestJson("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        return login({ email: payload.email, password: payload.password });
      },
      async logout() {
        await requestJson("/api/auth/logout", { method: "POST" });
        setUser(null);
      },
      refreshUser,
    }),
    [isLoading, login, refreshUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
