/** @format */

import React, { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import icons from "../../ultils/icons";
const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
} = icons;
import {
  Button,
  ScoreOther,
  InputField,
  Table,
  Tag,
  InputFile,
  SelectOption,
} from "../../components";
import {
  apiImportScore,
  getAllFaculties,
  getClassById,
  getcoursesById,
  getDataPoint,
} from "../../apis";

const ManageScore = () => {
  const fileInputRef = useRef(null);
  const handleFileChange = () => {
    const inputValue = fileInputRef.current.getInputValue();
    console.log("Giá trị của input:", inputValue);
  };

  const handleImportButtonClick = () => {
    const fileValue = fileInputRef.current.getInputValue();
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // chọn vị trí cụ thể và tìm kiếm từ khóa cụ thể cho các thông tin trong file excel
      const cellPositions = ["A8", "A9", "A10", "D10", "I8", "I9", "I10"];
      const infoScore = cellPositions.map((cellPos) => {
        const cell = XLSX.utils.decode_cell(cellPos);
        const value = worksheet[XLSX.utils.encode_cell(cell)]?.v || null;
        return value ? value.trim() : null;
      });

      const transformedInfoScore = infoScore.map((item) => {
        if (item) {
          const [, value] = item.split(":");
          return value.trim();
        }
        return null;
      });

      // đọc data student và điểm student từ file excel
      const inFoStudentAndPoint = XLSX.utils.sheet_to_json(worksheet, {
        header: [
          "stt",
          "studentCode",
          "name",
          "gender",
          "attendanceScore",
          "midtermScore",
          "examScore",
          "averageScore",
          "letterGrade",
          "numericGrade",
          "scoreModule",
          "note",
        ],
        range: 12,
        cellText: true,
      });

      // tách dữ liệu sinh viên và điểm của sinh viên
      const DataStudents = [];
      const DataPoint = [];

      // lặp qua inFoStudentAndPoint đọc từ excel để push các giá trị vào mảng được tách
      // nếu không tồn tại msv, name, gender thì dừng vòng lặp
      for (const item of inFoStudentAndPoint) {
        if (!item.studentCode || !item.name || !item.gender) {
          break;
        }

        DataStudents.push({
          Msv: item.studentCode,
          FullName: item.name,
          Gender: item.gender,
        });

        DataPoint.push({
          Frequent: +item.attendanceScore,
          MidtermScore: +item.midtermScore,
          FinalExamScore: +item.examScore,
          AverageScore: +item.averageScore,
          Scores: +item.numericGrade,
          LetterGrades: item.letterGrade,
          Note: item.note,
        });
      }

      // trả data cần lấy
      const dataManageScore = {
        Course: transformedInfoScore[0],
        Teacher: transformedInfoScore[1],
        Faculity: transformedInfoScore[3],
        Class: transformedInfoScore[2],
        TotalHours: +transformedInfoScore[4],
        NumberOfCredits: +transformedInfoScore[5],
        FinalExamDate: transformedInfoScore[6],
        DataStudents: DataStudents,
        DataPoint: DataPoint,
      };

      console.log("response data to server: ", dataManageScore);

      // import data
      apiImportScore(dataManageScore)
        .then((response) => {
          console.log("Server response:", response.status);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    };
    reader.readAsBinaryString(fileValue);
  };

  // state data
  const [loading, setLoading] = useState(true);
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [courses, setCourses] = useState([]);

  // state id: id khoa, lớp, môn học
  const [facultyId, setFacultyId] = useState();
  const [classScoreId, setClassScoreId] = useState();
  const [courceScoreId, setCourceScoreId] = useState();

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultie = await getAllFaculties();
        setFaculties(facultie);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classScore = await getClassById(facultyId);
        setClassScores(classScore);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [facultyId]);

  // api select option môn học
  useEffect(() => {
    const fetchData = async () => {
      try {
        const course = await getcoursesById(classScoreId);
        setCourses(course);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [classScoreId]);

  // api data point student
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPoint = await getDataPoint(
          facultyId,
          classScoreId,
          courceScoreId
        );
        console.log("dữ liệu điểm của sinh viên: ", dataPoint);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [facultyId, classScoreId, courceScoreId]);

  const data = [
    {
      key: "1",
      name: "mạnh",
      msv: 20211841,
      sex: "male",
      attendanceScore: 8,
      midtermScore: 9,
      testMarks: 10,
      courseAverage: 8,
      letterGrade: "A",
      scores: 9,
      note: "Không",
    },
  ];

  const columns = [
    {
      title: "Mã sinh viên",
      key: "msv",
      sort: true,
      render: (msv) => (
        <span className="text-[#1677ff] cursor-pointer">{msv}</span>
      ),
    },
    { title: "Họ tên", key: "name" },
    { title: "Giới tính", key: "sex" },
    { title: "Điểm chuyên cần", key: "attendanceScore" },
    { title: "Điểm giữa kỳ", key: "midtermScore" },
    { title: "Điểm thi", key: "testMarks" },
    { title: "TBCHP", key: "courseAverage" },
    { title: "Điểm chữ", key: "letterGrade" },
    { title: "Điểm số", key: "scores" },
    { title: "Ghi chú", key: "note" },
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
          handleOnclick={handleImportButtonClick}
          style={"py-[7px] text-white rounded-md "}
          icon=<CgImport />
        >
          Import
        </Button>
      ),
    },
    {
      id: 3,
      button: <InputFile ref={fileInputRef} onChange={handleFileChange} />,
    },
  ];

  return (
    <div className=" h-[1000px]">
      <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
        <div className="flex gap-3 items-center justify-between pt-5 mb-6">
          <SelectOption
            name={"Chọn khoa"}
            loading={loading}
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
            loading={loading}
            data={classScores}
            displayField={"NameClass"}
            onChange={(event) => {
              setClassScoreId(event.target.value);
              setCourses([]);
            }}
          />

          <SelectOption
            name={"Chọn môn học"}
            loading={loading}
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
          title="Danh sách bảng điểm"
          columns={columns}
          data={data}
          groupButton={groupButton}
          dataScoreOther={<ScoreOther />}
        />
      </div>
    </div>
  );
};

export default ManageScore;
