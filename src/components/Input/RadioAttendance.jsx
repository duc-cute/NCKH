/** @format */

import React, { memo } from "react";

const RadioAttendance = ({ status }) => {
  return (
    <div className="flex items-center justify-center ">
      <div
        className={`h-4 w-4 rounded-full  ${
          status
            ? "bg-green-500 "
            : "border border-solid border-[#afafaf] rounded-full"
        }   me-2`}
      ></div>
    </div>
  );
};

export default memo(RadioAttendance);
