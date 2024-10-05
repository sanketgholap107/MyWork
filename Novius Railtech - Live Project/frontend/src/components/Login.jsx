import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../resources/Login/Login.css";
import Spacer from "../assets/digiworkshop.png";
import {postData} from "../components/Axios/AxiosConnection.js";
import { useAuth } from "./AuthContext.jsx";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLoginClick = async () => {
    const data = { username, password };
    console.log("username: ",username);
    console.log("password: ",password);
    
    try {
      console.log("inside try");
      
      const response = await postData('/api/login', data);
      console.log("Login successful:", response);
      // handleLogin(); 
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="left-section">
          <div className="welcome-text">
            <h1>Welcome to</h1>
            <img src={Spacer} alt="Spacer" className="Spacer" />
            <h2>Novius Digi-Workshop</h2>
            <p>
              Novius Digi Workshop is dedicated to providing quality and
              continuous process improvement for both customers and employees.
            </p>
          </div>
          <div className="bottom-links">
            <a href="#">ABOUT NOVIUS DIGI-WORKSHOP</a>
            <span className="divider"> | </span>
            <a href="#">CONTACT US</a>
            <span className="divider"> | </span>
            <a href="#">ABOUT US</a>
          </div>
        </div>
        <div className="right-section">
          <h2>Login to Novius Digi-Workshop</h2>
          <form>
            <div className="input-group">
              <label htmlFor="name">User ID</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your User ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="workshop">Workshop Name</label>
              <select id="workshop" name="workshop" required>
                <option value="cr-matunga-ws">CR Matunga WS</option>
              </select>
            </div>
            <div className="terms">
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">
                Remember me <a href="#">Terms & Conditions</a>
              </label>
            </div>
            <div className="both-button">
              {/* <button type="submit" className="sign-up-btn">Sign Up</button> */}
              <button type="button" className="sign-up-btn" onClick={handleLoginClick}>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
