/** @format */
import Slider from "react-slick";
import { memo } from "react";
const CustomSlider = ({ setting, children }) => {
  return (
    <>
      <Slider {...setting}>{children}</Slider>
    </>
  );
};

export default memo(CustomSlider);
