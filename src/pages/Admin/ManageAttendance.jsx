import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import {
  Button,
  Table,
  SelectOption,
  Modal,
  DragFile,
  InputField,
} from "../../components";
import {
  apiImportAttendance,
  apiAllKey,
  apiAllFaculties,
  apiSelectInfoClass,
  apiSelectInfoSemester,
  apiSelectInfoCourse,
  apiDataAttendance,
} from "../../apis";
import { readFileDataAttendance } from "../../ultils/helper";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import { columnsAttendance } from "../../ultils/constant";
const { AiOutlineCloudUpload, CgImport } = icons;

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ManageAttendance = () => {
  // chọn năm học, học kỳ, khoa, lớp, môn học
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();
  const [selectedClassId, setSelectedClassId] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedSemesterValue, setSelectedSemesterValue] = useState();
  const [courceId, setCourceId] = useState();
  const [selectedClassValue, setSelectedClassValue] = useState();
  const [selectedFacultyValue, setSelectedFacultyValue] = useState();
  const [selectedCourseValue, setSelectedCourseValue] = useState();
  const [inputMsv, setInputMsv] = useState();

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});

  // state data
  const [courses, setCourses] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);

  // hàm xử lý import dữ liệu
  const handleImportButtonClick = useCallback(async () => {
    const response = await apiImportAttendance(dataImport);
    if (response.status === 200) {
      toast.success(response.message);
      setFileName(null);
      setDataPreview([]);
    } else toast.error(response.message);
  }, [dataPreview, fileName]);

  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataAttendance(
        fileValue,
        selectedFacultyValue,
        selectedClassValue,
        selectedSemesterValue,
        selectedCourseValue
      )
        .then((dataMain) => {
          setDataImport(dataMain);
          let dataFormat = dataMain.DataAttendance.map((data) => {
            const { Msv, FullName, DateOfBirth, Comment, Attendance } = data;
            let End = Attendance[Attendance.length - 1].Day;
            let Start = Attendance[0].Day;
            let totalPercentDateStudy = Attendance.reduce(
              (acc, curr) => {
                if (curr.AttendanceStatus !== "") acc++;
                return acc;
              },
              [0]
            );

            return {
              Msv,
              FullName,
              DateOfBirth,
              Comment,
              End,
              Start,
              totalPercentDateStudy: [totalPercentDateStudy, Attendance.length],
            };
          });
          setDataPreview(dataFormat);
        })
        .catch((error) => {
          console.error("Lỗi khi xem trước dữ liệu:", error);
        });
    },
    [
      dataPreview,
      selectedSemesterValue,
      selectedFacultyValue,
      selectedClassValue,
      selectedCourseValue,
    ]
  );

  async function exportToExcel(dataSelect) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Students");

    worksheet.columns = [
      { header: "Msv", key: "Msv", width: 10 },
      { header: "FullName", key: "FullName", width: 20 },
      { header: "Ngày bắt đầu", key: "Start", width: 10 },
      { header: "Ngày kết thúc", key: "End", width: 10 },
      { header: "Tổng số buổi nghỉ", key: "totalPercentDateStudy", width: 10 },
      { header: "Tổng số buổi học", key: "totalSessions", width: 10 },
      { header: "ghi chú", key: "Comment", width: 10 },
    ];

    dataSelect?.forEach((student) => {
      worksheet.addRow(student);
    });

    let buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "diemdanh.xlsx");
  }

  const handleExportClick = async () => {
    if (Array.isArray(dataSelect?.dataStudents)) {
      await exportToExcel(dataSelect?.dataStudents);
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

  // api data điểm danh student
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiDataAttendance(
        selectedFacultyId,
        selectedClassId,
        courceId,
        selectedSemesterValue,
        selectedSchoolYearId
      );

      if (res.status === 200) {
        const attendanceByStudent = res.data.reduce((acc, curr) => {
          if (!acc[curr.Msv]) {
            acc[curr.Msv] = {
              Msv: curr.Msv,
              FullName: curr.FullName,
              DateOfBirth: curr.DateOfBirth,
              Comment: curr.Comment,
              totalSessions: 0,
              attendedSessions: 0,
            };
          }

          acc[curr.Msv].totalSessions++;
          if (curr.AttendanceStatus !== "") {
            acc[curr.Msv].attendedSessions++;
          }

          return acc;
        }, {});

        const dataFormat = Object.values(attendanceByStudent).map(
          (student) => ({
            ...student,
            DateOfBirth: student.DateOfBirth
              ? moment(student.DateOfBirth).format("DD/MM/YYYY")
              : moment().format("DD/MM/YYYY"),
            Start: student.DateOfBirth
              ? moment(student.DateOfBirth)
                  .subtract(1, "months")
                  .format("DD/MM/YYYY")
              : moment().subtract(1, "months").format("DD/MM/YYYY"),
            End: student.DateOfBirth
              ? moment(student.DateOfBirth)
                  .add(1, "months")
                  .format("DD/MM/YYYY")
              : moment().add(1, "months").format("DD/MM/YYYY"),
            totalPercentDateStudy: `${student.attendedSessions}${3}`,
          })
        );

        setDataSelect({
          dataStudents: dataFormat,
        });
      }
    };

    fetchData();
  }, [
    selectedFacultyId,
    selectedClassId,
    courceId,
    selectedSemesterValue,
    selectedSchoolYearId,
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
            } else if (!selectedClassId) {
              toast.error("Vui lòng chọn lớp trước khi import");
            } else if (!selectedSemesterValue) {
              toast.error("Vui lòng chọn học kỳ trước khi import");
            } else if (!courceId) {
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
              style={`flex max-h-[40px] w-[683px]`}
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
            title="Danh sách điểm danh"
            columns={columnsAttendance}
            data={dataSelect?.dataStudents}
            groupButton={groupButton}
          />
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import dữ liệu điểm danh"}
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
            data={dataPreview}
            columns={columnsAttendance}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageAttendance;
