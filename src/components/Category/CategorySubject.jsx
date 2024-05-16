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

const CategorySubject = () => {
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
      title: "Tên nhóm chuyên ngành",
      key: "subject",
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
      subject: "Kiến thức đại cương",
    },
    {
      id: "2",
      department: "Công nghệ thông tin",
      subject: "Kiến thức chuyên ngành",
    },
    {
      id: "3",
      department: "Công nghệ thông tin",
      subject: "Công nghệ thông tin",
    },
    {
      id: "4",
      department: "Công nghệ thông tin",
      subject: "Thực tập, tôt nghiệp",
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
            placeholder={"Nhập nhóm chuyên ngành ..."}
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
            placeholder={"Tìm kiếm tên nhóm chuyên ngành ..."}
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

export default CategorySubject;
