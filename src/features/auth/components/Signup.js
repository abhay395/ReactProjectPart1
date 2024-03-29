import { Link, Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../AuthSlice";
import { useForm } from "react-hook-form";
import { createUserAsync, selectLoggedInUser } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  //  console.log(errors)
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  // console.log(user?user:'hello')
  const onSubmit = (data) => {
    dispatch(
      createUserAsync({
        email: data.email,
        password: data.password,
        addresses: [],
        role:'user'// todo: this role given by backend
      })
    );
    console.log(data);
  };
  return (
    <section className="relative py-4 lg:py-11 font-poppins h-screen flex">
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="max-w-6xl px-1 mx-auto lg:px-6 flex ">
        <div className="flex flex-wrap items-center ">
          <div className="w-full lg:w-2/5">
            <div className="bg-white shadow-lg dark:bg-gray-900 p-11 ">
              <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center mb-7">
                  <span className="inline-block mb-3 font-semibold text-base text-cyan-500">
                    Signup
                  </span>
                  <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                    Join our community
                  </h2>
                </div>
                <div className="relative flex flex-wrap mb-5">
                  <input
                    type="text"
                    id="Full-Name"
                    className="relative w-full py-4 pl-4 mb-2 text-sm border rounded dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 md:mb-0"
                    placeholder="e.g:info@gmail.com"
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                  />
                  {errors.fullName?.type === "required" && (
                    <p role="alert" className="text-red-700">
                      full name is required
                    </p>
                  )}
                  <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-800">
                    Full Name
                  </span>
                </div>
                <div className="relative flex flex-wrap mb-5">
                  <input
                    type="email"
                    id="Email"
                    className="relative w-full py-4 pl-4 mb-2 text-sm border rounded dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 md:mb-0"
                    placeholder="e.g:info@gmail.com"
                    {...register("email", {
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@gmail.com$/,
                        message: "please add @ and gmail.com",
                      },
                      required: "email is required",
                    })}
                  />
                  {errors.email && (
                    <p role="alert" className="text-red-700">
                      {errors.email.message}
                    </p>
                  )}

                  <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-800">
                    Email address
                  </span>
                </div>
                <div className="relative flex flex-wrap items-center mb-5">
                  <input
                    type="text"
                    id="Password"
                    className="relative w-full py-4 pl-4 mb-2 text-sm border rounded dark:text-gray-300 dark:border-gray-800 md:mb-0 dark:bg-gray-700"
                    placeholder="your password..."
                    {...register("password", {
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
                        message: `passsword not valid please add one Uppercase character\n and   special character like @,!,# and number eg:Ak@454`,
                      },
                      required: "password is required",
                    })}
                  />
                  {/* {errors.password?.type === "required" && (
                    <p role="alert" className="text-red-600">
                      password is required
                    </p>
                  )} */}
                  {errors.password && (
                    <p role="alert" className="text-red-700">
                      {errors.password.message}{" "}
                    </p>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="absolute right-0 mr-3 dark:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
                  </svg>
                  <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-800">
                    Password
                  </span>
                </div>
                <div className="relative flex flex-wrap items-center mb-5">
                  <input
                    type="password"
                    id="Conferm-Password"
                    className="relative w-full py-4 pl-4 mb-2 text-sm border rounded dark:text-gray-300 dark:border-gray-800 md:mb-0 dark:bg-gray-700"
                    placeholder="conferm password..."
                    {...register("confermpassword", {
                      validate: (value, formValues) =>
                        value === formValues.password || "Password not match",
                    })}
                    onClick={() => {
                      reset(errors);
                    }}
                  />
                  {errors.confermpassword && (
                    <p role="alert" className="text-red-600">
                      {errors.confermpassword.message}
                    </p>
                  )}
                  {/* {errors.password && (
                    <p role="alert" className="text-red-700">
                      {errors.password.message}{" "}
                    </p>
                  )} */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="absolute right-0 mr-3 dark:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
                  </svg>
                  <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-800">
                    Conferm password
                  </span>
                </div>
                <button
                  className="w-full px-4 py-4 mb-4 font-semibold text-base text-gray-200 bg-cyan-500 rounded dark:bg-cyan-500 hover:text-cyan-200 "
                  type="submit"
                >
                  SIGNUP
                </button>
                <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                  {" "}
                  Already have a account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-base text-cyan-500 hover:text-cyan-700 dark:text-cyan-300 dark:hover:text-cyan-400"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="hidden w-full px-10 mb-16 lg:w-1/2 lg:mb-0 lg:block">
            <div className="text-center">
              <span className="text-2xl font-medium text-cyan-600 dark:text-cyan-400">
                Welcome
              </span>
              <h2 className="mt-3 mb-6 text-4xl font-bold text-gray-800 dark:text-gray-400">
                Join our community with your login credentials
              </h2>
              <p className="text-lg text-gray-500 dark:text-cyan-400">
                Lorem ipsum dor amet set amirospis{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
