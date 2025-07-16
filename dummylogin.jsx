import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState, useRef } from 'react';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from 'react';

const FloatingCodeBlocks = lazy(() => import("@/components/magicui/FloatingCodeBlocks"));

// Usage in your component:
<Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />}>
    <FloatingCodeBlocks />
</Suspense>

const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }).min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "password must be at least 6 characters long" }),

});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
    const formRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus
    } = useForm({ resolver: zodResolver(schema) });

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

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
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            {/* 3D Animated Background */}
            <FloatingCodeBlocks />

            {/* Particle System */}

            {/* Glowing Orb Animation */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
                <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-violet-600 rounded-full filter blur-3xl opacity-20 animate-float-delay-2"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div
                        className={cn(
                            "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500",
                            isHovered ? "shadow-purple-500/20" : "shadow-blue-500/10"
                        )}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Auth Header */}
                        <div className="p-8 text-center border-b border-white/10">
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                                        <Lock className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                {/* <TypingAnimation
                  className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                  text={["Secure Login", "Welcome Back", "Access Granted"]}

                /> */}

                                <TypingAnimation className="mt-2 text-md text-white/70 font-changa">
                                    Enter your credentials to unlock your coding journey
                                </TypingAnimation>

                            </motion.div>
                        </div>

                        {/* Auth Form */}
                        <div className="p-8 pt-6">
                            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                            autoComplete="email"
                                            className={cn(
                                                "block w-full pl-10 pr-3 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all",
                                                errors.email ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
                                            )}
                                            placeholder="hunter@codehunter.com"
                                            {...register('email')}
                                        />
                                    </div>
                                    {errors.email?.message && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-sm text-red-400"
                                        >
                                            {errors.email.message}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-white/80">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-xs text-white/50 hover:text-white/80 transition-colors"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-white/50" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            className={cn(
                                                "block w-full pl-10 pr-10 py-3 rounded-lg border-none bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all",
                                                errors.password ? "ring-2 ring-red-500" : "ring-1 ring-white/10"
                                            )}
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
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-sm text-red-400"
                                        >
                                            {errors.password.message}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}

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
                                                    Authenticating...
                                                </>
                                            ) : (
                                                <>
                                                    Unlock Dashboard
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </div>
                                    </ShimmerButton>
                                </div>
                            </form>

                            {/* Footer Links */}
                            <div className="mt-6 text-center text-sm">
                                <NavLink
                                    to="/forgot-password"
                                    className="font-medium text-white/70 hover:text-white transition-colors"
                                >
                                    Forgot your password?
                                </NavLink>
                            </div>
                            <div className="mt-2 text-center text-sm text-white/50">
                                Don't have an account?{' '}
                                <NavLink
                                    to="/signup"
                                    className="font-medium text-white hover:text-purple-200 transition-colors"
                                >
                                    Join the hunt
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Code Blocks Animation */}
            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
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