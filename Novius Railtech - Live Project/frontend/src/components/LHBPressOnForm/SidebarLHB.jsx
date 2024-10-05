import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/preInspectionform/preInspectionform.css";
// import "../../resources/LHB/lhbpressonform/lhbpressonform.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarLHB() {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [errors, setErrors] = useState({}); // State for validation errors
  const SidebarData = [
    { title: "Wheel Details", link: "wheel_details" },
    { title: "Wheel Disc A Side", link: "wheeldiscA_details" },
    { title: "Wheel Disc A Side Bore Size", link: "wheeldiscABoresize_details" },
    { title: "Wheel Disc B Side", link: "wheeldiscB_details" },
    { title: "Wheel Disc B Side Bore Size", link: "wheeldiscBBoresize_details" },
    { title: "Brake Disc A Side", link: "brakediscA_details" },
    { title: "Brake Disc A Side Bore Size", link: "brakediscABoresize_details" },
    { title: "Brake Disc B Side", link: "brakediscB_details" },
    { title: "Brake Disc B Side Bore Size", link: "brakediscBBoresize_details" },
    { title: "Operator Details", link: "operator_details" },



  ];

  const handleLinkClick = (link) => {
    setActiveLink("/LHBPressOnForm/" + link);
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
                  activeLink === "/LHBPressOnForm/" + val.link
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
      {/* <div className="sidebar_mobile">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [0,0] }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul className="sidebarlist">
              {SidebarData.map((val, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => handleLinkClick(val.link)}
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
          </motion.div>
        )}
      </div> */}
    </div>
  );
}

export default SidebarLHB;
