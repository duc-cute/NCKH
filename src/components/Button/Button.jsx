/** @format */

import React, { memo } from "react";

const Button = ({ children, style, handleOnclick, icon }) => {
  return (
    <div
      onClick={() => handleOnclick && handleOnclick()}
      className={`caption-top cursor-pointer flex items-center gap-[6px] bg-[#1677ff] font-main border-[#d9d9d9] border-solid border-[1px] focus:ring-blue-300  rounded-lg text-sm px-4 py-2.5  focus:outline-none ${
        style ? style : "text-white"
      } 
      `}
    >
      <span className={`${icon ? "" : ""}`}>{icon && icon}</span>
      <button type="button">{children}</button>
    </div>
  );
};

export default memo(Button);
