import { useEffect, useState, useRef } from "react"; 
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShieldCheck, XCircle, Loader2 } from "lucide-react";
import api from "../services/api";
import { Button } from "../components/ui/Button";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  
  //Create a Ref to track if we already called the API
  const verificationCalled = useRef(false);

  //Get the token from the URL query
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    if (verificationCalled.current) return;

    //Mark it as called immediately
    verificationCalled.current = true;
    
    //Send the Request
    api.get(`/auth/verify-email/${token}`)
      .then(() => setStatus("success"))
      .catch((error) => {
        // If the backend says "Token already verified" (400 or 409), 
        // we can treat it as a success or a specific message.
        console.error("Verification failed:", error);
        setStatus("error");
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <div className="glass max-w-md w-full p-8 rounded-2xl text-center space-y-6">
        
        {/* LOADING STATE */}
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-white">Verifying...</h2>
            <p className="text-gray-400">Please wait while we secure your account.</p>
          </>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">Email Verified!</h2>
            <p className="text-gray-400">Your account is now fully activated.</p>
            <Button onClick={() => navigate("/login")} className="mt-4">
              Go to Login
            </Button>
          </>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-danger/20 text-danger rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
            <p className="text-gray-400">The link is invalid or expired.</p>
            <Button variant="secondary" onClick={() => navigate("/login")} className="mt-4">
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};