import React, { useContext, useEffect, useState, type ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);
  const login = () => {
    setIsAuth(true);
  };
  const logout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    window.location.reload();
  };
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
