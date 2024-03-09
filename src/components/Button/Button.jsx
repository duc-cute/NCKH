/** @format */

import React, { memo } from "react";
import { twMerge } from "tailwind-merge";
const Button = ({ children, style, handleOnclick, icon, disable = false }) => {
  return (
    <div
      onClick={() => handleOnclick && handleOnclick()}
      className={twMerge(
        ` cursor-pointer flex text-white items-center gap-[6px] bg-[#1677ff] font-main border-[#d9d9d9] border-solid border-[1px] focus:ring-blue-300  rounded-lg text-sm px-3 py-2  focus:outline-none ${style} ${
          disable && "bg-white text-gray-300"
        }`
      )}
    >
      {icon && <span>{icon}</span>}
      <button disabled={disable} type="button">
        {children}
      </button>
    </div>
  );
};

export default memo(Button);
