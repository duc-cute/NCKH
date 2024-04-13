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

  const [specializeds, setSpecialized] = useState(null);

  const specialized = [
    { key: 1, specialized: "Kiến thức đại cương" },
    { key: 2, specialized: "Kiến thức chuyên ngành" },
    { key: 3, specialized: "Hệ thống thông tin" },
    { key: 4, specialized: "Thực tập, tôt nghiệp" },
  ];

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-all-faculty";
      const facultie = await apiAllFaculties(url);
      setFaculties(facultie?.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3">
          <SelectOption
            style={`w-[300px]`}
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
            data={specialized}
            displayField={"specialized"}
            onChange={(event) => {
              setSpecialized(event.target.value);
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
