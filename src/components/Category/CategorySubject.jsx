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

const CategorySubject = () => {
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);
  const [courses, setCourses] = useState([]);

  return (
    <div>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3">
          <SelectOption
            style={`w-[183px]`}
            name={"Chọn năm học"}
            data={faculties}
            displayField={"FacultyName"}
            onChange={(event) => {
              setFacultyId(event.target.value);
              setClassScores([]);
              setCourses([]);
            }}
          />

          <SelectOption
            style={`w-[550px]`}
            name={"Chọn học kỳ"}
            data={classScores}
            displayField={"NameClass"}
            onChange={(event) => {
              setClassScoreId(event.target.value);
              setCourses([]);
            }}
          />

          <SelectOption
            style={`w-[183px]`}
            name={"Chọn khoa"}
            data={faculties}
            displayField={"FacultyName"}
            onChange={(event) => {
              setFacultyId(event.target.value);
              setClassScores([]);
              setCourses([]);
            }}
          />

          <SelectOption
            style={`w-[550px]`}
            name={"Chọn lớp"}
            data={classScores}
            displayField={"NameClass"}
            onChange={(event) => {
              setClassScoreId(event.target.value);
              setCourses([]);
            }}
          />
        </div>

        <div className="flex gap-3">
          <InputField
            placeholder={"Nhập mã học phần ..."}
            style={`flex max-h-[40px] w-[400px]`}
            name={"Mã sinh viên"}
          />

          <SelectOption
            style={`w-[400px]`}
            name={"Chọn mã học phần"}
            data={courses}
            displayField={"NameCourse"}
            onChange={(event) => {
              setCourceScoreId(event.target.value);
            }}
          />
          <InputField
            placeholder={"Nhập tên học phần ..."}
            style={`flex max-h-[40px] w-[400px]`}
            name={""}
          />

          <SelectOption
            style={`w-[400px]`}
            name={"Chọn tên học phần"}
            data={courses}
            displayField={"NameCourse"}
            onChange={(event) => {
              setCourceScoreId(event.target.value);
            }}
          />
        </div>
        <div className="flex gap-3">
          <InputField
            placeholder={"Nhập số tín chỉ ..."}
            style={`flex max-h-[40px] w-[400px]`}
            name={""}
          />

          <SelectOption
            style={`w-[400px]`}
            name={"Chọn số tín chỉ"}
            data={courses}
            displayField={"NameCourse"}
            onChange={(event) => {
              setCourceScoreId(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySubject;
