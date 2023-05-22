import React from "react";
import "./OfferLetterSent.css";
import check from "../../../assets/images/Check.svg";
//import { useNavigate } from "react-router-dom";

function OfferLetterSent() {
  //const navigate = useNavigate();
  return (
    <div className="signup-options-container">
      <div className="options-box">
        <div className="header-text">
          <img
            src={check}
            width={60}
            alt="Check tick"
          />
          <p style={{ marginTop: ".5rem", fontSize: "2rem", padding: "1rem" }}>
            Your offer letter is sent
            <br />
            to the new recruit
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              padding: "1rem",
              marginTop: "0 !important",
            }}>
            Once they confirm they will be added to
            <br /> your employee's list
          </p>
        </div>
        <div className="buttons">
          <button
                        onClick={() => {
              window.location.href = "/employer-approval";
            }}>
            BACK TO ONBOARD PAGE
                    </button>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterSent;
