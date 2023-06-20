import React, { useState } from "react";
import "../ViewVerification/ViewVerification.css";
import { useEffect } from "react";
import { readVerifiedVerifications } from "../../../DataBase/Employer/employer";
import { Button, Empty, Modal } from "antd";
import "../VerifiedPage/VerifiedPage.css";
const VerifiedPage = () => {
  const [CandidateDetails, setCandidateDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchVerificationDetails = async () => {
      try {
        const userDatas = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readVerifiedVerifications(userDatas.id);
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
                  {info.employeeFirstName + " " + info.employeeLastName}
                </h4>{" "}
                Verification done By&nbsp;
                {info.verificationByName}
                <br />
                <Button
                  type="default"
                  onClick={showModal}
                  style={{ marginTop: "2vh" }}>
                  View Verification
                </Button>
                <Modal
                  title={info.employeeFirstName + " " + info.employeeLastName}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}>
                  <div style={{ fontSize: "medium" }}>
                    <div className="ques">
                      <span>Reference Number:</span>&nbsp;
                      <span>
                        <b>
                          {info.changes.referenceNumber || info.referenceNumber}
                        </b>
                      </span>
                    </div>

                    <div className="ques">
                      <span>Candidate Name:</span>&nbsp;
                      <span>
                        <b>
                          {info.employeeFirstName + " " + info.employeeLastName}
                        </b>
                      </span>
                    </div>

                    <div className="ques">
                      <span>Dates Employed:</span>&nbsp;
                      <span>
                        <b>
                          {info.datesEmployedFrom +
                            " to " +
                            info.datesEmployedTo}
                        </b>
                      </span>
                    </div>

                    <div className="ques">
                      <span>Designation:</span>&nbsp;
                      <span>
                        <b>
                          {info.changes.employeeDesignation ||
                            info.employeeDesignation}
                        </b>
                      </span>
                    </div>

                    <div className="ques">
                      <span>Reason for leaving:</span>&nbsp;
                      <span>
                        <b>
                          {info.changes.reasonForLeaving ||
                            info.reasonForLeaving}
                        </b>
                      </span>
                    </div>

                    <div className="ques">
                      <span>Location:</span>&nbsp;
                      <span>
                        <b>
                          {info.changes.employeeCompanyLocation ||
                            info.employeeCompanyLocation}
                        </b>
                      </span>
                    </div>

                    <div className="ques">
                      <span>Work Type:</span>&nbsp;
                      <span>
                        <b>
                          {info.changes.typeOfEmployment ||
                            info.typeOfEmployment}
                        </b>
                      </span>
                    </div>
                    <div>
                      {info.questionsList.map((value, i) => (
                        <div className="ques">
                          <span>Question {i + 1}:</span>&nbsp;
                          <span>{value.question}</span>
                          <br />
                          <span>
                            <b>{value.answer}</b>
                          </span>
                        </div>
                      ))}
                    </div>

                    <hr />
                    <div>
                      <span>
                        Verified By {info.verificationByName} -{" "}
                        {info.verificationByDesignation} -{" "}
                        {info.verificationByDepartment}
                      </span>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VerifiedPage;
