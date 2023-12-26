/** @format */

import { FaRegRegistered } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  // check email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^@]+@eaut\.edu\.vn$/;
    return emailRegex.test(email)
      ? ""
      : "You must enter the email provided by the school.";
  };

  // check student Code
  const [studentCode, setStudentCode] = useState("");
  const [studentCodeError, setStudentCodeError] = useState("");
  const validateStudentCode = (studentCode) => {
    const studentCodeRegex = /^[0-9]{8}$/;
    return studentCodeRegex.test(studentCode)
      ? ""
      : "Student code consists of 8 digits.";
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

  // check confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <FaRegRegistered className="w-8 h-8 mr-2" alt="Register" />
            Register an account
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="fullname"
                    name="fullname"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="First and last name"
                    required
                    onChange={(e) => {
                      setStudentCode(e.target.value);
                      setStudentCodeError(validateStudentCode(e.target.value));
                    }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
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
                  <input
                    type="text"
                    name="Usename"
                    id="Usename"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Usename"
                    required
                    onChange={(e) => {
                      setStudentCode(e.target.value);
                      setStudentCodeError(validateStudentCode(e.target.value));
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="student-code"
                    id="student-code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Student code"
                    required
                    onChange={(e) => {
                      setStudentCode(e.target.value);
                      setStudentCodeError(validateStudentCode(e.target.value));
                    }}
                  />
                  <div className="mt-2">
                    {studentCodeError && (
                      <span className="text-red-500 text-xs italic">
                        {studentCodeError}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
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
                <div>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError(
                        password !== e.target.value
                          ? "Passwords do not match."
                          : ""
                      );
                    }}
                  />
                  <div className="mt-2">
                    {confirmPasswordError && (
                      <span className="text-red-500 text-xs italic">
                        {confirmPasswordError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#1678ff] w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  {/* <a
                    href=""
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a> */}
                  <Link
                    to="/Login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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

export default Register;
