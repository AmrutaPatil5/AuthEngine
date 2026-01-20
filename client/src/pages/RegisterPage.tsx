import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, Image as ImageIcon } from "lucide-react";
import api from "../services/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { AuthLayout } from "../components/layout/AuthLayout";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  
  //State for image previews
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  
  //Watch for Avatar selection
  const avatarFile = watch("avatar");
  if (avatarFile && avatarFile.length > 0 && !avatarPreview) {
    const file = avatarFile[0];
    setAvatarPreview(URL.createObjectURL(file));
  }

  //Watch for Cover Image selection
  const coverFile = watch("coverImage");
  if (coverFile && coverFile.length > 0 && !coverPreview) {
    const file = coverFile[0];
    setCoverPreview(URL.createObjectURL(file));
  }

  const onSubmit = async (data: any) => {
    try {
      setServerError("");
      
      //Create FormData
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      //Append files only if they exist
      if (data.avatar && data.avatar.length > 0) {
          formData.append("avatar", data.avatar[0]);
      }
      
      if (data.coverImage && data.coverImage.length > 0) {
        formData.append("coverImage", data.coverImage[0]);
      }

      //Send to Backend
      await api.post("/auth/register", formData);

      // Success - Redirect to Login
      navigate("/login");
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      setServerError(errorMessage);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join the AuthEngine community today"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Error Alert */}
        {serverError && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
            {serverError}
          </div>
        )}

        {/* Username */}
        <Input
          label="Username"
          placeholder="johndoe"
          error={errors.username?.message as string}
          {...register("username", { required: "Username is required" })}
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message as string}
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />

        {/* Password */}
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowPassword(!showPassword)}
          error={errors.password?.message as string}
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
        />

        {/* File Uploads */}
        <div className="grid grid-cols-2 gap-4">
            {/* Avatar Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Avatar *</label>
                <div className="relative group cursor-pointer">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl hover:border-primary/50 transition-colors bg-black/20 overflow-hidden">
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center text-gray-500">
                                <Upload className="mx-auto h-8 w-8 mb-2" />
                                <span className="text-xs">Upload</span>
                            </div>
                        )}
                    </div>
                    <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        {...register("avatar", { required: "Avatar is required" })}
                    />
                </div>
                {errors.avatar && <p className="text-xs text-red-500">Required</p>}
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Cover Image</label>
                <div className="relative group cursor-pointer">
                    {/* Added overflow-hidden */}
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl hover:border-primary/50 transition-colors bg-black/20 overflow-hidden">
                         {/* Conditional Rendering for Preview */}
                         {coverPreview ? (
                            <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center text-gray-500">
                                    <ImageIcon className="mx-auto h-8 w-8 mb-2" />
                                    <span className="text-xs">Optional</span>
                            </div>
                        )}
                    </div>
                    <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        {...register("coverImage")}
                    />
                </div>
            </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" isLoading={isSubmitting} className="w-full mt-4">
          Create Account
        </Button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};