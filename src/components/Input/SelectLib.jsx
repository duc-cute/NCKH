/** @format */

import React, { memo } from "react";
import Select from "react-select";
const SelectLib = ({
  setValue,
  register,
  options,
  isClearable = false,
  placeholder,
  validate,
  id,
  label,
  errors,
}) => {
  return (
    <div className="w-full ">
      {label && (
        <label
          htmlFor={id}
          className="block  mb-[6px] text-base font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <Select
        {...register(id, validate)}
        options={options}
        placeholder={placeholder}
        formatOptionLabel={(option) => (
          <div className="flex min-w-[120px] text-sm items-center gap-3 font-medium text-main-600">
            {option?.image && (
              <img
                className="w-[32px] h-[32px] object-cover"
                src={option?.image}
                alt={option.label}
              />
            )}
            {option?.icon && <span>{option.icon}</span>}
            <span>{option.label}</span>
          </div>
        )}
        isClearable={isClearable}
        isSearchable={true}
        onChange={(e) => setValue(id, e?.id)}
        getOptionValue={(option) => option.id}
      />
      {errors[id] && (
        <small className="text-[12px] text-error italic  ">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(SelectLib);
