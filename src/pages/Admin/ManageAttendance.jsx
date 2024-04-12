import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import {
  Button,
  ScoreOther,
  Table,
  SelectOption,
  Modal,
  DragFile,
  InputField,
  RadioAttendance,
  Tag,
} from "../../components";
import {
  apiImportAttendance,
  apiAllFaculties,
  apiClassById,
  apiCoursesById,
  apiDataPoint,
} from "../../apis";
import { readFileDataAttendance } from "../../ultils/helper";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import { columnsAttendance } from "../../ultils/constant";

const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
} = icons;

const ManageAttendance = () => {
  // chọn năm học, học kỳ, khoa, lớp, môn học
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  // state modal
  const [showModal, setShowModal] = useState(false);

  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});

  // state data
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);

  // state id: id khoa, lớp, môn học
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);

  // hàm xử lý import dữ liệu
  const handleImportButtonClick = useCallback(async () => {
    const response = await apiImportAttendance(dataImport);
    if (response.status === 200) {
      toast.success(response.message);
      setFileName(null);
      setDataPreview([]);
    } else toast.error(response.message);
  }, [dataPreview, fileName]);

  // hàm xử lý xem trước dữ liệu
  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataAttendance(
        fileValue,
        selectedSchoolYear,
        selectedSemester,
        selectedFaculty,
        selectedClass,
        selectedCourse
      )
        .then((dataMain) => {
          setDataImport(dataMain);
          console.log("data", dataMain);
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
      selectedSchoolYear,
      selectedSemester,
      selectedFaculty,
      selectedClass,
      selectedCourse,
    ]
  );

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/attendance/all-faculty";
      const facultie = await apiAllFaculties(url);
      setFaculties(facultie?.data);
    };
    fetchData();
  }, [dataImport]);

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/attendance/class-by-id-faculty";
      const classScore = await apiClassById(url, facultyId);
      setClassScores(classScore?.data);
    };
    if (facultyId) fetchData();
  }, [facultyId]);

  // api select option môn học
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/attendance/course-by-id-class";
      const course = await apiCoursesById(url, classScoreId);
      setCourses(course?.data);
    };
    if (classScoreId) fetchData();
  }, [classScoreId]);

  // api data point student
  useEffect(() => {
    const fetchData = async () => {
      let dataFormat = [];
      const url = "v1/attendance/select-attendance";
      const res = await apiDataPoint(
        url,
        facultyId,
        classScoreId,
        courceScoreId
      );

      if (res.status === 200)
        dataFormat = res.data.DataAttendance.map((data) => {
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
            DateOfBirth: moment(DateOfBirth).format("DD/MM/YYYY"),
            Comment,
            End: moment(End).format("DD/MM/YYYY"),
            Start: moment(Start).format("DD/MM/YYYY"),
            totalPercentDateStudy: [totalPercentDateStudy, Attendance.length],
          };
        });
      setDataSelect({
        dataStudents: dataFormat,
      });
    };
    if (facultyId && classScoreId && courceScoreId) fetchData();
  }, [facultyId, classScoreId, courceScoreId]);

  const schoolYear = [
    { key: 1, schoolYear: "2022" },
    { key: 2, schoolYear: "2023" },
    { key: 3, schoolYear: "2024" },
    { key: 4, schoolYear: "2025" },
    { key: 5, schoolYear: "2026" },
    { key: 6, schoolYear: "2027" },
    { key: 7, schoolYear: "2028" },
    { key: 8, schoolYear: "2029" },
    { key: 9, schoolYear: "2030" },
  ];

  const semester = [
    { key: 1, semester: 1 },
    { key: 2, semester: 2 },
  ];

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
              toast.error("Vui lòng chọn năm học trước khi import");
            } else if (!selectedSemester) {
              toast.error("Vui lòng chọn học kỳ trước khi import");
            } else if (!facultyId) {
              toast.error("Vui lòng chọn khoa trước khi import");
            } else if (!classScoreId) {
              toast.error("Vui lòng chọn lớp trước khi import");
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

  return (
    <>
      <div className=" h-[1000px]">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
          <div className="flex gap-3 items-center justify-between pt-5 mb-6">
            <SelectOption
              style={`w-full`}
              name={"Chọn năm học"}
              data={schoolYear}
              displayField={"schoolYear"}
              onChange={(event) => {
                setSelectedSchoolYear(event.target.value);
              }}
            />
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
          </div>

          <div className="flex items-center gap-3 ">
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
              style={`flex max-h-[40px] w-[683px]`}
              name={"Mã sinh viên"}
            />

            <Button>Search</Button>
            <Button style={"bg-white text-black"}>Clear</Button>
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
