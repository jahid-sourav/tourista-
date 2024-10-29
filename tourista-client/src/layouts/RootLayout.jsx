import Footer from "@/components/custom-components/Footer";
import Header from "@/components/custom-components/Header";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-112px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
