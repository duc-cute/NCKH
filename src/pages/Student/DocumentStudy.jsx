import React from "react";
import Slider from "react-slick";
import { CustomSlider } from "../../components";
import sliderStudy from "../../assets/images/sliderStudy.jpg";
import { settingsSlider } from "../../ultils/constant";
import HeaderDocumentStudy from "../../components/Header/HeaderDocumentStudy";
import { useSelector } from "react-redux";
import DocumentStudying from "../../components/DocumentStudyComponent/DocumentStudying";
import DocumentStudyItem from "../../components/DocumentStudyComponent/DocumentStudyItem";

const DocumentStudy = () => {
  const { current } = useSelector((state) => state.user);
  console.log("cu", current);

  return (
    <>
      <HeaderDocumentStudy />
      <section className="max-w-[1400px] mx-auto">
        <CustomSlider
          setting={{ ...settingsSlider, dots: false, arrows: true }}
        >
          <div>
            <div className="h-[400px] relative font-main">
              <img src={sliderStudy} className="w-full h-full object-cover" />
              <div class="absolute max-w-[440px] top-[16%] left-[5%] bg-white py-5 px-5">
                <h1 className="text-4xl line-clamp-3 font-serif font-bold ">
                  Chúng tôi nhớ bạn, DucNguyen ơi
                </h1>
                <p className="mt-3 leading-6">
                  <u>
                    <a
                      className="text-[#5624d0]"
                      target="_blank"
                      href="https://www.udemy.com/home/my-courses/learning/?locale=vi_VN"
                    >
                      Hãy học trở lại
                    </a>
                  </u>{" "}
                  và hoàn thành mục tiêu của bạn. Chỉ 5-10 phút mỗi ngày là đủ.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="h-[400px] relative font-main">
              <img src={sliderStudy} className="w-full h-full object-cover" />
              <div class="absolute max-w-[440px] top-[16%] left-[5%] bg-white py-5 px-5">
                <h1 className="text-4xl line-clamp-3 font-serif font-bold ">
                  Chúng tôi nhớ bạn, {current?.username} ơi
                </h1>
                <p className="mt-3 leading-6">
                  <u>
                    <a
                      className="text-[#5624d0]"
                      target="_blank"
                      href="https://www.udemy.com/home/my-courses/learning/?locale=vi_VN"
                    >
                      Hãy học trở lại
                    </a>
                  </u>{" "}
                  và hoàn thành mục tiêu của bạn. Chỉ 5-10 phút mỗi ngày là đủ.
                </p>
              </div>
            </div>
          </div>
        </CustomSlider>
        <div className="px-5 mt-5">
          <div className="px-[10px] py-5 flex items-center justify-between">
            <h3 className="text-[#2d2f31] text-3xl font-serif font-bold">
              {" "}
              {current?.username} ơi, hãy bắt đầu học nào
            </h3>
            <span className="font-bold underline text-[#5624d0] text-xl font-serif underline-offset-[5px]">
              Học tập
            </span>
          </div>
          <CustomSlider
            setting={{
              ...settingsSlider,
              slidesToShow: 3,
              dots: false,
            }}
          >
            <DocumentStudying />
            <DocumentStudying />
            <DocumentStudying />
          </CustomSlider>{" "}
          <div className="mt-5">
            <div className="px-[10px] py-5 ">
              <h3 className="text-[#2d2f31] text-3xl font-sans-serif font-bold">
                Được đề xuất cho bạn
              </h3>
            </div>
            <CustomSlider
              setting={{
                ...settingsSlider,
                slidesToShow: 5,
                dots: false,
              }}
            >
              <DocumentStudyItem />
              <DocumentStudyItem />
              <DocumentStudyItem />
              <DocumentStudyItem />
              <DocumentStudyItem />
            </CustomSlider>
          </div>
        </div>
      </section>
    </>
  );
};

export default DocumentStudy;
