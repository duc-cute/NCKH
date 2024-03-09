/** @format */

import React, { memo, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import Table from "../Table/Table";
const DragFile = ({
  ExampleFile,
  onChange,
  title,
  columns,
  data,
  maxH,
  fileName,
  setFileName,
}) => {
  return (
    <div className=" flex items-start gap-2 flex-col justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 ">
            Click or drag file to this area to upload
          </p>
          <p className="text-xs text-gray-500 ">
            Support for a single upload. Only accept .csv, .xls, .xlsx or &nbsp;
            <a
              className="text-[#1677ff]"
              href={ExampleFile || "/"}
              download
              onClick={(e) => e.stopPropagation()}
            >
              DownLoad simple file
            </a>
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            onChange(e.target.files[0]);
            setFileName(e.target.files[0].name);
          }}
        />
      </label>
      {fileName && (
        <>
          <span className="flex gap-1 items-center text-[#6b7280] text-[14px]">
            <MdAttachFile />
            {fileName}
          </span>
          <p className="mt-3 text-[#6b7280] text-[14px]">Dữ liệu upload:</p>
          <Table columns={columns} data={data} maxH={maxH} />
        </>
      )}
    </div>
  );
};

export default memo(DragFile);
