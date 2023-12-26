/** @format */

import { IoIosLogIn } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // check email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^@]+@eaut\.edu\.vn$/;
    return emailRegex.test(email)
      ? ""
      : "You must enter the email provided by the school.";
  };

  // check password
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password)
      ? ""
      : "Password 8 characters or more, including numbers and capital letters.";
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <IoIosLogIn className="w-8 h-8 mr-2" alt="Register" />
            Sign in to your account
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@eaut.edu.vn"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(validateEmail(e.target.value));
                    }}
                  />

                  <div className="mt-2">
                    {emailError && (
                      <span className="text-red-500 text-xs italic">
                        {emailError}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(validatePassword(e.target.value));
                    }}
                  />
                  <div className="mt-2">
                    {passwordError && (
                      <span className="text-red-500 text-xs italic">
                        {passwordError}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#1678ff] w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  You don't have an account yet?{" "}
                  {/* <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    register now
                  </a> */}
                  <Link
                    to="/Register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    register now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      );
    </>
  );
};

export default Login;
