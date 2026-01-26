import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. Wait for the check to finish
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-dark-bg text-primary">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  // 2. If logged in, KICK them to Dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. If NOT logged in, let them see the page (Login/Register)
  return <>{children}</>;
};