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
} from "../../apis";
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

const data = [
  {
    key: "1",
    name: "Nguyễn Văn Đức",
    msv: 20211841,
    email: "20211841@eaut.edu.vn",
    statusFee: 0,

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "1",
    sex: "male",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
    level: 1,
  },
  {
    key: "2",
    name: "Nguyễn Hải",
    msv: 20211844,
    email: "20211842@eaut.edu.vn",
    statusFee: 2,

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "0",
    sex: "female",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
    level: 2,
  },
  {
    key: "3",
    name: "Nguyễn Thị Thu Hiền",
    msv: 20211873,
    email: "20211843@eaut.edu.vn",
    statusFee: 1,

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "0",
    sex: "male",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
    level: 2,
  },
  {
    key: "4",
    name: "Nguyễn Thị Hà",
    msv: 20211848,
    email: "20211844@eaut.edu.vn",
    statusFee: 0,

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "1",
    sex: "female",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
    level: 4,
  },
];

const ManageStudent = () => {
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();
  const [selectedClassId, setSelectedClassId] = useState();

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});

  const [inputMsv, setInputMsv] = useState("");

  const [chooseWarning, setChooseWarning] = useState(null);

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
    {
      title: (
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4  bg-gray-100 border-gray-300 rounded   "
          />
        </div>
      ),
      key: "msv",
      render: (msv) => (
        <input
          value={msv}
          type="checkbox"
          className="w-4 h-4  bg-gray-100 border-gray-300 rounded "
        />
      ),
    },

    {
      title: "Mã sinh viên",
      key: "msv",
      sort: true,
      render: (msv, item) => (
        <span className={` ${item?.level ? levelColor[item.level - 1] : ""}`}>
          {msv}
        </span>
      ),
    },
    { title: "Họ tên", key: "name" },
    { title: "Ngày sinh", key: "class" },
    { title: "Giới tính", key: "email" },
    { title: "Dân tộc", key: "phone" },
    { title: "Quê quán", key: "class" },
    { title: "Nơi thường trú", key: "email" },
    { title: "Email", key: "phone" },
    { title: "Số điện thoại", key: "class" },
    { title: "Người giám hộ 1", key: "email" },
    { title: "Quan hệ GH 1", key: "phone" },
    { title: "SDT GH 1", key: "phone" },
    { title: "Người giám hộ 2", key: "email" },
    { title: "Quan hệ GH 2", key: "phone" },
    { title: "SDT GH 2", key: "phone" },
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

  const groupButton = [
    {
      id: 1,
      button: (
        <SelectLib
          options={warningLevel}
          register={register}
          id={"listStudent"}
          setValue={setValue}
          placeholder={
            <span className="text-sm text-[#808080] font-normal">
              Chọn mức cảnh báo
            </span>
          }
          isClearable={true}
          errors={errors}
        />
      ),
    },
    {
      id: 2,
      button: (
        <SelectLib
          options={listStudentWarning}
          register={register}
          id={"listStudent"}
          setValue={setValue}
          placeholder={
            <span className="text-sm text-[#808080] font-normal">
              Chọn Danh Sách Sinh Viên
            </span>
          }
          isClearable={true}
          errors={errors}
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

    {
      id: 5,
      button: (
        <Button
          dropdown={true}
          listWarning={listStatusWarning}
          style={"py-[7px] text-white rounded-md "}
          icon={<AiOutlineSend />}
        >
          Gửi cảnh báo
        </Button>
      ),
    },
  ];

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
          data={data}
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
