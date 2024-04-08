/** @format */

import React, { useState } from "react";
import { Button, InputSearch, Modal, Table } from "../../components";
import icons from "../../ultils/icons";

const { TiPlus, LuPencilLine, IoClose, LuSettings } = icons;
const data = [
  {
    no: 1,
    role: "Customer management",
    description: "View,update customer infomation,send mass mail",
  },
  {
    no: 2,
    role: "Funds management",
    description: "View and approve deposit,send mass mail",
  },
  {
    no: 3,
    role: "View Custom ,send mass mail",
    description: "View only ,send mess mail",
  },
  {
    no: 4,
    role: "Update Account status",
    description: "Can update MT4 account status only",
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
  {
    id: 1,
    module: "User management",
    func: [
      {
        name: "User Permission",
        check: true,
      },
      {
        name: "View User",
        check: true,
      },
      {
        name: "Delete User",
        check: false,
      },
      {
        name: "Create User",
        check: false,
      },
      {
        name: "Reset Password",
        check: false,
      },
      {
        name: "Edit User",
        check: true,
      },
    ],
  },
  {
    id: 2,
    module: "Role management",
    func: [
      {
        name: "User Permission",
        check: false,
      },
      {
        name: "View User",
        check: false,
      },
      {
        name: "Delete User",
        check: false,
      },
      {
        name: "Create User",
        check: false,
      },
      {
        name: "Reset Password",
        check: false,
      },
      {
        name: "Edit User",
        check: true,
      },
    ],
  },
  {
    id: 3,
    module: "Log checkin",
    func: [
      {
        name: "User Permission",
        check: true,
      },
      {
        name: "View User",
        check: false,
      },
      {
        name: "Delete User",
        check: true,
      },
      {
        name: "Create User",
        check: false,
      },
      {
        name: "Reset Password",
        check: true,
      },
      {
        name: "Edit User",
        check: false,
      },
    ],
  },
  {
    id: 4,
    module: "User management",
    func: [
      {
        name: "User Permission",
        check: false,
      },
      {
        name: "View User",
        check: false,
      },
      {
        name: "Delete User",
        check: false,
      },
      {
        name: "Create User",
        check: false,
      },
      {
        name: "Reset Password",
        check: true,
      },
      {
        name: "Edit User",
        check: true,
      },
    ],
  },
];
const Role = () => {
  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [moduleNumber, setModuleNumber] = useState(1);

  const handleSetSelectRow = (no, index) => {
    if (index === 0) {
      setShow(true);
      setDataModal(() => ({ ...data.find((item) => item.no === no) }));
    }
  };

  const columns = [
    {
      title: "No",
      key: "no",
      sort: true,

      render: (no, index) => (
        <span
          className="text-[#1677ff] cursor-pointer"
          onClick={() => handleSetSelectRow(no, index)}
        >
          {no}
        </span>
      ),
    },
    {
      title: "Role name",
      key: "role",
    },
    { title: "Description", key: "description" },
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
            title={"Role List"}
            data={data}
            groupButton={groupButton}
          />
        </div>
      </div>
      <Modal
        show={show}
        setShow={setShow}
        title={<>
         Function for role:{" "}
          <span className="text-[22px]">{dataModal?.role}</span>
        </>}
      >
        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Module</h3>
            <div className="border border-solid border-[#e5e7eb] rounded-md min-h-[400px]">
              <ul className="flex flex-col gap-1  leading-5 ">
                {dataRaw?.map((el) => (
                  <li
                    key={el.id}
                    className={`${
                      moduleNumber === el.id ? "bg-gray-100" : ""
                    } hover:bg-gray-100 p-1 `}
                    onClick={() => setModuleNumber(el.id)}
                  >
                    {el.module}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1 ">
            <h3 className="font-semibold mb-1">Funtion List</h3>
            <div className=" min-h-[400px]">
              <ul className="flex flex-col gap-1 leading-5 p-2 ">
                {dataRaw
                  .find((el) => el.id === moduleNumber)
                  .func.map((item) => (
                    <li>
                      <div className="flex items-center  rounded hover:bg-gray-100 ">
                        <input
                          type="checkbox"
                          value=""
                          checked={item.check}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                          id="checkbox-item-11"
                        />
                        <label
                          htmlFor="checkbox-item-11"
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded "
                        >
                          {item.name}
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

export default Role;
