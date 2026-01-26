import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Key, Lock, CheckCircle2 } from "lucide-react";
import api from "../services/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { AuthLayout } from "../components/layout/AuthLayout";

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setServerError("");
      
      // Call Backend (POST /auth/change-password)
      // We send oldPassword and newPassword
      await api.post("/auth/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      });

      setSuccess(true);
      reset(); // Clear the form
      
      setTimeout(() => navigate("/dashboard"), 2000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update password";
      setServerError(errorMessage);
    }
  };

  return (
    <AuthLayout 
      title="Change Password" 
      subtitle="Update your password to keep your account secure"
    >
      {/* Success State */}
      {success ? (
        <div className="text-center space-y-6 animate-in fade-in zoom-in">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
             <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Password Updated!</h3>
            <p className="text-gray-400">
              Your password has been changed successfully.
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Back to Dashboard
          </Button>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {serverError && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              {serverError}
            </div>
          )}

          {/* Old Password */}
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            icon={<Key size={18} />}
            error={errors.oldPassword?.message as string}
            {...register("oldPassword", { required: "Current password is required" })}
          />

          {/* New Password */}
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            error={errors.newPassword?.message as string}
            {...register("newPassword", { 
              required: "New password is required",
              minLength: { value: 6, message: "Min 6 chars" }
            })}
          />

          {/* Confirm New Password */}
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            error={errors.confirmPassword?.message as string}
            {...register("confirmPassword", { 
              required: "Please confirm your password",
              validate: (val: string) => {
                if (watch("newPassword") != val) {
                  return "Passwords do not match";
                }
              }
            })}
          />

          <div className="pt-2 flex gap-3">
             <Button 
                type="button" 
                variant="ghost" 
                className="w-1/3"
                onClick={() => navigate("/dashboard")}
             >
                Cancel
             </Button>
             <Button type="submit" isLoading={isSubmitting} className="w-2/3">
                Update Password
             </Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};