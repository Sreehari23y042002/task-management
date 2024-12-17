// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import Cookies from "js-cookie";
// import axiosInstance from "../utils/axiosInstance";

// export const LoginPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setIsLogin } = useAuth();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const { register, handleSubmit, formState: { errors } } = form;
//   const regex = /USER/i;
//   const baseURL = '';

//   const signIn = async (data: any) => {
//     setIsLoading(true);
//     setIsLogin(true);
//     localStorage.setItem('username',data.email)

//   // const res=  await axios.post(`http://localhost:3001/api/auth/signin`, {
//   //     email: data.email,
//   //     password: data.password,
//   //   });

//   const res=  await  axiosInstance.post(`/api/auth/signin`, {
//     email: data.email,
//     password: data.password,
//   });
//     Cookies.set('access_token', res.data.accessToken);

//     console.log(res,'res');

//       toast.success("Login Successfully", {
//         autoClose: 3000,
//         style: {
//           backgroundColor: "#fff", // Custom success color (white in this case)
//           color: "#004164", // Custom text color
//           fontSize: "12px",
//         },
//       });
//       navigate('/dashboard')

//   };

//   const [isShown, setIsShown] = useState(false);

//   return (
//     <div className="font-[sans-serif] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-gray-800">
//       <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
//         <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
//           <div>
//             <a>
//               <img src="https://readymadeui.com/readymadeui-white.svg" alt="logo" className="w-52 mb-12 inline-block" />
//             </a>
//             <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">Seamless Login for Exclusive Access</h2>
//             <p className="text-sm mt-6 text-white">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
//             <p className="text-sm mt-6 text-white">Don't have an account <a className="text-white font-semibold underline ml-1" onClick={()=> navigate('/register')}>Register here</a></p>
//           </div>

//           <form className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full" onSubmit={handleSubmit(signIn)}>
//             <h3 className="text-3xl font-extrabold mb-12">Sign in</h3>

//             {/* Email Input */}
//             <div className="bg-gray-1100 rounded">
//               <div className="relative w-full">
//                 <input
//                   type="email"
//                   id="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                       message: "Please enter a valid email",
//                     },
//                   })}
//                   placeholder=" "
//                   className={`peer block w-full appearance-none bg-transparent p-3 pt-[35px] pl-4 pb-2 text-sm text-basic outline-none rounded ${errors?.email && "border border-red-500 bg-red-100"}`}
//                 />
//                 <label htmlFor="email" className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}>
//                   Email
//                 </label>
//               </div>
//             </div>
//             {errors.email && <p className="text-red-500 text-sm lg:text-left text-center">{errors.email.message}</p>}

//             {/* Password Input */}
//             <div className={`flex w-full bg-gray-1100 rounded ${errors?.password && "border border-red-500"}`}>
//               <div className="flex relative w-2/3">
//                 <input
//                   type={isShown ? "text" : "password"}
//                   id="password"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters long",
//                     },
//                   })}
//                   placeholder=" "
//                   className="peer block w-full appearance-none bg-transparent p-3 pt-[35px] pl-4 pb-2 text-sm text-basic outline-none rounded"
//                 />
//                 <label htmlFor="password" className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}>
//                   Password
//                 </label>
//               </div>
//               <div className="flex relative w-1/3 justify-end">
//                 <button type="button" onClick={() => setIsShown((prev) => !prev)}>
//                   {isShown ? <IoEye className="text-blue-1100 text-lg mr-4" /> : <IoEyeOff className="text-blue-1100 text-lg mr-4" />}
//                 </button>
//               </div>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm lg:text-left text-center">{errors.password.message}</p>}

//             {/* Forgot Password Link */}
//             <div className="text-sm text-right">
//               <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline">Forgot your password?</a>
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none">
//                 Log in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };


import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";
import axiosInstance from "../utils/axiosInstance";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const { setIsLogin } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;
  const [isShown, setIsShown] = useState(false);

  const signIn = async (data: any) => {
    setIsLoading(true);
    // setIsLogin(true);
    localStorage.setItem("username", data.email);

    try {
      const res = await axiosInstance.post(`/api/auth/signin`, {
        email: data.email,
        password: data.password,
      });

      Cookies.set("accessToken", res.data.accessToken);
      Cookies.set('role', res.data.roles)
      Cookies.set('userData',JSON.stringify(res.data))
      toast.success("Login Successfully", {
        autoClose: 3000,
        style: {
          backgroundColor: "#fff",
          color: "#004164",
          fontSize: "12px",
        },
      });

      navigate("/dashboard");

    } catch (error) {
      toast.error("Failed to login. Please check your credentials.", {
        autoClose: 3000,
        style: {
          backgroundColor: "#fff",
          color: "#FF0000",
          fontSize: "12px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] bg-[#639C8B] text-gray-800">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <a>
              <img src="https://tse4.mm.bing.net/th?id=OIP.m-RCaSbIlbJicCiu-f1KcwHaB2&pid=Api&P=0&h=180g" alt="logo" className="w-52 mb-12 inline-block" />
            </a>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">Seamless Login for Exclusive Access</h2>
            <p className="text-sm mt-6 text-white">
              Log in to your world of amazing experiences!.
            </p>
            <p className="text-sm mt-6 text-white">
              Don't have an account{" "}
              <a className="text-white font-semibold underline ml-1 cursor-pointer" onClick={() => navigate("/register")}>
                Register here
              </a>
            </p>
          </div>

          <form className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full" onSubmit={handleSubmit(signIn)}>
            <h3 className="text-3xl font-extrabold mb-12">Sign in</h3>

            {/* Email Input */}
            <div className="bg-gray-1100 rounded">
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  placeholder=" "
                  className={`peer block w-full appearance-none bg-transparent p-3 pt-[35px] pl-4 pb-2 text-sm text-basic outline-none rounded ${errors?.email && "border border-red-500 bg-red-100"}`}
                />
                <label
                  htmlFor="email"
                  className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}
                >
                  Email
                </label>
              </div>
            </div>
            {errors.email && <p className="text-red-500 text-sm lg:text-left text-center">{errors.email.message}</p>}

            {/* Password Input */}
            <div className={`flex w-full bg-gray-1100 rounded ${errors?.password && "border border-red-500"}`}>
              <div className="flex relative w-2/3">
                <input
                  type={isShown ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  placeholder=" "
                  className="peer block w-full appearance-none bg-transparent p-3 pt-[35px] pl-4 pb-2 text-sm text-basic outline-none rounded"
                />
                <label
                  htmlFor="password"
                  className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}
                >
                  Password
                </label>
              </div>
              <div className="flex relative w-1/3 justify-end">
                <button type="button" onClick={() => setIsShown((prev) => !prev)}>
                  {isShown ? <IoEye className="text-blue-1100 text-lg mr-4" /> : <IoEyeOff className="text-blue-1100 text-lg mr-4" />}
                </button>
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm lg:text-left text-center">{errors.password.message}</p>}

            {/* Forgot Password Link */}
            <div className="text-sm text-right">
              <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline">
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
