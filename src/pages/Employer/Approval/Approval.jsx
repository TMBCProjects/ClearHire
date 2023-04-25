import React from "react";
import { Link } from "react-router-dom";
import Add from "../../../assets/images/add.svg";
import View from "../../../assets/images/view-doc.svg";
import "./approval.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  readOfferReplies,
} from "../../../DataBase/Employer/employer";

const Approval = () => {
  const [offerReplies, setOfferReplies] = useState([]);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      const userDatas = JSON.parse(sessionStorage.getItem("userData"));
      const data = await readOfferReplies(userDatas.id);
      setOfferReplies(data);
    };
    fetchOfferDetails();
  }, []);

  return (
    <div id="employer-approval" className="container">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold fs-30">Sent Offers (Pending)</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              defaultValue="option1"
              checked
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio1"
            >
              All
            </label>
          </div>

          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              defaultValue="option3"
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio3"
            >
              Not on clearhire
            </label>
          </div>
          <div className="form-check form-check-inline">
            <Link to={"/onboarding-form"} className="btn add-recruit">
              <img src={Add} className="mr-5 add-icon" alt="addIcons" /> New
              Recruit
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {offerReplies?.map((info) => {
          return (
            <div className="col-md-3 gy-3">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title fw-bold">{info.employeeName}</h3>
                  <p className="card-text designation w-50 mt-2">
                    {info.designation}
                  </p>
                  <p className="mb-1">
                    {info.companyLocation}
                  </p>
                  <p className="mb-1">{info.employeeEmail}</p>
                  <p className="mb-1">{info.dateOfJoining}</p>
                  <p className="mb-1">{info.salary}</p>
                  <div className="row  mt-2">
                    <div className="col">
                      <p className="text-color-green fs-13 fw-bold">
                        <img className="mr-5" src={View} alt="" /> View offer
                        Letter
                      </p>
                    </div>
                    <div className="col">
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Approval;
