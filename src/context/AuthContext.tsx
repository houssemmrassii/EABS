// AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

// Define the shape of your authentication context
interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with an initial state
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a helper hook to access the context in your components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
interface AuthProviderProps {
  children: ReactNode;
}
// Create a provider component to wrap your app with
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  const login = () => {
    // Implement your login logic here
    setAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setAuthenticated(false);
  };

  const contextValue: AuthContextProps = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
