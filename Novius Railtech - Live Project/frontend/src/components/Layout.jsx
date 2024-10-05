import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import "../resources/layout/layout.css";
import { TbBrandGoogleHome } from "react-icons/tb";
import { RiRecordCircleLine } from "react-icons/ri";


function Layout({ children }) {
  return (
    <>
      {/* <div className="web-container"> */}
        {/* <div className="sidebar-stripe">
          <div className="icons-container">
            <TbBrandGoogleHome/>
            <RiRecordCircleLine />
          </div>
        </div> */}
        {/* <div className="xyz"> */}
          <div className="layout">
            <Header />
            <div className="content">
              <Sidebar />
              <main className="main">{children}</main>
            </div>
            <Footer />
          </div>
        {/* </div> */}
      {/* </div> */}
    </>
  );
}
export default Layout;
