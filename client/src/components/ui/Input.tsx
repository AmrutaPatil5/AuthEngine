import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, onIconClick, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {/* The Input Field */}
          <input
            type={type}
            className={cn(
              // Base Styles (Glassmorphism)
              "glass-input w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-black/40",
              "border border-gray-200 dark:border-dark-border",
              "focus:ring-2 focus:ring-primary/50 focus:border-primary",
              "text-gray-900 dark:text-white placeholder:text-gray-400",
              "transition-all duration-200",
              // Error State
              error && "border-danger focus:ring-danger/50",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {/* Icon (e.g., Password Eye) */}
          {icon && (
            <button
              type="button"
              onClick={onIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              {icon}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-danger animate-pulse">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };