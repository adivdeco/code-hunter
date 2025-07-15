// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice'
// import { useEffect, useState } from 'react';
// import { TypingAnimation } from "@/components/magicui/typing-animation";


// const schema = z.object({
//   name: z.string().min(3, { message: "name must be at least 3 characters long" }),
//   email: z.string().email({ message: "invalid email" }).min(1, { message: "email is required" }),
//   password: z.string().min(6, { message: "password must be at least 6 characters long" }),
//   ConformPassword: z.string().min(6, { message: "confirm password must be same as password" })
// }).superRefine((data, ctx) => {
//   if (data.password !== data.ConformPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       path: ['ConformPassword'],
//       message: "password do not match",
//     })
//   }
// });



// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   console.log(isAuthenticated, error);

//   const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(schema) });  //useform hook

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };


//   return (
//     <div className="">
//       <div className="min-h-screen flex items-center justify-center p-4 text-white ">
//         <div className="card w-4/12  bg-gradient-to-br from-[#e8bad1] via-[#bf88f2] via-[#a3cbf5] via-indigo to-[#f3f2f2] shadow-2xl">
//           <div className="card-body">
//             <h1 className="card-title justify-center font-chango text-3xl"><TypingAnimation className={"text-black"} >
//               Lets  Hunt
//             </TypingAnimation></h1>

//             <form onSubmit={handleSubmit(onSubmit)}>

//               {/* name */}
//               <div className="form-control">
//                 <label className="label -scroll-mb-0"><span className="text-black font-changa">Name</span></label>
//                 <input type="text" placeholder="adiv" className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.name && 'input-error'}`} {...register('name')} />
//                 {errors.name?.message && <p className="text-error">{errors.name?.message}</p>}
//               </div>

//               {/* email */}
//               <div className="form-control mt-4">
//                 <label className=" label scroll-mb-0">
//                   <span className="text-black font-changa">Email</span>
//                 </label>
//                 <input type="email"
//                   className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.email && 'input-error'}`}
//                   placeholder="adiv@example.com"
//                   {...register('email', { required: true })}
//                 />
//                 {errors.email?.message && <span className="text-error">{errors.email?.message}</span>}
//               </div>

//               {/* password */}
//               <div className="form-control mt-4">
//                 <label className="label -scroll-mb-0">
//                   <span className="text-black font-changa">Password</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     // type="password" 
//                     type={showPassword ? "text" : "password"}
//                     className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.password && 'input-error'}`}
//                     placeholder="••••••"
//                     {...register('password')}
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
//                   >
//                     {showPassword ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 {errors.password?.message && <p className="text-error">{errors.password?.message}</p>}
//               </div>
//               {/* conf.Password */}
//               <div className="form-control mt-4">
//                 <label className="label -scroll-mb-0">
//                   <span className="text-black font-changa">Conform Password</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     // type="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••"
//                     className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.password && 'input-error'}`}
//                     {...register('ConformPassword')}
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
//                   >
//                     {showPassword ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 {errors.ConformPassword?.message && <p className="text-error">{errors.ConformPassword?.message}</p>}
//               </div>

//               {/* buttoons */}
//               <div className="form-control mt-6 flex justify-center">
//                 <button
//                   type="submit"
//                   className={`border-none font-changa text-xl w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#7c0bed] via-[#d9e8f8] via-indigo to-[#ec76b3] ${loading ? 'loading' : ''}`}
//                   disabled={loading}
//                 >
//                   {loading ? 'Signing Up...' : 'Sign Up'}
//                 </button>
//               </div>
//               {/* login redirectory */}
//               <div className="form-control flex mt-7 justify-center text-center">
//                 <span className="text-black font-changa">
//                   <NavLink to="/login" className="link link-hover opacity-80">
//                     Already have an account?
//                   </NavLink>
//                 </span>
//               </div>

//             </form>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Signup;

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
import Particles from "@/components/magicui/particles";
import { cn } from "@/lib/utils";

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
      {/* Background Particles */}
      <Particles />

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              {/* <TypingAnimation
                className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                text={["Join the Hunt", "Create Account", "Start Coding"]}
                loop={true}
              /> */}
              <p className="mt-2 text-sm text-white/70">
                Begin your coding journey today
              </p>
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