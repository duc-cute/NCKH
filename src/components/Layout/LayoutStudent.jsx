/** @format */
import { useSelector } from "react-redux";
import { Header, SideBar } from "..";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";
const LayoutStudent = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} />;
  // if (!isLoggedIn || !current) return <Navigate to={`${path.LOGIN}`} />;
  return (
    <main>
      <Header />
      <div className="w-full bg-[#f5f5f5] pt-5">
        <Outlet />
      </div>
    </main>
  );
};

export default LayoutStudent;
