import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserType =  {
  _id: string;
  name: string;
  email: string;
  role?: "admin" | "client" | "freelancer";
  
}

export type AuthContextType = {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  signup: (data: { name: string; email: string; password: string }) => Promise<boolean>;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  updateRole: (role: string) => Promise<boolean>;
  logout: () => void;
}
const API_URL = import.meta.env.VITE_API_URL
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user + token from storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false)
  }, []);

  const saveAuth = (tok: string, usr: UserType) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem("token", tok);
    localStorage.setItem("user", JSON.stringify(usr));
  };

  const signup: AuthContextType["signup"] = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      saveAuth(json.token, json.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const login: AuthContextType["login"] = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      saveAuth(json.token, json.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateRole: AuthContextType["updateRole"] = async (role) => {
    if (!token) return false;

    try {
      const res = await fetch(`${API_URL}/api/auth/role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setUser(json.user);
      localStorage.setItem("user", JSON.stringify(json.user));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        signup,
        login,
        updateRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
