/** @format */

import React, { useRef } from "react";

const SelectOption = ({ name, data, onChange, displayField }) => {
  return (
    <select
      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
         focus:ring-blue-500 focus:border-blue-500 outline-blue-500 block w-full p-2.5 "
      onChange={onChange}
    >
      <>
        <option selected>{name}</option>
        {data?.map((item, index) => (
          <option key={`${item.id}-${index}`} value={item.ID}>
            {item[displayField]}
          </option>
        ))}
      </>
    </select>
  );
};

export default SelectOption;