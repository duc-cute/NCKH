/** @format */

import React, { useRef, forwardRef, useImperativeHandle } from "react";

const InputFile = forwardRef(({ onChange }, ref) => {
  const fileInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getInputValue: () => {
      return fileInputRef.current ? fileInputRef.current.files[0] : null;
    },
  }));

  return (
    <>
      <input
        ref={fileInputRef}
        onChange={() => onChange && onChange()}
        accept=".xlsx, .xls"
        type="file"
        className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm 
        file:bg-[#1677ff] file:text-[#fff]
      "
      />
    </>
  );
});

export default InputFile;
