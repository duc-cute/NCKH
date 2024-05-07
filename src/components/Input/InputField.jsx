import React from "react";

const InputField = ({
  nameKey,
  value,
  setValue,
  style,
  inValid,
  setInvalid,
  type = "text",
  placeholder,
  label,
  paddingRight,
}) => {
  return (
    <div className={`font-roboto ${style ? style : "flex-1"}`}>
      <label className="block capitalize  font-medium text-gray-900 mb-1">
        {label}
      </label>
      <input
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5  pr-[${paddingRight}]`}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalid && setInvalid([])}
      />
      <div className="mt-2">
        {inValid?.some((el) => el.name === nameKey) && (
          <span className="text-red-500 text-xs italic">
            {inValid?.find((el) => el.name === nameKey).mes}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;