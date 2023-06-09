import React from "react";
import "./EmployeeOfferLetter.css";
import PdfViewer from "../../../components/PdfViewer/PdfViewer";
import { useLocation, useNavigate } from "react-router-dom";
import { offerAccept } from "../../../DataBase/Employee/employee";
import { useEffect } from "react";
import { useState } from "react";

const EmployeeOfferLetter = () => {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [values, setValues] = useState({});
  const location = useLocation();
  const { from } = location.state;
  const item = from;
  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      currentEmployerId: item.employerId,
      employeeName: userDatas.data.employeeName,
      designation: item.designation,
      salary: item.salary,
      companyName: item.companyName,
      companyLogo: item.companyLogo,
      companyLocation: item.companyLocation,
      typeOfEmployment: item.typeOfEmployment,
      offerLetter: item.offerLetter,
      dateOfJoining: item.dateOfJoining,
    });
  }, [item, userDatas]);

  const updateUserData = (data) => {
    const newData = Object.assign({}, userDatas);
    if (data) {
      Object.assign(newData.data, data);
    }
    sessionStorage.setItem("userData", JSON.stringify(newData));
  };

  const acceptOffer = () => {
    updateUserData(values);
    offerAccept(values, userDatas.id, item.id);
    navigate("/offerLetters");
  };

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
          <p className="offerletter-text">{new Date(item.dateOfJoining.seconds * 1000).toLocaleDateString('en-GB')}</p>
          <p className="offerletter-text mt-5">
            <span className="text-color-green">Salary</span>
          </p>
          <p className="offerletter-text">{item.salary} LPA</p>
          <br />
          <div
            className="row justify-content-start align-items-start mt-3"
            id="offerletter-btn"
          >
            <button
              onClick={acceptOffer}
              className="btn"
              id="login-btn"
              type="submit"
            >
              Verify & Accept
            </button>
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
