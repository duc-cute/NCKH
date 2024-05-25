import axios from "../axios";

export const apiAllKey = (url) => 
  axios({ 
    url: `/${url}`,
     method: "get"
  });

export const apiAllFaculties =  (url, id) =>
   axios({
    url: `/${url}/?key=${id}`,
    method: "get",
  });

export const apiClassById = (url, id) =>
  axios({
    url: `/${url}/?IDFaculty=${id}`,
    method: "get",
  });

export const apiCoursesById = (url, id) =>
  axios({
    url: `/${url}/${id}`,
    method: "get",
  });

  // lấy điểm
export const apiDataPoint = (url, IdFaculty, IdClass, IdCourse) =>
  axios({
    url: `/${url}?IdFaculty=${IdFaculty}&IdClass=${IdClass}&IdCourse=${IdCourse}`,
    method: "get",
  });

  // thêm khoa
export const apiAddFaculties = (url, data) =>
  axios({
    url: `/${url}`,
    method: "post",
    data,
  });

  // thêm lớp
export const apiAddClass = (url, data) =>
    axios({
      url: `/${url}`,
      method: "post",
      data,
  });
  
  // lấy thông tin khoa
export const apiSelectInfoFaculties = (url) =>
    axios({
      url: `/${url}`,
      method: "get",
  });