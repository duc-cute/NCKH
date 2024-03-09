/** @format */
import * as XLSX from "xlsx";

export const validate = (payload, setInvalidFields) => {
  let invalid = 0;
  // console.log("payload", payload);
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

        // đọc data student và điểm student từ file excel
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

export const generateRange = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};
