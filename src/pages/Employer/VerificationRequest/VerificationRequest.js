import React, { useState, useEffect } from "react";
import { readNotVerifiedVerifications } from "../../../DataBase/Employer/employer";
import { Empty } from "antd";
import { Link } from "react-router-dom";

export default function VerificationRequest() {
  const [CandidateDetails, setCandidateDetails] = useState([]);
  useEffect(() => {
    const fetchVerificationDetails = async () => {
      try {
        const userDatas = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readNotVerifiedVerifications(
          userDatas.data.employerEmail
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchVerificationDetails().then((data) => {
      setCandidateDetails(data);
    });
  }, []);
  return (
    <div className="cards">
      {CandidateDetails.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Records"
        />
      )}
      {CandidateDetails.map((info) => {
        return (
          <div className="col-md-3 gy-3 p-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  {info.requestingCompanyName}
                </h4>{" "}
                requesting Verification of
                <p className="mb-1">
                  {info.employeeFirstName + " " + info.employeeLastName}
                </p>
                <Link
                  className="w-100 mt-3 btn"
                  to={{
                    pathname: "/view-verification",
                  }}
                  state={{ from: info }}>
                  <button className="w-100 mt-3 btn btn-assessment">
                    Verify
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
