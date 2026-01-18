import React, { type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, variant = "primary", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          // Base Styles
          "w-full flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          
          // Variants
          variant === "primary" && 
            "bg-primary hover:bg-primary-hover text-black shadow-lg shadow-primary-glow",
          
          variant === "secondary" && 
            "bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-dark-border",
            
          variant === "danger" && 
            "bg-danger/10 text-danger hover:bg-danger/20 border border-danger/20",

          variant === "ghost" && 
            "bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400",
            
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };