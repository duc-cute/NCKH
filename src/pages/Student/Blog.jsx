/** @format */

import React, { Fragment } from "react";
import { CustomSlider } from "../../components";
import sliderFirst from "../../assets/images/slider.png";
import sliderEnd from "../../assets/images/slider2.png";
import blogImg from "../../assets/images/blog1.jpg";
import { settingsSlider } from "../../ultils/constant";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogList from "../../components/Blog/BlogList";
const Blog = () => {
  const listBlogs = [
    {
      id: 1,
      header: "Tin tức",
      listItem: [
        {
          id: "1.1",
          img: "https://eaut.edu.vn/wp-content/uploads/2024/05/Muc-luong-nganh-xay-dung.jpg",
          title: " Mức lương ngành kỹ thuật Xây dựng hiện nay là bao nhiêu?",
          des: "Trong thời đại hiện nay, ngành Xây dựng không chỉ là một trong những lĩnh",
          day: "08",
          date: "Th5",
        },
        {
          id: "1.2",
          img: "https://eaut.edu.vn/wp-content/uploads/2024/05/Nganh-Ke-toan-eaut.jpg",
          title:
            "4+ Cách học bài nhanh thuộc và nhớ lâu dành cho học sinh sinh viên",
          des: "Cách học bài nhanh thuộc và nhớ lâu là một trong những mục tiêu quan",
          day: "08",
          date: "Th5",
        },
        {
          id: "1.3",
          img: "https://eaut.edu.vn/wp-content/uploads/2024/05/Nganh-Marketing-eaut.png",
          title:
            "[2024] Mức lương ngành Marketing là bao nhiêu? Các yếu tố ảnh hưởng",
          des: "Ngành Marketing đang trở thành một trong những lĩnh vực thu hút sự quan tâm",
          day: "08",
          date: "Th5",
        },
      ],
    },
    {
      id: 2,
      header: "SỰ KIỆN",
      listItem: [
        {
          id: "2.1",
          img: "https://eaut.edu.vn/wp-content/uploads/2024/05/CHUYEN-DI-TRAI-NGHIEM-THUC-TE-KHO-QUEN-CUA-SINH-VIEN-KHOA-DU-LICH-TAI-HA-NAM-HDD.jpg",
          title:
            "CHUYẾN ĐI TRẢI NGHIỆM THỰC TẾ KHÓ QUÊN CỦA SINH VIÊN KHOA DU LỊCH TẠI HÀ NAM",
          des: "Ngày 19/5/2024, Khoa Du lịch trường Đại học Công nghệ Đông Á đã có chuyến...",
          day: "08",
          date: "Th5",
        },
        {
          id: "2.2",
          img: "https://eaut.edu.vn/wp-content/uploads/2024/05/F8C7767.jpg",
          title:
            "KHOA CƠ KHÍ TỔ CHỨC THÀNH CÔNG HỘI THẢO KHOA HỌC: “CÔNG NGHỆ CƠ KHÍ – Ô TÔ TRONG THỜI KỲ KỶ NGUYÊN SỐ",
          des: "Sáng ngày 11/5/2024, tại phòng 301, Tòa Gara ô tô trường đại học Công Nghệ...",
          day: "08",
          date: "Th5",
        },
        {
          id: "2.3",
          img: "https://eaut.edu.vn/wp-content/uploads/2024/05/438259825_961293346001498_9218266190007326799_n.jpg",
          title:
            "[ITCI] BLOCKCHAIN –  TIỀM NĂNG VÀ ỨNG DỤNG TRONG NỀN KINH TẾ SỐ",
          des: "Đó là chủ đề của buổi Hội thảo khoa học do Viện Hợp tác Quốc...",
          day: "08",
          date: "Th5",
        },
      ],
    },
    {
      id: 3,
      header: "CÁC NGÀNH ĐÀO TẠO TẠI EAUT",
      listItem: [
        {
          id: "3.1",
          img: "https://eaut.edu.vn/wp-content/uploads/2023/12/Nganh-Quan-tri-Kinh-doanh-1.png",
          title: "NGÀNH QUẢN TRỊ KINH DOANH",
          des: "Ngành quản trị kinh doanh (QTKD) là một trong những ngành học đóng vai trò...					",
          day: "08",
          date: "Th5",
        },
        {
          id: "3.2",
          img: "https://eaut.edu.vn/wp-content/uploads/2023/12/Nganh-Cong-nghe-Thong-tin-1.png",
          title: "NGÀNH CÔNG NGHỆ THÔNG TIN",
          des: "Trong bối cảnh hiện nay của Việt Nam, ngành Công nghệ thông tin (CNTT) là...					",
          day: "08",
          date: "Th5",
        },
        {
          id: "3.3",
          img: "https://eaut.edu.vn/wp-content/uploads/2023/12/Nganh-Cong-nghe-ky-thuat-o-to.png",
          title: "NGÀNH CÔNG NGHỆ KỸ THUẬT Ô TÔ",
          des: "Trong xu hướng phát triển của xã hội hiện đại, Việt Nam coi Công nghệ...					",
          day: "08",
          date: "Th5",
        },
      ],
    },
  ];
  return (
    <section>
      <div>
        <CustomSlider setting={settingsSlider}>
          <div className="w-full max-h-[480px]">
            <img className="w-full h-full object-cover " src={sliderFirst} />
          </div>
          <div className="w-full max-h-[480px]">
            <img className="w-full h-full object-cover " src={sliderEnd} />
          </div>
        </CustomSlider>
      </div>
      <div className="py-2 px-10 slider-container mt-10">
        {listBlogs?.length > 0 &&
          listBlogs?.map((blog, ind) => (
            <Fragment key={ind}>
              <BlogList header={blog?.header} listItem={blog?.listItem} />
            </Fragment>
          ))}
      </div>
    </section>
  );
};

export default Blog;
