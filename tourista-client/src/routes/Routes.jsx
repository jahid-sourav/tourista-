import RootLayout from "@/layouts/RootLayout";
import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/all-spot",
        element: <h1>Hello</h1>,
      },
    ],
  },
]);

export default router;
