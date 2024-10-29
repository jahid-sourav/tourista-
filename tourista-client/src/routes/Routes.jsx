import RootLayout from "@/layouts/RootLayout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);

export default router;
