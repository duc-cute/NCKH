/** @format */

import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  InputField,
  SelectOption,
  Table,
  Tag,
  InputForm,
  SelectLib,
} from "../../components";
import icons from "../../ultils/icons";
import { apiAllFaculties, apiClassById } from "../../apis";
import { useForm } from "react-hook-form";
import {
  levelColor,
  listStatusWarning,
  listStudentWarning,
} from "../../ultils/constant";
const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
} = icons;
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
  const [faculties, setFaculties] = useState([]);
  const [classScores, setClassScores] = useState([]);

  const [facultyId, setFacultyId] = useState(null);
  const [classScoreId, setClassScoreId] = useState(null);
  const [showDes, setShowDes] = useState(false);
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
        <span
          onClick={() => setShowDes(true)}
          className={`cursor-pointer ${
            item?.level ? levelColor[item.level - 1] : ""
          }`}
        >
          {msv}
        </span>
      ),
    },
    { title: "Họ tên", key: "name", sort: true },
    { title: "Lớp", key: "class" },
    { title: "Email", key: "email" },
    { title: "Số điện thoại", key: "phone" },
    {
      title: "Số Tín chỉ nợ",
      key: "notPass",
      sort: true,
      render: (number) => (
        <span className="flex items-center justify-center">{number}</span>
      ),
    },
    {
      title: "Số Kì học phí nợ",
      key: "statusFee",
      render: (number) => (
        <span className="flex items-center justify-center">{number}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <FiTrash2 color="red" />
          <LuPencilLine color="#1677ff" />
        </div>
      ),
    },
  ];

  const groupButton = [
    {
      id: 1,
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
        />
      ),
    },
    {
      id: 2,
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
      id: 3,
      button: (
        <Button style={"py-[7px] text-white rounded-md "} icon={<CgImport />}>
          Import
        </Button>
      ),
    },

    {
      id: 4,
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
  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-all-faculty";
      const facultie = await apiAllFaculties(url);
      setFaculties(facultie?.data);
    };
    fetchData();
  }, []);

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-class-by-id";
      const classScore = await apiClassById(url, facultyId);
      setClassScores(classScore?.data);
    };
    if (facultyId) fetchData();
  }, [facultyId]);

  return (
    <div className=" h-[1000px]">
      <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
        <div className="flex gap-3 items-center justify-between pt-5 ">
          <SelectOption
            style={`w-full`}
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
            style={`w-full`}
            name={"Chọn lớp"}
            data={classScores}
            displayField={"NameClass"}
            onChange={(event) => {
              setClassScoreId(event.target.value);
              setCourses([]);
            }}
          />
          <div className="flex items-center gap-3 self-end">
            <InputField
              placeholder={"Nhập mã sinh viên ..."}
              style={`flex max-h-[40px] w-[240px]`}
              name={"Mã sinh viên"}
            />
            <Button>Search</Button>
            <Button style={"bg-white text-black"}>Clear</Button>
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
      {showDes && (
        <Drawer
          style={"grid grid-cols-2 gap-x-5 gap-y-3"}
          title={"Info description student"}
          onClose={() => setShowDes(false)}
        >
          <InputForm
            id={"msv"}
            label={"Mã sinh viên"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"name"}
            label={"Name"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"email"}
            label={"Email"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"class"}
            label={"Lớp"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"address"}
            label={"Địa chỉ"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"phone"}
            label={"Số điện thoại"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"dateOfBirth"}
            label={"Ngày sinh"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"phoneOfRelatives"}
            label={"SDT người thân"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"tuitionDebt"}
            label={"Nợ Học phí"}
            register={register}
            errors={errors}
          />
          <InputForm
            id={"creditsDebt"}
            label={"Nợ tín chỉ"}
            register={register}
            errors={errors}
          />
        </Drawer>
      )}
    </div>
  );
};

export default ManageStudent;
