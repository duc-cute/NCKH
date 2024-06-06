import React, { useEffect, useState, useCallback } from "react";

import {
  Button,
  InputField,
  SelectOption,
  Table,
  Modal,
  DragFile,
} from "../../components";

import icons from "../../ultils/icons";
import {
  apiAllKey,
  apiAllFaculties,
  apiImportProgram,
  apiBlockProgram,
  apiGetDataProgram,
  apiAllFacultieGetName,
} from "../../apis";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { importProgram } from "../../ultils/helper";
const { AiOutlineCloudUpload, CgImport } = icons;

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ManageCourse = () => {
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();
  const [inputCourseCode, setInputCourseCode] = useState();
  const [blockProgram, setBlockProgram] = useState();
  const [blockProgramId, setBlockProgramId] = useState();
  const [dataProgram, setDataProgram] = useState();

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});

  // handle import
  const handleImportButtonClick = useCallback(async () => {
    const response = await apiImportProgram(dataImport);
    if (response.status === 200) {
      toast.success("Import dữ liệu thành công !");
      setFileName(null);
      setDataPreview([]);
    } else toast.error("Import dữ liệu thất bại !");
  }, [dataPreview, fileName, dataImport]);

  const handlePreviewData = useCallback(
    (fileValue) => {
      importProgram(fileValue)
        .then((dataMain) => {
          const data = dataMain.dataMain;
          if (!Array.isArray(data)) {
            console.error("Data is not an array");
            return;
          }

          const transformedData = {
            NameStudyPrograms: data[0]["Ngành học"],
            Key: data[0]["Khóa"],
            IDFaculty: selectedFacultyId,
            DataCourse: data.reduce((acc, curr) => {
              const existingBlock = acc.find(
                (block) => block.BlockKnowledge === curr["Khối đào tạo"]
              );

              const course = {
                STT: curr.stt,
                MHP: curr["Mã học phần"],
                TENHP: curr["Tên học phần"],
                STC: curr["Số tín chỉ"],
                LT_BT: curr["LT, BT"],
                TH: curr.TH,
                DAMH_BTL: curr["ĐAMH/ BTL"],
                KLTN_DATN_TT: curr["ĐAMH/ BTL_1"],
                GIO_TH: curr["Số giờ tự học"],
                MHPKQ: curr["Mã học phần"],
                HK: curr["Học kỳ"],
              };

              if (existingBlock) {
                existingBlock.STC += curr["Số tín chỉ"];
                existingBlock.value.push(course);
              } else {
                acc.push({
                  BlockKnowledge: curr["Khối đào tạo"],
                  STC: curr["Số tín chỉ"],
                  value: [course],
                });
              }

              return acc;
            }, []),
          };

          const dataPreview = transformedData.DataCourse.map((value) => {
            return value.value;
          });

          const mergedDataPreview = dataPreview.reduce((acc, curr) => {
            return acc.concat(curr);
          }, []);

          setDataImport(transformedData);
          setDataPreview(mergedDataPreview);

          console.log("transformedData, ", transformedData);
          console.log("mergedDataPreview, ", mergedDataPreview);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    [dataPreview, selectedFacultyId]
  );

  // xử lý export
  async function exportToExcel(dataProgram) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Students");

    worksheet.columns = [
      { header: "Stt", key: "STT", width: 5 },
      { header: "Mã Học Phần", key: "CourseCode", width: 20 },
      { header: "Tên Học Phần", key: "NameCourse", width: 10 },
      { header: "Số Tín Chỉ", key: "NumberOfCredits", width: 10 },
      { header: "Số Giờ Tự Học", key: "SelfLearning", width: 10 },
      { header: "Học Kỳ", key: "Semester", width: 10 },
      { header: "LT, BT", key: "ExerciseTheory", width: 10 },
      { header: "ĐAMH/ BTL", key: "SpecializedProjects", width: 10 },
      { header: "KLTN/ ĐATN/ TT", key: "BigExercise", width: 10 },
      { header: "Mô Tả", key: "Describe", width: 10 },
    ];

    dataProgram?.forEach((student) => {
      worksheet.addRow(student);
    });

    let buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "chuongtrinhdaotao.xlsx");
  }

  const handleExportClick = async () => {
    if (Array.isArray(dataProgram)) {
      await exportToExcel(dataProgram);
    } else {
      toast.error("Không có dữ liệu để xuất file");
    }
  };

  const columns = [
    { title: "stt", key: "STT", sort: true },
    {
      title: "Mã học phần",
      key: "CourseCode",
      sort: true,
    },
    { title: "Tên học phần", key: "NameCourse", sort: true },
    { title: "Số tín chỉ", key: "NumberOfCredits" },
    { title: "Số giờ tự học", key: "SelfLearning" },
    { title: "Học kỳ", key: "Semester" },
    { title: "LT, BT", key: "ExerciseTheory" },
    { title: "ĐAMH/ BTL", key: "SpecializedProjects" },
    { title: "KLTN/ ĐATN/ TT", key: "BigExercise" },
    { title: "Mô tả", key: "Describe" },
  ];

  const columnPreview = [
    { title: "stt", key: "STT", sort: true },
    {
      title: "Mã học phần",
      key: "MHP",
      sort: true,
    },
    { title: "Tên học phần", key: "TENHP", sort: true },
    { title: "Số tín chỉ", key: "STC" },
    { title: "Số giờ tự học", key: "GIO_TH" },
    { title: "Học kỳ", key: "HK" },
    { title: "LT, BT", key: "LT_BT" },
    { title: "ĐAMH/ BTL", key: "DAMH_BTL" },
    { title: "KLTN/ ĐATN/ TT", key: "KLTN_DATN_TT" },
  ];

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
      const facultie = await apiAllFacultieGetName();
      setSelectedFaculty(facultie?.data);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  // api select option khối đào tạo
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiBlockProgram(
        selectedFacultyId,
        selectedSchoolYearId
      );
      setBlockProgram(data?.data);
    };
    fetchData();
  }, [selectedSchoolYearId, selectedFacultyId]);

  // api select tất cả dữ liệu chương trình đào tạo
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiGetDataProgram(blockProgramId);
      setDataProgram(data?.data);
    };
    fetchData();
  }, [selectedSchoolYearId, selectedFacultyId, blockProgramId]);

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
          handleOnclick={handleExportClick}
        >
          Export
        </Button>
      ),
    },
    {
      id: 3,
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
              name={"Chọn khối đào tạo"}
              data={
                blockProgram
                  ? blockProgram.map((item) => {
                      return { id: item.ID, name: item.NameBlockKnowledge };
                    })
                  : []
              }
              onChange={(event) => {
                setBlockProgramId(event.target.value);
              }}
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
            data={dataProgram}
            groupButton={groupButton}
          />
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import dữ liệu khung chương trình đào tạo"}
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
            columns={columnPreview}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageCourse;
