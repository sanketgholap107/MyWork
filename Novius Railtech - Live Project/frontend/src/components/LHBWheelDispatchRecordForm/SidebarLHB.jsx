import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/preInspectionform/preInspectionform.css";
// import "../../resources/LHB/wheelsdispatchrecordform/wheelsdispatchrecordform.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarLHB() {
    const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const SidebarData = [
    { title: "Division/Carshed Details", link: "divisionorcarshed_details" },
    { title: "Wheel Details", link: "wheel_details" },
    
  ];

  const handleLinkClick = (link) => {
    setActiveLink("/wheelsdispatchrecordform/" +link);
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
                onClick={() => handleLinkClick(val.link)}
                className={
                  activeLink === "/wheelsdispatchrecordform/" + val.link
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
