/** @format */

import { RadioAttendance, Tag } from "../components";

export const headerDataScore = [
  "stt",
  "Msv",
  "FullName",
  "Gender",
  "Frequent",
  "MidtermScore",
  "FinalExamScore",
  "AverageScore",
  "Scores",
  "LetterGrades",
  "scoreModule",
  "Note",
];
export const cellScorePositions = ["A8", "A9", "A10", "D10", "I8", "I9", "I10"];

export const columnsStudent = [
  {
    title: "Mã sinh viên",
    key: "Msv",
    sort: true,
    render: (msv) => (
      <span className="text-[#1677ff] cursor-pointer">{msv}</span>
    ),
  },
  { title: "Họ tên", key: "FullName", sort: true },
  {
    title: "Giới tính",
    key: "Gender",
    sort: true,

    render: (gender) => <span className="text-center block">{gender}</span>,
  },
  {
    title: "Điểm chuyên cần",
    key: "Frequent",
    render: (point) => <span className="text-center block">{point}</span>,
  },
  {
    title: "Điểm giữa kỳ",
    key: "MidtermScore",
    render: (point) => <span className="text-center block">{point}</span>,
  },
  {
    title: "Điểm thi",
    key: "FinalExamScore",
    render: (point) => <>{parseFloat(point).toFixed(1)}</>,
  },
  {
    title: "TBCHP",
    key: "AverageScore",
    render: (point) => <>{parseFloat(point).toFixed(1)}</>,
  },
  { title: "Điểm chữ", key: "LetterGrades" },
  { title: "Điểm số", key: "Scores" },
  { title: "Ghi chú", key: "Note" },
];

export const columnsAttendance = [
  {
    title: "Mã sinh viên",
    key: "Msv",
    sort: true,
    render: (msv) => <span style={{ color: "#1677ff" }}>{msv}</span>,
  },
  { title: "Họ tên", key: "FullName" },
  { title: "Ngày sinh", key: "DateOfBirth" },

  {
    title: "ngày bắt đầu",
    key: "Start",
  },
  {
    title: "ngày két thúc",
    key: "End",
  },
  {
    title: "Tổng số buổi nghỉ",
    key: "totalPercentDateStudy",
    sort: true,
    render: (total) => (
      <div className="flex items-center justify-center">
        <Tag status={(+total[0] / +total[1]) * 100 < 20 ? "" : "warning"}>
          {`${total[0]}/${total[1]}`}
        </Tag>
      </div>
    ),
  },
  { title: "Ghi chú", key: "Comment" },
];
