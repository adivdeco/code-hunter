import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import {loginUser} from "../authSlice"
import { useEffect,useState } from 'react';




// const [showPassword,setShowPassword] = useState()

const schema = z.object({
    email: z.string().email({message: "invalid email"}).min(1,{message: "email is required"}),
    password: z.string().min(6,{message: "password must be at least 6 characters long"}),
   
    });



function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

// console.log(error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: zodResolver(schema)});    

    useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);


  const onSubmit = (data) => {
    dispatch(loginUser(data));
    console.log(error);
    
  // if (error) {
  //   {error ? (alert("user unauthoeized ",error))  :null}
  // }
    
  };


  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-96 bg-gray-700 shadow-2xl">
        <div className="card-body">
        <h1 className="card-title justify-center text-3xl mask-radial-from-neutral-950 font-mono">WOW C0DE</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

      {/* email */}
      <div className="form-control mt-4">
       <label className=" label mb-1">
         <span className="label-text">Email</span>
       </label>

    <input type="email"
      className={`input input-bordered ${errors.email && 'input-error'}`} 
      placeholder="adiv@gmail.com"
      
      {...register('email', { required: true })}
      />
      {errors.email?.message && <span className="text-error">{errors.email?.message}</span>}
     </div>

{/* password */}
     <div className="form-control mt-4">
       <label className="label mb-1">
           <span className="label-text">Password</span>
       </label>
   <div className="relative">
      <input 
      type= {showPassword ? "text" : "password"} 
      className={`input input-bordered ${errors.password && 'input-error'}`} 
      placeholder="••••••" 
      {...register('password')}
      />
              <button
                  type="button"
                  className="absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
      </div>
         {errors.password?.message && <p className="text-error">{errors.password?.message}</p>}
     </div>


   {/* buttons */}

          <div className="form-control mt-8 flex justify-center">
              <button type="submit" 
              // className="btn btn-primary w-full"
              className={`btn btn-primary ${loading ? 'loading btn-disabled' : ''}`} 
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
          <div className="form-control mt-5 flex justify-center">
              <span className=" link link-hover">
                Forget Password?
              </span>
          </div>  
          <div className="form-control flex justify-center">
              <span  className="link link-hover mt-3" >
               <NavLink to={"/signup"} >
                Don't have an account?
                </NavLink>
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