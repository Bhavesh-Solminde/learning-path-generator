import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useLayout } from "../context/LayoutContext";
import Sidebar from "./Sidebar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const { isSidebarOpen, closeSidebar } = useLayout();

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
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="lg:ml-64 flex-1 min-h-screen bg-gray-50">{children}</div>
    </div>
  );
};

export default ProtectedRoute;
