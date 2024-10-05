import React from "react";
import { Link } from "react-router-dom";
import "../resources/footer/footer.css";
import MakeInIndia from "../assets/MII1.png";
import IndRaiIcon from "../assets/indian-rail-nobackround.png";
import Novius from "../assets/WHITENOVIUSPNG.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={Novius} alt="Novius Logo" className="Novius-logo" />
        <div><b><Link to="">ABOUT NOVIUS DIGI-WORKSHOP</Link></b><span>I</span> <b><Link to="">CONTACT US</Link></b><span>I</span><b><Link to="">ABOUT US</Link></b>
          <br/><br/><span id="p2">Disclaimer &copy; 2024 Novius Technologies India Private Limited. All
          rights reserved.</span>
        </div>
        <img src={IndRaiIcon} alt="Indian Railway Logo" className="IR" />
        <img src={MakeInIndia} alt="MakeInIndia Logo" className="lion" />
      </div>
    </footer>
  );
}

export default Footer;
