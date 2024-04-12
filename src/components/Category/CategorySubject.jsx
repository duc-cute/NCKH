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
            style={`w-[400px]`}
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
            style={`w-[400px]`}
            name={"Chọn khối kiến thức ngành"}
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
            placeholder={"Nhập thêm khoa ..."}
            style={`flex max-h-[40px] w-[400px]`}
            name={""}
            paddingRight={"90px"}
          />

          <InputField
            placeholder={"Nhập khối kiến thức ngành ..."}
            style={`flex max-h-[40px] w-[400px]`}
            name={""}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySubject;
