/** @format */

import { RadioAttendance, Tag } from "../components";
import path from "./path";

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
export const TTHP = [
  {
    id: "Nợ học phí",
    label: "Nợ học phí",
  },
  {
    id: "Đủ học phí",
    label: "Đủ học phí",
  },
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
    title: "Số buổi nghỉ",
    key: "totalPercentDateStudy",
  },
  {
    title: "Tổng số buổi",
    key: "totalSessions",
  },

  { title: "Ghi chú", key: "Comment" },
];

export const warningLevel = [
  { id: 1, label: "Mức 1" },
  { id: 2, label: "Mức 2" },
  { id: 3, label: "Mức 3" },
];

export const listStudentWarning = [
  { id: 1, label: "Đang bị cảnh báo" },
  { id: 2, label: "Nợ môn" },
  { id: 3, label: "Có ý định bỏ học" },
];

export const listStatusWarning = [
  { id: 1, label: <span className="text-[#1677ff]">5% Mức độ 1</span> },
  { id: 2, label: <span className="text-[#faad14]">10% Mức độ 2</span> },
  { id: 3, label: <span className="text-[#581c87]">15% Mức độ 3</span> },
  { id: 4, label: <span className="text-[#ff4d4f]">25% Mức độ 4</span> },
];

export const levelColor = [
  "text-[#1677ff]",
  "text-[#faad14]",
  "text-[#581c87]",
  "text-[#ff4d4f]",
];
export const listDropDownStudent = [
  {
    title: "Cá nhân",
    path: path.HOME,
  },
  {
    title: "Lịch học",
    path: path.SCHEDULE,
  },
  {
    title: "Cảnh báo học tập",
    path: path.STUDYWARNING,
  },
  {
    title: "Tài liệu học tập",
    path: path.DOCUMENTSTUDY,
  },
  {
    title: "Bài viết về trường",
    path: path.BLOG,
  },
];
export const settingsSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  arrows: false,
};
export const htmlWarning = `
 <main style="height: 800px;width: 800px;max-height: 100vh ;font-family: sans-serif;">

  <div style="height: 100%; width: 100%;">

    <div style="color: #000;  background-color: #fff;margin: 24px;padding: 24px;border-radius: 20px;margin-top: 8px;">
      <table align="center" border="none" cellpadding="0" cellspacing="0" style="border:none" width="100%">
        <tbody>
          <tr>
            <td align="center">

              <div
                class="m_-2057696081394706252d_w488 m_-2057696081394706252d_max_w488 m_-2057696081394706252m_l_w359 m_-2057696081394706252m_m_w344 m_-2057696081394706252m_s_w305">
                <div style="width: 120px;margin: 12px auto;">
                  <img style="width: 100%; height: 100%; object-fit: contain;"
                    src="https://img.freepik.com/free-vector/green-leaves-round-logo_78370-2097.jpg?w=740" alt="">
                </div>
                <span
                  class="m_-2057696081394706252c_g300 m_-2057696081394706252m_pl8 m_-2057696081394706252m_pr8 m_-2057696081394706252d_pl0 m_-2057696081394706252d_pr0"
                  style="display:inline-block;padding:0 8px;font-family:SF Pro Text,Roboto,Segoe UI,helvetica neue,helvetica,arial,sans-serif;font-size:32px;line-height:23px;font-weight:700;color:red;text-decoration:none;">
                  Bạn đã bị cảnh báo mức 1
                </span>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="border:none" width="100%">
        <tbody>
          <tr>
            <td>
              <div style="height:32px;font-size:32px;line-height:32px">&nbsp;</div>
            </td>
          </tr>
        </tbody>
      </table>




      <div
        style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">
        <h3>Chào Đức,</h3>
        Bạn đã bị cảnh báo mức 1.Số buổi nghỉ / tín đã vượt quá 3.Học phí chưa hoàn thiện.
        Để biết thêm chi tiết xin vui lòng vào trang cá nhân của bạn tại
          

        <a class="m_-2057696081394706252c_g300" href="/" style="color:#1967d2;text-decoration:underline" target="_blank"
          data-saferedirecturl="/">sinhvieneaut.com</a>
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border:none" width="100%">
          <tbody>
            <tr>
              <td>
                <div style="height:16px;font-size:16px;line-height:16px">&nbsp;</div>
              </td>
            </tr>
          </tbody>
        </table>

        Nếu bạn có bất kì câu hỏi gì thì liên hệ với chúng tôi qua
        <a class="m_-2057696081394706252c_g300" href="/" style="color:#1967d2;text-decoration:underline" target="_blank"
          data-saferedirecturl="/">cvhteaut@gmail.com</a>
        .Chúng tôi rất sẵn lòng nghe từ bạn.
      </div>

      <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse" width="100%">
        <tbody>
          <tr>
            <td>
              <div style="height:24px;font-size:24px;line-height:24px">&nbsp;</div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">
        Xin chào,
        <h3>Nguyễn Văn A</h3>
        <br />
      </div>
    </div>
  </div>

</main> 
`