import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Drawer,
  InputField,
  SelectOption,
  Table,
  Tag,
  InputForm,
  SelectLib,
  Modal,
  DragFile,
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
  apiAddFaculties,
  apiSelectInfoFaculties,
  apiDeleteFaculties,
  apiUpdateFaculties,
  apiImportFaculty,
} from "../../apis";

import { toast } from "react-toastify";

import { readFileDataFaculty } from "../../ultils/helper";

const CategoryDepartment = () => {
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();
  const [facultyData, setFacultyData] = useState();

  const [facultyDataId, setFacultyDataId] = useState();

  // state input
  const [facultyValue, setFacultyValue] = useState("");
  const [foundingValue, setFoundingValue] = useState("");
  const [describeValue, setDescribeValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});

  const handleImportButtonClick = useCallback(async () => {
    const response = await apiImportFaculty(dataImport);
    if (response.status === 200) {
      toast.success("Import dữ liệu thành công !");
      setFileName(null);
      setDataPreview([]);
    } else toast.error("Import dữ liệu thất bại !");
  }, [dataPreview, fileName]);

  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataFaculty(fileValue)
        .then((dataMain) => {
          let dataFormat = Array.isArray(dataMain.dataMain)
            ? dataMain.dataMain.map((data) => {
                let date = new Date("1899-12-30");
                date.setDate(date.getDate() + data["Ngày thành lập"]);

                return {
                  FacultyName: data["Tên khoa"],
                  Founding: date.toISOString().slice(0, 10),
                  Email: data["Email"],
                  PhoneNumber: data["Số điện thoại liên hệ"],
                  Describe: data["Mô tả"] || null,
                };
              })
            : [];

          setDataImport(dataFormat);
          setDataPreview(dataFormat);
        })
        .catch((error) => {
          console.error("Lỗi khi xem trước dữ liệu:", error);
        });
    },
    [dataPreview]
  );

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
  const fetchDataGetFaculty = async () => {
    const url = "v1/faculty/select-all-faculty";
    const data = await apiSelectInfoFaculties(url);

    let facultyDataCustom = [];

    if (data && data.data) {
      facultyDataCustom = data.data.map((item) => {
        return {
          ...item,
          Founding: item.Founding ? item.Founding.split("T")[0] : null,
        };
      });
    }

    setFacultyData(facultyDataCustom);
  };

  useEffect(() => {
    fetchDataGetFaculty();
  }, []);

  // api thêm khoa
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
      fetchDataGetFaculty();
    } else {
      toast.error("Message sent failed");
    }
  };

  // api xóa khoa
  const handleDelete = async (record) => {
    const url = "v1/faculty/delete";
    const response = await apiDeleteFaculties(url, record?.ID);
    console.log("response", response);
    if (response.status === 200) {
      toast.success("Xóa khoa thành công");
      fetchDataGetFaculty();
    } else {
      toast.error("Xóa khoa thất bại, khoa chứa lớp không thể xóa");
    }
  };

  // clear input
  const handleEdit = async (record) => {
    setFacultyValue(record.FacultyName || "");
    setFoundingValue(record.Founding || "");
    setDescribeValue(record.Describe || "");
    setEmailValue(record.Email || "");
    setPhoneNumberValue(record.PhoneNumber || "");
    setFacultyDataId(record.ID);
  };

  // api cập nhật khoa
  const handleUpdate = async () => {
    const url = "v1/faculty/update";

    const data = {
      facultyName: facultyValue,
      founding: foundingValue,
      desc: describeValue,
      email: emailValue,
      phoneNumber: phoneNumberValue,
      idFaculty: facultyDataId,
    };

    if (!facultyDataId) {
      toast.error("Vui lòng chọn khoa cần cập nhật");
      return;
    }

    const response = await apiUpdateFaculties(url, data);
    if (response.status === 200) {
      toast.success("Cập nhật khoa thành công");
      fetchDataGetFaculty();
    } else {
      toast.error("Cập nhật khoa thất bại");
    }
  };

  const columns = [
    {
      title: "Tên khoa",
      key: "FacultyName",
      sort: true,
    },
    {
      title: "Ngày thành lập",
      key: "Founding",
      sort: true,
    },
    {
      title: "Email",
      key: "Email",
      sort: true,
    },
    {
      title: "Số điện thoại",
      key: "PhoneNumber",
      sort: true,
    },
    {
      title: "Mô tả",
      key: "Describe",
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

  // data fake khi chưa có api
  // const data = [
  //   {
  //     id: "1",
  //     department: "Công nghệ thông tin",
  //     ngaythanhlap: "2021-10-10",
  //     email: "cntt@eaut.edu.vn",
  //     sdt: "1900123123",
  //     mota: "",
  //   },
  //   {
  //     id: "2",
  //     department: "Công nghệ ô tô",
  //     ngaythanhlap: "2021-10-10",
  //     email: "cntt@eaut.edu.vn",
  //     sdt: "1900123123",
  //     mota: "",
  //   },
  //   {
  //     id: "3",
  //     department: "Quản trị kinh doanh",
  //     ngaythanhlap: "2021-10-10",
  //     email: "cntt@eaut.edu.vn",
  //     sdt: "1900123123",
  //     mota: "",
  //   },
  // ];

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
              handleOnclick={() => {
                setShowModal(true);
              }}
            >
              Import
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <Table title="Danh sách khoa" columns={columns} data={facultyData} />
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import dữ liệu khoa"}
          disableOkBtn={dataPreview?.length < 1}
          onClickBtnOk={handleImportButtonClick}
          textOk={"Import"}
          onClickBtnCancel={() => {
            setShowModal(false);
            setFileName(null);
            setDataPreview([]);
          }}
        >
          <DragFile
            data={dataPreview}
            columns={columns}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoryDepartment;
