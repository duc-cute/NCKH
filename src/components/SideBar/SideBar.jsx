/** @format */
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { useState } from "react";
import { useSelector } from "react-redux";
const {
  AiOutlineMessage,
  AiOutlineSchedule,
  BsFillPeopleFill,
  FaBlog,
  GiArchiveResearch,
  LuLayoutDashboard,
  RiAdminFill,
  BiCategory,
  IoSettingsOutline,
} = icons;
let menusSub = [
  {
    id: 1,
    path: `/${path.ADMIN}`,
    title: <Link to={`/${path.ADMIN}`}>Bảng điều khiển</Link>,
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,

    title: <label>Quản lý sinh viên</label>,
    icon: <BsFillPeopleFill />,

    subtitle: [
      {
        id: 2.1,
        path: path.MANAGE_STUDENT_CRUD,
        title: <Link to={path.MANAGE_STUDENT_CRUD}>Sinh viên</Link>,
      },
      {
        id: 2.2,
        path: path.MANAGE_STUDENT_SCORE,
        title: <Link to={path.MANAGE_STUDENT_SCORE}>Điểm học tập</Link>,
      },
      {
        id: 2.3,
        path: path.MANAGE_STUDENT_ATTENDANCE,
        title: <Link to={path.MANAGE_STUDENT_ATTENDANCE}>Điểm danh</Link>,
      },
    ],
  },

  {
    id: 6,
    path: path.MANAGE_SCHEDULE,
    title: <Link to={path.MANAGE_SCHEDULE}>Quản lý lịch học</Link>,
    icon: <AiOutlineSchedule />,
  },
  {
    id: 7,
    path: path.MANAGE_BLOG,
    title: <Link to={path.MANAGE_BLOG}>Quản lý Blogs</Link>,
    icon: <FaBlog />,
  },
  {
    id: 8,
    path: path.MANAGE_MAIL,
    title: <Link to={path.MANAGE_MAIL}>Quản lý Mail</Link>,
    icon: <AiOutlineMessage />,
  },
];

const menuAdmin = [
  {
    id: 3,
    path: path.STUDENT_WARNING,
    title: <Link to={path.STUDENT_WARNING}>Thiết lập cảnh báo</Link>,
    icon: <IoSettingsOutline />,
  },
  {
    id: 5,
    path: path.MANAGE_COURSE,
    title: <Link to={path.MANAGE_COURSE}>Chương trình đào tạo</Link>,
    icon: <GiArchiveResearch />,
  },
  ,
  {
    id: 4,
    path: path.MANAGE_CATEGORY,
    title: <Link to={path.MANAGE_CATEGORY}>Quản lý danh mục</Link>,
    icon: <BiCategory />,
  },

  {
    id: 9,
    title: <label>Quản trị</label>,
    icon: <RiAdminFill />,

    subtitle: [
      {
        id: 9.1,
        path: path.ADMIN_ROLE,
        title: <Link to={path.ADMIN_ROLE}>Vai trò</Link>,
      },
      {
        id: 9.2,
        path: path.ADMIN_ACCOUNT,
        title: <Link to={path.ADMIN_ACCOUNT}>Tài khoản</Link>,
      },
    ],
  },
];
const SideBar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation();
  const { current } = useSelector((state) => state.user);

  const isActive = (locationPath) => {
    if (location.pathname === locationPath) {
      return true;
    }
    return (
      location.pathname.endsWith(locationPath) &&
      locationPath !== `/${path.ADMIN}`
    );
  };
  let menus = [...menusSub];
  if (current?.role === "Admin") {
    menus = [...menusSub, ...menuAdmin];
    menus = menus.sort((a, b) => a?.id - b?.id);
  }

  const handleShowSubMenu = (id) => {
    id === showSubmenu ? setShowSubmenu(null) : setShowSubmenu(id);
  };

  return (
    <aside className="w-[210px] fixed top-0 left-0 bottom-0 bg-main text-white h-full">
      <div className="flex items-center flex-col gap-5 mt-5">
        <img
          className="w-[108px] h-[108px] object-contain"
          src={logo}
          alt="logo"
        />
        {/* <h2 className="font-semibold font-serif w-[150px] break-words text-center text-[14px] leading-5 uppercase">
          Phần mềm hỗ trợ cố vấn học tập
        </h2> */}
      </div>
      <ul className="mt-6 flex flex-col gap-[10px] select-none">
        {menus.map((el) => (
          <li
            key={el?.id}
            className={`relative ${
              isActive(el?.path)
                ? "bg-[#1677ff] mx-1 rounded-md text-white"
                : "text-[#ffffffa6]"
            } transition-all duration-200 ease-out ${
              el?.subtitle && el?.id === showSubmenu ? "mb-[120px]" : "mb-0"
            } `}
          >
            <div
              className="flex gap-3 h-10 items-center pl-6 cursor-pointer "
              onClick={() => handleShowSubMenu(el?.id)}
            >
              {el?.icon}
              {el?.title}
            </div>

            {el?.subtitle && (
              <ul
                className={`absolute w-full bg-[#000c17]  ${
                  el?.id === showSubmenu ? ` visible ` : " invisible"
                }`}
              >
                {el?.subtitle.map((sub) => (
                  <li key={sub?.id} onClick={(e) => e.preventDefault()}>
                    <div
                      className={` ${
                        isActive(sub?.path)
                          ? "bg-[#1677ff] text-white"
                          : "text-[#ffffffa6]"
                      }  flex gap-3 pl-12 h-10 items-center py-[10px] mx-1 rounded-md`}
                    >
                      {sub?.title}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
