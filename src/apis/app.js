/** @format */
/** @format */

import axios from "../axios";

export const apiAllFaculties = (url) =>
  axios({
    url: `/${url}`,
    method: "get",
  });

export const apiClassById = (url, id) =>
  axios({
    url: `/${url}/${id}`,
    method: "get",
  });

export const apiCoursesById = (url, id) =>
  axios({
    url: `/${url}/${id}`,
    method: "get",
  });

export const apiDataPoint = (url, IdFaculty, IdClass, IdCourse) =>
  axios({
    url: `/${url}?IdFaculty=${IdFaculty}&IdClass=${IdClass}&IdCourse=${IdCourse}`,
    method: "get",
  });
