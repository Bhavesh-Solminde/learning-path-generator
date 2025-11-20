import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "../utils/notify";
import { useAuthContext } from "../context/AuthContext";
import LoginForm from "../features/auth/LoginForm";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      notifyError("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      notifyError(error.message ?? "Unable to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-night-soft text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-ash-soft/20 blur-[120px] left-1/4 -top-20"></div>
        <div className="absolute w-[600px] h-[600px] bg-glow-violet/40 blur-[160px] right-1/3 bottom-0"></div>
      </div>
      <div className="relative card max-w-lg w-full p-10 fade-in login-card">
        <div className="text-center mb-8 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">PathForge Premium</p>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-white/60">Continue mastering your learning path</p>
        </div>

        <LoginForm
          values={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <div className="mt-8 text-center text-sm text-white/70">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-semibold hover:text-accent-blue">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
