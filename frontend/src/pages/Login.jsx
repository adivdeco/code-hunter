

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Navbar from "@/components/Navbar";
// import { initSphereAnimation } from "@/utils/sphere-animation";
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

  // useEffect(() => {
  //   initSphereAnimation();
  // }, []);

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
        {/* 
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="animation-wrapper">
            <div className="sphere-animation">
//add svg

            </div>
          </div>
        </div> */}

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
