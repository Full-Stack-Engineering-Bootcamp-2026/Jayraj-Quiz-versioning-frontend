import { Outlet } from "react-router-dom";

import Navbar from "@/components/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;