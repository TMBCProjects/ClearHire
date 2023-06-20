import { Empty } from 'antd'
import React, { useState, useEffect } from "react";
import { readNotVerifiedVerifications } from "../../../DataBase/Employer/employer";
import { Link } from "react-router-dom";
import { SendOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import "../Verification/Verification.css";

function Verification() {
  const [CandidateDetails, setCandidateDetails] = useState([]);
  const [verification, setVerification] = useState([]);
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
  const items = [
    {
      key: '1',
      label: `Verified Candidates`,
    },
    {
      key: '2',
      label: `Verification Request`,
      //children: <EmployeeAssesmentForm />,
    }
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        centered
        items={items}
      />
      <div>
        <Link
          to={"/verify-candidate"}
          className="add-verification">
          Verify a candidate
        </Link>
      </div>
      <div>
        {CandidateDetails.length > 0 ? (
          CandidateDetails?.map((info) => {
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
