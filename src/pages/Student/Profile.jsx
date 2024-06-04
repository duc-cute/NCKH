/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  SelectOption,
  Modal,
  DragFile,
  InputField,
} from "../../components";

import icons from "../../ultils/icons";

const { AiOutlineCloudUpload, CgImport } = icons;

const Profile = () => {
  const { current } = useSelector((state) => state.user);
  const { showModal } = useSelector((state) => state.app);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const [showUploadModal, setShowUploadModal] = useState(false);

  // useEffect(() => {
  //   dispatch(showModal({
  //     isShow
  //   }))

  // },[])

  return (
    <>
      <div className="h-screen">
        <div className="text-[#3a3939] font-bold text-[24px] pl-3">
          Thông tin cá nhân sinh viên
        </div>

        <div className="flex">
          <div className="ml-3 flex flex-col items-center justify-center">
            <div className="h-[200px] w-[200px] bg-[#3d3b3d] mt-6 rounded-full">
              <img
                className="h-[200px] w-[200px] rounded-full"
                src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcStpnv_tQ4R7IwFANRwU3wv6K76_5jcrwiQgn40GdwgDQ0b7Xz7Dhycce6WR4zRFSlcAvgqAzUtQ4B0wdA"
                alt=""
              />
            </div>

            <div className="mt-3">
              <div className="font-bold">Nguyễn Thế Mạnh</div>
              <div className="mt-3">20210719</div>
            </div>

            <div className="mt-3 w-[150px]">
              <Button
                style={" text-white rounded-md "}
                icon={<AiOutlineCloudUpload />}
                handleOnclick={() => setShowUploadModal(true)}
              >
                Upload photo
              </Button>
              {showUploadModal && (
                <Modal
                  title="Upload Photo"
                  setShow={setShowUploadModal}
                  show={showUploadModal}
                  onClickBtnCancel={() => setShowUploadModal(false)}
                >
                  <InputField
                    placeholder={"Nhập url avatar ..."}
                    style={`flex max-h-[40px] w-full`}
                    name={"avatar"}
                  />
                </Modal>
              )}
            </div>
          </div>
          <div className="ml-[140px] p-4 rounded-[3%] text-[#000] border-gray-400">
            <div className="flex gap-10 flex-wrap">
              <div className="">
                <label htmlFor="" className="font-bold">
                  Mã sinh viên
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  20210719
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-bold">
                  Họ và tên
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  Nguyễn Thế Mạnh
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-bold">
                  Ngày sinh
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  05/03/2003
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-bold">
                  Địa chỉ
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  Ba vì, Hà Nội
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-bold">
                  Mã sinh viên
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  20210719
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-bold">
                  Mã sinh viên
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  20210719
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-bold">
                  Mã sinh viên
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  20210719
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-bold">
                  Mã sinh viên
                </label>
                <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                  20210719
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={<p className="text-red-600">Cảnh báo học vụ</p>}
        setShow={setShow}
        show={show}
        onClickBtnCancel={() => setShow(false)}
      >
        <ul className="space-y-4 list-inside font-main ">
          <li className="font-semibold text-xl text-red-500">
            Mức độ cảnh báo:
            <span className="text-base  font-medium ps-3  mt-2 space-y-1">
              3
            </span>
          </li>
          <li className="font-semibold text-xl text-red-500">
            Số môn nợ tín chỉ
            <ul className="ps-5 font-normal text-base mt-2 space-y-1 list-decimal list-inside">
              <li>Phân tích thiết kế hệ thống(3 tín chỉ)</li>
              <li>Tiếng anh chuyên nghành(2 tín chỉ)</li>
              <li>Tin học đại cương(2 tín chỉ)</li>
            </ul>
          </li>
          <li className="font-semibold text-xl text-red-500">
            Số môn đi học muộn quá 20%,có nguy cơ học lại
            <ul className="ps-5 font-normal text-base mt-2 space-y-1 list-decimal list-inside">
              <li>Lập trình Java(3 tín chỉ)</li>
              <li>Mạng máy tính(2 tín chỉ)</li>
              <li>Lịch sử Đảng(2 tín chỉ)</li>
            </ul>
          </li>
          <li className="font-semibold text-xl text-red-500">
            Số học phí còn nợ:
            <span className="ps-3 font-medium text-base mt-2 space-y-1">
              12.000.000 VND
            </span>
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default Profile;
