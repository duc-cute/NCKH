import React from "react";

const BlogItem = ({ item }) => {
  const { img, title, des, day, date } = item;

  return (
    <div className="px-5 cursor-pointer relative group">
      <div className="w-full h-[230px]">
        <img src={img} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center gap-4 p-4 text-center">
        <h3 className="text-[18px] uppercase font-semibold font-main  text-[#555] leading-6 line-clamp-2">
          {title}
        </h3>
        <div className="flex justify-center h-[2px] bg-[#ccc] w-5"></div>
        <p className="leading-7">{des}</p>
      </div>
      <div className="text-primary bg-white group-hover:text-white transition-all duration-100 group-hover:bg-primary text-[14px] font-semibold font-lato absolute left-[10px] top-[6%] px-2 py-2  border-[2px] border-primary border-solid">
        <strong className="font-bold text-[16px]">{date}</strong>
        <br />
        <span>{day}</span>
      </div>
    </div>
  );
};

export default BlogItem;
