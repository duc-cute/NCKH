/** @format */

import React, { memo } from "react";
import { twMerge } from "tailwind-merge";

const InputForm = ({
  label,
  type = "text",
  placeholder,
  disabled = false,
  style = "",
  id,
  errors,
  register,
  defaultValue,
  validate,
  readOnly,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block  mb-[6px] text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        {...register(id, validate)}
        className={twMerge(
          `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-300 focus:border-main-300 block w-full p-2 ${style} ${
            readOnly ? "cursor-not-allowed bg-main-50" : ""
          }`
        )}
        placeholder={placeholder}
      />
      {errors[id] && (
        <small className="text-[12px] text-error italic  ">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
