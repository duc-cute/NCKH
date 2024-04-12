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
  CategoryDepartment,
  CategorySchoolYear,
  CategorySubject,
} from "../../components";

import icons from "../../ultils/icons";
import {
  apiAllFaculties,
  apiClassById,
  apiCoursesById,
  apiDataPoint,
  apiImportScore,
} from "../../apis";

import { useForm } from "react-hook-form";
import {
  levelColor,
  listStatusWarning,
  listStudentWarning,
} from "../../ultils/constant";

const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
  MdOutlineSend,
  GrUpdate,
  SiGoogleclassroom,
  FaRegCalendarAlt,
  SlCalender,
  MdSubject,
} = icons;

const ManageCategory = () => {
  const columns = [
    {
      title: "Mã học phần",
      key: "mhp",
      sort: true,
    },
    { title: "Tên học phần", key: "name", sort: true },
    { title: "Năm học", key: "year" },
    { title: "Học kì", key: "hocki" },
    { title: "Khoa", key: "khoa" },
    { title: "Số tín chỉ", key: "num" },
  ];

  const columns2 = [
    {
      title: "stt",
      key: "id",
      sort: true,
    },
    {
      title: "Năm học",
      key: "schoolYear",
      sort: true,
    },
    {
      title: "Học kỳ",
      key: "hk",
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
      key: "1",
      mhp: "IT001",
      name: "Lập trình cơ bản",
      num: 5,
      hocki: "Học kỳ 1",
      khoa: "Công nghệ thông tin",
      year: "2022-2023",
    },
    {
      key: "2",
      mhp: "IT002",
      name: "Kiểm thử phần mềm",
      num: 2,
      hocki: "Học kỳ 1",
      khoa: "Công nghệ thông tin",
      year: "2022-2023",
    },
    {
      key: "3",
      mhp: "IT003",
      name: "Cơ sở dữ liệu",
      num: 3,
      hocki: "Học kỳ 1",
      khoa: "Công nghệ thông tin",
      year: "2022-2023",
    },
    {
      key: "4",
      mhp: "IT004",
      name: "Kĩ thuật đồ hoạ",
      num: 4,
      hocki: "Học kỳ 1",
      khoa: "Công nghệ thông tin",
      year: "2022-2023",
    },
  ];

  const data2 = [
    {
      id: "1",
      schoolYear: "2022-2023",
      hk: "Học kỳ 1",
    },
    {
      id: "2",
      schoolYear: "2022-2023",
      hk: "Học kỳ 2",
    },
    {
      id: "3",
      schoolYear: "2023-2024",
      hk: "Học kỳ 1",
    },
    {
      id: "4",
      schoolYear: "2023-2024",
      hk: "Học kỳ 2",
    },
  ];

  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);
  const [courses, setCourses] = useState([]);

  const [showDes, setShowDes] = useState(false);
  const [schoolYear, setSchoolYear] = useState(false);
  const [subject, setSubject] = useState(false);
  const [department, setDepartment] = useState(false);
  const [titleCategory, setTitleCategory] = useState("");

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm();

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

  const groupButton = [
    {
      id: 1,
      button: (
        <Button
          style={"py-[7px] text-white rounded-md "}
          icon={<AiOutlineCloudUpload />}
        >
          Export
        </Button>
      ),
    },
    {
      id: 2,
      button: (
        <Button style={"py-[7px] text-white rounded-md "} icon={<CgImport />}>
          Import
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className=" h-[1000px]">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
          <div className="flex gap-3 items-center pt-5 justify-end">
            <div>
              <SelectOption
                style={`w-[300px]`}
                name={"Tìm kiếm theo khoa"}
                data={faculties}
                displayField={"FacultyName"}
                onChange={(event) => {
                  setFacultyId(event.target.value);
                  setClassScores([]);
                  setCourses([]);
                }}
              />
            </div>
            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<SlCalender />}
              handleOnclick={() => {
                setShowDes(true);
                setSchoolYear(true);
                setDepartment(false);
                setSubject(false);
                setTitleCategory("Danh mục năm học, học kỳ");
              }}
            >
              Chọn năm học, học kỳ
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<SiGoogleclassroom />}
              handleOnclick={() => {
                setShowDes(true);
                setDepartment(true);
                setSchoolYear(false);
                setSubject(false);
                setTitleCategory("Danh mục khoa, Lớp");
              }}
            >
              Chọn khoa, Lớp
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<MdSubject />}
              handleOnclick={() => {
                setShowDes(true);
                setSubject(true);
                setSchoolYear(false);
                setDepartment(false);
                setTitleCategory("Danh mục học phần");
              }}
            >
              Chọn khối kiến thức
            </Button>
          </div>
        </div>

        <div className="mx-4 mt-4 ">
          <Table
            title="Danh sách học phần theo từng khoa"
            columns={columns}
            data={data}
            groupButton={groupButton}
          />
        </div>
        {showDes && (
          <Drawer
            title={titleCategory}
            onClose={() => setShowDes(false)}
            style={showDes ? "block gap-x-5 gap-y-3" : "hidden"}
          >
            <div className="drawer-department">
              {schoolYear && <CategorySchoolYear />}
              {department && <CategoryDepartment />}
              {subject && <CategorySubject />}

              <div className="flex gap-3 mt-12 justify-end">
                <Button
                  style={"py-[7px] text-white rounded-md "}
                  icon={<MdOutlineSend />}
                >
                  Thêm mới
                </Button>
                <Button
                  style={"py-[7px] text-white rounded-md "}
                  icon={<GrUpdate />}
                >
                  Cập nhật
                </Button>
                <Button
                  style={"py-[7px] text-white rounded-md "}
                  icon={<FiTrash2 />}
                >
                  Xoá
                </Button>
                <Button style={"bg-white text-black"}>Clear</Button>
              </div>

              <div className="mt-12">
                <Table
                  title="Danh sách học phần theo từng khoa"
                  columns={columns2}
                  data={data2}
                />
              </div>
            </div>
          </Drawer>
        )}
      </div>
    </>
  );
};

export default ManageCategory;
