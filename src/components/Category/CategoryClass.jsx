import React, { useEffect, useState, useCallback } from "react";
import { Button, InputField, SelectOption, Table, Modal, DragFile } from "..";
import icons from "../../ultils/icons";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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
  apiAllFacultieGetName,
} from "../../apis";

import { toast } from "react-toastify";

import { readFileDataImport } from "../../ultils/helper";

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

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});

  // state input
  const [classValue, setClassValue] = useState("");

  // handle import
  const handleImportButtonClick = useCallback(async () => {
    const response = await apiImportClass(dataImport);
    if (response.status === 200) {
      toast.success("Import dữ liệu thành công !");
      setFileName(null);
      setDataPreview([]);
    } else toast.error("Import dữ liệu thất bại !");
  }, [dataPreview, fileName]);

  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataImport(fileValue)
        .then((dataMain) => {
          let dataFormat = Array.isArray(dataMain.dataMain)
            ? dataMain.dataMain.map((data) => {
                return {
                  NameFaculty: data["Tên khoa"],
                  NameClass: data["Tên lớp"],
                };
              })
            : [];

          setDataPreview(dataFormat);

          let dataObject = {};
          let lastFacultyName = null;

          if (Array.isArray(dataMain.dataMain)) {
            dataMain.dataMain.forEach((item) => {
              const facultyName = item["Tên khoa"] || lastFacultyName;
              const className = item["Tên lớp"];

              if (facultyName) {
                lastFacultyName = facultyName;

                if (!dataObject[facultyName]) {
                  dataObject[facultyName] = [];
                }

                if (!dataObject[facultyName].includes(className)) {
                  dataObject[facultyName].push(className);
                }
              }
            });
          }

          let dataImport = Object.entries(dataObject).map(
            ([title, dataClass]) => ({
              title: `Khoa ${title}`,
              dataClass,
            })
          );

          setDataImport(dataImport);
        })
        .catch((error) => {
          toast.error("File không đúng định dạng !");
        });
    },
    [dataPreview]
  );

  // export data
  const handleExportData = useCallback(async () => {
    if (!classData || classData.length === 0) {
      toast.error("Không có dữ liệu để xuất !");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Tạo hàng đầu tiên (header) viết in đậm
    const header = ["STT", "NameClass"];
    header.forEach((key, index) => {
      worksheet.getCell(1, index + 1).value = key;
      worksheet.getCell(1, index + 1).font = { bold: true };
    });

    // Thêm dữ liệu vào các hàng tiếp theo
    classData.forEach((obj, rowIndex) => {
      worksheet.getCell(rowIndex + 2, 1).value = rowIndex + 1; // STT
      worksheet.getCell(rowIndex + 2, 2).value = obj.NameClass;
    });

    // Tạo border cho tất cả các ô và điều chỉnh độ rộng của các cột
    const maxColumnNumber = header.length;
    const maxRowNumber = classData.length + 1;

    for (let rowNumber = 1; rowNumber <= maxRowNumber; rowNumber++) {
      for (let colNumber = 1; colNumber <= maxColumnNumber; colNumber++) {
        const cell = worksheet.getCell(rowNumber, colNumber);
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        // Điều chỉnh độ rộng của cột
        if (colNumber === 1) {
          worksheet.getColumn(colNumber).width = 5;
        } else {
          worksheet.getColumn(colNumber).width = 20;
        }
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "danhmuclop.xlsx");
  }, [classData]);

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
      const facultie = await apiAllFacultieGetName();
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

    const response = await apiAddClass(url, data);
    if (response.status === 200) {
      toast.success("Thêm lớp thành công");
      fetchDataGetClass();
    } else {
      toast.error("Lớp trùng lặp không thể thêm !");
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

  const columnPreview = [
    {
      title: "Tên khoa",
      key: "NameFaculty",
      sort: true,
    },
    {
      title: "Tên lớp",
      key: "NameClass",
      sort: true,
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
              icon={<GrUpdate />}
              handleOnclick={handleUpdate}
            >
              Cập nhật
            </Button>

            <Button
              style={"py-[7px] text-white rounded-md "}
              icon={<AiOutlineCloudUpload />}
              handleOnclick={handleExportData}
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
          <Table title="Danh sách lớp" columns={columns} data={classData} />
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import dữ liệu lớp học"}
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
            columns={columnPreview}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default CategorySchoolYear;
