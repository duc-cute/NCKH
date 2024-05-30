import React, { useEffect, useState } from "react";
import { Drawer, CategoryDepartment, CategoryClass } from "../../components";

import icons from "../../ultils/icons";
import { apiCountFaculty, apiCountClass } from "../../apis";
const { SiGoogleclassroom, FaArrowCircleRight, MdOutlineClass, IoIosCreate } =
  icons;

const ManageCategory = () => {
  const [showDes, setShowDes] = useState(false);
  const [schoolYear, setSchoolYear] = useState(false);
  const [department, setDepartment] = useState(false);
  const [titleCategory, setTitleCategory] = useState("");

  // state count
  const [countClass, setCountClass] = useState();
  const [countFaculty, setCountFaculty] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiCountFaculty();
      setCountFaculty(res.data.TotalFaculty);

      const res2 = await apiCountClass();
      setCountClass(res2.data.totalClass);
    };
    fetchData();
  });

  return (
    <>
      <div className=" h-screen">
        <div className=" mx-4 flex flex-col px-4 bg-[#ebebeb] rounded-xl pb-4">
          <div className="flex gap-3 items-center pt-5 justify-start">
            <div className=" font-bold text-[20px] ml-1">
              Tổng quan danh mục
            </div>
            <div>
              <IoIosCreate size={"18px"} />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex flex-wrap gap-8 justify-start mt-6 w-[92%]">
            <div className="relative cursor-default">
              <div className="bg-[#00c0ef] rounded-[8px] text-[#fff] p-4 w-[260px] h-[150px]">
                <div className="font-bold text-[28px]">
                  total {countFaculty}
                </div>
                <div className="text-[18px] my-5">Danh mục khoa</div>
              </div>
              <div className=" cursor-pointer">
                <div
                  className="flex gap-2 absolute text-[#fff] bottom-0 bg-[#327d90]
               hover:bg-[#346875] rounded-[8px] cursor-pointer p-2 w-full justify-center"
                  onClick={() => {
                    setShowDes(true);
                    setSchoolYear(false);
                    setDepartment(true);
                    setTitleCategory("Danh mục khoa");
                  }}
                >
                  <div className="flex gap-2 ">
                    <div>Chi tiết</div>
                    <div>
                      <FaArrowCircleRight />
                    </div>
                  </div>
                </div>
                <div className=" absolute top-2 right-2 cursor-pointer">
                  <MdOutlineClass color="#327d90" size={"60px"} />
                </div>
              </div>
            </div>

            <div className="relative cursor-default">
              <div className="bg-[#dd4b39] rounded-[8px] text-[#fff] p-4 w-[260px] h-[150px]">
                <div className="font-bold text-[28px]">total {countClass}</div>
                <div className="text-[18px] my-5">Danh mục lớp</div>
              </div>
              <div className=" cursor-pointer">
                <div
                  className="flex gap-2 absolute text-[#fff] bottom-0 bg-[#a84336] hover:bg-[#743b34]
               rounded-[8px] cursor-pointer p-2 w-full justify-center"
                  onClick={() => {
                    setShowDes(true);
                    setSchoolYear(true);
                    setDepartment(false);
                    setTitleCategory("Danh mục lớp học");
                  }}
                >
                  <div className="flex gap-2 ">
                    <div>Chi tiết</div>
                    <div>
                      <FaArrowCircleRight />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" absolute top-2 right-2">
                <SiGoogleclassroom color="#a84336" size={"60px"} />
              </div>
            </div>
          </div>
        </div>

        {showDes && (
          <Drawer
            title={titleCategory}
            onClose={() => setShowDes(false)}
            style={showDes ? "block gap-x-5 gap-y-3" : "hidden"}
          >
            <div className="drawer-department">
              {schoolYear && <CategoryClass />}
              {department && <CategoryDepartment />}
            </div>
          </Drawer>
        )}
      </div>
    </>
  );
};

export default ManageCategory;
