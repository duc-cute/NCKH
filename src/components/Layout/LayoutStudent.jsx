/** @format */
import { useSelector } from "react-redux";
import { Header, SideBar } from "..";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";
const LayoutStudent = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (current?.role !== "User") return <Navigate to={`/${path.LOGIN}`} />;

  return (
    <main>
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default LayoutStudent;
