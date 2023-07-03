import { Outlet } from "react-router-dom";
import { Header } from ".";

const Layout = () => {
  return (
    <main className="p-[10px] max-w-[600px] mx-auto">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
