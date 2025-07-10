import React from "react";
import RightBar from "./components/RightBar";
import LeftBar from "./components/LeftBar";
import BottomBar from "./components/BottomBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: AppLayoutProps) {
  return (
    <div className="flex  ">
      {/* sidebar kiri */}
      <LeftBar />

      {/* sidebar utama */}
      <section className="flex-1 w-2/4">{children}</section>

      {/* sidebar kanan */}
      <RightBar />
      <BottomBar/>
    </div>
  );
}

export default Layout;
