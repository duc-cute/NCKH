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
  // CategoryDepartment,
  // CategorySchoolYear,
  // CategorySubject,
  Modal,
} from "../../../components";

import icons from "../../../ultils/icons";
import {
  apiAllFaculties,
  apiClassById,
  apiDataPoint,
  apiImportScore,
} from "../../../apis";

import { useForm } from "react-hook-form";
import {
  levelColor,
  listStatusWarning,
  listStudentWarning,
} from "../../../ultils/constant";
import { useNavigate } from "react-router-dom";
import path from "../../../ultils/path";

const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
  MdOutlineSend,
  GrUpdate,
  SiGoogleclassroom,
  FaRegCalendarAlt,
  SlCalender,
  MdSubject,
} = icons;

const StudentWarningIndex = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "STT",
      sort: true,
    },
    { title: "Mức cảnh báo", key: "level", sort: true },
    { title: "Số buổi nghỉ/tín", key: "year" },
    { title: "Số tín chỉ tối đa nợ", key: "hocki" },
    { title: "Tình trạng học phí", key: "khoa" },
    { title: "Điểm GPA", key: "num" },
  ];

  const groupButton = [
    {
      id: 1,
      button: (
        <Button
          handleOnclick={() =>
            navigate(`/${path.ADMIN}/${path.STUDENT_WARNING_FORM}`)
          }
          style={"py-[7px] text-white rounded-md "}
          icon={<AiOutlineCloudUpload />}
        >
          Thêm
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
  ];

  return (
    <>
      <div className=" h-[1000px] font-main">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4"></div>

        <div className="mx-4 mt-4 ">
          <Table
            title="Danh sách cảnh báo"
            columns={columns}
            // data={data}
            groupButton={groupButton}
          />
        </div>
      </div>
    </>
  );
};

export default StudentWarningIndex;
