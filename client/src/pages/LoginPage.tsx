import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

// UI Components
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { AuthLayout } from "../components/layout/AuthLayout";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  // Setup Form Handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // The actual Login Logic
  const onSubmit = async (data: any) => {
    try {
      setServerError(""); // Clear previous errors
      
      // 1. Call the Backend
      const response = await api.post("/auth/login", data);
      
      // 2. Save User to Context
      const user = response.data.data.user;
      login(user);
      
      // 3. Redirect to Dashboard
      navigate("/dashboard");
      
    } catch (error: any) {
      // Handle Errors (e.g., "User not found" or "Wrong password")
      const errorMessage = error.response?.data?.message || "Something went wrong";
      setServerError(errorMessage);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Global Error Message */}
        {serverError && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
            {serverError}
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />

        {/* Password Field with Toggle */}
        <div className="space-y-1">
            <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            error={errors.password?.message}
            icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => setShowPassword(!showPassword)}
            {...register("password", { required: "Password is required" })}
            />
            
            {/* Forgot Password Link */}
            <div className="flex justify-end">
                <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                    Forgot password?
                </Link>
            </div>
        </div>

        {/* Submit Button */}
        <Button 
            type="submit" 
            isLoading={isSubmitting} 
            className="w-full"
        >
          Sign In
        </Button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};