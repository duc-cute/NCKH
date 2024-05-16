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
} from "..";

import icons from "../../ultils/icons";

const {
  MdOutlineSend,
  AiOutlineCloudUpload,
  CgImport,
  FiTrash2,
  LuPencilLine,
} = icons;

import {
  apiAllFaculties,
  apiClassById,
  apiCoursesById,
  apiDataPoint,
  apiImportScore,
} from "../../apis";

const CategorySchoolYear = () => {
  const [faculties, setFaculties] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);
  const [courses, setCourses] = useState([]);

  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedSemester, setSelectedSemester] = useState();

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

  const columns = [
    {
      title: "stt",
      key: "id",
      sort: true,
    },
    {
      title: "Tên khoa",
      key: "department",
      sort: true,
    },
    {
      title: "Tên lớp",
      key: "className",
      sort: true,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <FiTrash2 color="red" />
          <LuPencilLine color="#1677ff" />
        </div>
      ),
    },
  ];

  const data = [
    {
      id: "1",
      department: "Công nghệ thông tin",
      className: "DCCNTT10.1.3",
    },
    {
      id: "2",
      department: "Công nghệ ô tô",
      className: "DCCNTT10.1.4",
    },
    {
      id: "3",
      department: "Quản trị kinh doanh",
      className: "DCCNTT10.1.5",
    },
    {
      id: "4",
      department: "Du lịch khách sạn",
      className: "DCCNTT10.1.6",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3">
          <SelectOption
            style={`w-[300px]`}
            name={"Chọn khoa"}
            data={faculties}
            displayField={"FacultyName"}
            onChange={(event) => {
              setFacultyId(event.target.value);
              setCourses([]);
            }}
          />
          <InputField
            placeholder={"Nhập tên lớp học ..."}
            style={`flex max-h-[40px] w-[800px]`}
            name={""}
            paddingRight={"90px"}
          />

          <Button
            style={"py-[9px] text-white rounded-md "}
            icon={<MdOutlineSend />}
          >
            Nhập
          </Button>

          <Button
            style={"py-[9px] text-white rounded-md "}
            icon={<AiOutlineCloudUpload />}
          >
            Export
          </Button>

          <Button style={"py-[9px] text-white rounded-md "} icon={<CgImport />}>
            Import
          </Button>
        </div>

        <div className="flex mt-3 gap-4">
          <InputField
            placeholder={"Tìm kiếm lớp học ..."}
            style={`flex max-h-[40px] w-[696px]`}
            name={""}
            paddingRight={"90px"}
          />

          <Button style={"py-[9px] text-white rounded-md "}>Tìm kiếm</Button>
        </div>

        <div className="mt-12">
          <Table title="Danh sách khoa" columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default CategorySchoolYear;
