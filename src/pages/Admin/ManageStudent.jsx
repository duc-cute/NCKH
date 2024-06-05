/** @format */

import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Drawer,
  InputField,
  SelectOption,
  Table,
  Tag,
  InputForm,
  SelectLib,
  Modal,
  DragFile,
} from "../../components";
import icons from "../../ultils/icons";
import {
  apiAllKey,
  apiAllFaculties,
  apiSelectInfoClass,
  apiImportStudent,
  apiDataStudent,
} from "../../apis";
import useDebounce from "../../hooks/useDebounce";

import { useForm } from "react-hook-form";
import {
  levelColor,
  listStatusWarning,
  listStudentWarning,
  warningLevel,
} from "../../ultils/constant";
const { AiOutlineCloudUpload, AiOutlineSend, CgImport } = icons;

import { readFileDataImport } from "../../ultils/helper";

import { toast } from "react-toastify";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {
  apiGetAllStudentWarning,
  apiGetAllWarning,
  apiGetStudentWarning,
} from "../../apis/warning";

const ManageStudent = () => {
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();
  const [selectedClassId, setSelectedClassId] = useState();
  const [studentArray, setStudentArray] = useState([]);

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});
  const [inputMsv, setInputMsv] = useState("");
  const [listWarning, setListWarning] = useState([]);
  let debounceSearch = useDebounce(inputMsv, 500);

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm();

  const columns = [
    { title: "msv", key: "Msv" },
    { title: "Họ tên", key: "FullName" },
    { title: "Ngày sinh", key: "DateOfBirth" },
    { title: "Giới tính", key: "Gender" },
    { title: "Khóa", key: "Key" },
    { title: "status", key: "status" },
    { title: "Số điện thoại", key: "PhoneNumber" },
    { title: "Số tín chỉ nợ", key: "STC_NO" },
  ];

  const columnsPreview = [
    { title: "Tên khoa", key: "TenKhoa" },
    { title: "Tên lớp", key: "TenLop" },
    { title: "msv", key: "Msv" },
    { title: "Họ tên", key: "HoTen" },
    { title: "Ngày sinh", key: "NgaySinh" },
    { title: "Giới tính", key: "GioiTinh" },
    { title: "Dân tộc", key: "DanToc" },
    { title: "Quê quán", key: "QueQuan" },
    { title: "Nơi thường trú", key: "NTT" },
    { title: "Email", key: "Email" },
    { title: "Số điện thoại", key: "SDT" },
    { title: "Người giám hộ 1", key: "NguoiThan1.TenNT" },
    { title: "Quan hệ GH 1", key: "NguoiThan1.QuanHe" },
    { title: "SDT GH 1", key: "NguoiThan1.SDT" },
    { title: "Người giám hộ 2", key: "NguoiThan2.TenNT" },
    { title: "Quan hệ GH 2", key: "NguoiThan2.QuanHe" },
    { title: "SDT GH 2", key: "NguoiThan2.SDT" },
  ];

  const fetchDataAfterWarning = async (id) => {
    let res;
    if (id) {
      if (id === "all") res = await apiGetAllStudentWarning();
      else res = await apiGetStudentWarning(id);
      if (res?.status === 200) {
        let data = res?.data?.map((item) => {
          if (item?.STC_NO?.length > 0) {
            const STC_NO = item?.STC_NO?.reduce((acc, curr) => {
              return acc + curr?.NumberOfCredits;
            }, 0);
            console.log("STC_NO", STC_NO);

            return { ...item, STC_NO };
          }
        });

        setStudentArray([...data]);
      }
    } else {
      setStudentArray([]);
    }
  };

  useEffect(() => {
    fetchDataAfterWarning(watch("warwning"));
  }, [watch("warwning")]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiGetAllWarning();
      if (res?.status === 200) {
        const listWarningFormat = res?.data?.map((item) => ({
          id: item?.ID,
          label: item?.NameWarning,
        }));
        setListWarning([
          ...listWarningFormat,
          { id: "all", label: "Tất cả sinh viên bị cảnh báo" },
        ]);
      }
    };
    fetchData();
  }, []);

  // handle import
  const handleImportButtonClick = useCallback(async () => {
    const response = await apiImportStudent(dataImport);
    if (response.status === 200) {
      toast.success("Import dữ liệu thành công !");
      setFileName(null);
      setDataPreview([]);
    } else toast.error("Import dữ liệu thất bại !");
  }, [dataPreview, fileName]);

  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataImport(fileValue)
        .then((dataMain) => {
          let dataFormat = Array.isArray(dataMain.dataMain)
            ? dataMain.dataMain.map((data) => {
                let date = new Date("1899-12-30");
                date.setDate(date.getDate() + data["Ngày sinh"]);
                return {
                  TenKhoa: data["Khoa"],
                  TenLop: data["Lớp"],
                  Msv: String(data["msv"]),
                  HoTen: data["Họ và tên"],
                  NgaySinh: date.toISOString().slice(0, 10),
                  GioiTinh: data["Giới tính"],
                  DanToc: data["Dân tộc"],
                  QueQuan: data["Quê quán"],
                  NTT: data["Nơi thường trú"],
                  Email: data["Email"],
                  SDT: data["sdt sv"],
                  NguoiThan: [
                    {
                      TenNT: data["Người giám hộ 1"],
                      QuanHe: data["Vai trò gh 1"],
                      SDT: data["sdt gh 1"],
                    },
                    {
                      TenNT: data["Người giám hộ 2"],
                      QuanHe: data["Vai trò gh 2"],
                      SDT: data["sdt gh 2"],
                    },
                  ],
                };
              })
            : [];

          const processedData = dataFormat.map((item) => {
            const { NguoiThan, ...otherProps } = item;
            const flattenedItem = { ...otherProps };

            NguoiThan.forEach((nt, index) => {
              flattenedItem[`NguoiThan${index + 1}.TenNT`] = nt.TenNT;
              flattenedItem[`NguoiThan${index + 1}.QuanHe`] = nt.QuanHe;
              flattenedItem[`NguoiThan${index + 1}.SDT`] = nt.SDT;
            });

            return flattenedItem;
          });

          setDataImport(dataFormat);
          setDataPreview(processedData);
        })
        .catch((error) => {
          toast.error("File không đúng định dạng !");
        });
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

  // api data student
  useEffect(() => {
    const fetchData = async () => {
      const dataStudents = await apiDataStudent(
        selectedSchoolYearId,
        selectedFacultyId,
        selectedClassId
      );

      if (dataStudents?.data && dataStudents.data.length > 0) {
        setStudentArray(dataStudents.data.map((item) => item.student));
      }
    };

    fetchData();
  }, [selectedSchoolYearId, selectedFacultyId, selectedClassId]);

  async function exportToExcel(studentArray) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Students");

    worksheet.columns = [
      { header: "Msv", key: "Msv", width: 10 },
      { header: "FullName", key: "FullName", width: 20 },
      { header: "Email", key: "Email", width: 10 },
      { header: "Ngày sinh", key: "DateOfBirth", width: 10 },
      { header: "Khóa", key: "Key", width: 10 },
      { header: "Trạng thái", key: "status", width: 10 },
      { header: "Số điện thoại", key: "PhoneNumber", width: 10 },
      { header: "Số tín chỉ nợ", key: "STC_NO", width: 10 },
      { header: "Nợ học phần", key: "NO_HP", width: 10 },
    ];

    studentArray.forEach((student) => {
      worksheet.addRow(student);
    });

    let buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Students.xlsx");
  }

  const handleExportClick = () => {
    if (studentArray && studentArray.length > 0) {
      exportToExcel(studentArray);
    } else {
      toast.error("Bạn chưa có dữ liệu để xuất");
    }
  };

  const groupButton = [
    {
      id: 1,
      button: (
        <SelectLib
          options={listWarning}
          register={register}
          id={"warwning"}
          setValue={setValue}
          placeholder={
            <span className="text-sm text-[#808080] font-normal">
              Chọn danh sách sinh viên đang bị cảnh báo
            </span>
          }
          isClearable={true}
          errors={errors}
        />
      ),
    },
    // {
    //   id: 2,
    //   button: (
    //     <SelectLib
    //       options={listStudentWarning}
    //       register={register}
    //       id={"listStudent"}
    //       setValue={setValue}
    //       placeholder={
    //         <span className="text-sm text-[#808080] font-normal">
    //           Chọn Danh Sách Sinh Viên
    //         </span>
    //       }
    //       isClearable={true}
    //       errors={errors}
    //     />
    //   ),
    // },
    {
      id: 3,
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
      id: 4,
      button: (
        <Button
          style={"py-[7px] text-white rounded-md "}
          icon={<CgImport />}
          handleOnclick={() => {
            setShowModal(true);
          }}
        >
          Import
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const dataStudents = await apiDataStudent(
        selectedSchoolYearId,
        selectedFacultyId,
        selectedClassId
      );

      if (dataStudents?.data && dataStudents?.data?.length > 0) {
        setStudentArray(
          dataStudents.data
            .map((item) => item.student)
            ?.filter((item) => item?.Msv?.includes(debounceSearch))
        );
      }
    };

    fetchData();
  }, [debounceSearch]);
  return (
    <div className=" h-[1000px]">
      <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
        <div className="flex gap-3 items-center justify-between pt-5 ">
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

          <div className="flex items-center gap-3 self-end">
            <InputField
              placeholder={"Nhập mã sinh viên ..."}
              style={`flex max-h-[40px] w-[240px]`}
              name={"Mã sinh viên"}
              value={inputMsv}
              onChange={(e) => setInputMsv(e.target.value)}
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
      </div>
      <div className="mx-4 mt-4 ">
        <Table
          title="Danh sách sinh viên"
          columns={columns}
          data={studentArray || []}
          groupButton={groupButton}
        />
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import dữ liệu sinh viên"}
          disableOkBtn={dataPreview?.length < 1}
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
            columns={columnsPreview}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </div>
  );
};

export default ManageStudent;
