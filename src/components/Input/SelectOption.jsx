/** @format */

import React from "react";

const SelectOption = ({ name, data, onChange, displayField, style }) => {
  return (
      <select
      className={
        `bg-gray-50 border max-h-[40px] border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 outline-blue-500 block p-2.5 ${style}`
      }
      onChange={onChange} 
      defaultValue=""
    >
      <option disabled value="">
        {name}
      </option>
      {data?.map((item, index) => (
        <option key={`${item.id}-${index}`} value={item.ID}>
          {item[displayField]}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
