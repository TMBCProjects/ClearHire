import React from "react";
//import image from "../../assets/images/Image.png"
import pic from "../../assets/images/pic.png";
import ProgressBar from "../ProgressBar";
import "./styles.css";
const Assesment_Card = ({ value, name, state, country, designation }) => {
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

      <div className="cardFooter">
        <button className="allow">Assess Employee</button>
      </div>
    </div>
  );
};

export default Assesment_Card;
