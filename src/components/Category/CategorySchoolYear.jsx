import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  InputField,
  SelectOption,
  Table,
  Tag,
  InputForm,
  SelectLib,
} from "../../components";

import icons from "../../ultils/icons";
import {
  apiAllFaculties,
  apiClassById,
  apiCoursesById,
  apiDataPoint,
  apiImportScore,
} from "../../apis";

const CategorySchoolYear = () => {
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);
  const [courses, setCourses] = useState([]);

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-all-faculty";
      const facultie = await apiAllFaculties(url);
      setFaculties(facultie?.data);
    };
    fetchData();
  }, []);

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-class-by-id";
      const classScore = await apiClassById(url, facultyId);
      setClassScores(classScore?.data);
    };
    if (facultyId) fetchData();
  }, [facultyId]);

  // api data point student
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-point-by-id-class-id-faculty-id-course";
      const res = await apiDataPoint(
        url,
        facultyId,
        classScoreId,
        courceScoreId
      );
      console.log(res);
      if (res.status === 200)
        setDataSelect({
          dataStudents: res.dataStudents,
          dataTeacher: res.dataTeacher[0],
        });
    };
    if (facultyId && classScoreId && courceScoreId) fetchData();
  }, [facultyId, classScoreId, courceScoreId]);

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3">
          <InputField
            placeholder={"Nhập thêm năm học ..."}
            style={`flex max-h-[40px] w-[400px]`}
            name={""}
            paddingRight={"90px"}
          />

          <SelectOption
            style={`w-[400px]`}
            name={"Chọn năm học"}
            data={faculties}
            displayField={"FacultyName"}
            onChange={(event) => {
              setFacultyId(event.target.value);
              setClassScores([]);
              setCourses([]);
            }}
          />
        </div>

        <div className="flex gap-3">
          <SelectOption
            style={`w-[400px]`}
            name={"Xem học kỳ"}
            data={classScores}
            displayField={"NameClass"}
            onChange={(event) => {
              setClassScoreId(event.target.value);
              setCourses([]);
            }}
          />
          <InputField
            placeholder={"Nhập thêm học kỳ ..."}
            style={`flex max-h-[40px] w-[400px]`}
            name={""}
          />
        </div>
      </div>
    </>
  );
};

export default CategorySchoolYear;
