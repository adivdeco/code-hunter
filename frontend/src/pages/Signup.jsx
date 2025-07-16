

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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      <nav className="text-white">
        <Navbar />
      </nav>
      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-50 animate-float"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-50 animate-float-delay"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl mt-10 shadow-2xl overflow-hidden px-8 py-4">
            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>

              <TypingAnimation className="mt-2 text-md text-white/70 font-changa">
                Begin your coding journey today
              </TypingAnimation>

            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm mb-4"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    className={`block w-full pl-10 pr-3 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.name ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
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
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`block w-full pl-10 pr-3 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.email ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
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
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.password ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
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
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${errors.confirmPassword ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
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
              <div className="pt-4">
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
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;