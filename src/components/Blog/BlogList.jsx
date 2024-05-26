import React, { Fragment } from "react";
import CustomSlider from "../Slider/CustomSlider";
import { settingsSlider } from "../../ultils/constant";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogItem from "./BlogItem";
const BlogList = ({ header, listItem }) => {
  return (
    <div>
      <h3 className=" uppercase text-[#006699] text-[18px] font-semibold text-center font-main mt-5 mb-3">
        {header}
      </h3>
      <span className="cursor-pointer uppercase text-[16px] font-medium px-3 pb-3 flex justify-end items-center gap-3 font-main text-[#006699]">
        {header} KHÁC
        <FaArrowRightLong />
      </span>
      <CustomSlider
        setting={{ ...settingsSlider, slidesToShow: 3, dots: false }}
      >
        {listItem?.length > 0 &&
          listItem?.map((item, ind) => (
            <Fragment key={ind}>
              <BlogItem item={item} />
            </Fragment>
          ))}
      </CustomSlider>
    </div>
  );
};

export default BlogList;
