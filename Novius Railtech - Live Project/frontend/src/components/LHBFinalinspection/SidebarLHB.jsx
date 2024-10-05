import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/preInspectionform/preInspectionform.css";
// import "../../resources/LHB/finalInspectionform/finalinspectionform.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarLHB({ setActiveStep }) {
    const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const SidebarData = [
    { title: "Axle Details", link: "axle_details",step: 0 },
    { title: "Wheel Details", link: "wheel_details",step: 1 },
    { title: "Journal Details", link: "journal_details" ,step: 2},
    { title: "BD Details", link: "bd_details" ,step: 3},
    { title: "BRG Details", link: "brg_details" ,step: 4},
    { title: "General Inspection", link: "general_details" ,step: 5},
  ];

  const handleLinkClick = (link,step) => {
    setActiveLink("/lhbfinalinspection/" +link);
    setActiveStep(step);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className="sidebar1">
        <ul className="sidebarlist">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                onClick={() => handleLinkClick(val.link, val.step)}
                className={
                  activeLink === "/lhbfinalinspection/" + val.link
                    ? "active"
                    : "inactive"
                }
              >
                <Link to={val.link} className="sidebar-link">
                  <div>{val.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="vertical"></div>
      </div>
    </div>
  );
}

export default SidebarLHB;
