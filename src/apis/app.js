/** @format */
/** @format */

import axios from '../axios';

export const apiAllFaculties = () =>
  axios({
    url: '/v1/point/select-all-faculty',
    method: 'get',
  });

export const apiClassById = (id) =>
  axios({
    url: `/v1/point/select-class-by-id/${id}`,
    method: 'get',
  });

export const apiCoursesById = (id) =>
  axios({
    url: `/v1/point/select-courses-by-id-class/${id}`,
    method: 'get',
  });

export const apiDataPoint = (IdFaculty, IdClass, IdCourse) =>
  axios({
    url: `/v1/point/select-point-by-id-class-id-faculty-id-course?IdFaculty=${IdFaculty}&IdClass=${IdClass}&IdCourse=${IdCourse}`,
    method: 'get',
  });
