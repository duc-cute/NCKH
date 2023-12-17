/** @format */

import React, { memo } from "react";
import Button from "../Button/Button";

const Modal = ({ children, title, show, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div
        tabIndex="-1"
        className={`${
          show ? "" : "hidden"
        } font-lato overflow-y-auto overflow-x-hidden fixed bg-overlay   top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-solid border-[#e5e7eb] rounded-t ">
              <div className="text-xl font-semibold text-gray-900 ">
                {title}
              </div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => setShow(false)}
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
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-5">{children}</div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <Button handleOnclick={handleClose}>Save</Button>
              <Button style={"bg-white ml-2 py-2"} handleOnclick={handleClose}>
                Cancle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
