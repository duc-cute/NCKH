import React from "react";

const SelectOption = ({ name, data, onChange, style }) => {
  // console.log("data", data, ", name", name);

  return (
    <select
      className={`bg-gray-50 border max-h-[40px] border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 outline-blue-500 block p-2.5 w-full `}
      onChange={onChange}
      defaultValue=""
    >
      <option disabled value="">
        {name}
      </option>
      {data?.map((item, index) => (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
