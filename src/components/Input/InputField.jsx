/** @format */

import React from "react";

const InputField = ({
  name,
  value,
  setValue,
  style,
  inValid,
  setInvalid,
  type = "text",
}) => {
  return (
    <div className={`font-roboto ${style ? style : "flex-1"}`}>
      <label className="block  font-medium text-gray-900 mb-1">{name}</label>
      {type === "text" ? (
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-blue-500 block w-full p-2.5 "
          required
        />
      ) : (
        <select className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-blue-500 block w-full p-2.5 ">
          <option selected>Choose a {name}</option>
          <option value="US">United States</option>
        </select>
      )}
    </div>
  );
};

export default InputField;
