import React from "react";
import { Link } from "react-router-dom";
import "../resources/sidebar/sidebar.css";
import { TbBrandGoogleHome } from "react-icons/tb";
import { RiRecordCircleLine } from "react-icons/ri";
import { HiMiniFolderMinus } from "react-icons/hi2";
import { LuUserCircle2 } from "react-icons/lu";
import { GoShieldLock } from "react-icons/go";
import { TbCheckbox } from "react-icons/tb";
// import { PiFiles } from "react-icons/pi";
// import { IoMdTime } from "react-icons/io";
// import { PiSuitcaseSimple } from "react-icons/pi";
import { LuSlidersHorizontal } from "react-icons/lu";
import { CiMemoPad } from "react-icons/ci";
import { FaTrain } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

function Sidebar() {
  return (

        <div className="sidebar">
          <div className="icons-container">
            <TbBrandGoogleHome />
            <CiMemoPad />
            {/* <RiRecordCircleLine /> */}
            <TbSteeringWheel />
            <FaTrain />
            <FaTrain />
            <FaTrain />
            <FaTrain />
            <FaTrain />
            <CiLogin />
            <CiLogout />
            <LuUserCircle2 />
            {/* <IoMdTime /> */}
            <LuSlidersHorizontal />
            <TbCheckbox />
          </div>
          <div className="sidebar-content">
            {/* <div> */}
            <div>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div>Reports</div>
            <div>
              <Link to="/add_wheel">PreInspection</Link>
            </div>
            <div className="train">
              <div>
                <Link to="/LHBDivisionPreInspectionForm/wheel_details">LHB Division</Link>
              </div>
              <div>
                <Link to="/LHBSchedulePreInspection/details">LHB Schedule</Link>
              </div>
              <div>ICF</div>
              <div>EMU</div>
              <div>VB</div>
            </div>
            <div>Inward</div>
            <div>Outward</div>
            <div>User Mngt</div>
            <div>Settings</div>
            <div>
              <Link to="/pending_tasks">Pending Tasks</Link>
            </div>
            {/* <div>Settings</div> */}
            {/* </div> */}
            {/* 
          <div>DASHBOARD</div>
        <div>ADD WHEEL</div>
        <div>REPORTS</div>
        <div>User DETAILS</div>
        <div>SECURE PROVISIONING</div>
        <div>ACCESS REVIEWER</div>
        <div>RULE BOOKS</div>
        <div>ACTIVITY HISTORY</div>
        <div>SCHEDULE JOBS</div>
        <div>SAP CONFIGURATION</div>
        <div>REPORTS</div>
        */}
          </div>
        </div>
  
  );
}

export default Sidebar;
