

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';
import { useEffect, useState } from 'react';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import toast, { Toaster } from 'react-hot-toast'; // === 1. IMPORT TOAST ===


const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" })
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: "Passwords do not match",
    });
  }
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const handleGitHubLogin = () => {
    try {
      setGithubLoading(true);

      // Set timeout for popup block detection
      const timer = setTimeout(() => {
        setGithubLoading(false);
        toast.error('Pop-up was blocked. Please allow pop-ups or try again.');
      }, 1500);

      // Window configuration
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      // Open blank window first (less likely to be blocked)
      const authWindow = window.open(
        '',
        'githubAuth',
        `width=${width},height=${height},top=${top},left=${left},` +
        `toolbar=no,location=no,status=no,menubar=no`
      );

      // Check if popup was blocked
      if (!authWindow || authWindow.closed) {
        clearTimeout(timer);
        setGithubLoading(false);
        // Fallback to redirect
        window.location.href = `${process.env.VITE_API_URL}/auth/github`;
        return;
      }

      // Set URL after window opens
      authWindow.location.href = `${process.env.VITE_API_URL}/auth/github`;

      // Message handler
      const handleMessage = (event) => {
        // Security check
        if (event.origin !== process.env.VITE_API_URL) return;

        clearTimeout(timer);
        setGithubLoading(false);

        if (event.data.type === 'auth_success') {
          // Set token cookie
          document.cookie = `token=${event.data.token}; path=/; secure; sameSite=lax`;

          // Update Redux state
          dispatch(loginUser({
            ...event.data.user,
            authMethod: 'github'
          }));

          // Close window and redirect
          authWindow?.close();
          navigate('/problems', {
            state: { welcome: true },
            replace: true
          });

        } else if (event.data.type === 'auth_error') {
          toast.error(event.data.error || 'GitHub login failed');
          authWindow?.close();
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup
      return () => {
        window.removeEventListener('message', handleMessage);
        clearTimeout(timer);
        authWindow?.close();
      };

    } catch (error) {
      setGithubLoading(false);
      console.error('GitHub login error:', error);
      toast.error(error.message || 'Failed to initiate GitHub login');
    }
  };

  const handleFeatureInProgress = (featureName) => {
    toast.error(`${featureName} login is currently under development.`, {
      duration: 2000,
      delay: 3000,
      position: 'bottom-right',
      icon: '🚧',
      style: {
        background: '#1a1a2e',
        fontFamily: 'changa',
        color: '#e0e0e0',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
    });
  };

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      <Toaster position="bottom-center" toastOptions={{
        className: 'font-sans',
      }} />
      <nav className="text-white">
        <Navbar />
      </nav>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-50 animate-float"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-50 animate-float-delay"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl mt-10 shadow-2xl overflow-hidden px-8 py-4">
            {/* Header */}
            <div className="text-center mb-3">
              <div className="flex justify-center mb-4">

                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600/70 to-blue-600/35 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>

              <TypingAnimation className="mt-2 text-md text-white/70 font-changa">
                Begin your coding journey today
              </TypingAnimation>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/50 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.name ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
                      }`}
                    placeholder="John Doe"
                    {...register('name')}
                  />
                </div>
                {errors.name?.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/50 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.email ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
                      }`}
                    placeholder="john@example.com"
                    {...register('email')}
                  />
                </div>
                {errors.email?.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/50 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-2 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.password ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
                      }`}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white/50 hover:text-white/80" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/50 hover:text-white/80" />
                    )}
                  </button>
                </div>
                {errors.password?.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/50 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-2 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.confirmPassword ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
                      }`}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-white/50 hover:text-white/80" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/50 hover:text-white/80" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword?.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <ShimmerButton
                  type="submit"
                  className={cn(
                    "w-full py-3 font-medium rounded-lg transition-all",
                    loading ? "opacity-80 cursor-not-allowed" : "hover:shadow-lg"
                  )}
                  disabled={loading}
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </div>
                </ShimmerButton>
              </div>
            </form>

            {/* Social Login Buttons */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/80 rounded-full text-white/70">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleFeatureInProgress('Google')}
                  type="button"
                  className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors border border-white/10"
                >
                  <FcGoogle className="h-5 w-5" />
                  <span>Google</span>
                </button>

                <button
                  onClick={handleGitHubLogin}
                  disabled={githubLoading}
                  type="button"
                  className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors border border-white/10"
                >
                  {githubLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <ImGithub className="h-5 w-5" />
                      <span>GitHub</span>
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm text-white/50 mt-4">
              Already have an account?{' '}
              <NavLink
                to="/login"
                className="font-medium text-white hover:text-purple-200 transition-colors"
              >
                Log in
              </NavLink>
            </div>

          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 text-center text-white/50 text-xs p-4">
        © {new Date().getFullYear()} CodeHunter. All rights reserved.
      </div>
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-1 px-4 absolute bottom-0 right-0 bg-red-900/30 border border-red-700/70 rounded-lg text-red-200 text-sm "
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

export default Signup;