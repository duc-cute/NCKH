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

import { Controller, useForm } from "react-hook-form";
import {
  levelColor,
  listStatusWarning,
  listStudentWarning,
} from "../../../ultils/constant";
import { useNavigate } from "react-router-dom";
import path from "../../../ultils/path";
import { apiDeleteWarning, apiGetAllWarning } from "../../../apis/warning";
import { toast } from "react-toastify";

const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
} = icons;

const StudentWarningIndex = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
  } = useForm();
  const navigate = useNavigate();
  const [listWarning, setListWarning] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const fetchData = async () => {
    const res = await apiGetAllWarning();
    if (res?.status === 200) {
      setListWarning(res?.data);
    }
  };
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    listWarning.forEach((row) =>
      setValue(`checkboxes.${row.ID}`, newSelectAll)
    );
  };
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
          if (res?.status === 200) {
            toast.success(res?.message);
            fetchData();
          }
        }
      });
  };

  const handleSendWarning = (data) => {
    let selectedIds = Object.keys(data.checkboxes);
    let arr = selectedIds.filter((key) => data.checkboxes[key]);
    console.log("🚀 ~ handleSendWarning ~ arr:", arr);
  };

  const columns = [
    {
      title: (
        <div className="flex items-center h-full">
          <input
            type="checkbox"
            className="w-4 h-4  bg-gray-100 border-gray-300 rounded"
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </div>
      ),
      key: "msv",
      render: (_, msv) => {
        return (
          <Controller
            name={`checkboxes.${msv?.ID}`}
            control={control}
            defaultValue={false}
            render={({ field }) => {
              return (
                <div className="flex items-center justify-center h-full">
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    className="w-4 h-4  bg-gray-100 border-gray-300 rounded "
                  />
                </div>
              );
            }}
          />
        );
      },
    },

    {
      title: "STT",
      sort: true,
      render: (_, rowData, index) => {
        console.log("rowData", rowData);
        return <span>{index + 1}</span>;
      },
    },
    { title: "Tiêu đề cảnh báo", key: "NameWarning", sort: true },
    { title: "Mức cảnh báo", key: "LevelWarning", sort: true },
    { title: "Số buổi nghỉ/tín", key: "SBN" },
    { title: "Số tín chỉ tối đa nợ", key: "STC_NO" },
    { title: "Tình trạng học phí", key: "TTHP" },
    { title: "Điểm GPA", key: "GPA" },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <span
            onClick={() =>
              navigate(
                `/${path.ADMIN}/${path.STUDENT_WARNING_FORM}?id=${row?.ID}`
              )
            }
            className={`cursor-pointer`}
          >
            <LuPencilLine color="#1677ff" />
          </span>
          <FiTrash2 onClick={() => handleDelete(row?.ID)} color="red" />
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
        <Button
          style={"py-[7px] text-white rounded-md "}
          icon={<AiOutlineSend />}
          handleOnclick={handleSubmit(handleSendWarning)}
        >
          Gửi cảnh báo
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className=" h-[1000px] font-main">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4"></div>

        <form className="mx-4 mt-4 ">
          <Table
            title="Danh sách cảnh báo"
            columns={columns}
            data={listWarning}
            groupButton={groupButton}
          />
        </form>
      </div>
    </>
  );
};

export default StudentWarningIndex;
