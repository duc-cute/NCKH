/** @format */

import React, { useState } from "react";
import {
  Button,
  InputField,
  InputSearch,
  Modal,
  Table,
} from "../../components";
import icons from "../../ultils/icons";

const { TiPlus, LuPencilLine, IoClose, LuSettings, GiPadlock, GiPadlockOpen } =
  icons;
const data = [
  {
    no: 1,
    account: "Đức Nguyễn",
    fullName: "Nguyễn Văn Đức",
    lock: true,
    role: ["brand role", "view funds"],
    branch: "Đức Nguyễn branch",
    email: "ducnguyen15012003@gmail.com",
  },
  {
    no: 2,
    account: "Thu Hiền",
    fullName: "Nguyễn Thị Thu Hiền",
    lock: true,
    role: ["brand role", "view funds"],
    branch: "Thu Hiền branch",
    email: "thuhien15012003@gmail.com",
  },

  {
    no: 3,
    account: "Nguyễn Hoàng",
    fullName: "Nguyễn Văn Hoàng",
    lock: true,
    role: ["brand role", "view funds", "send mass mail"],
    branch: "Nguyễn Hoàng branch",
    email: "hoangnguyen15012003@gmail.com",
  },

  {
    no: 4,
    account: "Đào Thảo",
    fullName: "Đào Thị Thu Thảo",
    lock: true,
    role: ["send mass mail"],
    branch: "Đào Thảo branch",
    email: "thaonguyen15012003@gmail.com",
  },
];

const groupButton = [
  {
    id: 1,
    button: <InputSearch w={240} />,
  },
  {
    id: 2,
    button: (
      <Button style={"py-[7px] text-white rounded-md "} icon={<TiPlus />}>
        Thêm mới
      </Button>
    ),
  },
];

const dataRaw = [
  "customer management",
  "funds management",
  "view custom",
  "send mass mail",
  "update account status",
  "brand role",
  "view funds",
];
const Account = () => {
  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const handleSetSelectRow = (acc, index) => {
    if (index === 1) {
      setShow(true);
      setDataModal(() => ({ ...data.find((item) => item.account === acc) }));
    }
  };

  const columns = [
    {
      title: "No",
      key: "no",
      sort: true,
    },
    {
      title: "Account",
      key: "account",
      render: (acc, index) => (
        <span
          className="text-[#1677ff] cursor-pointer"
          onClick={() => handleSetSelectRow(acc, index)}
        >
          {acc}
        </span>
      ),
    },
    { title: "Full Name", key: "fullName" },
    {
      title: "Lock",
      key: "lock",
      render: (status) => (
        <span style={{ color: "#1677ff" }}>
          {status ? <GiPadlockOpen /> : <GiPadlock />}
        </span>
      ),
    },
    {
      title: "Roles",
      key: "role",
      render: (roles) =>
        roles.map((role, index) => (
          <div key={index} className="text-[14px] mb-1">
            {role}
          </div>
        )),
    },
    { title: "Branch", key: "branch" },
    { title: "Email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex items-center gap-3 cursor-pointer">
          <LuPencilLine color="#1677ff" />
          <LuSettings color="#ccc" />
          <IoClose color="red" />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className=" h-[1000px]">
        <div className="mx-4 mt-4">
          <Table
            columns={columns}
            title={"Account List"}
            data={data}
            groupButton={groupButton}
          />
        </div>
      </div>
      <Modal show={show} setShow={setShow} title="Account in Roles">
        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <div className="border border-solid border-[#e5e7eb] rounded-md min-h-[400px]">
              <h3 className="font-semibold mb-1 font-roboto py-4 px-3 border-b border-solid border-[#e5e7eb]">
                Roles for account: {dataModal?.account}
              </h3>
              <ul className="flex flex-col gap-3 leading-5 px-5 mt-5">
                {dataRaw.map((item, index) => (
                  <li key={index}>
                    <div className="flex items-center  rounded hover:bg-gray-100 ">
                      <input
                        type="checkbox"
                        value=""
                        checked={
                          dataModal?.role && dataModal.role.includes(item)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                        id="checkbox-item-11"
                      />
                      <label
                        htmlFor="checkbox-item-11"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded capitalize"
                      >
                        {item}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Account;
