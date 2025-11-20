import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useLayout } from "../context/LayoutContext";
import Sidebar from "./Sidebar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const { isSidebarCollapsed } = useLayout();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <Sidebar />
      <div
        className={`flex-1 min-h-screen bg-transparent transition-[margin] duration-300 ease-soft ${
          isSidebarCollapsed ? "lg:ml-24" : "lg:ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ProtectedRoute;
