/** @format */

import React, { useState } from "react";
import {
  Button,
  InputField,
  RadioAttendance,
  Table,
  Tag,
} from "../../components";
import DatePicker from "react-datepicker";
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
    msv: 20211841,
    name: "Nguyễn Văn Đức",
    dateofbirth: "15-01-2003",
    sex: "male",
    email: "20211841@eaut.edu.vn",
    attendant: true,
    totalPercentDateStudy: "60",
  },
  {
    key: "2",
    msv: 20211841,
    name: "Nguyễn Hải",
    dateofbirth: "15-01-2003",
    sex: "female",
    email: "20211841@eaut.edu.vn",
    attendant: true,
    totalPercentDateStudy: "90",
  },
  {
    key: "3",
    msv: 20211841,
    name: "Nguyễn Thị Thu Hiền",
    dateofbirth: "15-01-2003",
    sex: "female",
    email: "20211841@eaut.edu.vn",
    reason: true,
    totalPercentDateStudy: "70",
  },
  {
    key: "4",
    msv: 20211841,
    name: "Nguyễn Thị Hà",
    dateofbirth: "15-01-2003",
    sex: "female",
    email: "20211841@eaut.edu.vn",
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
  { title: "Email", key: "email" },
  {
    title: "Có lí do",
    key: "reason",
    render: (status) => <RadioAttendance status={status} />,
  },
  {
    title: "Đi muộn",
    key: "late",
    render: (status) => <RadioAttendance status={status} />,
  },
  {
    title: "Không lí do",
    key: "notReason",
    render: (status) => <RadioAttendance status={status} />,
  },
  {
    title: "Đi học",
    key: "attendant",
    render: (status) => <RadioAttendance status={status} />,
  },
  {
    title: "Tổng số buổi học",
    key: "totalPercentDateStudy",
    sort: true,
    render: (total) => (
      <div className="flex items-center justify-center">
        <Tag status={+total > 80 ? "" : "warning"}>{total}%</Tag>
      </div>
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
        icon=<AiOutlineCloudUpload />
      >
        Export
      </Button>
    ),
  },
  {
    id: 2,
    button: (
      <Button style={"py-[7px] text-white rounded-md "} icon=<CgImport />>
        Import
      </Button>
    ),
  },
  {
    id: 3,
    button: (
      <Button style={"py-[7px] text-white rounded-md "} icon=<TiPlus />>
        Thêm mới
      </Button>
    ),
  },
  {
    id: 4,
    button: (
      <Button style={"py-[7px] text-white rounded-md "} icon=<AiOutlineSend />>
        Gửi cảnh báo
      </Button>
    ),
  },
];

const ManageAttendance = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className=" h-[1000px]">
      <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
        <div className="flex gap-3 items-center justify-between pt-5  mb-6">
          <InputField type="select" name={"Class"} />
          <InputField type="select" name={"Subject"} />
          <div className="flex-1 flex flex-col  ">
            <label className="block  font-medium text-gray-900 mb-1">
              Date
            </label>
            <div className="py-2 px-2 font-lato bg-white border border-gray-300 border-solid text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-blue-500">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
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
  );
};

export default ManageAttendance;
