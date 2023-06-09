import React, { useEffect, useState } from "react";
import "./Offers.css";
import { readOffers } from "../../../DataBase/Employee/employee";
import { Link } from "react-router-dom";
import { Empty } from "antd";

export default function Offers() {
  const [offerList, setOfferList] = useState([]);

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      const userDatas = JSON.parse(sessionStorage.getItem("userData"));
      const data = await readOffers(userDatas.data.employeeEmail);
      setOfferList(data);
    };
    fetchEmployerDetails();
  }, []);

  return (
    <div id="employer-approval">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold fs-30">Offers (Pending)</h3>
        </div>
      </div>
      <div className="row mt-3">
        {offerList.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Offers"
          />
        )}
        {offerList.map((info) => {
          return (
            <div className="col-md-3 gy-3">
              <div className="card" key={info.id}>
                <div className="card-body">
                  <h3 className="card-title fw-bold">{info.companyName}</h3>
                  <p className="card-text designation w-50 mt-2">
                    {info.designation}
                  </p>
                  <p className="mb-1">{info.typeOfEmployment}</p>
                  <p className="mb-1">{new Date(info.dateOfJoining.seconds * 1000).toLocaleDateString('en-GB')}</p>
                  <p className="mb-1">{info.salary} LPA</p>
                  <Link
                    className="w-100 mt-3 btn btn-request"
                    to={{
                      pathname: "/employeeOfferLetter",
                    }}
                    state={{ from: info }}
                  >
                    View Offer
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

