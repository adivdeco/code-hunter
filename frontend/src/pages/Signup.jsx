import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice'
import { useEffect, useState } from 'react';
import { TypingAnimation } from "@/components/magicui/typing-animation";


const schema = z.object({
  name: z.string().min(3, { message: "name must be at least 3 characters long" }),
  email: z.string().email({ message: "invalid email" }).min(1, { message: "email is required" }),
  password: z.string().min(6, { message: "password must be at least 6 characters long" }),
  ConformPassword: z.string().min(6, { message: "confirm password must be same as password" })
}).superRefine((data, ctx) => {
  if (data.password !== data.ConformPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['ConformPassword'],
      message: "password do not match",
    })
  }
});



function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  console.log(isAuthenticated, error);

  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(schema) });  //useform hook

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };


  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center p-4 text-white ">
        <div className="card w-4/12  bg-gradient-to-br from-[#e8bad1] via-[#bf88f2] via-[#a3cbf5] via-indigo to-[#f3f2f2] shadow-2xl">
          <div className="card-body">
            <h1 className="card-title justify-center font-chango text-3xl"><TypingAnimation className={"text-black"} >
              Lets  Hunt
            </TypingAnimation></h1>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* name */}
              <div className="form-control">
                <label className="label -scroll-mb-0"><span className="text-black font-changa">Name</span></label>
                <input type="text" placeholder="adiv" className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.name && 'input-error'}`} {...register('name')} />
                {errors.name?.message && <p className="text-error">{errors.name?.message}</p>}
              </div>

              {/* email */}
              <div className="form-control mt-4">
                <label className=" label scroll-mb-0">
                  <span className="text-black font-changa">Email</span>
                </label>
                <input type="email"
                  className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.email && 'input-error'}`}
                  placeholder="adiv@example.com"
                  {...register('email', { required: true })}
                />
                {errors.email?.message && <span className="text-error">{errors.email?.message}</span>}
              </div>

              {/* password */}
              <div className="form-control mt-4">
                <label className="label -scroll-mb-0">
                  <span className="text-black font-changa">Password</span>
                </label>
                <div className="relative">
                  <input
                    // type="password" 
                    type={showPassword ? "text" : "password"}
                    className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.password && 'input-error'}`}
                    placeholder="••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password?.message && <p className="text-error">{errors.password?.message}</p>}
              </div>
              {/* conf.Password */}
              <div className="form-control mt-4">
                <label className="label -scroll-mb-0">
                  <span className="text-black font-changa">Conform Password</span>
                </label>
                <div className="relative">
                  <input
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className={`border-none w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#9968c9] via-[#d9e8f8] via-indigo to-[#e3bed1] ${errors.password && 'input-error'}`}
                    {...register('ConformPassword')}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.ConformPassword?.message && <p className="text-error">{errors.ConformPassword?.message}</p>}
              </div>

              {/* buttoons */}
              <div className="form-control mt-6 flex justify-center">
                <button
                  type="submit"
                  className={`border-none font-changa text-xl w-12/12 py-2 px-3 rounded-2xl bg-gradient-to-br from-[#f475b4] via-[#7c0bed] via-[#d9e8f8] via-indigo to-[#ec76b3] ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
              {/* login redirectory */}
              <div className="form-control flex mt-7 justify-center text-center">
                <span className="text-black font-changa">
                  <NavLink to="/login" className="link link-hover opacity-80">
                    Already have an account?
                  </NavLink>
                </span>
              </div>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;

