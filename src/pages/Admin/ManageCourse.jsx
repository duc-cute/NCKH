import React, { useEffect, useState } from "react";

import {
  Button,
  InputField,
  SelectOption,
  Table,
  Modal,
  DragFile,
} from "../../components";

import icons from "../../ultils/icons";
import { apiAllKey, apiAllFaculties, apiSelectInfoSemester } from "../../apis";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const { AiOutlineCloudUpload, CgImport, FiTrash2, LuPencilLine } = icons;

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

  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();

  const [inputCourseCode, setInputCourseCode] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState();

  // api select option khóa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-years-by-faculty";
      const schoolYear = await apiAllKey(url);
      setSelectedSchoolYear(schoolYear?.data);
    };
    fetchData();
  }, []);

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-all-faculty";
      const facultie = await apiAllFaculties(url, selectedSchoolYearId);
      setSelectedFaculty(facultie?.data);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  // api select option kỳ
  useEffect(() => {
    const fetchData = async () => {
      const semester = await apiSelectInfoSemester(selectedSchoolYearId);
      setSelectedSemester(semester?.data.listKy);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm();

  const groupButton = [
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
            if (selectedFacultyId === null) {
              toast.error("Vui lòng chọn khóa trước khi import");
            } else if (selectedFacultyId === null) {
              toast.error("Vui lòng chọn khoa trước khi import");
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
              name={"Chọn khóa"}
              data={
                selectedSchoolYear
                  ? selectedSchoolYear.map((item) => {
                      return { name: item };
                    })
                  : []
              }
              onChange={(event) => {
                setSelectedSchoolYearId(event.target.value);
              }}
            />

            <SelectOption
              style={`w-full`}
              name={"Chọn khoa"}
              data={
                selectedFaculty
                  ? selectedFaculty.map((item) => {
                      return { id: item.ID, name: item.FacultyName };
                    })
                  : []
              }
              onChange={(event) => {
                setSelectedFacultyId(event.target.value);
              }}
            />

            <SelectOption
              style={`w-full`}
              name={"Chọn kỳ học"}
              data={
                selectedSemester
                  ? selectedSemester.map((item) => {
                      return { id: item.ID, name: item };
                    })
                  : []
              }
            />

            <InputField
              placeholder={"Nhập mã học phần ..."}
              style={`flex max-h-[40px] w-full`}
              name={"Mã sinh viên"}
              value={inputCourseCode}
              onChange={(event) => setInputCourseCode(event.target.value)}
            />
            <Button>Search</Button>
            <Button
              style={"bg-white text-black"}
              handleOnclick={() => {
                setInputCourseCode("");
              }}
            >
              Clear
            </Button>
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
