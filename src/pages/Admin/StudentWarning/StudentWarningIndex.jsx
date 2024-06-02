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
import swal from "sweetalert2";

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
import { apiDeleteWarning, apiGetAllWarning } from "../../../apis/warning";

const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
} = icons;

const StudentWarningIndex = () => {
  const navigate = useNavigate();
  const [listWarning, setListWarning] = useState([]);

  const handleDelete = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await apiDeleteWarning(id);
          console.log("🚀 ~ .then ~ res:", res);
          // if (res.success) {
          //   const queries = Object.fromEntries(params);
          //   queries.page = 1;
          //   navigate({
          //     pathname: location.pathname,
          //     search: createSearchParams(queries).toString(),
          //   });
          //   fetchData({ ...queries, limit: import.meta.env.VITE_PROD_LIMIT });

          //   swal.fire({
          //     title: "Deleted!",
          //     text: res?.mes,
          //     icon: "success",
          //   });
          // } else {
          //   swal.fire({
          //     title: "Deleted!",
          //     text: res?.mes,
          //     icon: "error",
          //   });
          // }
        }
      });
  };

  const columns = [
    {
      title: "STT",
      sort: true,
    },
    { title: "Tiêu đề cảnh báo", key: "level", sort: true },
    { title: "Mức cảnh báo", key: "level", sort: true },
    { title: "Số buổi nghỉ/tín", key: "year" },
    { title: "Số tín chỉ tối đa nợ", key: "hocki" },
    { title: "Tình trạng học phí", key: "khoa" },
    { title: "Điểm GPA", key: "num" },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <span
            onClick={() =>
              navigate(
                `/${path.ADMIN}/${path.STUDENT_WARNING_FORM}/${row?.IDWarning}`
              )
            }
            className={`cursor-pointer`}
          >
            <LuPencilLine color="#1677ff" />
          </span>
          <FiTrash2 onClick={() => handleDelete(row?.IDWarning)} color="red" />
        </div>
      ),
    },
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
  const fetchData = async () => {
    const res = await apiGetAllWarning();
    console.log("res", res);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
