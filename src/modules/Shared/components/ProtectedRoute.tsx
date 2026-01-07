import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // Ici, il faudra implémenter la logique d'authentification
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};