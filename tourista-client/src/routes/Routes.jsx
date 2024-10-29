import RootLayout from "@/layouts/RootLayout";
import AddSpot from "@/pages/AddSpot";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import MyListed from "@/pages/MyListed";
import Profile from "@/pages/Profile";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/me",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/add-spot",
        element: (
          <ProtectedRoutes>
            <AddSpot />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-list",
        element: (
          <ProtectedRoutes>
            <MyListed />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
