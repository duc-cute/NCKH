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
} from "../../components";

import icons from "../../ultils/icons";
import {
  apiAllFaculties,
  apiClassById,
  apiDataPoint,
  apiImportScore,
} from "../../apis";

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
  MdOutlineSend,
  GrUpdate,
  SiGoogleclassroom,
  FaRegCalendarAlt,
  SlCalender,
  MdSubject,
} = icons;

const StudentWarning = () => {
  const [showModal, setShowModal] = useState(false);
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
          handleOnclick={() => setShowModal(true)}
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
  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm();
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
        {/* {showDes && (
          <Drawer
            title={titleCategory}
            onClose={() => setShowDes(false)}
            style={showDes ? "block gap-x-5 gap-y-3" : "hidden"}
          >
            <div className="drawer-department">
              {schoolYear && <CategorySchoolYear />}
              {department && <CategoryDepartment />}
              {subject && <CategorySubject />}

              <div className="flex gap-3 mt-12 justify-end">
                <Button
                  style={"py-[7px] text-white rounded-md "}
                  icon={<MdOutlineSend />}
                >
                  Thêm mới
                </Button>
                <Button
                  style={"py-[7px] text-white rounded-md "}
                  icon={<GrUpdate />}
                >
Cập nhật
                </Button>
                <Button
                  style={"py-[7px] text-white rounded-md "}
                  icon={<FiTrash2 />}
                >
                  Xoá
                </Button>
                <Button style={"bg-white text-black"}>Clear</Button>
              </div>

              <div className="mt-12">
                <Table
                  title="Danh sách học phần theo từng khoa"
                  columns={columns2}
                  data={data2}
                />
              </div>
            </div>
          </Drawer>
        )} */}
        {showModal && (
          <Modal
            show={showModal}
            setShow={setShowModal}
            title={"Thêm cảnh báo"}
            // onClickBtnOk={handleImportButtonClick}
            textOk={"Thêm"}
            onClickBtnCancel={() => {
              setShowModal(false);
            }}
          >
            <div className="flex w-full gap-3 mb-3">
              <InputForm
                id={"msv"}
                label={"Số buổi nghỉ /tín"}
                register={register}
                errors={errors}
              />
              <InputForm
                id={"name"}
                label={"Tình trạng học phí"}
                register={register}
                errors={errors}
              />
            </div>

            <div className="flex w-full gap-3 mb-3">
              <InputForm
                id={"email"}
                label={"Số tín chỉ tối đa nợ"}
                register={register}
                errors={errors}
              />
              <InputForm
                id={"class"}
                label={"Điểm GPA thấp dưới"}
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex w-full gap-3 mb-3">
              <InputForm
                id={"email"}
                label={"Mức cảnh báo"}
                register={register}
                errors={errors}
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default StudentWarning;
