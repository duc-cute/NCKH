/** @format */
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { useState } from "react";
const {
  AiOutlineMessage,
  AiOutlineSchedule,
  BsFillPeopleFill,
  FaBlog,
  GiArchiveResearch,
  LuLayoutDashboard,
  RiAdminFill,
} = icons;
const menus = [
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

      {
        id: 2.4,
        path: path.MANAGE_STUDENT_TUITION,
        title: <Link to={path.MANAGE_STUDENT_TUITION}>Học phí</Link>,
      },
      {
        id: 2.5,
        path: path.MANAGE_CATEGORY,
        title: <Link to={path.MANAGE_CATEGORY}>Danh mục</Link>,
      },
    ],
  },
  {
    id: 3,
    path: path.MANAGE_COURSE,
    title: <Link to={path.MANAGE_COURSE}>Chương trình đào tạo</Link>,
    icon: <GiArchiveResearch />,
  },
  {
    id: 4,
    path: path.MANAGE_SCHEDULE,
    title: <Link to={path.MANAGE_SCHEDULE}>Quản lý lịch học</Link>,
    icon: <AiOutlineSchedule />,
  },
  {
    id: 5,
    path: path.MANAGE_BLOG,
    title: <Link to={path.MANAGE_BLOG}>Quản lý Blogs</Link>,
    icon: <FaBlog />,
  },
  {
    id: 6,
    path: path.MANAGE_MAIL,
    title: <Link to={path.MANAGE_MAIL}>Quản lý Mail</Link>,
    icon: <AiOutlineMessage />,
  },
  {
    id: 7,
    title: <label>Quản trị</label>,
    icon: <RiAdminFill />,

    subtitle: [
      {
        id: 7.1,
        path: path.ADMIN_ROLE,
        title: <Link to={path.ADMIN_ROLE}>Vai trò</Link>,
      },
      {
        id: 7.2,
        path: path.ADMIN_ACCOUNT,
        title: <Link to={path.ADMIN_ACCOUNT}>Tài khoản</Link>,
      },
    ],
  },
];
const SideBar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation();

  const isActive = (locationPath) => {
    if (location.pathname === locationPath) {
      return true;
    }
    return (
      location.pathname.endsWith(locationPath) &&
      locationPath !== `/${path.ADMIN}`
    );
  };

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
        <h2 className="font-semibold font-serif w-[150px] break-words text-center text-[14px] leading-5">
          TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐÔNG Á
        </h2>
      </div>
      <ul className="mt-6 flex flex-col gap-[10px] select-none">
        {menus.map((el) => (
          <li
            key={el.id}
            className={`relative ${
              isActive(el.path)
                ? "bg-[#1677ff] mx-1 rounded-md text-white"
                : "text-[#ffffffa6]"
            } transition-all duration-200 ease-out ${
              el.subtitle && el.id === showSubmenu ? "mb-[200px]" : "mb-0"
            } `}
          >
            <div
              className="flex gap-3 h-10 items-center pl-6 cursor-pointer "
              onClick={() => handleShowSubMenu(el.id)}
            >
              {el.icon}
              {el.title}
            </div>

            {el?.subtitle && (
              <ul
                className={`absolute w-full bg-[#000c17]  ${
                  el.id === showSubmenu ? ` visible ` : " invisible"
                }`}
              >
                {el.subtitle.map((sub) => (
                  <li key={sub.id} onClick={(e) => e.preventDefault()}>
                    <div
                      className={` ${
                        isActive(sub.path)
                          ? "bg-[#1677ff] text-white"
                          : "text-[#ffffffa6]"
                      }  flex gap-3 pl-12 h-10 items-center py-[10px] mx-1 rounded-md`}
                    >
                      {sub.title}
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
