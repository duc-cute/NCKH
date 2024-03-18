/** @format */

import React, { useState, useCallback, useEffect } from "react";
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

const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
} = icons;

const ManageAttendance = () => {
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);

  // state data
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);

  // state id: id khoa, lớp, môn học
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);

  const handleChangeSchoolYear = (e) => {
    setSelectedSchoolYear(e.target.value);
  };

  const handleImportButtonClick = useCallback(async () => {
    const dataResponve = dataPreview;
    console.log(dataResponve);
    const response = await apiImportAttendance(dataResponve);
    if (response.status === 200) {
      toast.success(response.message);
      setFileName(null);
    } else toast.error(response.message);
  }, [dataPreview, fileName, selectedSchoolYear]);

  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataAttendance(fileValue, selectedSchoolYear)
        .then((dataMain) => {
          setDataPreview(dataMain);
        })
        .catch((error) => {
          console.error("Error while previewing data:", error);
        });
    },
    [dataPreview, selectedSchoolYear]
  );

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/attendance/all-faculty";
      const facultie = await apiAllFaculties(url);
      setFaculties(facultie?.data);
    };
    fetchData();
  }, []);

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
      const url = "v1/attendance/select-attendance";
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

  const data = [
    {
      key: "1",
      msv: 20211841,
      name: "Nguyễn Văn Đức",
      dateofbirth: "15-01-2003",
      attendant: true,
      totalPercentDateStudy: "60",
    },
    {
      key: "2",
      msv: 20211841,
      name: "Nguyễn Hải",
      dateofbirth: "15-01-2003",
      attendant: true,
      totalPercentDateStudy: "90",
    },
    {
      key: "3",
      msv: 20211841,
      name: "Nguyễn Thị Thu Hiền",
      dateofbirth: "15-01-2003",
      reason: true,
      totalPercentDateStudy: "70",
    },
    {
      key: "4",
      msv: 20211841,
      name: "Nguyễn Thị Hà",
      dateofbirth: "15-01-2003",
      late: true,
      totalPercentDateStudy: "50",
    },
  ];

  const columns = [
    {
      title: "Mã sinh viên",
      key: "msv",
      sort: true,
      render: (msv) => <span style={{ color: "#1677ff" }}>{msv}</span>,
    },
    { title: "Họ tên", key: "name" },
    { title: "Ngày sinh", key: "dateofbirth" },

    {
      title: "ngày học",
      key: "attendant",
      render: (status) => <RadioAttendance status={status} />,
    },
    {
      title: "Tổng số buổi nghỉ",
      key: "totalPercentDateStudy",
      sort: true,
      render: (total) => (
        <div className="flex items-center justify-center">
          <Tag status={+total > 80 ? "" : "warning"}>{total}/15</Tag>
        </div>
      ),
    },
    { title: "Ghi chú", key: "comment" },
  ];

  const schoolYear = [
    { key: 1, course: "Học kỳ 1 Năm học 2022-2023" },
    { key: 2, course: "Học kỳ 2 Năm học 2022-2023" },
    { key: 3, course: "Học kỳ 1 Năm học 2023-2024" },
    { key: 4, course: "Học kỳ 2 Năm học 2023-2024" },
    { key: 5, course: "Học kỳ 1 Năm học 2024-2025" },
    { key: 6, course: "Học kỳ 2 Năm học 2024-2025" },
  ];

  const groupButton = [
    {
      id: 1,
      button: <SelectOption name="Ngày điểm danh" />,
    },
    {
      id: 2,
      button: (
        <SelectOption
          name="Chọn học kỳ và năm học"
          data={schoolYear}
          displayField={"course"}
          onChange={handleChangeSchoolYear}
        />
      ),
    },
    {
      id: 3,
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
      id: 4,
      button: (
        <Button
          handleOnclick={() => {
            if (selectedSchoolYear == null) {
              alert("Vui lòng chọn khoá học và năm học trước khi import");
            } else {
              console.log(selectedSchoolYear);
              setShowModal(true);
            }
          }}
          style={"py-[7px] text-white rounded-md "}
          icon=<CgImport />
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
              name={"Chọn lớp"}
              data={classScores}
              displayField={"NameClass"}
              onChange={(event) => {
                setClassScoreId(event.target.value);
                setCourses([]);
              }}
            />

            <SelectOption
              name={"Chọn môn học"}
              data={courses}
              displayField={"NameCourse"}
              onChange={(event) => {
                setCourceScoreId(event.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-3 self-end">
            <Button>Search</Button>
            <Button style={"bg-white text-black"}>Clear</Button>
          </div>
        </div>
        <div className="mx-4 mt-4">
          <Table
            title="Danh sách điểm danh sinh viên"
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
          title={"Data Import Score"}
          // disableOkBtn={dataPreview.length < 1}
          onClickBtnOk={handleImportButtonClick}
          textOk={"Import"}
          onClickBtnCancel={() => {
            setShowModal(false);
            setFileName(null);
            setDataPreview([]);
          }}
        >
          <DragFile
            // data={dataPreview?.dataMain?.filter((el) => !isNaN(el.Msv))}
            // columns={columnsStudent}
            onChange={handlePreviewData}
            // fileName={fileName}
            // setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageAttendance;
