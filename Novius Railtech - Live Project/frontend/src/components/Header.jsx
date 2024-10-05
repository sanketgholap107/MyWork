import React, { useState } from "react";
import "../resources/header/header.css";
import { NotificationIcon } from "react-autoql";
import { IoSettingsOutline } from "react-icons/io5";
import CompanyIcon from "../assets/Digi-Workshop.png";
import IndRaiIcon from "../assets/indian-rail-nobackround.png";
// import HeadDigiIcon from "../assets/Digi-Workshoptext.png";

function Header() {
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const handleOnChange = (e) => {
    setSelectedWorkshop(e.target.value);
  };
  return (
    <header className="header">
      <div className="header-container">
        <img src={CompanyIcon} alt="Company Logo" className="logo" />
        <div className="mid-content">
          <div className="mid-content-A">
      
             <div><span>NOVIUS DIGI - WORKSHOP</span>
          <br/><br/>NOVIUS RAILWAY WORKSHOP MANAGEMENT SYSTEM
        </div>
          </div>
        </div>
        <div className="end-content">
          <div className="header-login">
            <div>
              <select
        
                className="header-login-dropdown1"
                onChange={handleOnChange}
              >
                <option>Select Workshop</option>
                <option value="CR MATUNGA - WHEEL SHOP" selected>
                  CR MATUNGA - WHEEL SHOP
                </option>
              </select>
            </div>
            <div>
              <select className="header-login-dropdown1">
                <option selected>Administrator</option>
                <option>Update Profile</option>
              </select>
            </div>
            <NotificationIcon />
            <IoSettingsOutline color="rgb(12, 62, 153)" />
          </div>
          <div className="end-content-2">
            <div>
              <p>
                {/* {selectedWorkshop
                  ? selectedWorkshop
                  : "Select a Workshop from Dropdown !"} */}
                {/* {selectedWorkshop == "Select Workshop"
                  ? "Select a Workshop from Dropdown !"
                  : selectedWorkshop || "Select a Workshop from Dropdown !"} */}
                  CR MATUNGA - WHEEL SHOP
              </p>
            </div>
            <img
              src={IndRaiIcon}
              alt="Indian Railway Logo"
              className="IR-logo"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
