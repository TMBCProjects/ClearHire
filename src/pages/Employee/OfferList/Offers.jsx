import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Offers.css";
import { readOffers } from "../../../DataBase/Employee/employee";

const Offers = () => {
  const [offerList, setOfferList] = useState([{}]);

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      const userDatas = JSON.parse(sessionStorage.getItem("userData"))
      const data = await readOffers(userDatas.data.employeeEmail);
      setOfferList(data);
    };
    fetchEmployerDetails();
  });
  return (
    <div id="employer-approval">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold fs-30">Offers (Pending)</h3>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3 gy-3">
          {offerList.map((info) => {
            return (<div className="card">
            <div className="card-body">
                <h3 className="card-title fw-bold">{info.companyName}</h3>
                <p className="card-text designation w-50 mt-2">{info.designation}</p>
                <p className="mb-1">{info.typeOfEmployment}</p>
                <p className="mb-1">{info.dateOfJoining}</p>
                <p className="mb-1">{info.salary}</p>
              <Link to={"/employeeOfferLetter"} item={{
                  companyName: info.companyName, dateOfJoining: info.dateOfJoining,
                  designation: info.designation, salary: info.salary,
                  typeOfEmployment: info.typeOfEmployment, offerLetter: info.offerLetter
              }}>
                {/*  */}
                <button className="w-100 mt-3 btn btn-request">
                  View Offer
                </button>
              </Link>
            </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Offers;
