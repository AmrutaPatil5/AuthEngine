import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { PublicRoute } from "./components/layout/PublicRoute";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/*Public Routes (Accessible ONLY if NOT logged in)*/}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        } 
      />

      {/*Open Routes (Anyone can see these)*/}
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      
      {/*Redirect root*/}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/*Protected Routes (Logged in users only)*/}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/edit-profile" 
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/change-password" 
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/change-password" 
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        } 
      />

      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFoundPage />} /> 
      
    </Routes>
  );
}

export default App;