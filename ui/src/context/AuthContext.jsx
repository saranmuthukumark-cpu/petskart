"use client";

import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth must be used within an AuthProvider");
  }
  return context;
}