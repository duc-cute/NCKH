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
  GrUpdate,
} = icons;

import {
  apiAllKey,
  apiAllFaculties,
  apiAddClass,
  apiSelectInfoClass,
  apiDeleteClass,
  apiUpdateClass,
  apiImportClass,
} from "../../apis";

import { toast } from "react-toastify";

const CategorySchoolYear = () => {
  // state option
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();

  // state id
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();
  const [selectedClassId, setSelectedClassId] = useState();

  // state data
  const [classData, setClassData] = useState();

  console.log("classData", classData);

  // state input
  const [classValue, setClassValue] = useState("");

  // api select option khóa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-years-by-faculty";
      const schoolYear = await apiAllKey(url);
      setSelectedSchoolYear(schoolYear?.data);
    };
    fetchData();
  }, []);

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-all-faculty";
      const facultie = await apiAllFaculties(url, selectedSchoolYearId);
      setSelectedFaculty(facultie?.data);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  // api add class
  const addClass = async () => {
    const url = "v1/class/add-class-by-faculty";
    const data = {
      NameClass: classValue,
      IDFaculty: selectedFacultyId,
    };

    console.log("data", data);

    const response = await apiAddClass(url, data);
    if (response.status === 200) {
      toast.success("Thêm lớp thành công");
      fetchDataGetClass();
    } else {
      toast.error("Message sent failed");
    }
  };

  // api lấy thông tin lớp
  const fetchDataGetClass = async () => {
    const url = "v1/common/select-class-by-faculty-and-key";
    const data = await apiSelectInfoClass(
      url,
      selectedSchoolYearId,
      selectedFacultyId
    );
    setClassData(data?.data);
  };

  useEffect(() => {
    fetchDataGetClass();
  }, [selectedSchoolYearId, selectedFacultyId]);

  // api cập nhật lớp
  const handleUpdate = async () => {
    const url = "v1/class/update-class";

    const data = {
      IDClass: selectedClassId,
      NameClass: classValue,
      IDFaculty: selectedFacultyId,
    };

    if (!selectedClassId) {
      toast.error("Vui lòng chọn lớp cần cập nhật");
      return;
    }

    const response = await apiUpdateClass(url, data);
    if (response.status === 200) {
      toast.success("Cập nhật lớp thành công");
      fetchDataGetClass();
    } else {
      toast.error("Cập nhật lớp thất bại");
    }
  };

  // api xóa lớp
  const handleDelete = async (record) => {
    const url = "v1/class/delete-class-by-id";
    const response = await apiDeleteClass(url, record?.ID);
    if (response.status === 200) {
      toast.success("Xóa lớp thành công !");
      fetchDataGetClass();
    } else {
      toast.error("Xóa lớp thất bại, lớp tồn tại sinh viên !");
    }
  };

  // clear input
  const handleEdit = (record) => {
    setSelectedClassId(record.ID);
    setClassValue(record.NameClass || "");
  };

  const columns = [
    {
      title: "Tên lớp",
      key: "NameClass",
      sort: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-3 cursor-pointer">
            <FiTrash2 color="red" onClick={() => handleDelete(record)} />
            <LuPencilLine color="#1677ff" onClick={() => handleEdit(record)} />
          </div>
        );
      },
    },
  ];

  // const dataClass = [
  //   {
  //     NameClass: "DCCNTT10.1.3",
  //   },
  //   {
  //     NameClass: "DCCNTT10.1.4",
  //   },
  //   {
  //     NameClass: "DCCNTT10.1.5",
  //   },
  //   {
  //     NameClass: "DCCNTT10.1.6",
  //   },
  // ];

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <SelectOption
              name={"Chọn khóa"}
              data={
                selectedSchoolYear
                  ? selectedSchoolYear.map((item) => {
                      return { name: item };
                    })
                  : []
              }
              onChange={(event) => {
                setSelectedSchoolYearId(event.target.value);
              }}
            />

            <SelectOption
              style={`w-full`}
              name={"Chọn khoa"}
              data={
                selectedFaculty
                  ? selectedFaculty.map((item) => {
                      return { id: item.ID, name: item.FacultyName };
                    })
                  : []
              }
              onChange={(event) => {
                setSelectedFacultyId(event.target.value);
              }}
            />

            <InputField
              placeholder={"Nhập tên lớp học ..."}
              style={`flex max-h-[40px] w-[800px]`}
              name={""}
              value={classValue}
              paddingRight={"90px"}
              onChange={(e) => {
                setClassValue(e.target.value);
              }}
            />
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <Button
              style={"bg-white text-black"}
              handleOnclick={() => {
                setClassValue("");
              }}
            >
              Clear
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<MdOutlineSend />}
              handleOnclick={() => {
                if (!selectedSchoolYearId) {
                  toast.error("Vui lòng chọn khóa !");
                  return;
                }

                if (!selectedFacultyId) {
                  toast.error("Vui lòng chọn khoa !");
                  return;
                }

                if (!classValue) {
                  toast.error("Vui lòng nhập tên lớp !");
                  return;
                }

                addClass();
              }}
            >
              Nhập
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<GrUpdate />}
              handleOnclick={handleUpdate}
            >
              Cập nhật
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<AiOutlineCloudUpload />}
            >
              Export
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<CgImport />}
            >
              Import
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <Table title="Danh sách lớp" columns={columns} data={classData} />
        </div>
      </div>
    </>
  );
};

export default CategorySchoolYear;
