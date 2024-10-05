import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/preInspectionform/preInspectionform.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarLHB() {
    const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const SidebarData = [
    { title: "Details", link: "details" },
    { title: "Coach Details", link: "coach_details" },
    { title: "BD Details", link: "bd_details" },
    { title: "Rod Gauge And Sound Details", link: "Rodgaugeandsound_details" },
    { title: "Repair And UST Details", link: "repairandust_details" },
    { title: "Disc Particular/CTRB Details", link: "discparticularOrCTRB_details" },
  ];

  const handleLinkClick = (link) => {
    setActiveLink("/LHBSchedulePreInspection/" +link);
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
                  activeLink === "/LHBSchedulePreInspection/" + val.link
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
