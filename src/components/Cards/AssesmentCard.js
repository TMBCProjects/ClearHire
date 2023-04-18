import React from "react";
//import image from "../../assets/images/Image.png"
import pic from "../../assets/images/pic.png";
import ProgressBar from "../ProgressBar";
import "./styles.css";
import { Link } from "react-router-dom";
const Assesment_Card = ({ info, value, name, state, country, designation }) => {
  return (
    <div className="vreqcard assess-card">
      <div className="managerlogo">
        <img
          src={pic}
          alt="manager-logo"></img>
        <ProgressBar value={value} />
      </div>
      <div className="headDesc">
        <span>{name}</span>
        <span>
          {state}, {country}
        </span>
        <span
          style={{
            background: "#D7F2BC 0% 0% no-repeat padding-box",
            borderRadius: "9px",
            width: "50%",
            marginTop: ".5rem",
            padding: ".5rem",
            textAlign: "center",
            color: "#66BC11",
            fontWeight: "bold",
          }}>
          {designation}
        </span>
      </div>
      Assess Employee
      <div className="cardFooter">
        <Link
          className="w-100 mt-3 btn"
          to={{
            pathname: "/EmployeeAssessment",
          }}
          state={{ from: info }}>
          <button className="allow">Assess Employee</button>
        </Link>
      </div>
    </div>
  );
};

export default Assesment_Card;
