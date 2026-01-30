import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ChevronLeft,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import NeoButton from "@/components/neo/NeoButton";
import NeoCard from "@/components/neo/NeoCard";
import { supabase } from "@/lib/supabase";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secret: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check role
      if (data.user?.user_metadata?.role !== "admin") {
        throw new Error("Access denied: Not an administrator.");
      }

      // Navigate to admin dashboard on success
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Verify Secret Code (Simple security for MVP)
    const ADMIN_SECRET = "GTL_ADMIN_2026";
    if (formData.secret !== ADMIN_SECRET) {
      setError("Invalid Admin Secret Code.");
      setLoading(false);
      return;
    }

    try {
      // 2. Create User with 'admin' role
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: "admin",
          },
        },
      });

      if (error) throw error;

      // Navigate to dashboard
      navigate("/admin");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-['Space_Grotesk'] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-white -rotate-6"></div>
      </div>

      <NeoCard className="bg-white max-w-md w-full relative z-10 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
        <button
          onClick={() => navigate("/")}
          className="absolute -top-12 left-0 flex items-center gap-2 font-bold text-white hover:text-gray-300 transition-colors"
        >
          <div className="bg-white text-black p-1 border-2 border-white hover:bg-black hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </div>
          BACK TO HOME
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-black border-2 border-dashed border-gray-500 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black uppercase mb-2">Admin Panel</h1>
          <p className="font-medium text-gray-600">
            Authorized personnel only.
          </p>
        </div>

        <div className="flex mb-6 border-4 border-black">
          <button
            className={`flex-1 py-3 font-black uppercase text-center transition-colors ${
              isLogin ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-black uppercase text-center transition-colors ${
              !isLogin ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
          >
            Create Admin
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-4 border-red-500 p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="font-bold text-red-700">{error}</p>
          </div>
        )}

        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="font-black text-sm uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="admin@gtl.in"
                className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-black text-sm uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">
                Admin Secret Code
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="secret"
                  placeholder="Enter secret to create admin"
                  className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  value={formData.secret || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 font-bold">
                * Required to prevent unauthorized admin creation.
              </p>
            </div>
          )}

          <NeoButton
            type="submit"
            variant="dark"
            className="w-full py-4 text-xl justify-center group mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                {isLogin ? "verifying..." : "registering..."}
              </>
            ) : (
              <>
                {isLogin ? "ACCESS DASHBOARD" : "REGISTER ADMIN"}
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </NeoButton>
        </form>
      </NeoCard>
    </div>
  );
};

export default AdminLoginPage;
