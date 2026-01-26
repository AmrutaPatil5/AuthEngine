import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import api from "../services/api";

// 1. Define the Shape of a User (Type Safety)
// This matches your Backend User Model exactly
interface User {
  _id: string;
  username: string;
  email: string;
  avatar: {
    url: string;
    localPath: string;
  };
  coverImage?: {
    url: string;
    localPath: string;
  };
  isEmailVerified: boolean;
}

// 2. Define the Context Shape
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<void>;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the Context with a safe default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. The Provider Component (The "Wrapper")
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Securely check if user is logged in when app starts
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      // Calls your secure backend endpoint
      const response = await api.get("/auth/current-user");
      
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      // If error (401 Unauthorized), we know they aren't logged in
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Run the check once on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Login Helper: Updates state immediately after successful login
  const login = (userData: User) => {
    setUser(userData);
  };

  // Logout Helper: Clears state
  const logout = () => {
    setUser(null);
    // We will also call the backend logout endpoint in the Logout Button component later
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, // true if user exists, false if null
      checkAuthStatus, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};