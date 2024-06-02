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

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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
  const [inputMsv, setInputMsv] = useState();
  const [selectedFacultyValue, setSelectedFacultyValue] = useState();
  const [selectedClassValue, setSelectedClassValue] = useState();
  const [courceId, setCourceId] = useState();
  const [selectedCourseValue, setSelectedCourseValue] = useState();

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

    // trả data cần lấy
    const dataManageScore = {
      Course: selectedCourseValue,
      Teacher: dataPreview.dataDescription[1],
      Faculty: selectedFacultyValue,
      Class: selectedClassValue,
      TotalHours: +dataPreview.dataDescription[4],
      NumberOfCredits: +dataPreview.dataDescription[5],
      FinalExamDate: "2022-02-01",
      DataStudents: DataStudents,
      DataPoint: DataPoint.map((point) => ({
        ...point,
        Frequent: parseFloat(point.Frequent),
        MidtermScore: parseFloat(point.MidtermScore),
        FinalExamScore: parseFloat(point.FinalExamScore),
        AverageScore: parseFloat(point.AverageScore),
        Scores: parseFloat(point.Scores),
      })),
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
      setDataPreview(dataMain);
    },
    [dataPreview]
  );

  async function exportToExcel(dataSelect) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Students");

    worksheet.columns = [
      { header: "Msv", key: "Msv", width: 10 },
      { header: "FullName", key: "FullName", width: 20 },
      { header: "Giới tính", key: "Gender", width: 10 },
      { header: "Điểm chuyên cần", key: "Frequent", width: 10 },
      { header: "Điểm giữa kỳ", key: "MidtermScore", width: 10 },
      { header: "Điểm cuối kỳ", key: "FinalExamScore", width: 10 },
      { header: "Điểm trung bình", key: "AverageScore", width: 10 },
      { header: "Điểm số", key: "Scores", width: 10 },
      { header: "Điểm chữ", key: "LetterGrades", width: 10 },
      { header: "mô đun điểm", key: "scoreModule", width: 10 },
      { header: "ghi chú", key: "Note", width: 10 },
    ];

    dataSelect?.forEach((student) => {
      worksheet.addRow(student);
    });

    let buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "diemhoctap.xlsx");
  }

  const handleExportClick = async () => {
    if (dataSelect !== null && dataSelect.length > 0) {
      await exportToExcel(dataSelect);
    } else {
      toast.error("Không có dữ liệu để xuất file");
    }
  };

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

  // api data point
  useEffect(() => {
    const fetchData = async () => {
      const course = await apiDataPoint(
        selectedSchoolYearId,
        selectedClassId,
        selectedFacultyId,
        courceId,
        selectedSemesterValue
      );
      setDataSelect(course?.data);
    };
    fetchData();
  }, [
    selectedSchoolYearId,
    selectedFacultyId,
    selectedClassId,
    courceId,
    selectedSemesterValue,
  ]);

  const groupButton = [
    {
      id: 1,
      button: (
        <Button
          style={"py-[7px] text-white rounded-md "}
          icon={<AiOutlineCloudUpload />}
          handleOnclick={handleExportClick}
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
                const selectedId = Number(event.target.value);
                const selectedItem = selectedFaculty.find(
                  (item) => item.ID === selectedId
                );
                if (selectedItem) {
                  setSelectedFacultyValue(selectedItem.FacultyName);
                }
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
                const selectedId = Number(event.target.value);
                const selectedItem = selectedClass.find(
                  (item) => item.ID === selectedId
                );
                if (selectedItem) {
                  setSelectedClassValue(selectedItem.NameClass);
                }
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
                setCourceId(event.target.value);
                const selectedId = Number(event.target.value);
                const selectedItem = courses.find(
                  (item) => item.ID === selectedId
                );
                if (selectedItem) {
                  setSelectedCourseValue(selectedItem.NameCourse);
                }
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
            data={dataSelect}
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
