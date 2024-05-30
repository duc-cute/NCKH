/** @format */

import axios from "../axios";

export const apiImportScore = (data) =>
  axios({
    url: "/v1/point/import-point",
    method: "post",
    data,
  });

export const apiImportAttendance = (data) =>
  axios({
    url: "/v1/attendance/import-attendance", 
    method: "post",
    data,
  });


// import student
export const apiImportStudent = (data) =>
  axios({
    url: "/v1/student/import-student", 
    method: "post",
    data,
});
