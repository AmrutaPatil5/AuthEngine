import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Home, FileQuestion } from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4 text-center">
      <div className="space-y-8 max-w-md animate-in fade-in zoom-in duration-500">
        
        {/* Animated Icon Circle */}
        <div className="relative mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-primary relative z-10" />
            <div className="absolute inset-0 rounded-full animate-ping bg-primary/20 opacity-75"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white">Lost in Space?</h2>
          <p className="text-gray-400">
            The page you are looking for doesn't exist or has been moved to another dimension.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
            <Button onClick={() => navigate("/")} className="w-full sm:w-auto px-8">
            <Home className="w-4 h-4 mr-2" />
            Return to Dashboard
            </Button>
        </div>
      </div>
    </div>
  );
};