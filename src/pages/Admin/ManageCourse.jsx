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
  Modal,
  DragFile,
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
import { toast } from "react-toastify";

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
  IoIosCreate,
} = icons;

const ManageCourse = () => {
  const columns = [
    { title: "stt", key: "id", sort: true },
    {
      title: "Mã học phần",
      key: "courseCode",
      sort: true,
    },
    { title: "Tên học phần", key: "courseName", sort: true },
    { title: "Số tín chỉ", key: "numberOfCredits" },
    { title: "Số giờ tự học", key: "selfStudy" },
    { title: "Mã học phần tiên quyết", key: "prerequisiteCourse" },
    { title: "Học kỳ", key: "semester" },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <span onClick={() => setShowDes(true)} className={`cursor-pointer`}>
            <LuPencilLine color="#1677ff" />
          </span>
          <FiTrash2 color="red" />
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      courseCode: "IT3213",
      courseName: "Kiến trúc máy tính",
      numberOfCredits: 2,
      selfStudy: "45",
      prerequisiteCourse: "IT1208",
      semester: "2",
    },
    {
      id: 2,
      courseCode: "IT3214",
      courseName: "An toàn bảo mật thông tin",
      numberOfCredits: 3,
      selfStudy: "75",
      prerequisiteCourse: "IT1208",
      semester: "5",
    },
    {
      id: 3,
      courseCode: "IT3215",
      courseName: "Quản trị hệ thống Windows Server1",
      numberOfCredits: 2,
      selfStudy: "45",
      prerequisiteCourse: "IT1208",
      semester: "3",
    },
    {
      id: 4,
      courseCode: "IT3216",
      courseName: "Hệ quản trị CSDL Oracle",
      numberOfCredits: 2,
      selfStudy: "45",
      prerequisiteCourse: "IT1208",
      semester: "2",
    },
  ];

  const specialized = [
    { key: 1, specialized: "Kiến thức đại cương" },
    { key: 2, specialized: "Kiến thức chuyên ngành" },
    { key: 3, specialized: "Hệ thống thông tin" },
    { key: 4, specialized: "Thực tập, tôt nghiệp" },
  ];

  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // kiến thức chuyên ngành
  const [specializeds, setSpecialized] = useState(null);

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
          icon={<IoIosCreate />}
          handleOnclick={() => {
            if (facultyId === null) {
              toast.error("Vui lòng chọn khoa trước khi thêm mới");
            } else if (specializeds === null) {
              toast.error("Vui lòng chọn khối kiến thức trước khi thêm mới");
            } else {
              setShowDes(true);
            }
          }}
        >
          Thêm mới
        </Button>
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
        <Button
          style={"py-[7px] text-white rounded-md "}
          icon={<CgImport />}
          handleOnclick={() => {
            if (facultyId === null) {
              toast.error("Vui lòng chọn khoa trước khi import");
            } else if (specializeds === null) {
              toast.error("Vui lòng chọn khối kiến thức trước khi import");
            } else {
              setShowModal(true);
            }
          }}
        >
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
            <SelectOption
              style={`w-full`}
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
              style={`w-full`}
              name={"Chọn khối kiến thức"}
              data={specialized}
              displayField={"specialized"}
              onChange={(event) => {
                setFacultyId(event.target.value);
                setClassScores([]);
                setCourses([]);
                setSpecialized(event.target.value);
              }}
            />
            <InputField
              placeholder={"Nhập mã học phần ..."}
              style={`flex max-h-[40px] w-full`}
              name={"Mã sinh viên"}
            />
            <Button>Search</Button>
            <Button style={"bg-white text-black"}>Clear</Button>
          </div>
        </div>

        <div className="mx-4 mt-4 ">
          <Table
            title="Danh sách khung chương trình đào tạo"
            columns={columns}
            data={data}
            groupButton={groupButton}
          />
        </div>
        {showDes && (
          <Drawer
            style={"flex flex-wrap gap-x-5 gap-y-3 "}
            title={"Thông tin học phần"}
            onClose={() => setShowDes(false)}
          >
            <div className="flex w-full gap-3">
              <InputForm
                id={"msv"}
                label={"Mã Học Phần"}
                register={register}
                errors={errors}
              />
              <InputForm
                id={"name"}
                label={"Tên Học Phần"}
                register={register}
                errors={errors}
              />
            </div>

            <div className="flex w-full gap-3">
              <InputForm
                id={"email"}
                label={"Số Tín Chỉ"}
                register={register}
                errors={errors}
              />
              <InputForm
                id={"class"}
                label={"Số Giờ Tự Học"}
                register={register}
                errors={errors}
              />
            </div>

            <div className="flex w-full gap-3">
              <InputForm
                id={"address"}
                label={"Mã Học Phần Tiên Quyết"}
                register={register}
                errors={errors}
              />
              <InputForm
                id={"phone"}
                label={"Học Kỳ"}
                register={register}
                errors={errors}
              />
            </div>

            <div className="flex gap-3 mt-12 justify-end w-full">
              <Button
                style={"py-[7px] text-white rounded-md"}
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
              <Button style={"bg-white text-black"}>Clear</Button>
            </div>
          </Drawer>
        )}
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import dữ liệu khung chương trình đào tạo"}
          // disableOkBtn={dataPreview.length < 1}
          // onClickBtnOk={handleImportButtonClick}
          textOk={"Import"}
          onClickBtnCancel={() => {
            setShowModal(false);
            // setFileName(null);
            // setDataPreview([]);
          }}
        >
          <DragFile
          // data={dataPreview}
          // columns={columnsAttendance}
          // onChange={handlePreviewData}
          // fileName={fileName}
          // setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageCourse;
