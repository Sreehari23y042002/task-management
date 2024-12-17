import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/ui/customInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";



const UserFormUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: '',
      lastname: '',
      role: '', 
    },
  });
  const { t }: { t: (key: keyof typeof import('../locales/en/translation.json')) => string } = useTranslation();

  const { register, handleSubmit, formState: { errors }, control, setValue, reset } = form;

  const signIn = async (data: any) => {
    setIsLoading(true);
    navigate('/dashboard');
    localStorage.setItem('username', data.email)
    try {
      const res = await axios.post(`http://localhost:3001/api/auth/signup`, {
        username: data.name,
        // lastname: data.lastname,
        email: data.email,
        password: data.password,
        roles: [data.role]
      });
      reset();  
      toast.success("Data inserted Successfully", {
        autoClose: 3000,
        style: {
          backgroundColor: "#fff", 
          color: "#004164", 
          fontSize: "12px",
        },
      });
    }
    catch (error) {
      console.error('error occurred')
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
    <div className="font-[sans-serif] bg-gray-200 dark:bg-gray-800 text-gray-800">
      <div className="flex fle-col items-center justify-center lg:p-2 p-2">
        <form className="bg-white dark:bg-black rounded-xl px-6 py-8 space-y-6 max-w-full md:ml-auto w-full" onSubmit={handleSubmit(signIn)}>
          <h3 className="text-xl font-semibold mb-12 text-center dark:text-gray-300">{t('user_detail')}</h3>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <CustomInput
                type="text"
                register={register}
                name="name"
                placeholder={t('firstname')}
                validation={{ required: t('name_required') }}
                error={errors.name}
              />
            </div>
            <div className="sm:col-span-3">
              <CustomInput
                register={register}
                name="email"
                type="email"
                placeholder={t('email')}
                validation={{
                  required: t('email_required'),
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: t('valid_email'),
                  },
                }}
                error={errors.email}
              />
            </div>
            <div className="sm:col-span-3">
              <div className={`flex w-full bg-gray-1100 rounded dark:bg-gray-800 dark:text-gray-400 ${errors?.password && "border border-red-500"}`}>
                <div className="flex relative w-2/3">
                  <input
                    type={isShown ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: t('password_required'),
                      minLength: {
                        value: 6,
                        message: t('password_length'),
                      },
                    })}
                    placeholder=" "
                    className="peer block w-full appearance-none bg-transparent p-3 pt-[35px] pl-4 pb-2 text-sm text-basic outline-none rounded"
                  />
                  <label htmlFor="password" className={`absolute top-0 left-4 text-sm text-secondary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-focus:top-0 peer-focus:text-sm mt-3`}>
                    {t('password')}
                  </label>
                </div>
                <div className="flex relative w-1/3 justify-end">
                  <button type="button" onClick={() => setIsShown((prev) => !prev)}>
                    {isShown ? <IoEye className="text-blue-1100 text-lg mr-4" /> : <IoEyeOff className="text-blue-1100 text-lg mr-4" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-xs lg:text-left text-center">{errors.password.message}</p>}
            </div>
            <div className="sm:col-span-3">
              <div className="bg-gray-1100 p-3 rounded sm:col-span-3 dark:bg-gray-800 dark:text-gray-400">
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }} // Add validation rule for the Select
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('role_select')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">{t('manager')}</SelectItem>
                        <SelectItem value="employee">{t('employee')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && <p className="text-red-500 text-xs dark:bg-black">{errors.role.message}</p>}
              </div>
            </div>
          </div>
          <div>
            <Button type="submit" className="shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white focus:outline-none float-right">
              {t('submit')}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UserFormUpload;
