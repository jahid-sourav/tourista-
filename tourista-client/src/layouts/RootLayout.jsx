import Footer from "@/components/custom-components/Footer";
import Header from "@/components/custom-components/Header";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

const RootLayout = () => {
  const location = useLocation();
  const registerPage = location.pathname === "/register";
  const loginPage = location.pathname === "/login";
  const { user } = useAuth();

  if (user && (registerPage || loginPage)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!registerPage && !loginPage && <Header />}
      <main className="min-h-[calc(100vh-112px)]">
        <Outlet />
      </main>
      {!registerPage && !loginPage && <Footer />}
    </>
  );
};

export default RootLayout;
