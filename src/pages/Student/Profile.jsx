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

const {
  AiOutlineCloudUpload,
  IoMdInformationCircleOutline,
  GrContactInfo,
  FaUserFriends,
} = icons;

import { apiDataProfile, apiUpdateAvatar, apiWarningStudent } from "../../apis";

const Profile = () => {
  const { current } = useSelector((state) => state.user);
  const { showModal } = useSelector((state) => state.app);

  const { dataProfile, setDataProfile } = useState();
  const [updataAvatar, setDataAvatar] = useState();

  const { dataWarning, setDataWarning } = useState();

  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiDataProfile();
      setDataProfile(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiWarningStudent();
      setDataWarning(data);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   dispatch(showModal({
  //     isShow
  //   }))

  // },[])

  return (
    <>
      <div className="h-screen">
        <div className="flex items-center">
          <div className="text-[#3a3939] font-bold text-[24px] pl-8">
            Profile sinh viên
          </div>
          <div className="ml-3">
            <GrContactInfo />
          </div>
        </div>

        <div className="flex">
          <div>
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
          </div>
          <div>
            <div className="ml-[140px] p-4 rounded-[3%] text-[#000] border-gray-400">
              <div className="flex items-center">
                <div className="font-bold my-5 text-[20px]">
                  Thông tin sinh viên
                </div>
                <div className="ml-2">
                  <IoMdInformationCircleOutline />
                </div>
              </div>
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
                    Thường chú
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    Ba vì, Hà Nội
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Giới tính
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    Nam
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Quê quán
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    Ba vì
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Số điện thoại
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    12
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Khóa
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    12
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Người thân 1
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    Nguyễn Văn Quân
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="font-bold">
                    Số điện thoại người thân 1
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    0987739823
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="font-bold">
                    Nơi thường chú người thân 1
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    Hà Nội
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="font-bold">
                    Người thân 2
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    Nguyễn Văn A
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="font-bold">
                    Số điện thoại người thân 2
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    0987739823
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="font-bold">
                    Nơi thường chú người thân 2
                  </label>
                  <div className="bg-white w-[300px] p-4 mt-2 border-solid border-rose-600 rounded-full">
                    Hà Nội
                  </div>
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
