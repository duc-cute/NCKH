/** @format */

import React from "react";
import { Button, InputField, Table, Tag } from "../../components";
import icons from "../../ultils/icons";

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
    statusFee: "Chưa Đóng",

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "1",
    sex: "male",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
  },
  {
    key: "2",
    name: "Nguyễn Hải",
    msv: 20211841,
    email: "20211842@eaut.edu.vn",
    statusFee: "Chưa Đóng",

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "0",
    sex: "female",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
  },
  {
    key: "3",
    name: "Nguyễn Thị Thu Hiền",
    msv: 20211841,
    email: "20211843@eaut.edu.vn",
    statusFee: "Đã Đóng",

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "0",
    sex: "male",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
  },
  {
    key: "4",
    name: "Nguyễn Thị Hà",
    msv: 20211841,
    email: "20211844@eaut.edu.vn",
    statusFee: "Đã Đóng",

    phone: "0888804085",
    class: "DCCNTT12.10.7",
    notPass: "1",
    sex: "female",
    country: "Hà Nội",
    gpa: "3.2",
    dateofbirth: "15-01-2003",
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
  { title: "Lớp", key: "class" },
  { title: "Email", key: "email" },
  { title: "Số điện thoại", key: "phone" },
  { title: "Số môn nợ", key: "notPass", sort: true },
  {
    title: "Tình trạng học phí",
    key: "statusFee",
    render: (status) => (
      <Tag status={`${status === "Đã Đóng" ? "" : "warning"}`}>{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
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
      <Button style={"py-[7px] text-white rounded-md "} icon={<CgImport />}>
        Import
      </Button>
    ),
  },
  {
    id: 3,
    button: (
      <Button style={"py-[7px] text-white rounded-md "} icon={<TiPlus />}>
        Thêm mới
      </Button>
    ),
  },
  {
    id: 4,
    button: (
      <Button
        style={"py-[7px] text-white rounded-md "}
        icon={<AiOutlineSend />}
      >
        Gửi cảnh báo
      </Button>
    ),
  },
];

const ManageStudent = () => {
  return (
    <div className=" h-[1000px]">
      <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
        <div className="flex gap-3 items-center justify-between pt-5  mb-6">
          <InputField name={"Họ Tên"} />
          <InputField name={"Email"} />
          <InputField name={"Mã Sinh Viên"} />
          <InputField name={"Lớp"} />
        </div>
        <div className="flex items-center gap-3 self-end">
          <Button>Search</Button>
          <Button style={"bg-white text-black"}>Clear</Button>
        </div>
      </div>
      <div className="mx-4 mt-4">
        <Table
          title="Danh sách sinh viên"
          columns={columns}
          data={data}
          groupButton={groupButton}
        />
      </div>
    </div>
  );
};

export default ManageStudent;
