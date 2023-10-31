/** @format */
import { Header, SideBar } from "..";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main>
      <Header />
      <SideBar />
      <div className="w-main">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
