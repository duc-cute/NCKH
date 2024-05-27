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
  apiAllKey,
} from "../../apis";
import { readFileDataAttendance } from "../../ultils/helper";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import { columnsAttendance } from "../../ultils/constant";
const { AiOutlineCloudUpload, CgImport } = icons;

const ManageAttendance = () => {
  // chọn năm học, học kỳ, khoa, lớp, môn học
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  // state id
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();
  const [classScoreId, setClassScoreId] = useState();
  const [courceScoreId, setCourceScoreId] = useState();

  console.log(classScoreId);

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});

  console.log("dataPreview", dataPreview);

  // state data
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
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
        selectedSchoolYearId,
        selectedFacultyId,
        classScoreId,
        selectedSemester,
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
      selectedFacultyId,
      classScoreId,
      selectedCourse,
    ]
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
      const url = "v1/class/select-class-by-faculty";
      const classScore = await apiClassById(url, selectedFacultyId);
      setSelectedClass(classScore?.data);
    };
    fetchData();
  }, [selectedFacultyId, selectedSchoolYear]);

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
        selectedFacultyId,
        classScoreId,
        courceScoreId
      );

      if (res.status === 200)
        dataFormat = res.data.DataAttendance.map((data) => {
          const { Msv, FullName, DateOfBirth, Comment, Attendance } = data;
          console.log("tt", Attendance[Attendance.length - 1]);
          let End = Attendance[Attendance.length - 1]?.Day;
          let Start = Attendance[0]?.Day;
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
    if (selectedFacultyId && classScoreId && courceScoreId) fetchData();
  }, [selectedFacultyId, classScoreId, courceScoreId]);

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
              style={`w-full`}
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
                setClassScoreId(event.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-3 ">
            <SelectOption
              style={`w-full`}
              name={"Chọn học kỳ"}
              // data={semester}
              displayField={"semester"}
              onChange={(event) => {
                // setSelectedSemester(event.target.value);
              }}
            />

            <SelectOption
              style={`w-full`}
              name={"Chọn học phần"}
              // data={courses}
              onChange={(event) => {}}
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
