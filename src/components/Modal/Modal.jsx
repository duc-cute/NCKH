/** @format */

import React, { memo } from "react";
import Button from "../Button/Button";

const Modal = ({
  children,
  title,
  show,
  setShow,
  textOk,
  disableOkBtn,
  onClickBtnOk,
  onClickBtnCancel,
  showSaveBtn = true,
}) => {
  return (
    <>
      <div
        className={`${
          show ? "" : "hidden"
        } font-lato  h-screen   bg-overlay inset-0 z-50 fixed justify-center items-center flex`}
      >
        <div className=" flex items-center justify-center min-w-[60%] max-w-[80%] h-[95%] ">
          <div className=" w-full relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4  border-b border-solid border-[#e5e7eb] rounded-t ">
              <div className="text-xl font-semibold text-gray-900 font-main">
                {title}
              </div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={onClickBtnCancel}
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
            <div className="py-3 px-4">{children}</div>
            <div className="flex justify-end items-center px-4 pb-4 gap-2  border-t border-gray-200 rounded-b ">
              <Button
                style={"bg-white text-gray-900 "}
                handleOnclick={onClickBtnCancel}
              >
                Cancle
              </Button>
              {showSaveBtn && (
                <Button disable={disableOkBtn} handleOnclick={onClickBtnOk}>
                  {textOk || "Save"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
