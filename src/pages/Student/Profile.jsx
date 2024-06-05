/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../../assets/images/bg-avatar.png";
import avatarDefault from "../../assets/images/avatarDefault.jpeg";

import { Button, Modal, InputField } from "../../components";
import { toast } from "react-toastify";
import icons from "../../ultils/icons";

const {
  AiOutlineCloudUpload,
  IoMdInformationCircleOutline,
  GrContactInfo,
  FaUserFriends,
} = icons;

import { apiDataProfile, apiUpdateAvatar, apiWarningStudent } from "../../apis";

const Profile = () => {
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.user);
  const { showModal } = useSelector((state) => state.app);
  const [show, setShow] = useState(true);
  const [selected, setSelected] = useState("studentInfo");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [profileData, setProfileData] = useState();

  // Hàm cập nhật avatar
  const [urlImage, setUrlImage] = useState(profileData?.student.Avatar || "");

  const updateAvatar = useCallback(async () => {
    try {
      const data = { UrlImage: urlImage };
      const response = await apiUpdateAvatar(data);
      if (response.status === 200) {
        setUrlImage(urlImage);
        toast.success("Cập nhật avatar thành công !");
      } else {
        toast.error("Cập nhật avatar thất bại !");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật avatar !");
    }
  }, [urlImage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiDataProfile();
        setProfileData(data?.data);
        if (data?.data?.student?.Avatar) {
          setUrlImage(data.data.student.Avatar);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Đã xảy ra lỗi khi tải dữ liệu profile !");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-10 justify-center bg-[#f5f5f5] mt-5 font-sans-serif">
        <div className="w-[25%] h-[540px] bg-black rounded-[20px] mt-6">
          <div className="h-[50%] rounded-[20px] relative">
            <img
              className="h-full inset-0 bg-black opacity-60 rounded-[20px]"
              src={backgroundImage}
              alt="Background"
            />
            <div className="absolute top-[12%] left-[24%] transform-[-50%,-50%] flex flex-col justify-center items-center">
              <div className="w-[140px] h-[140px] rounded-[50%] border-solid border-purple-300 border-2">
                <img
                  className="w-[140px] h-[140px] rounded-[50%] border-solid border-purple-300 border-2"
                  src={urlImage}
                  alt="Avatar"
                />
              </div>
              <div className="flex flex-col items-center mt-3 text-[#fff]">
                <div className="font-bold">
                  {profileData?.student.FullName || "Mạnh Mạnh Đức"}
                </div>
                <div className="mt-3">
                  Mã sinh viên: {profileData?.student.Msv || "20210719"}
                </div>
                <div className="mt-3">
                  Khóa: {profileData?.student.Key || "12"}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fff] h-[50%] ">
            <div className="p-8">
              <div className="font-bold text-[22px]">Quản lý thông tin</div>
              <div
                className={`flex gap-2 item-center mt-6 cursor-pointer p-3 ${
                  selected === "studentInfo" ? "bg-[#ebebeb] rounded" : ""
                }`}
                onClick={() => setSelected("studentInfo")}
              >
                <div>
                  <GrContactInfo color="black" />
                </div>
                <div className="text-[18px]">Thông tin sinh viên</div>
              </div>
              <div
                className={`flex gap-2 item-center mt-2 cursor-pointer p-3 ${
                  selected === "relativeInfo" ? "bg-[#ebebeb] rounded" : ""
                }`}
                onClick={() => setSelected("relativeInfo")}
              >
                <div>
                  <FaUserFriends color="black" />
                </div>
                <div className="text-[18px]">Thông tin người thân</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[65%] rounded-[20px] bg-[#fff] mt-6">
          <div className="flex items-center">
            <div className="font-bold text-[22px] pl-10 py-10">
              Thông tin chi tiết
            </div>
            <div className="ml-2">
              <IoMdInformationCircleOutline size={"22px"} />
            </div>
          </div>
          <div className="ml-10">
            {selected === "studentInfo" ? (
              <div className="flex gap-7 flex-wrap">
                <div className="w-[400px]">
                  <InputField
                    value={profileData?.student.Email || ""}
                    label="Email"
                    onChange={() => {}}
                  />
                </div>
                <div className="w-[400px]">
                  <InputField
                    value={profileData?.student.Gender || ""}
                    label="Giới tính"
                    onChange={() => {}}
                  />
                </div>
                <div className="w-[400px]">
                  <InputField
                    value={
                      new Date(
                        profileData?.student.DateOfBirth
                      ).toLocaleDateString() || ""
                    }
                    label="Ngày sinh"
                    onChange={() => {}}
                  />
                </div>
                <div className="w-[400px]">
                  <InputField
                    value={profileData?.student.Hometown || ""}
                    label="Quê quán"
                    onChange={() => {}}
                  />
                </div>
                <div className="w-[400px]">
                  <InputField
                    value={profileData?.student.PermanentResidence || ""}
                    label="Nơi thường trú"
                    onChange={() => {}}
                  />
                </div>
                <div className="w-[400px]">
                  <InputField
                    value={profileData?.student.PhoneNumber || ""}
                    label="Số điện thoại"
                    onChange={() => {}}
                  />
                </div>
                <div className="w-[130px] h[100px]">
                  <div className="font-bold">Cập nhật avatar</div>
                  <div className="mt-5">
                    <Button
                      style={"text-white rounded-md"}
                      icon={<AiOutlineCloudUpload />}
                      handleOnclick={() => setShowUploadModal(true)}
                    >
                      Cập nhật
                    </Button>
                    <Modal
                      title={<p className="text-[#000]">Cập nhật avatar</p>}
                      setShow={setShowUploadModal}
                      show={showUploadModal}
                      onClickBtnCancel={() => setShowUploadModal(false)}
                      onClickBtnOk={() => {
                        if (urlImage === "") {
                          toast.error("Không được bỏ trống url !");
                        } else {
                          updateAvatar();
                          setShowUploadModal(false);
                        }
                      }}
                    >
                      <div className="w-full">
                        <InputField
                          value={urlImage}
                          onChange={(e) => {
                            setUrlImage(e.target.value);
                          }}
                          type="text"
                          placeholder="Nhập url địa chỉ ảnh để cập nhật avatar ..."
                        />
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-7 flex-wrap">
                {profileData?.relatives.map((relative, index) => (
                  <div className="w-[400px]" key={index}>
                    <InputField
                      value={relative.Name || ""}
                      label={`Tên giám hộ ${index + 1}`}
                    />
                    <InputField
                      value={relative.Role || ""}
                      label={`Vai trò giám hộ ${index + 1}`}
                    />
                    <InputField
                      value={relative.PhoneNumber || ""}
                      label={`Số điện thoại giám hộ ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
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
            Số môn đi học muộn quá 20%, có nguy cơ học lại
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
