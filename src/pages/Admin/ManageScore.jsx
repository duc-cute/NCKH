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

  // state data
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);
  const [courses, setCourses] = useState([]);

  // state id: id khoa, lớp, môn học
  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [courceScoreId, setCourceScoreId] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);

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
      Course: dataPreview.dataDescription[0],
      Teacher: dataPreview.dataDescription[1],
      Faculity: dataPreview.dataDescription[3],
      Class: dataPreview.dataDescription[2],
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

  console.log("filename: ", fileName);

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
          handleOnclick={() => setShowModal(true)}
          style={"py-[7px] text-white rounded-md "}
          icon=<CgImport />
        >
          Import
        </Button>
      ),
    },
  ];

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const facultie = await apiAllFaculties();
      setFaculties(facultie?.data);
    };
    fetchData();
  }, []);

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      const classScore = await apiClassById(facultyId);
      setClassScores(classScore?.data);
    };
    if (facultyId) fetchData();
  }, [facultyId]);

  // api select option môn học
  useEffect(() => {
    const fetchData = async () => {
      const course = await apiCoursesById(classScoreId);
      setCourses(course?.data);
    };
    if (classScoreId) fetchData();
  }, [classScoreId]);

  // api data point student
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiDataPoint(facultyId, classScoreId, courceScoreId);
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
          title={"Data Import Score"}
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
