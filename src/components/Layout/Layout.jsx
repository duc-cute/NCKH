/** @format */
import { useSelector } from "react-redux";
import { Header, SideBar } from "..";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";
const Layout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  // console.log("curr", current);
  if (current?.role !== "Admin" && current?.role !== "Lecturers") {
    return <Navigate to={`/${path.LOGIN}`} />;
  }
  // if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} />;
  // if (!isLoggedIn || !current) return <Navigate to={`${path.LOGIN}`} />;
  return (
    <main>
      <SideBar />
      <div className="ml-[200px]">
        <Header />
        <div className="w-full bg-[#f5f5f5] pt-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
