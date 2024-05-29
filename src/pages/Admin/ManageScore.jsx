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
  apiAllKey,
  apiAllFaculties,
  apiSelectInfoClass,
  apiDataPoint,
  apiImportScore,
  apiSelectInfoSemester,
  apiSelectInfoCourse,
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

  // state data
  const [courses, setCourses] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);

  // chọn năm học, học kỳ, khoa, lớp, môn học
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();
  const [selectedClassId, setSelectedClassId] = useState();

  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedSemesterValue, setSelectedSemesterValue] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [courseId, setCourseId] = useState();

  const [inputMsv, setInputMsv] = useState();

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

      console.log(dataMain);
      setDataPreview(dataMain);
    },
    [dataPreview]
  );

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

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-class-by-faculty-and-key";
      const classScore = await apiSelectInfoClass(
        url,
        selectedSchoolYearId,
        selectedFacultyId
      );
      setSelectedClass(classScore?.data);
    };
    fetchData();
  }, [selectedFacultyId, selectedSchoolYearId]);

  // api select option kỳ
  useEffect(() => {
    const fetchData = async () => {
      const semester = await apiSelectInfoSemester(selectedSchoolYearId);
      setSelectedSemester(semester?.data.listKy);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  // api select option môn học
  useEffect(() => {
    const fetchData = async () => {
      const course = await apiSelectInfoCourse(
        selectedFacultyId,
        selectedSchoolYearId,
        selectedSemesterValue
      );
      setCourses(course?.data);
    };
    fetchData();
  }, [selectedFacultyId, selectedSchoolYearId, selectedSemesterValue]);

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
            if (!selectedSchoolYearId) {
              toast.error("Vui lòng chọn khóa trước khi import");
            } else if (!selectedFacultyId) {
              toast.error("Vui lòng chọn khoa trước khi import");
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

  return (
    <>
      <div className=" h-[1000px]">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
          <div className="flex gap-3 items-center justify-between pt-5 mb-6">
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
              name={"Chọn lớp"}
              data={
                selectedClass
                  ? selectedClass.map((item) => {
                      return { id: item.ID, name: item.NameClass };
                    })
                  : []
              }
              onChange={(event) => {
                setSelectedClassId(event.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-3 ">
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
              onChange={(event) => {
                setSelectedSemesterValue(event.target.value);
              }}
            />

            <SelectOption
              style={`w-full`}
              name={"Chọn môn học"}
              data={
                courses
                  ? courses.map((item) => {
                      return { id: item.ID, name: item.NameCourse };
                    })
                  : []
              }
              onChange={(event) => {
                setCourseId(event.target.value);
              }}
            />

            <InputField
              placeholder={"Nhập mã sinh viên ..."}
              style={`flex max-h-[40px] w-[684px]`}
              name={"Mã sinh viên"}
              value={inputMsv}
              onChange={(e) => {
                setInputMsv(e.target.value);
              }}
            />
            <Button>Search</Button>
            <Button
              style={"bg-white text-black"}
              handleOnclick={() => {
                setInputMsv("");
              }}
            >
              Clear
            </Button>
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
