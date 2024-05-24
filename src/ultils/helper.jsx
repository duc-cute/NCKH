/** @format */
import * as XLSX from "xlsx";

export const validate = (payload, setInvalidFields) => {
  let invalid = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalid++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = new RegExp("^[^@]+@eaut.edu.vn$");

        if (!arr[1].match(regex)) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "You must enter the email provided by the school.",
            },
          ]);
        }
        break;
      case "password":
        const regexPasswordHard = new RegExp("^(?=.*[0-9])(?=.*[A-Z]).+$");
        if (arr[1].length < 8) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Password 8 characters or more",
            },
          ]);
        }

        if (!arr[1].match(regexPasswordHard)) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Password  including numbers and capital letters",
            },
          ]);
        }

        break;

      case "confirmPassword":
        if (arr[1].length < 8) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Confirm Password 8 characters or more",
            },
          ]);
        }
        if (arr[1] !== payload["password"]) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Passwords do not match",
            },
          ]);
        }
        break;
      default:
        break;
    }
  }

  return invalid;
};

export const readFileData = (file, cellPositions, header, range) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let dataDescription = [];
    let dataMain = [];

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // chọn vị trí cụ thể và tìm kiếm từ khóa cụ thể cho các thông tin trong file excel
        const infoDataDes = cellPositions.map((cellPos) => {
          const cell = XLSX.utils.decode_cell(cellPos);
          const value = worksheet[XLSX.utils.encode_cell(cell)]?.v || null;
          return value ? value.trim() : null;
        });

        dataDescription = infoDataDes.map((item) => {
          if (!item) return null;

          return item.split(":")[1].trim();
        });

        dataMain = XLSX.utils.sheet_to_json(worksheet, {
          header,
          range,
          cellText: true,
        });
        resolve({ dataDescription, dataMain });
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};

export const readFileDataAttendance = (
  file,
  selectedSchoolYearId,
  selectedFacultyId,
  classScoreId,
  selectedSemester,
  selectedCourse
) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const knownHeaders = ["stt", "Msv", "FullName", "DateOfBirth"];
        const allHeaders = Object.keys(worksheet).filter((key) =>
          key.startsWith("A")
        );
        const additionalHeaders = allHeaders.filter(
          (header) => !knownHeaders.includes(header)
        );
        const allDataHeaders = [...knownHeaders, ...additionalHeaders];

        const inFoStudentAttendance = XLSX.utils.sheet_to_json(worksheet, {
          header: allDataHeaders,
          cellText: true,
          range: 6,
        });

        const attendanceDate = inFoStudentAttendance[0];
        const entries = Object.entries(attendanceDate);
        const trimmedEntries = entries.slice(4, entries.length - 1);
        const attendanceDateCustom = Object.fromEntries(trimmedEntries);

        const dateData = {};
        Object.entries(attendanceDateCustom).forEach(([key, serialNumber]) => {
          const millisecondsPerDay = 24 * 60 * 60 * 1000;
          const excelStartDate = Date.parse("1899-12-30");
          const milliseconds =
            excelStartDate + serialNumber * millisecondsPerDay;
          const date = new Date(milliseconds);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const formattedDate = `${year}-${month
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          dateData[key] = formattedDate;
        });

        const inFoStudentAttendanceData = inFoStudentAttendance.slice(2);
        const attendanceStudentCustom = inFoStudentAttendanceData.map(
          (student) => {
            const { Msv, FullName, DateOfBirth, ...AttendanceData } = student;
            const Attendance = [];
            let maxKey;

            Object.entries(dateData).forEach(([dayKey, dayValue]) => {
              Attendance.push({ Day: dayValue, AttendanceStatus: "" });
            });

            for (const key in AttendanceData) {
              if (key.startsWith("A")) {
                const dayIndex = Object.keys(dateData).indexOf(key);
                if (dayIndex !== -1) {
                  const status = AttendanceData[key];
                  Attendance[dayIndex].AttendanceStatus =
                    status !== undefined ? status : "";
                }
                maxKey = key;
              }
            }

            const formattedDateOfBirth = formatDateOfBirth(DateOfBirth);

            const Comment =
              student[maxKey] === 3 ? "" : maxKey ? student[maxKey] : "";

            return {
              Msv,
              FullName,
              DateOfBirth: formattedDateOfBirth,
              Comment,
              Attendance: Attendance.map((item) => ({
                ...item,
                AttendanceStatus: String(item.AttendanceStatus),
              })),
            };
          }
        );

        const dataResponve = {
          KeyId: selectedSchoolYearId,
          FacultyId: selectedFacultyId,
          ClassId: classScoreId,
          Semester: selectedSemester,
          Course: selectedCourse,
          DataAttendance: attendanceStudentCustom,
        };

        console.log(dataResponve);

        resolve(dataResponve);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

function formatDateOfBirth(dateString) {
  if (typeof dateString !== "string") {
    return "";
  }
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

export const generateRange = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};
