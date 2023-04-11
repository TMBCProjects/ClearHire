import React from "react";
import { Link } from "react-router-dom";
import "./Offers.css";

const Offers = () => {
  return (
    <div id="employer-approval">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold fs-30">Offers (Pending)</h3>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">companyName</h3>
              <p className="card-text designation w-50 mt-2">designation</p>
              <p className="mb-1">typeOfEmployment</p>
              <p className="mb-1">dateOfJoining</p>
              <p className="mb-1">salary</p>
              <Link to={"/employeeOfferLetter"} item={{
                companyName: "companyName", dateOfJoining: "dateOfJoining",
                designation: "designation", salary: "salary",
                typeOfEmployment: "typeOfEmployment", offerLetter: "../../assets/pdf/sample.pdf"
              }}>
                {/*  */}
                <button className="w-100 mt-3 btn btn-request">
                  View Offer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
