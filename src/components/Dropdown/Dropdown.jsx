import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { logout } from "../../redux/user/userSlice";
import path from "../../ultils/path";

const Dropdown = ({ show, setShow, listDrop }) => {
  const dispatch = useDispatch();
  // const { logout } = useSelector((state) => state.user);
  const { current, isLoggedIn } = useSelector((state) => state.user);

  return (
    <div
      className={twMerge(
        `z-10 ${
          show ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `
      )}
    >
      <ul className="py-2 text-sm text-gray-700 ">
        {current?.role === "User" &&
          listDrop?.map((item, ind) => (
            <Link key={ind} to={`${item?.path}`}>
              <li className="block px-4 py-2 hover:bg-gray-100 ">
                {item?.title}
              </li>
            </Link>
          ))}
        <li
          className="block px-4 py-2 hover:bg-gray-100 "
          onClick={() => dispatch(logout())}
        >
          <Link to={`/${path.LOGIN}`}>Sign out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
