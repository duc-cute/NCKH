/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";

const Profile = () => {
  const { current } = useSelector((state) => state.user);
  const { showModal } = useSelector((state) => state.app);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(showModal({
  //     isShow
  //   }))

  // },[])

  return (
    <>
      <div>Profile</div>
      <Modal
        title={<p className="text-red-600">Cảnh báo học vụ</p>}
        setShow={setShow}
        show={show}
        onClickBtnCancel={() => setShow(false)}
      >
        <ul className="space-y-4   list-inside font-main ">
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
