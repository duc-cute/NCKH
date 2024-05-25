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

import { apiAllKey, apiAddFaculties, apiSelectInfoFaculties } from "../../apis";
import { toast } from "react-toastify";

const CategoryDepartment = () => {
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();

  const [facultyData, setFacultyData] = useState();

  // state input
  const [facultyValue, setFacultyValue] = useState("");
  const [foundingValue, setFoundingValue] = useState("");
  const [describeValue, setDescribeValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");

  // api select option khóa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-years-by-faculty";
      const schoolYear = await apiAllKey(url);
      setSelectedSchoolYear(schoolYear?.data);
    };
    fetchData();
  }, []);

  // api lấy thông tin khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/faculty/select-all-faculty";
      const data = await apiSelectInfoFaculties(url);
      setFacultyData(data?.data);
    };
    fetchData();
  }, []);

  const addFaculty = async () => {
    const url = "v1/faculty/add";
    const data = {
      facultyName: facultyValue,
      founding: foundingValue,
      desc: describeValue,
      email: emailValue,
      phoneNumber: phoneNumberValue,
      selectedSchoolYearId: selectedSchoolYearId,
    };

    const response = await apiAddFaculties(url, data);
    if (response.status === 200) {
      toast.success("Thêm khoa thành công");
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
      title: "Ngày thành lập",
      key: "ngaythanhlap",
      sort: true,
    },
    {
      title: "Email",
      key: "email",
      sort: true,
    },
    {
      title: "Số điện thoại",
      key: "sdt",
      sort: true,
    },
    {
      title: "Mô tả",
      key: "mota",
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
      ngaythanhlap: "2021-10-10",
      email: "cntt@eaut.edu.vn",
      sdt: "1900123123",
      mota: "",
    },
    {
      id: "2",
      department: "Công nghệ ô tô",
      ngaythanhlap: "2021-10-10",
      email: "cntt@eaut.edu.vn",
      sdt: "1900123123",
      mota: "",
    },
    {
      id: "3",
      department: "Quản trị kinh doanh",
      ngaythanhlap: "2021-10-10",
      email: "cntt@eaut.edu.vn",
      sdt: "1900123123",
      mota: "",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-[600px]">
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
            </div>
            <InputField
              placeholder={"Nhập tên khoa ..."}
              style={`flex max-h-[40px] w-[600px]`}
              name={"tenkhoa"}
              value={facultyValue}
              onChange={(e) => {
                setFacultyValue(e.target.value);
              }}
            />

            <InputField
              placeholder={"Ngày thành lập yyyy-mm-dd"}
              style={`flex max-h-[40px] w-[600px]`}
              value={foundingValue}
              name={"ngaythanhlap"}
              onChange={(e) => {
                setFoundingValue(e.target.value);
              }}
            />
          </div>

          <div className="flex gap-3">
            <InputField
              placeholder={"Email liên hệ khoa ..."}
              style={`flex max-h-[40px] w-[600px]`}
              name={"email"}
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
              }}
            />

            <InputField
              placeholder={"Số điện thoại liên hệ ..."}
              style={`flex max-h-[40px] w-[600px]`}
              name={"sdt"}
              value={phoneNumberValue}
              onChange={(e) => {
                setPhoneNumberValue(e.target.value);
              }}
            />

            <InputField
              placeholder={"Mô tả ..."}
              style={`flex max-h-[40px] w-[600px]`}
              name={"mota"}
              value={describeValue}
              onChange={(e) => {
                setDescribeValue(e.target.value);
              }}
            />
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <Button
              style={"bg-white text-black"}
              handleOnclick={() => {
                setFacultyValue("");
                setFoundingValue("");
                setDescribeValue("");
                setEmailValue("");
                setPhoneNumberValue("");
              }}
            >
              Clear
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<MdOutlineSend />}
              handleOnclick={() => {
                if (!selectedSchoolYearId) {
                  toast.error("Vui lòng chọn khóa trước khi thêm");
                  return;
                }

                if (
                  !facultyValue ||
                  !foundingValue ||
                  !describeValue ||
                  !emailValue ||
                  !phoneNumberValue
                ) {
                  toast.error("Dữ liệu không được để trống !");
                  return;
                }

                const dateRegex =
                  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
                if (!dateRegex.test(foundingValue)) {
                  toast.error("Ngày không đúng định dạng yyyy-mm-dd");
                  return;
                }

                const phoneRegex = /^\d+$/;
                if (!phoneRegex.test(phoneNumberValue)) {
                  toast.error("Số điện thoại phải là số");
                  return;
                }

                addFaculty();
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
          <Table title="Danh sách khoa" columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default CategoryDepartment;
