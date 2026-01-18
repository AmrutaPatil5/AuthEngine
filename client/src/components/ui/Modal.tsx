import { X, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export const Modal = ({ isOpen, onClose, onConfirm, title, message, isLoading }: ModalProps) => {
  if (!isOpen) return null;

  return (
    // 1. The Dark Overlay (Backdrop)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* 2. The Modal Content */}
      <div className="relative w-full max-w-md bg-dark-card border border-dark-border rounded-2xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Header with Icon */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/10 rounded-full text-red-500">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>

          {/* Body Text */}
          <p className="text-gray-400 mb-8 leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button 
              variant="ghost" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button 
              variant="danger" 
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white border-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};