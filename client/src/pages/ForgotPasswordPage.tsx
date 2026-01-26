import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import api from "../services/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { AuthLayout } from "../components/layout/AuthLayout";

export const ForgotPasswordPage = () => {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setServerError("");
      // Call Backend
      await api.post("/auth/forgot-password", { email: data.email });
      // Show success message
      setSuccess(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      setServerError(errorMessage);
    }
  };

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email to reset your password"
    >
      {/* SUCCESS STATE */}
      {success ? (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
             <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Check your email</h3>
            <p className="text-gray-400">
              We have sent a password reset link to your email address.
            </p>
          </div>
          <Link to="/login">
            <Button variant="secondary" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </div>
      ) : (
        /* FORM STATE */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {serverError && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              {serverError}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={20} />}
            error={errors.email?.message as string}
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Send Reset Link
          </Button>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};