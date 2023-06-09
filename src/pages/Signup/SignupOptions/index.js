import React from "react";
import "./main.css";
import mail_icon from "../../../assets/images/mail-icon.svg";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="signup-options-container">
      <div className="options-box">
        <div className="header-text">
          <p>
            Welcome to <span>clearhire</span>
          </p>
          <p>
            clearhire helps you find that best employee you've been looking all
            along
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/user-options")}>
            <img
              src={mail_icon}
              alt="icon"
            />
            CONTINUE WITH E-MAIL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
