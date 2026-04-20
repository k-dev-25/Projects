import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
function ProtectedRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading MedCompass...</div>;

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
