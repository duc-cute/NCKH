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
}) => {
  return (
    <div className="w-full ">
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
    </div>
  );
};

export default memo(SelectLib);
