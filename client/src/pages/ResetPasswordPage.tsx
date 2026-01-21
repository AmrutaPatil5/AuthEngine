import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // 👈 useParams grabs the token from URL
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import api from "../services/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { AuthLayout } from "../components/layout/AuthLayout";

export const ResetPasswordPage = () => {
  const { token } = useParams(); // Get token from route /reset-password/:token
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setServerError("");
      
      // Call Backend: POST /auth/reset-password/:token
      // Note: Backend typically expects "newPassword" in the body
      await api.post(`/auth/reset-password/${token}`, { 
        newPassword: data.password 
      });

      setSuccess(true);
      
      // Optional: Auto redirect after 3 seconds
      setTimeout(() => navigate("/login"), 3000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to reset password";
      setServerError(errorMessage);
    }
  };

  return (
    <AuthLayout 
      title="Set New Password" 
      subtitle="Please enter your new password below"
    >
      {/* SUCCESS STATE */}
      {success ? (
        <div className="text-center space-y-6 animate-in fade-in zoom-in">
          <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
             <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-white">Password Reset!</h3>
          <p className="text-gray-400">
            Your password has been successfully updated. Redirecting to login...
          </p>
          <Button onClick={() => navigate("/login")} className="w-full">
            Go to Login Now
          </Button>
        </div>
      ) : (
        /* FORM STATE */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {serverError && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              {serverError}
            </div>
          )}

          {/* New Password Field */}
          <Input
            label="New Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => setShowPassword(!showPassword)}
            error={errors.password?.message as string}
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 6, message: "Min 6 chars" } 
            })}
          />

          {/* Confirm Password Field */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message as string}
            {...register("confirmPassword", { 
              required: "Please confirm your password", 
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Passwords do not match";
                }
              }
            })}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Reset Password
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};