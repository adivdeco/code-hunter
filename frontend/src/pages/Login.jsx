// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useNavigate } from 'react-router';
// import { loginUser } from "../authSlice"
// import { useEffect, useState } from 'react';
// import { TypingAnimation } from "@/components/magicui/typing-animation";
// import Navbar from "@/components/Navbar";
// import { initSphereAnimation } from "@/utils/sphere-animation"
// import * as anime from 'animejs';
// import "../index.css"

// // const [showPassword, setShowPassword] = useState()

// const schema = z.object({
//   email: z.string().email({ message: "invalid email" }).min(1, { message: "email is required" }),
//   password: z.string().min(6, { message: "password must be at least 6 characters long" }),

// });



// function Login() {

//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   // aimation
//   useEffect(() => {
//     initSphereAnimation();
//   }, []);
//   // end

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(schema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);


//   const onSubmit = (data) => {
//     dispatch(loginUser(data));
//     console.log(error);

//     if (error) {
//       { error ? (alert("user unauthoeized ", error)) : null }
//     }

//   };


//   return (
//     <>
//       <Navbar />

//       <div className="relative min-h-screen flex items-center justify-center p-4 text-white overflow-hidden">

//         {/* 🔴 Animated Background Sphere */}
//         <div className="absolute inset-0 z-0 pointer-events-none">
//           <div className="animation-wrapper">
//             <div className="sphere-animation">
//               {/* ⬇️ Paste your full <svg> content here */}
//               <svg className="sphere" viewBox="0 0 440 440" stroke="rgba(80,80,80,.35)">
//                 <defs>
//                   <linearGradient id="sphereGradient" x1="5%" x2="5%" y1="0%" y2="15%">
//                     <stop stopColor="#373734" offset="0%" />
//                     <stop stopColor="#242423" offset="50%" />
//                     <stop stopColor="#0D0D0C" offset="100%" />
//                   </linearGradient>
//                 </defs>
//                 <path d="M361.604 361.238c-24.407 24.408-51.119 37.27-59.662 28.727-8.542-8.543 4.319-35.255 28.726-59.663 24.408-24.407 51.12-37.269 59.663-28.726 8.542 8.543-4.319 35.255-28.727 59.662z" />
//                 <path d="M360.72 360.354c-35.879 35.88-75.254 54.677-87.946 41.985-12.692-12.692 6.105-52.067 41.985-87.947 35.879-35.879 75.254-54.676 87.946-41.984 12.692 12.692-6.105 52.067-41.984 87.946z" />
//                 <path d="M357.185 356.819c-44.91 44.91-94.376 68.258-110.485 52.149-16.11-16.11 7.238-65.575 52.149-110.485 44.91-44.91 94.376-68.259 110.485-52.15 16.11 16.11-7.239 65.576-52.149 110.486z" />
//                 <path d="M350.998 350.632c-53.21 53.209-111.579 81.107-130.373 62.313-18.794-18.793 9.105-77.163 62.314-130.372 53.209-53.21 111.579-81.108 130.373-62.314 18.794 18.794-9.105 77.164-62.314 130.373z" />
//                 <path d="M343.043 342.677c-59.8 59.799-125.292 91.26-146.283 70.268-20.99-20.99 10.47-86.483 70.269-146.282 59.799-59.8 125.292-91.26 146.283-70.269 20.99 20.99-10.47 86.484-70.27 146.283z" />
//                 <path d="M334.646 334.28c-65.169 65.169-136.697 99.3-159.762 76.235-23.065-23.066 11.066-94.593 76.235-159.762s136.697-99.3 159.762-76.235c23.065 23.065-11.066 94.593-76.235 159.762z" />
//                 <path d="M324.923 324.557c-69.806 69.806-146.38 106.411-171.031 81.76-24.652-24.652 11.953-101.226 81.759-171.032 69.806-69.806 146.38-106.411 171.031-81.76 24.652 24.653-11.953 101.226-81.759 171.032z" />
//                 <path d="M312.99 312.625c-73.222 73.223-153.555 111.609-179.428 85.736-25.872-25.872 12.514-106.205 85.737-179.428s153.556-111.609 179.429-85.737c25.872 25.873-12.514 106.205-85.737 179.429z" />
//                 <path d="M300.175 299.808c-75.909 75.909-159.11 115.778-185.837 89.052-26.726-26.727 13.143-109.929 89.051-185.837 75.908-75.908 159.11-115.778 185.837-89.051 26.726 26.726-13.143 109.928-89.051 185.836z" />
//                 <path d="M284.707 284.34c-77.617 77.617-162.303 118.773-189.152 91.924-26.848-26.848 14.308-111.534 91.924-189.15C265.096 109.496 349.782 68.34 376.63 95.188c26.849 26.849-14.307 111.535-91.923 189.151z" />
//                 <path d="M269.239 267.989c-78.105 78.104-163.187 119.656-190.035 92.807-26.849-26.848 14.703-111.93 92.807-190.035 78.105-78.104 163.187-119.656 190.035-92.807 26.849 26.848-14.703 111.93-92.807 190.035z" />
//                 <path d="M252.887 252.52C175.27 330.138 90.584 371.294 63.736 344.446 36.887 317.596 78.043 232.91 155.66 155.293 233.276 77.677 317.962 36.521 344.81 63.37c26.85 26.848-14.307 111.534-91.923 189.15z" />
//                 <path d="M236.977 236.61C161.069 312.52 77.867 352.389 51.14 325.663c-26.726-26.727 13.143-109.928 89.052-185.837 75.908-75.908 159.11-115.777 185.836-89.05 26.727 26.726-13.143 109.928-89.051 185.836z" />
//                 <path d="M221.067 220.7C147.844 293.925 67.51 332.31 41.639 306.439c-25.873-25.873 12.513-106.206 85.736-179.429C200.6 53.786 280.931 15.4 306.804 41.272c25.872 25.873-12.514 106.206-85.737 179.429z" />
//                 <path d="M205.157 204.79c-69.806 69.807-146.38 106.412-171.031 81.76-24.652-24.652 11.953-101.225 81.759-171.031 69.806-69.807 146.38-106.411 171.031-81.76 24.652 24.652-11.953 101.226-81.759 171.032z" />
//                 <path d="M189.247 188.881c-65.169 65.169-136.696 99.3-159.762 76.235-23.065-23.065 11.066-94.593 76.235-159.762s136.697-99.3 159.762-76.235c23.065 23.065-11.066 94.593-76.235 159.762z" />
//                 <path d="M173.337 172.971c-59.799 59.8-125.292 91.26-146.282 70.269-20.991-20.99 10.47-86.484 70.268-146.283 59.8-59.799 125.292-91.26 146.283-70.269 20.99 20.991-10.47 86.484-70.269 146.283z" />
//                 <path d="M157.427 157.061c-53.209 53.21-111.578 81.108-130.372 62.314-18.794-18.794 9.104-77.164 62.313-130.373 53.21-53.209 111.58-81.108 130.373-62.314 18.794 18.794-9.105 77.164-62.314 130.373z" />
//                 <path d="M141.517 141.151c-44.91 44.91-94.376 68.259-110.485 52.15-16.11-16.11 7.239-65.576 52.15-110.486 44.91-44.91 94.375-68.258 110.485-52.15 16.109 16.11-7.24 65.576-52.15 110.486z" />
//                 <path d="M125.608 125.241c-35.88 35.88-75.255 54.677-87.947 41.985-12.692-12.692 6.105-52.067 41.985-87.947C115.525 43.4 154.9 24.603 167.592 37.295c12.692 12.692-6.105 52.067-41.984 87.946z" />
//                 <path d="M109.698 109.332c-24.408 24.407-51.12 37.268-59.663 28.726-8.542-8.543 4.319-35.255 28.727-59.662 24.407-24.408 51.12-37.27 59.662-28.727 8.543 8.543-4.319 35.255-28.726 59.663z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* 🔵 Login Card */}
//         <div className="relative z-10 card w-4/12 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
//           {/* ...your form and content... */}
//           <div className="card-body">
//             <div className="card-body">
//               <h1 className="card-title justify-center font-chango"><TypingAnimation className={"text-black"} >
//                 Lets  Hunt
//               </TypingAnimation></h1>

//               <form onSubmit={handleSubmit(onSubmit)}>

//                 {/* email */}
//                 <div className="form-control mt-4">
//                   <label className=" label scroll-mb-0">
//                     <span className="text-black font-changa">Email</span>
//                   </label>

//                   <input type="email"
//                     className={` border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#454243] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.email && 'input-error'}`}
//                     placeholder="hunter@gmail.com "

//                     {...register('email', { required: true })}
//                   />
//                   {errors.email?.message && <span className="text-error">{errors.email?.message}</span>}
//                 </div>

//                 {/* password */}
//                 <div className="form-control mt-5">
//                   <label className="label scroll-mb-0">
//                     <span className="text-black font-changa">Password</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#454243] via-[#9062bf] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.password && 'input-error'}`}
//                       placeholder="••••••"
//                       {...register('password')}
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                       onClick={() => setShowPassword(!showPassword)}
//                       aria-label={showPassword ? "Hide password" : "Show password"}
//                     >
//                       {showPassword ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                         </svg>
//                       ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                   {errors.password?.message && <p className="text-error">{errors.password?.message}</p>}
//                 </div>


//                 {/* buttons */}

//                 <div className="form-control mt-16 flex justify-center">
//                   <button type="submit"
//                     // className="btn btn-primary w-full"
//                     className={`border-none font-changa text-xl w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#454243] via-[#7c0bed] via-[#d9e8f8] via-indigo to-[#ec76b3] ${loading ? 'loading btn-disabled' : ''}`}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="loading loading-spinner"></span>
//                         Logging in...
//                       </>
//                     ) : 'Login'}
//                   </button>
//                 </div>
//                 <div className="form-control mt-10 flex justify-center text-center">
//                   <span className=" link link-hover font-changa text-black">
//                     Forget Password?
//                   </span>
//                 </div>
//                 <div className="form-control flex justify-center text-center">
//                   <span className="link link-hover mt-3 font-changa text-black" >
//                     <NavLink to={"/signup"} >
//                       Don't have an account?
//                     </NavLink>
//                   </span>
//                 </div>

//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>

//   );
// }

// export default Login;

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Navbar from "@/components/Navbar";
import { initSphereAnimation } from "@/utils/sphere-animation";
import "../index.css";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    initSphereAnimation();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    if (error) {
      alert("User unauthorized: " + error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex items-center justify-center p-4 text-white overflow-hidden">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="animation-wrapper">
            <div className="sphere-animation">
              {/* Include your SVG here */}
            </div>
          </div>
        </div>

        <div className="relative z-10 card w-4/12 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
          <div className="card-body">
            <h1 className="card-title justify-center font-chango">
              <TypingAnimation className="text-black">Let's Hunt</TypingAnimation>
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="text-black font-changa">Email</span>
                </label>
                <input
                  type="email"
                  className={`border-none w-full py-2 px-3 rounded-2xl bg-gradient-to-br from-[#454243] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.email && 'input-error'}`}
                  placeholder="hunter@gmail.com"
                  {...register('email')}
                />
                {errors.email?.message && <span className="text-error">{errors.email.message}</span>}
              </div>

              {/* Password */}
              <div className="form-control mt-5">
                <label className="label">
                  <span className="text-black font-changa">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`border-none w-full py-2 px-3 rounded-2xl bg-gradient-to-br from-[#454243] via-[#9062bf] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.password && 'input-error'}`}
                    placeholder="••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {/* Eye icons */}
                  </button>
                </div>
                {errors.password?.message && <p className="text-error">{errors.password.message}</p>}
              </div>

              {/* Submit */}
              <div className="form-control mt-16 flex justify-center">
                <button
                  type="submit"
                  className={`border-none font-changa text-xl w-full py-2 px-3 rounded-2xl bg-gradient-to-br from-[#454243] via-[#7c0bed] via-[#d9e8f8] via-indigo to-[#ec76b3] ${loading ? 'loading btn-disabled' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Logging in...
                    </>
                  ) : 'Login'}
                </button>
              </div>

              <div className="form-control mt-10 flex justify-center text-center">
                <span className="link link-hover font-changa text-black">Forget Password?</span>
              </div>
              <div className="form-control flex justify-center text-center">
                <span className="link link-hover mt-3 font-changa text-black">
                  <NavLink to="/signup">Don't have an account?</NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
