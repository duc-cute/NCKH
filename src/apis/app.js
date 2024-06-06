import axios from "../axios";

export const apiAllKey = (url) => 
  axios({ 
    url: `/${url}`,
     method: "get"
  });

  // lấy tất cả thông tin khoa
export const apiAllFaculties =  (url, id) =>
   axios({
    url: `/${url}/?key=${id}`,
    method: "get",
  });

  // lấy tất cả tên và id khoa
  export const apiAllFacultieGetName =  () =>
    axios({
     url: "v1/common/all-faculty",
     method: "get",
   });

export const apiClassById = (url, id) =>
  axios({
    url: `/${url}/?IDFaculty=${id}`,
    method: "get",
  });

// api select option khối đào tạo
export const apiBlockProgram = (IDFaculty, Key) =>
    axios({
     url: `v1/studyprogram/select-blockknowledge-by-key-faculty?IDFaculty=${IDFaculty}&Key=${Key}`,
     method: "get",
   });

// api lấy dữ liệu chương trình đào tạo
export const apiGetDataProgram = (IDBlockknowledge) =>
  axios({
   url: `v1/studyprogram/select-course-by-key-faculty-blockknowledge?IDBlockknowledge=${IDBlockknowledge}`,
   method: "get",
 });

// lấy điểm học tập
export const apiDataPoint = (Key, IDClass, IDFaculty, IDCourse, Semester) =>
  axios({
    url: `v1/point/select-point-students?Key=${Key}&IDFaculty=${IDFaculty}&IDClass=${IDClass}&IDCourse=${IDCourse}&Semester=${Semester}`,
    method: "get",
  });

  // lấy điểm danh
export const apiDataAttendance = (IdFaculty, IdClass, IdCourse, Semester, Key) =>
  axios({
    url: `v1/attendance/select-attendance?IdFaculty=${IdFaculty}&IdClass=${IdClass}&IdCourse=${IdCourse}&Semester=${Semester}&Key=${Key}`,
    method: "get",
  });

// cập nhật lớp
export const apiUpdateClass = (url, data) =>
  axios({
    url: `/${url}`,
    method: "put",
    data
});

// thêm lớp
export const apiAddClass = (url, data) =>
    axios({
      url: `/${url}`,
      method: "post",
      data,
  });

// lấy thông tin lớp
export const apiSelectInfoClass = (url, keyId, facultyId) =>
  axios({
    url: `/${url}?key=${keyId}&faculty=${facultyId}`,
    method: "get",
});

// xóa lớp
export const apiDeleteClass = (url, IDClass) =>
    axios({
      url: `/${url}/${IDClass}`,
      method: "delete",
  });

// import class
export const apiImportClass = (data) =>
  axios({
    url: "/v1/class/import-class", 
    method: "post",
    data,
});

// đếm số lượng class
export const apiCountClass = () =>
  axios({
    url: "/v1/class/count-class", 
    method: "get",
});

// thêm khoa
export const apiAddFaculties = (url, data) =>
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

  // xóa khoa
export const apiDeleteFaculties = (url, idFaculty) =>
    axios({
      url: `/${url}/${idFaculty}`,
      method: "delete",
  });

  // cập nhật khoa
export const apiUpdateFaculties = (url, data) =>
    axios({
      url: `/${url}`,
      method: "put",
      data
  });

// import khoa
export const apiImportFaculty = (data) =>
    axios({
      url: "/v1/faculty/import-faculty", 
      method: "post",
      data,
  });

// đếm số lượng khoa
export const apiCountFaculty = () =>
  axios({
    url: "/v1/faculty/count-faculty", 
    method: "get",
});

// lấy thông tin kỳ
export const apiSelectInfoSemester = (key) =>
    axios({
      url: `v1/common/select-semester-by-key?key=${key}`,
      method: "get",
  });

// lấy thông môn học
export const apiSelectInfoCourse = (IDFaculty, key, Semester) =>
  axios({
    url: `v1/common/select-courses-by-faculty-and-semester-and-key?IDFaculty=${IDFaculty}&Key=${key}&Semester=${Semester}`,
    method: "get",
});

// import chương trình đào tạo
export const apiImportProgram= (data) =>
  axios({
    url: "/v1/studyprogram/import-studyprograms", 
    method: "post",
    data,
});

// lấy thống kê khoa
export const apiReportFaculty = (Key, IDFaculty, Semester) =>
  axios({
    url: `v1/report/follow-report-faculty?Key=${Key}&IDFaculty=${IDFaculty}&Semester=${Semester}`,
    method: "get",
});

// lấy thống kê lớp
export const apiReportClass = (Key, IDFaculty, Semester, IDClass) =>
  axios({
    url: `v1/report/follow-report-class?Key=${Key}&IDFaculty=${IDFaculty}&Semester=${Semester}&IDClass=${IDClass}`,
    method: "get",
});