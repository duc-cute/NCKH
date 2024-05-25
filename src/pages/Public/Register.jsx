/** @format */

import { FaRegRegistered } from "react-icons/fa";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputField } from "../../components";
import { validate } from "../../ultils/helper";
import { apiRegister } from "../../apis";
import swal from "sweetalert2";
import path from "../../ultils/path";
const Register = () => {
  const [invalid, setInvalid] = useState([]);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    username: "",
  });
  const handleSubmit = useCallback(async () => {
    const invalid = validate(payload, setInvalid);
    if (invalid == 0) {
      const { email, password, fullname, username } = payload;
      const response = await apiRegister({
        Email: email,
        Password: password,
        FullName: fullname,
        UserName: username,
      });
      console.log("res", response);
      if (response.status === 200) {
        navigate(`/${path.LOGIN}`);
      } else swal.fire("Oops!", "Some things went wrong", "error");
    }
  });

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center">
        <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto  lg:py-0 w-full">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <FaRegRegistered className="w-8 h-8 mr-2" alt="Register" />
            Register an account
          </a>
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="px-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <div className="space-y-2 md:space-y-4" action="#">
                <InputField
                  nameKey="fullname"
                  placeholder="Full Name"
                  value={payload.fullname}
                  onChange={(e) =>
                    setPayload({ ...payload, fullname: e.target.value })
                  }
                  inValid={invalid}
                  setInvalid={setInvalid}
                  label="Full Name"
                />
                <InputField
                  nameKey="email"
                  placeholder="Email"
                  value={payload.email}
                  onChange={(e) =>
                    setPayload({ ...payload, email: e.target.value })
                  }
                  inValid={invalid}
                  setInvalid={setInvalid}
                  label="Email"
                />
                <InputField
                  nameKey="username"
                  placeholder="username"
                  value={payload.username}
                  onChange={(e) =>
                    setPayload({ ...payload, username: e.target.value })
                  }
                  inValid={invalid}
                  setInvalid={setInvalid}
                  label="User Name"
                />
                <InputField
                  nameKey="password"
                  placeholder="Password"
                  value={payload.password}
                  onChange={(e) =>
                    setPayload({ ...payload, password: e.target.value })
                  }
                  inValid={invalid}
                  setInvalid={setInvalid}
                  label="Password"
                  type="password"
                />
                <InputField
                  nameKey="confirmPassword"
                  placeholder="Confirm Password"
                  value={payload.confirmPassword}
                  onChange={(e) =>
                    setPayload({ ...payload, confirmPassword: e.target.value })
                  }
                  inValid={invalid}
                  setInvalid={setInvalid}
                  label="Confirm Password"
                  type="password"
                />
                <Button
                  handleOnclick={handleSubmit}
                  style="flex justify-center  bg-[#1678ff] w-full capitalize text-white"
                >
                  Create an account
                </Button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/Login"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
