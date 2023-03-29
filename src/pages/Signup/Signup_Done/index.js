import React from "react";
import "./main.css";
import check from "../../../assets/images/Check.svg";
//import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const Index = () => {
  //const navigate = useNavigate();
  return (
    <div className="signup-options-container">
      <div className="options-box">
        <div className="header-text">
          <img src={check} width={60} alt="Check tick" />
          <p style={{ marginTop: ".5rem", fontSize: "2rem",padding:"1rem" }}>
            Your signup is done wait for approval
          </p>
          <p style={{fontSize:"1.2rem",padding:"1rem",marginTop:"0 !important"}}>
            We will intimate you via email one the approval process in done.
          </p>
        </div>
        <div className="buttons">
          <button>
            <HomeOutlined style={{ fontSize: "1.4rem", marginRight: "1rem" }} />
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
