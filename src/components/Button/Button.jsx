/** @format */

import React, { memo, useState } from "react";
import { twMerge } from "tailwind-merge";
const Button = ({
  dropdown = false,
  listWarning,
  children,
  style,
  handleOnclick,
  icon,
  disable = false,
  type = "button",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative" onClick={() => setShowDropdown((prev) => !prev)}>
      <div
        onClick={() => {
          handleOnclick && handleOnclick();
        }}
        className={twMerge(
          ` cursor-pointer flex text-white items-center gap-[6px] bg-[#1677ff] font-main border-[#d9d9d9] border-solid border-[1px] focus:ring-blue-300  rounded-lg text-sm px-3 py-2  focus:outline-none ${style} ${
            disable && "bg-white text-gray-300"
          }`
        )}
      >
        {icon && <span>{icon}</span>}
        <button disabled={disable} type={type}>
          {children}
        </button>
      </div>
      {dropdown && showDropdown && (
        <div className="z-10 absolute top-[100%] mt-1 left-[50%] translate-x-[-50%] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
          <ul className="py-2 text-sm text-gray-700 ">
            {listWarning &&
              listWarning.length > 0 &&
              listWarning.map((el, index) => (
                <li key={index} className="block px-4 py-2 hover:bg-gray-100">
                  {el.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(Button);
