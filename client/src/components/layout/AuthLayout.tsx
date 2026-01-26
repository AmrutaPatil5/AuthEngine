import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-dark-bg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-dark-bg to-dark-bg">
      {/* The Glass Card Container */}
      <div className="w-full max-w-md space-y-8 glass p-8 rounded-2xl animate-in fade-in zoom-in duration-500">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          {/* Logo: Larger, brighter, with a neon glow */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 text-primary mb-6 shadow-lg shadow-primary/20 ring-1 ring-primary/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
            {title}
          </h2>
          {/* Subtitle: Lighter grey for better readability */}
          <p className="text-gray-300 text-base">
            {subtitle}
          </p>
        </div>

        {/* The Form Content */}
        {children}
      </div>
    </div>
  );
};