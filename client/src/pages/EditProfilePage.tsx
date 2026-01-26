import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, CheckCircle2, Image as ImageIcon, User } from "lucide-react";
import api from "../services/api";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, checkAuthStatus } = useAuth();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form for Avatar
  const { 
    register: registerAvatar, 
    handleSubmit: handleAvatarSubmit,
    formState: { isSubmitting: isAvatarSubmitting },
    watch: watchAvatar
  } = useForm();

  // Form for Cover Image
  const { 
    register: registerCover, 
    handleSubmit: handleCoverSubmit,
    formState: { isSubmitting: isCoverSubmitting },
    watch: watchCover
  } = useForm();

  // Watchers for immediate feedback on file selection
  const avatarFile = watchAvatar("avatar");
  const coverFile = watchCover("coverImage");

  const onUpdateAvatar = async (data: any) => {
    try {
      setSuccessMsg(""); setErrorMsg("");
      if (!data.avatar || data.avatar.length === 0) return;

      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);

      await api.patch("/auth/avatar", formData);
      await checkAuthStatus();
      setSuccessMsg("Avatar updated successfully!");
    } catch (error: any) {
      setErrorMsg("Failed to update avatar.");
    }
  };

  const onUpdateCover = async (data: any) => {
    try {
      setSuccessMsg(""); setErrorMsg("");
      if (!data.coverImage || data.coverImage.length === 0) return;

      const formData = new FormData();
      formData.append("coverImage", data.coverImage[0]);

      await api.patch("/auth/cover-image", formData);
      await checkAuthStatus();
      setSuccessMsg("Cover image updated successfully!");
    } catch (error: any) {
      setErrorMsg("Failed to update cover image.");
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* HEADER CARD */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-primary/5 border-primary/10">
           <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/dashboard")}
                className="hover:bg-primary/10 hover:text-primary -ml-2"
              >
                 <ArrowLeft className="w-6 h-6" />
              </Button>
              {/* More attractive heading with a slight gradient */}
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-primary/80 tracking-tight">
                Edit Profile
              </h1>
           </div>
           <User className="w-8 h-8 text-primary/40 hidden md:block" />
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" /> 
            <span className="font-medium">{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-medium shadow-lg">
            {errorMsg}
          </div>
        )}

        {/* Avatar Section */}
        <div className="glass p-8 rounded-3xl space-y-6 border-primary/10 relative overflow-hidden group">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Profile Picture</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <img 
              src={avatarFile && avatarFile.length > 0 ? URL.createObjectURL(avatarFile[0]) : user?.avatar?.url} 
              className="w-32 h-32 rounded-full border-4 border-dark-card shadow-xl object-cover ring-2 ring-primary/30" 
              alt="Current Avatar" 
            />
            <form onSubmit={handleAvatarSubmit(onUpdateAvatar)} className="flex-1 w-full flex flex-col md:flex-row gap-4 items-center">
              {/* Green Choose File Button */}
              <input 
                type="file" 
                accept="image/*"
                className="w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary file:text-dark-bg hover:file:bg-primary-hover file:cursor-pointer cursor-pointer file:transition-colors"
                {...registerAvatar("avatar", { required: true })}
              />
              <Button type="submit" disabled={isAvatarSubmitting || !avatarFile} className="w-full md:w-auto px-8">
                {isAvatarSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Upload New"}
              </Button>
            </form>
          </div>
        </div>

        {/* Cover Image Section */}
        <div className="glass p-8 rounded-3xl space-y-6 border-primary/10 relative overflow-hidden group">
           {/* Decorative background blur */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ImageIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Cover Image</h2>
          </div>
          
          <div className="space-y-6 relative z-10">
             <div className="h-48 w-full rounded-2xl overflow-hidden bg-dark-card/50 border border-dark-border/50 shadow-inner relative">
                <img 
                  src={coverFile && coverFile.length > 0 ? URL.createObjectURL(coverFile[0]) : user?.coverImage?.url} 
                  className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity" 
                  alt="Current Cover" 
                />
                {/* Overlay hint */}
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="font-medium flex items-center gap-2"><ImageIcon className="w-5 h-5"/> Preview</p>
                 </div>
             </div>
             
             <form onSubmit={handleCoverSubmit(onUpdateCover)} className="flex flex-col md:flex-row gap-4 items-center">
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary file:text-dark-bg hover:file:bg-primary-hover file:cursor-pointer cursor-pointer file:transition-colors"
                  {...registerCover("coverImage", { required: true })}
                />
                <Button type="submit" disabled={isCoverSubmitting || !coverFile} className="w-full md:w-auto px-8">
                    {isCoverSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Update Cover"}
                </Button>
             </form>
          </div>
        </div>

      </div>
    </div>
  );
};