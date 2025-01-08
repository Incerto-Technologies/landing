import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";
import Footer from "../Footer";

export const RootLayout = () => {
  return (
    <div className="flex min-h-[100vh] flex-col bg-background">
      <Navbar />
      <main className="flex-1 mt-[60px] w-full px-[5%] max-lg:px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
