/** @format */
import { Layout, NotFound } from "./components";
import { Blog, Login, Profile, Register, Study } from "./pages/Student";
import {
  DashBoash,
  ManageBlog,
  ManageCourse,
  ManageSchedule,
  ManageStudent,
  ManageMail,
} from "./pages/Admin";
import path from "./ultils/path";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: path.HOME,
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      { index: true, element: <Profile /> },
      {
        path: path.BLOG,
        element: <Blog />,
      },
      {
        path: path.STUDY,
        element: <Study />,
      },
    ],
  },
  {
    path: path.ADMIN,
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <DashBoash />,
      },
      {
        path: path.MANAGE_BLOG,
        element: <ManageBlog />,
      },
      {
        path: path.MANAGE_COURSE,
        element: <ManageCourse />,
      },
      {
        path: path.MANAGE_STUDENT,
        element: <ManageStudent />,
      },
      {
        path: path.MANAGE_SCHEDULE,
        element: <ManageSchedule />,
      },
      {
        path: path.MANAGE_MAIL,
        element: <ManageMail />,
      },
    ],
  },
  { path: path.REGISTER, element: <Register /> },
  { path: path.LOGIN, element: <Login /> },
]);

function App() {
  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
