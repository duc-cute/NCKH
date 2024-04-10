/** @format */

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

  const groupButton = [
    {
      id: 1,
      button: (
        <SelectOption
          style={`w-[150px]`}
          name={"Chọn năm học"}
          data={faculties}
          displayField={"FacultyName"}
          onChange={(event) => {
            setFacultyId(event.target.value);
            setClassScores([]);
            setCourses([]);
          }}
        />
      ),
    },
    {
      id: 1,
      button: (
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
      ),
    },
    {
      id: 2,
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
      id: 3,
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
          <div className="flex gap-3 items-center justify-between pt-5 ">
            <div className="relative">
              <InputField
                placeholder={"Nhập thêm năm học ..."}
                style={`flex max-h-[40px] w-[300px]`}
                name={""}
                paddingRight={"90px"}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="transition duration-300 ease-in-out rounded-lg p-[14px] py-[10px] flex gap-3">
                  <MdOutlineSend color="#000" />
                  <GrUpdate color="#1677ff" />
                  <FiTrash2 color="red" />
                </div>
              </div>
            </div>

            <SelectOption
              style={`w-[540px]`}
              name={"Chọn năm học"}
              data={faculties}
              displayField={"FacultyName"}
              onChange={(event) => {
                setFacultyId(event.target.value);
                setClassScores([]);
                setCourses([]);
              }}
            />

            <div className="relative">
              <InputField
                placeholder={"Nhập thêm học kỳ ..."}
                style={`flex max-h-[40px] w-[300px]`}
                name={""}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="transition duration-300 ease-in-out rounded-lg p-[14px] py-[10px] flex gap-3">
                  <MdOutlineSend color="#000" />
                  <GrUpdate color="#1677ff" />
                  <FiTrash2 color="red" />
                </div>
              </div>
            </div>

            <SelectOption
              style={`w-[540px]`}
              name={"Chọn học kỳ"}
              data={classScores}
              displayField={"NameClass"}
              onChange={(event) => {
                setClassScoreId(event.target.value);
                setCourses([]);
              }}
            />
          </div>
          <div className="flex gap-3 items-center justify-between pt-5 ">
            <div className="relative">
              <InputField
                placeholder={"Nhập thêm khoa ..."}
                style={`flex max-h-[40px] w-[300px]`}
                name={"Mã sinh viên"}
                paddingRight={"90px"}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="transition duration-300 ease-in-out rounded-lg p-[14px] py-[10px] flex gap-3">
                  <MdOutlineSend color="#000" />
                  <GrUpdate color="#1677ff" />
                  <FiTrash2 color="red" />
                </div>
              </div>
            </div>

            <SelectOption
              style={`w-[540px]`}
              name={"Chọn khoa"}
              data={faculties}
              displayField={"FacultyName"}
              onChange={(event) => {
                setFacultyId(event.target.value);
                setClassScores([]);
                setCourses([]);
              }}
            />

            <div className="relative">
              <InputField
                placeholder={"Nhập thêm lớp ..."}
                style={`flex max-h-[40px] w-[300px]`}
                name={"Mã sinh viên"}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="transition duration-300 ease-in-out rounded-lg p-[14px] py-[10px] flex gap-3">
                  <MdOutlineSend color="#000" />
                  <GrUpdate color="#1677ff" />
                  <FiTrash2 color="red" />
                </div>
              </div>
            </div>

            <SelectOption
              style={`w-[540px]`}
              name={"Chọn lớp"}
              data={classScores}
              displayField={"NameClass"}
              onChange={(event) => {
                setClassScoreId(event.target.value);
                setCourses([]);
              }}
            />
          </div>
          <div className="flex gap-3 items-center pt-5 ">
            <div className="relative">
              <InputField
                placeholder={"Nhập thêm mã học phần ..."}
                style={`flex max-h-[40px] w-[300px]`}
                name={"Mã sinh viên"}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="transition duration-300 ease-in-out rounded-lg p-[14px] py-[10px] flex gap-3">
                  <MdOutlineSend color="#000" />
                  <GrUpdate color="#1677ff" />
                  <FiTrash2 color="red" />
                </div>
              </div>
            </div>

            <SelectOption
              style={`w-[263px]`}
              name={"Chọn mã học phần"}
              data={courses}
              displayField={"NameCourse"}
              onChange={(event) => {
                setCourceScoreId(event.target.value);
              }}
            />
            <div className="relative">
              <InputField
                placeholder={"Nhập thêm tên học phần ..."}
                style={`flex max-h-[40px] w-[300px]`}
                name={""}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="transition duration-300 ease-in-out rounded-lg p-[14px] py-[10px] flex gap-3">
                  <MdOutlineSend color="#000" />
                  <GrUpdate color="#1677ff" />
                  <FiTrash2 color="red" />
                </div>
              </div>
            </div>

            <SelectOption
              style={`w-[263px]`}
              name={"Chọn tên học phần"}
              data={courses}
              displayField={"NameCourse"}
              onChange={(event) => {
                setCourceScoreId(event.target.value);
              }}
            />
          </div>
          <div className="flex gap-3 items-center pt-5 ">
            <div className="relative">
              <InputField
                placeholder={"Nhập thêm số tín chỉ ..."}
                style={`flex max-h-[40px] w-[300px]`}
                name={""}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="transition duration-300 ease-in-out rounded-lg p-[14px] py-[10px] flex gap-3">
                  <MdOutlineSend color="#000" />
                  <GrUpdate color="#1677ff" />
                  <FiTrash2 color="red" />
                </div>
              </div>
            </div>

            <SelectOption
              style={`w-[263px]`}
              name={"Chọn số tín chỉ"}
              data={courses}
              displayField={"NameCourse"}
              onChange={(event) => {
                setCourceScoreId(event.target.value);
              }}
            />
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
      </div>
    </>
  );
};

export default ManageCategory;
