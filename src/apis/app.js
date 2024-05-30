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
    url: "/v1/faculty/import-studyprograms", 
    method: "post",
    data,
});