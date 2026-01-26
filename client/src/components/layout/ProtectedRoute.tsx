import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  //Show a loading spinner while we check the backend
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-dark-bg text-primary">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  //If not logged in, kick out to Login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //If logged in, show the page
  return <>{children}</>;
};