import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
import CustomInput from "../components/ui/customInput";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const { setIsLogin } = useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;
  const regex = /USER/i;
  const baseURL = 'http://localhost:';

  const registers = async (data: any) => {
    setIsLoading(true);
    localStorage.setItem('username', data.email)
    try {
      await axios.post(`http://localhost:3001/api/auth/signup`, {
        username: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Registered Successfully", {
        autoClose: 3000,
        style: {
          backgroundColor: "#fff", // Custom success color (white in this case)
          color: "#004164", // Custom text color
          fontSize: "12px",
        },
      });
      navigate('/')
    }
    catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Email Already exist.", {
        autoClose: 3000,
        style: {
          backgroundColor: "#df000e",
          color: "#fff",
        },
      });
    }


  };

  const [isShown, setIsShown] = useState(false);

  return (
    <div className="font-[sans-serif] bg-[#639C8B] text-gray-800">
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <a>
              <img src="https://tse4.mm.bing.net/th?id=OIP.m-RCaSbIlbJicCiu-f1KcwHaB2&pid=Api&P=0&h=180g" alt="logo" className="w-52 mb-12 inline-block" />
            </a>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">Ready to get started? Create your account and dive in!</h2>
            <p className="text-sm mt-6 text-white">Your new adventure starts here— Sign up to get started!.</p>
          </div>

          <form className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full" onSubmit={handleSubmit(registers)}>
            <h3 className="text-3xl font-extrabold mb-12 cursor-pointer">Register Here</h3>
            <div className="bg-gray-1100 rounded">
              <div className="relative w-full">
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder=" "
                  className={`peer block w-full appearance-none bg-transparent p-3 pt-[35px] pl-4 pb-2 text-sm text-basic outline-none rounded ${errors?.email && "border border-red-500 bg-red-100"}`}
                />
                <label htmlFor="name" className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}>
                  Name
                </label>
              </div>
            </div>
            {errors.name && <p className="text-red-500 text-xs  lg:text-left text-center">{errors.name.message}</p>}
            <div className="bg-gray-1100 rounded">
              <div className="relative w-full">
                <input
                  type="text"
                  id="name"
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
                <label htmlFor="email" className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}>
                  Email
                </label>
              </div>
            </div>
            {errors.email && <p className="text-red-500 text-xs lg:text-left text-center">{errors.email.message}</p>}



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
                <label htmlFor="password" className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}>
                  Password
                </label>
              </div>
              <div className="flex relative w-1/3 justify-end">
                <button type="button" onClick={() => setIsShown((prev) => !prev)}>
                  {isShown ? <IoEye className="text-blue-1100 text-lg mr-4" /> : <IoEyeOff className="text-blue-1100 text-lg mr-4" />}
                </button>
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-xs lg:text-left text-center">{errors.password.message}</p>}
            <div className="text-xs flex justify-end">
              Already Registered?
              <Link to='/' className="text-blue-500 font-bold underline text-xs ml-2 cursor-pointer">Sign Here</Link>
            </div>
            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none">
                Register Here
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
