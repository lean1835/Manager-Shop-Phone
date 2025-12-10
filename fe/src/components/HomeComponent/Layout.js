import React from "react";
import HeaderComponent from "./HeaderComponent";
import BannerComponent from "./BannerComponent";
import FooterComponent from "./FooterComponent";
import "./Layout.css"; // Đảm bảo file CSS hoạt động đúng
import BodyComponent from "./BodyComponent";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <HeaderComponent />
      {/* <BannerComponent />      */}
      <main className="content">{children}</main> {/* Nội dung chính */}
      <FooterComponent />
    </div>
  );
};

export default Layout;
