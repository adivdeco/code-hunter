

// src/components/Login.jsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { loginUser } from "../authSlice"; // Adjust path if needed
import { useEffect, useState, Suspense, lazy } from 'react';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { ShimmerButton } from "@/components/magicui/shimmer-button"; // Assuming path
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes
import Navbar from "@/components/Navbar";

// Lazy load the most performance-intensive component
const FloatingCodeBlocks = lazy(() => import("@/components/magicui/FloatingCodeBlocks"));

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }).min(1, { message: "Email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched' // Validate on blur
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/problems'); // Or your main app route
    }
  }, [isAuthenticated, navigate]);


  // Auto-focus the email field on component mount for better UX
  useEffect(() => {
    setFocus('email');
  }, [setFocus]);


  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (err) {
      // Error handled by authSlice
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      {/* ===== BACKGROUND LAYERS ===== */}
      <nav className="text-white">
        <Navbar></Navbar>
      </nav>

      <div className="absolute inset-0 z-0">
        {/* Layer 1: Animated Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/40 rounded-full filter blur-2xl opacity-80 animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/40 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-violet-600/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>


        {/* Layer 3: Floating Code (Lazy Loaded) */}
        {/* <Suspense fallback={null}>
          <FloatingCodeBlocks />
        </Suspense> */}
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />}>
          <FloatingCodeBlocks />
        </Suspense>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/10">
            {/* Header */}
            <div className="p-8 text-center border-b border-white/10">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg shadow-purple-500/20">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Welcome, Hunter
              </h1>
              <TypingAnimation className="mt-2 text-md text-white/70 font-changa">
                Authenticate to begin your next hunt.
              </TypingAnimation>

            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={cn(
                        "block w-full pl-10 pr-3 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300",
                        errors.email ? "ring-2 ring-red-500" : "ring-1 ring-white/20"
                      )}
                      placeholder="hunter@codehunter.io"
                      {...register('email')}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-red-400">
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className={cn(
                        "block w-full pl-10 pr-10 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300",
                        errors.password ? "ring-2 ring-red-500" : "ring-1 ring-white/20"
                      )}
                      placeholder="••••••••"
                      {...register('password')}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70 transition-colors">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password?.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Global Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="pt-2">
                  <ShimmerButton type="submit" className="w-full" disabled={loading}>
                    <span className="flex items-center justify-center gap-2 font-semibold whitespace-pre-wrap text-center text-sm leading-none tracking-tight text-white">
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Authenticating...
                        </>
                      ) : (
                        <>
                          Gain Access <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </span>
                  </ShimmerButton>
                </div>
              </form>

              {/* Footer Links */}
              <div className="mt-6 space-y-2 text-center text-sm">
                <NavLink to="/forgot-password" className="font-medium text-white/60 hover:text-white transition-colors">
                  Forgot your password?
                </NavLink>
                <p className="text-white/40">
                  Don't have an account?{' '}
                  <NavLink to="/signup" className="font-semibold text-white hover:text-purple-300 transition-colors">
                    Join the Hunt
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Floating Code Blocks Animation */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translate(-90px,-120px) rotate(5deg); }
                    88% { transform: translateY(0px,-30px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(-10deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite 2s;
        }
        .animate-float-delay-2 {
          animation: float 8s ease-in-out infinite 4s;
        }
      `}</style>
    </div>
  );
}