import React from "react";
import "./EmployeeOfferLetter.css";
import PdfViewer from "../../../components/PdfViewer/PdfViewer";
import { useLocation } from "react-router-dom";

const EmployeeOfferLetter = () => {
  const location = useLocation();
  console.log(location.state);
  const item = location.state.info;

  return (
    <div className="container" id="offerletter">
      <div className="row align-items-center d-flex">
        <div className="col-md-4">
          <h1 className="offerletter-heading">
            Offer Letter
            {/*  */}
          </h1>
          <p className="offerletter-text mt-5">
            <span className="text-color-green">Company</span>
          </p>
          <p className="offerletter-text">{item.companyName}</p>
          <p className="offerletter-text mt-5">
            <span className="text-color-green">Type of Employment</span>
          </p>
          <p className="offerletter-text">{item.typeOfEmployment}</p>
          <p className="offerletter-text mt-5">
            <span className="text-color-green">Job Role</span>
          </p>
          <p className="offerletter-text">{item.designation}</p>
          <p className="offerletter-text mt-5">
            <span className="text-color-green">Date Of Joining</span>
          </p>
          <p className="offerletter-text">{item.dateOfJoining}</p>
          <p className="offerletter-text mt-5">
            <span className="text-color-green">Salary</span>
          </p>
          <p className="offerletter-text">{item.salary}</p>
          <br />
          <div
            className="row justify-content-start align-items-start mt-3"
            id="offerletter-btn"
          >
            <a href="/#login" className="btn" id="login-btn" type="submit">
              Verify & Accept
            </a>
          </div>
        </div>
        <div className="col-md-8">
          <div className="offerletter-pdf">
            <PdfViewer offerLetterUrl={item.offerLetter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOfferLetter;
