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

  // lấy danh sách sinh viên theo lớp
  export const apiDataStudent = (Key, IdFaculty, IdClass) =>
    axios({
      url: `v1/student/all-student?Key=${Key}&IDFaculty=${IdFaculty}&IDClass=${IdClass}`,
      method: "get",
    });