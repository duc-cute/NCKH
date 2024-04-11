/** @format */

import React, { memo } from "react";
import Button from "../Button/Button";
import { twMerge } from "tailwind-merge";

const Drawer = ({ children, title, style, onClose }) => {
  return (
    <>
      <div className="fixed top-0 font-main right-0 z-40 h-screen  overflow-y-auto transition-transform  bg-white w-[60%] ">
        <div className="px-6 py-4 flex items-center border-solid border-b-[1px]  border-[#0505050f] ">
          <Button
            handleOnclick={() => onClose()}
            style={`text-gray-400   bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline- border border-none items-center justify-center`}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </Button>
          <span className="ml-2 text-[16px] font-bold">{title}</span>
        </div>
        <div className={twMerge(`px-8 py-4 ${style ? style : ""}`)}>
          {children}
        </div>
      </div>
    </>
  );
};

export default memo(Drawer);
