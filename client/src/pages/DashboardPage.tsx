import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { LogOut, Edit2, Trash2, ShieldCheck, AlertTriangle, Send } from "lucide-react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/ui/Modal";

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  //State for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  //State for Resend Email
  const [isResending, setIsResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  //Handle Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  //Handle Account Deletion
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await api.delete("/auth/delete-account");
      logout();
      navigate("/register");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete account.");
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  // ---Handle Resend Verification ---
  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      setResendMsg("");
      await api.post("/auth/resend-email-verification");
      setResendMsg("Verification email sent! Check your inbox.");
    } catch (error) {
      console.error("Resend failed", error);
      setResendMsg("Failed to send email. Try again later.");
    } finally {
      setIsResending(false);
      //Clear message after 3 seconds
      setTimeout(() => setResendMsg(""), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 pb-20">
      
      {/* ---NAVBAR--- */}
      <nav className="border-b border-dark-border bg-dark-bg/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary ring-1 ring-primary/30 shadow-lg shadow-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
             </div>
             <span className="text-xl font-bold text-white tracking-wide">
               Auth<span className="text-primary">Engine</span>
             </span>
          </div>

          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="w-auto px-4 py-2 text-sm text-gray-400 hover:!text-red-500 hover:!bg-red-500/10 border border-transparent hover:!border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* ---MAIN CONTENT--- */}
      <div className="max-w-4xl mx-auto mt-8 px-4 space-y-8">

        {/* ---Verification Warning Banner--- */}
        {!user.isEmailVerified && (
          <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4">
             <div className="flex items-center gap-3 text-yellow-500">
                <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Verify your email address</h3>
                  <p className="text-sm text-yellow-500/80">Please verify your account to access all features.</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                {resendMsg && <span className="text-sm text-green-400 font-medium animate-pulse">{resendMsg}</span>}
                <Button 
                  onClick={handleResendEmail} 
                  disabled={isResending}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black border-none whitespace-nowrap"
                >
                  {isResending ? "Sending..." : "Resend Link"}
                  {!isResending && <Send className="w-4 h-4 ml-2" />}
                </Button>
             </div>
          </div>
        )}
        
        {/* Profile Card */}
        <div className="glass rounded-3xl overflow-hidden relative group">
          <div className="h-48 md:h-64 w-full bg-gray-800 relative">
             <img 
               src={user.coverImage?.url || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"} 
               alt="Cover" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          </div>

          <div className="px-8 pb-8 flex flex-col md:flex-row items-center md:items-end -mt-16 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-dark-card overflow-hidden bg-gray-700 shadow-2xl">
                <img src={user.avatar?.url} alt={user.username} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                {user.username}
                {user.isEmailVerified && (
                  <span title="Verified Account" className="cursor-help">
                    <ShieldCheck className="text-primary w-6 h-6" />
                  </span>
                )}
              </h1>
              <p className="text-gray-400">{user.email}</p>
            </div>

            <div className="mt-6 md:mt-0">
               <Button variant="secondary" onClick={() => navigate("/edit-profile")}>
                 <Edit2 className="w-4 h-4 mr-2" />
                 Edit Profile
               </Button>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="glass p-6 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group">
             <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary">Security</h3>
             <p className="text-gray-400 text-sm mb-4">Update your password to keep your account secure.</p>
             <Button variant="secondary" className="w-full" onClick={() => navigate("/change-password")}>
               Change Password
             </Button>
          </div>

          {/* DANGER CARD */}
          <div className="glass p-6 rounded-2xl border-red-500/10 hover:border-red-500/50 transition-colors">
             <h3 className="text-lg font-semibold text-danger mb-2">Danger Zone</h3>
             <p className="text-gray-400 text-sm mb-4">Permanently remove your account and all data.</p>
             <Button 
               variant="danger" 
               className="w-full"
               onClick={() => setIsDeleteModalOpen(true)}
             >
               <Trash2 className="w-4 h-4 mr-2" />
               Delete Account
             </Button>
          </div>

        </div>
      </div>

      {/* Render the Modal Component */}
      <Modal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isDeleting}
        title="Delete Account?"
        message="Are you absolutely sure? This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />

    </div>
  );
};