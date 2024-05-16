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
  CategoryClass,
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
  FaArrowCircleRight,
  SiStudyverse,
  MdOutlineClass,
  IoIosCreate,
} = icons;

const ManageCategory = () => {
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
      <div className=" h-screen">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
          <div className="flex gap-3 items-center pt-5 justify-start">
            <div className=" font-bold text-[20px] ml-1">
              Tổng quan danh mục
            </div>
            <div>
              <IoIosCreate size={"18px"} />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex flex-wrap gap-8 justify-start mt-6 w-[92%]">
            {/* <div className="relative cursor-default">
              <div className="bg-[#f39c12] rounded-[8px] text-[#fff] p-4 w-[260px] h-[150px]">
                <div className="font-bold text-[28px]">total 10</div>
                <div className="text-[18px] my-5">Danh mục năm học</div>
              </div>
              <div className="flex gap-2 absolute text-[#fff] bottom-0 bg-[#da8c0f] hover:bg-[#906f3a] rounded-[8px] cursor-pointer p-2 w-full justify-center">
                <div className="flex gap-2 ">
                  <div>Chi tiết</div>
                  <div>
                    <FaArrowCircleRight />
                  </div>
                </div>
              </div>
              <div className=" absolute top-2 right-2">
                <SlCalender color="#da8b10" size={"60px"} />
              </div>
            </div> */}

            {/* <div className="relative cursor-default">
              <div className="bg-[#04a559] rounded-[8px] text-[#fff] p-4 w-[260px] h-[150px]">
                <div className="font-bold text-[28px]">total 2</div>
                <div className="text-[18px] my-5">Danh mục học kỳ</div>
              </div>
              <div className="flex gap-2 absolute text-[#fff] bottom-0 bg-[#318a60] hover:bg-[#448265] rounded-[8px] cursor-pointer p-2 w-full justify-center">
                <div className="flex gap-2 ">
                  <div>Chi tiết</div>
                  <div>
                    <FaArrowCircleRight />
                  </div>
                </div>
              </div>
              <div className=" absolute top-2 right-2">
                <SiStudyverse color="#318a60" size={"60px"} />
              </div>
            </div> */}

            <div className="relative cursor-default">
              <div className="bg-[#00c0ef] rounded-[8px] text-[#fff] p-4 w-[260px] h-[150px]">
                <div className="font-bold text-[28px]">total 18</div>
                <div className="text-[18px] my-5">Danh mục khoa</div>
              </div>
              <div
                className="flex gap-2 absolute text-[#fff] bottom-0 bg-[#327d90]
               hover:bg-[#346875] rounded-[8px] cursor-pointer p-2 w-full justify-center"
                onClick={() => {
                  setShowDes(true);
                  setSchoolYear(false);
                  setDepartment(true);
                  setSubject(false);
                  setTitleCategory("Danh mục khoa");
                }}
              >
                <div className="flex gap-2 ">
                  <div>Chi tiết</div>
                  <div>
                    <FaArrowCircleRight />
                  </div>
                </div>
              </div>
              <div className=" absolute top-2 right-2">
                <MdOutlineClass color="#327d90" size={"60px"} />
              </div>
            </div>

            <div className="relative cursor-default">
              <div className="bg-[#dd4b39] rounded-[8px] text-[#fff] p-4 w-[260px] h-[150px]">
                <div className="font-bold text-[28px]">total 70</div>
                <div className="text-[18px] my-5">Danh mục lớp</div>
              </div>
              <div
                className="flex gap-2 absolute text-[#fff] bottom-0 bg-[#a84336] hover:bg-[#743b34]
               rounded-[8px] cursor-pointer p-2 w-full justify-center"
                onClick={() => {
                  setShowDes(true);
                  setSchoolYear(true);
                  setDepartment(false);
                  setSubject(false);
                  setTitleCategory("Danh mục lớp học");
                }}
              >
                <div className="flex gap-2 ">
                  <div>Chi tiết</div>
                  <div>
                    <FaArrowCircleRight />
                  </div>
                </div>
              </div>
              <div className=" absolute top-2 right-2">
                <SiGoogleclassroom color="#a84336" size={"60px"} />
              </div>
            </div>

            <div className="relative cursor-default">
              <div className="bg-[#8e44ad] rounded-[8px] text-[#fff] p-4 w-[260px] h-[150px]">
                <div className="font-bold text-[28px]">total 10</div>
                <div className="text-[18px] my-5">Danh mục môn học</div>
              </div>
              <div
                className="flex gap-2 absolute text-[#fff] bottom-0 bg-[#71368a] hover:bg-[#603075]
               rounded-[8px] cursor-pointer p-2 w-full justify-center"
                onClick={() => {
                  setShowDes(true);
                  setSchoolYear(false);
                  setDepartment(false);
                  setSubject(true);
                  setTitleCategory("Danh mục môn học chia theo chuyên ngành");
                }}
              >
                <div className="flex gap-2 ">
                  <div>Chi tiết</div>
                  <div>
                    <FaArrowCircleRight />
                  </div>
                </div>
              </div>
              <div className=" absolute top-2 right-2">
                <MdSubject color="#71368a" size={"60px"} />
              </div>
            </div>
          </div>
        </div>

        {showDes && (
          <Drawer
            title={titleCategory}
            onClose={() => setShowDes(false)}
            style={showDes ? "block gap-x-5 gap-y-3" : "hidden"}
          >
            <div className="drawer-department">
              {schoolYear && <CategoryClass />}
              {department && <CategoryDepartment />}
              {subject && <CategorySubject />}
            </div>
          </Drawer>
        )}
      </div>
    </>
  );
};

export default ManageCategory;
