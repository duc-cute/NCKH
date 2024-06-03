/** @format */

import React, { memo, useState } from "react";
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
  defaultValue = 0,
  validate,
  readOnly,
  setValue,
  valueDisplay,
  setValueDisplay,
}) => {
  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={id}
          className="block  mb-[8px] text-base font-medium text-gray-900 "
        >
          {label}
        </label>
      )}

      <input
        min="0"
        max="100"
        step={5}
        type={"range"}
        id={id}
        defaultValue={valueDisplay}
        disabled={disabled}
        readOnly={readOnly}
        {...register(id, validate)}
        className={twMerge(
          `bg-gray-50 border range accent-[#1677ff] border-gray-300  text-sm rounded-lg outline-none focus:ring-blue-300 focus:border-main-300 block w-full py-2 ${style} ${
            readOnly ? "cursor-not-allowed bg-main-50" : ""
          }`
        )}
        onChange={(e) => {
          setValue(id, e.target.value);
          setValueDisplay(e.target.value);
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${(valueDisplay / 100) * 100}%`,
          transform: `${valueDisplay > 0 ? "translateX(-50%)" : ""}`,
          top: "18px", // Adjust the position above the input range
        }}
      >
        {valueDisplay}%
      </div>
      {errors[id] && (
        <small className="text-[12px] text-error italic  ">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
