/** @format */

import { IoIosLogIn } from "react-icons/io";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputField } from "../../components";
import { validate } from "../../ultils/helper";
import { apiLogin } from "../../apis";
import path from "../../ultils/path";
import swal from "sweetalert2";
import { login } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const [invalidField, setInvalidField] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleSubMit = useCallback(async () => {
    const { email, password } = payload;
    const invalids = validate(payload, setInvalidField);
    if (invalids === 0) {
      const res = await apiLogin({ Email: email, Password: password });
      if (res?.status === 200) {
        dispatch(
          login({
            isLoggedIn: true,
            token: res.access_token,
            userData: {
              email: res.Email,
              username: res.UserName,
              avatar: res?.Avatar,
              fullname: res.FullName,
              role: res?.role,
            },
          })
        );

        if (res?.role === "Admin" || res?.role === "Lecturers")
          navigate(`/${path.ADMIN}`);
        else if (res?.role === "User") {
          setTimeout(() => {
            navigate(`${path.HOME}`);
          }, 1000);
        }
      } else swal.fire("Oops!", res?.mesage, "error");
    }
  }, [payload]);
  return (
    <>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <IoIosLogIn className="w-8 h-8 mr-2" alt="Register" />
            Sign in to your account
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <form className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Log in
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <InputField
                    nameKey="email"
                    value={payload.email}
                    onChange={(e) =>
                      setPayload({ ...payload, email: e.target.value })
                    }
                    inValid={invalidField}
                    setInvalid={setInvalidField}
                    placeholder="name@eaut.edu.vn"
                    style={"font-lato flex flex-col gap-1"}
                    label="email"
                  />
                </div>
                <div>
                  <InputField
                    nameKey="password"
                    value={payload.password}
                    onChange={(e) =>
                      setPayload({ ...payload, password: e.target.value })
                    }
                    inValid={invalidField}
                    setInvalid={setInvalidField}
                    placeholder="********"
                    style={"font-lato flex flex-col gap-1"}
                    label="password"
                    type="password"
                  />
                </div>
                <Button
                  handleOnclick={handleSubMit}
                  style="flex justify-center  bg-[#1678ff] w-full capitalize text-white "
                >
                  Log in
                </Button>
                <p className=" text-sm font-light  text-gray-500 dark:text-gray-400">
                  You don't have an account yet?{" "}
                  <Link
                    to="/Register"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    register now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
