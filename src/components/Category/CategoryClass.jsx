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

import { apiAllKey, apiAllFaculties, apiAddClass } from "../../apis";
import { toast } from "react-toastify";

const CategorySchoolYear = () => {
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();

  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-all-faculty";
      const facultie = await apiAllFaculties(url, selectedSchoolYearId);
      setSelectedFaculty(facultie?.data);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  const addClass = async () => {
    const url = "v1/class/add-class-by-faculty";
    const data = {
      NameClass: classValue,
      IDFaculty: selectedFacultyId,
    };

    const response = await apiAddClass(url, data);
    if (response.status === 200) {
      toast.success("Thêm lớp thành công");
    } else {
      toast.error("Message sent failed");
    }
  };

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
      title: "Tên lớp",
      key: "className",
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
      className: "DCCNTT10.1.3",
    },
    {
      id: "2",
      department: "Công nghệ ô tô",
      className: "DCCNTT10.1.4",
    },
    {
      id: "3",
      department: "Quản trị kinh doanh",
      className: "DCCNTT10.1.5",
    },
    {
      id: "4",
      department: "Du lịch khách sạn",
      className: "DCCNTT10.1.6",
    },
  ];

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
          <Table title="Danh sách lớp" columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default CategorySchoolYear;
