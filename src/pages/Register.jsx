import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "../utils/notify";
import { useAuthContext } from "../context/AuthContext";
import RegisterForm from "../features/auth/RegisterForm";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    interests: "",
  });
  const { register, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      notifyError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notifyError("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...userData } = formData;
    try {
      await register(userData);
      navigate("/onboarding");
    } catch (error) {
      notifyError(error.message ?? "Unable to create your account.");
    }
  };

  return (
    <div className="min-h-screen bg-night-soft text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-glow-blue blur-[140px] left-1/3 top-10"></div>
        <div className="absolute w-[500px] h-[500px] bg-glow-violet blur-[160px] right-1/4 bottom-0"></div>
      </div>
      <div className="relative card max-w-2xl w-full p-10 fade-in">
        <div className="text-center mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">PathForge Access</p>
          <h1 className="text-3xl font-semibold tracking-tight">Create Account</h1>
          <p className="text-sm text-white/60">Start your personalized learning journey</p>
        </div>

        <RegisterForm
          values={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <div className="mt-8 text-center text-sm text-white/70">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:text-accent-blue">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
