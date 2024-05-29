import React from "react";
const categoryDocumentStudy = [
  {
    id: 1,
    title: "Phát triển",
  },
  {
    id: 2,
    title: "Kinh doanh",
  },
  {
    id: 3,
    title: "Tài chính && Kế toán",
  },
  {
    id: 4,
    title: "CNTT && Phát triển phần mềm",
  },
  {
    id: 5,
    title: "Năng suất văn phòng",
  },
  {
    id: 6,
    title: "Phát triển cá nhân",
  },
  {
    id: 7,
    title: "Thiết kế",
  },
  {
    id: 8,
    title: "Marketing",
  },
  {
    id: 9,
    title: "Sức khỏe và Thể dục",
  },
  {
    id: 10,
    title: "Âm nhạc",
  },
];
const HeaderDocumentStudy = () => {
  return (
    <nav className=" border border-t-[1px] border-[#d1d7dc] shadow-category-study z-[100]">
      <ul className="flex justify-center items-center gap-5 h-12">
        {categoryDocumentStudy?.map((cate) => (
          <li key={cate?.id}>
            <a className="text-[16px] underline text-[#2d2f31]" href="">
              {cate?.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderDocumentStudy;
