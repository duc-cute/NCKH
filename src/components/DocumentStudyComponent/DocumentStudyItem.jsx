import React from "react";
import { FaStar } from "react-icons/fa";
import thumb from "../../assets/images/study_item.jpg";
const DocumentStudyItem = () => {
  return (
    <article className="font-main bg-white cursor-pointer">
      <img className="w-full h-[140px] object-cover" src={thumb} alt="" />
      <div className="mt-3">
        <div className="text-[#27272A] min-h-[80px] flex flex-col gap-1 mt-1">
          <h3 className="font-semibold text-[16px] text-[#000] leading-5 line-clamp-2">
            AWS Cloud for beginner (Vietnamese)
          </h3>
          <span className="text-[12px] text-[#6a6f73] font-thin leading-5 line-clamp-1">
            Thiện Nguyễn
          </span>
          <div className="flex gap-2 ">
            <div className="flex gap-1 text-[12px] text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span className="text-[#808089] text-[12px]">(5000)</span>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-2">
        <span className="leading-5 text-[12px] bg-[#eceb98] text-[#3d3c0a] font-semibold  ">
          Xem nhiều nhất
        </span>
      </div>
    </article>
  );
};

export default DocumentStudyItem;
