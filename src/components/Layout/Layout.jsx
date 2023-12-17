/** @format */
import { Header, SideBar } from "..";
import { Outlet } from "react-router-dom";
const Layout = () => {
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
