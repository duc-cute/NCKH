import React from "react";
import { FaPlay } from "react-icons/fa";
import thumb from "../../assets/images/thumb-study.jpg";
const DocumentStudying = () => {
  return (
    <div className="flex font-main border-solid border-[1px] border-[#d1d7dc]">
      <div className="h-[150px] max-h-[150px] flex-2 relative">
        <img src={thumb} className="w-full h-full object-cover " />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#2d2f3180] flex items-center justify-center">
          <span className="w-12 text-xl h-12 rounded-full bg-white flex items-center justify-center">
            <FaPlay />
          </span>
        </div>
      </div>
      <div className="flex-5 p-3 flex flex-col justify-between ">
        <div className="">
          <span className="line-clamp-1 text-[#6a6f73] text-[14px] font-semibold">
            {" "}
            Thực Hành Bài Test Fresher React Frontend
          </span>
          <h3 className="font-semibold text-[16px] mt-3 line-clamp-2 leading-6">
            85. #75.1 Lưu ý Khi Triển Khai với Vercel
          </h3>
        </div>
        <span className="text-[#6a6f73] items-end text-[14px] font-semibold">
          Bài viết<strong className="font-thin"> • 1 phút</strong>
        </span>
      </div>
    </div>
  );
};

export default DocumentStudying;
