import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LayoutProvider } from "./context/LayoutContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import CourseLearning from "./pages/CourseLearning";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import LoadingDemo from "./pages/LoadingDemo";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const CoursesContainer = lazy(() => import("./pages/Courses.container"));
const Profile = lazy(() => import("./pages/Profile"));

const SuspenseFallback = () => (
  <div className="flex min-h-[200px] items-center justify-center py-10">
    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
  </div>
);

const withSuspense = (node) => <Suspense fallback={<SuspenseFallback />}>{node}</Suspense>;

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/loading-demo" element={<LoadingDemo />} />

              {/* Onboarding Route - Semi-protected */}
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={<ProtectedRoute>{withSuspense(<Dashboard />)}</ProtectedRoute>}
              />
              <Route
                path="/courses"
                element={<ProtectedRoute>{withSuspense(<CoursesContainer />)}</ProtectedRoute>}
              />
              <Route
                path="/course/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseLearning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={<ProtectedRoute>{withSuspense(<Profile />)}</ProtectedRoute>}
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* Default Route */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </LayoutProvider>
    </AuthProvider>
  );
}

export default App;
