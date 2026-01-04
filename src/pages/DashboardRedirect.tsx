import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth" />;

  if (user.role === "client") {
    return <Navigate to="/client/dashboard" />;
  }

  if (user.role === "freelancer") {
    return <Navigate to="/freelancer/dashboard" />;
  }

  // fallback (should never happen)
  return <Navigate to="/role-selection" />;
};

export default DashboardRedirect;
