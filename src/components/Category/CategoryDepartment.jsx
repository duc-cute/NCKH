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
} from "..";

import icons from "../../ultils/icons";

const {
  MdOutlineSend,
  AiOutlineCloudUpload,
  CgImport,
  FiTrash2,
  LuPencilLine,
} = icons;

import { apiDataPoint } from "../../apis";

const CategoryDepartment = () => {
  const columns = [
    {
      title: "stt",
      key: "id",
      sort: true,
    },
    {
      title: "Tên khoa",
      key: "department",
      sort: true,
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

  const data = [
    {
      id: "1",
      department: "Công nghệ thông tin",
      hk: "Học kỳ 1",
    },
    {
      id: "2",
      department: "Công nghệ ô tô",
      hk: "Học kỳ 2",
    },
    {
      id: "3",
      department: "Quản trị kinh doanh",
      hk: "Học kỳ 1",
    },
    {
      id: "4",
      department: "Du lịch khách sạn",
      hk: "Học kỳ 2",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3"></div>

        <div className="flex gap-3">
          <InputField
            placeholder={"Nhập tên khoa ..."}
            style={`flex max-h-[37px] w-[500px]`}
            name={"Mã sinh viên"}
          />

          <Button
            style={"py-[7px] text-white rounded-md "}
            icon={<MdOutlineSend />}
          >
            Nhập
          </Button>

          <Button
            style={"py-[7px] text-white rounded-md "}
            icon={<AiOutlineCloudUpload />}
          >
            Export
          </Button>

          <Button style={"py-[7px] text-white rounded-md "} icon={<CgImport />}>
            Import
          </Button>
        </div>

        <div className="mt-12">
          <Table title="Danh sách khoa" columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default CategoryDepartment;
