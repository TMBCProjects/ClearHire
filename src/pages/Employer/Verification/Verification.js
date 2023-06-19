import { Empty } from 'antd'
import React, { useState, useEffect } from "react";
import { readVerifications } from "../../../DataBase/Employer/employer";
import { Link } from "react-router-dom";

function Verification() {
  const [CandidateDetails, setCandidateDetails] = useState([]);
  const [verification, setVerification] = useState([]);
  useEffect(() => {
    const fetchVerificationDetails = async () => {
      try {
        const userDatas = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readVerifications(userDatas.data.employerEmail);
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
    <div>
      <div>
        <Link
          className="w-50 mt-3 btn"
          to={{
            pathname: "/verify-candidate",
          }}>
          <button className="w-100 mt-3 btn btn-assessment">
            Verify a Candidate
          </button>
        </Link>
        <div className="form-check form-check-inline mx-3 requestFilters">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            onClick={() => setVerification(false)}
            checked={!verification}
          />
          <label
            className="form-check-label filter-approval"
            htmlFor="inlineRadio1">
            Verification Completed
          </label>
        </div>

        <div className="form-check form-check-inline mx-3 requestFilters">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            onClick={() => setVerification(true)}
            id="inlineRadio2"
            checked={verification}
          />
          <label
            className="form-check-label filter-approval"
            htmlFor="inlineRadio2">
            Verification Requests
          </label>
        </div>
        <div className="form-check form-check-inline mx-3 requestFilters">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            onClick={() => setVerification(true)}
            id="inlineRadio2"
            checked={verification}
          />
          <label
            className="form-check-label filter-approval"
            htmlFor="inlineRadio2">
            Verification Requests
          </label>
        </div>
      </div>
      <div>
        {CandidateDetails.length > 0 ? (
          CandidateDetails?.filter((info) => {
            return verification === true
              ? info.isActive === true && info.isVerified === true
              : info.isActive === true && info.isVerified === false;
          }).map((info) => {
            return (
              <div className="col-md-3 gy-3">
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
          })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Records"
          />
        )}
      </div>
    </div>
  );
}

export default Verification
