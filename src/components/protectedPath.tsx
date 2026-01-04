import { useAuth } from "@/context/authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
  role,
  disallowRole,
}: {
  children: JSX.Element;
  role?: "client" | "freelancer" | "admin";
  disallowRole?: "admin" | "client" | "freelancer";
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (disallowRole && user.role === disallowRole) {
    return <Navigate to="/dashboard" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
