/** @format */

import React, { useRef, useState, useEffect, useCallback } from "react";
import icons from "../../ultils/icons";
const { AiOutlineCloudUpload, CgImport } = icons;
import { toast } from "react-toastify";
import {
  Button,
  ScoreOther,
  Table,
  SelectOption,
  Modal,
  DragFile,
  InputField,
} from "../../components";

import {
  apiAllFaculties,
  apiClassById,
  apiCoursesById,
  apiDataPoint,
  apiImportScore,
} from "../../apis";

import { readFileData } from "../../ultils/helper";

import {
  cellScorePositions,
  columnsStudent,
  headerDataScore,
} from "../../ultils/constant";

const ManageScore = () => {
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);

  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  // state data
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);

  // state id: id khoa, lớp, môn học
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);

  // xử lý khi click import
  const handleImportButtonClick = useCallback(async () => {
    let DataStudents = [];
    let DataPoint = [];

    dataPreview.dataMain.map((item) => {
      const { Msv, FullName, Gender, stt, ...ortherData } = item;
      if (!isNaN(item.Msv)) {
        DataStudents.push({ Msv, FullName, Gender });
        DataPoint.push({ ...ortherData });
      }
    });

    // // trả data cần lấy
    const dataManageScore = {
      Course: selectedCourse,
      Teacher: dataPreview.dataDescription[1],
      Faculity: selectedFaculty,
      Class: selectedClass,
      TotalHours: +dataPreview.dataDescription[4],
      NumberOfCredits: +dataPreview.dataDescription[5],
      FinalExamDate: dataPreview.dataDescription[6],
      DataStudents: DataStudents,
      DataPoint: DataPoint,
    };

    console.log(dataManageScore);

    const response = await apiImportScore(dataManageScore);
    if (response.status === 200) {
      toast.success(response.message);
      setFileName(null);
    } else toast.error(response.message);
  }, [dataPreview, fileName]);

  // xử lý dữ liệu file import
  const handlePreviewData = useCallback(
    async (fileValue) => {
      let dataMain = await readFileData(
        fileValue,
        cellScorePositions,
        headerDataScore,
        12
      );
      setDataPreview(dataMain);
    },
    [dataPreview]
  );

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
        <Button
          handleOnclick={() => {
            if (!selectedSchoolYear) {
              toast.error("Vui lòng chọn khóa trước khi import");
            } else if (!facultyId) {
              toast.error("Vui lòng chọn khoa trước khi import");
            } else if (!classScoreId) {
              toast.error("Vui lòng chọn lớp trước khi import");
            } else if (!selectedSemester) {
              toast.error("Vui lòng chọn học kỳ trước khi import");
            } else if (!courceScoreId) {
              toast.error("Vui lòng chọn môn học trước khi import");
            } else {
              setShowModal(true);
            }
          }}
          style={"py-[7px] text-white rounded-md "}
          icon={<CgImport />}
        >
          Import
        </Button>
      ),
    },
  ];

  const schoolYear = [
    { key: 1, schoolYear: "k6" },
    { key: 2, schoolYear: "k7" },
    { key: 3, schoolYear: "k8" },
    { key: 4, schoolYear: "k9" },
    { key: 5, schoolYear: "k10" },
    { key: 6, schoolYear: "k11" },
    { key: 7, schoolYear: "k12" },
    { key: 8, schoolYear: "k13" },
    { key: 9, schoolYear: "k14" },
  ];

  const semester = [
    { key: 1, semester: 1 },
    { key: 2, semester: 2 },
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

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-class-by-id";
      const classScore = await apiClassById(url, facultyId);
      setClassScores(classScore?.data);
    };
    if (facultyId) fetchData();
  }, [facultyId]);

  // api select option môn học
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-courses-by-id-class";
      const course = await apiCoursesById(url, classScoreId);
      setCourses(course?.data);
    };
    if (classScoreId) fetchData();
  }, [classScoreId]);

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

  return (
    <>
      <div className=" h-[1000px]">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
          <div className="flex gap-3 items-center justify-between pt-5 mb-6">
            <SelectOption
              style={`w-full`}
              name={"Chọn khóa"}
              data={schoolYear}
              displayField={"schoolYear"}
              onChange={(event) => {
                setSelectedSchoolYear(event.target.value);
              }}
            />
            <SelectOption
              style={`w-full`}
              name={"Chọn khoa"}
              data={faculties}
              displayField={"FacultyName"}
              valueKey={"FacultyName"}
              onChange={(event) => {
                setFacultyId(event.target.value);
                setClassScores([]);
                setCourses([]);
                const selectedOption =
                  event.target.options[event.target.selectedIndex];
                const selectedValue = selectedOption.getAttribute("data-value");
                setSelectedFaculty(selectedValue);
              }}
            />

            <SelectOption
              style={`w-full`}
              name={"Chọn lớp"}
              data={classScores}
              displayField={"NameClass"}
              valueKey={"NameClass"}
              onChange={(event) => {
                setClassScoreId(event.target.value);
                setCourses([]);
                const selectedOption =
                  event.target.options[event.target.selectedIndex];
                const selectedValue = selectedOption.getAttribute("data-value");
                setSelectedClass(selectedValue);
              }}
            />
          </div>
          <div className="flex items-center gap-3 ">
            <SelectOption
              style={`w-full`}
              name={"Chọn học kỳ"}
              data={semester}
              displayField={"semester"}
              onChange={(event) => {
                setSelectedSemester(event.target.value);
              }}
            />

            <SelectOption
              style={`w-full`}
              name={"Chọn học phần"}
              data={courses}
              displayField={"NameCourse"}
              valueKey={"NameCourse"}
              onChange={(event) => {
                setCourceScoreId(event.target.value);
                const selectedOption =
                  event.target.options[event.target.selectedIndex];
                const selectedValue = selectedOption.getAttribute("data-value");
                setSelectedCourse(selectedValue);
              }}
            />

            <InputField
              placeholder={"Nhập mã sinh viên ..."}
              style={`flex max-h-[40px] w-[684px]`}
              name={"Mã sinh viên"}
            />
            <Button>Search</Button>
            <Button style={"bg-white text-black"}>Clear</Button>
          </div>
        </div>

        <div className="mx-4 mt-4">
          <Table
            title="Danh sách bảng điểm"
            columns={columnsStudent}
            data={dataSelect?.dataStudents}
            groupButton={groupButton}
            dataScoreOther={
              <ScoreOther
                className={dataSelect?.dataTeacher?.NameClass}
                facultyName={dataSelect?.dataTeacher?.FacultyName}
                teacherName={dataSelect?.dataTeacher?.FullName}
              />
            }
            maxH={300}
          />
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import dữ liệu bảng điểm"}
          disableOkBtn={dataPreview.length < 1}
          onClickBtnOk={handleImportButtonClick}
          textOk={"Import"}
          onClickBtnCancel={() => {
            setShowModal(false);
            setFileName(null);
            setDataPreview([]);
          }}
        >
          <DragFile
            data={dataPreview?.dataMain?.filter((el) => !isNaN(el.Msv))}
            columns={columnsStudent}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageScore;
