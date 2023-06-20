import React, { useState } from "react";
import YesOrNo from "../../../components/Input/YesOrNo";
import { Button } from "antd";
import "../ViewVerification/ViewVerification.css";
import { useLocation } from "react-router-dom";
import InputField from "../../../components/Input/InputField";
import { useEffect } from "react";
import DateField from "../../../components/Input/DateFiled";
import TextArea from "../../../components/Input/TextArea";
import DropDownField from "../../../components/Input/DropDownField";
import { sendVerifiedVerification } from "../../../DataBase/Employer/employer";

const ViewVerification = () => {
  const location = useLocation();
  const { from } = location.state;
  const fetchedDetails = from;
  const [checkDetails, setCheckDetails] = useState([]);
  const [changes, setChanges] = useState([]);
  const [CandidateDetails, setCandidateDetails] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  useEffect(() => {
    setQuestionsList(fetchedDetails.questionsList);
  }, [fetchedDetails]);
  const handleAnswerChange = (e, i) => {
    setQuestionsList((questionsList) => {
      const updatedQuestionsList = [...questionsList];
      updatedQuestionsList[i] = {
        ...updatedQuestionsList[i],
        answer: e,
      };
      return updatedQuestionsList;
    });
  };
  const handleInputChange = (e) => {
    setCheckDetails((checkDetails) => ({
      ...checkDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInput2Change = (e) => {
    setCandidateDetails((CandidateDetails) => ({
      ...CandidateDetails,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChange = (e) => {
    setChanges((changes) => ({
      ...changes,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDateChange = (e) => {
    setChanges((changes) => ({
      ...changes,
      [e.target.name]: new Date(e.target.value).toLocaleDateString("en-GB"),
    }));
  };
  const onSubmit = () => {
    CandidateDetails.questionsList = questionsList;
    CandidateDetails.changes = changes;
    sendVerifiedVerification(CandidateDetails, fetchedDetails.id).then(() => {
      window.location.href = "/verification";
    });
  };

  return (
    <div
      className="container flex-column d-flex justify-content-center align-items-center py-5"
      style={{
        width: "45rem",
      }}>
      <div className="d-flex flex-column align-items-center">
        <h1
          className="text-success mb-3"
          style={{
            fontWeight: "500",
            fontSize: "2.4em",
          }}>
          Candidate details to be verified
        </h1>
        <p
          style={{
            width: "600px",
            fontSize: "1rem",
            textAlign: "center",
            fontWeight: "500",
          }}>
          Fill this form to help the current employer to verify your previous
          candidate.
        </p>
      </div>

      <div
        className="d-flex align-self-start mt-3"
        style={{
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
        }}>
        <div className="questions">
          <span>Reference Number</span>
          <YesOrNo
            name={"referenceNumber"}
            label={fetchedDetails.referenceNumber}
            type={"text"}
            onChange={handleInputChange}
            options={[
              {
                label: "Correct",
                value: "Correct",
              },
              {
                label: "Incorrect",
                value: "Incorrect",
              },
            ]}
          />

          {checkDetails.referenceNumber === "Incorrect" && (
            <div>
              <InputField
                type={"text"}
                name={"referenceNumber"}
                onChange={handleChange}
                placeholder={fetchedDetails.referenceNumber}
              />
            </div>
          )}
        </div>

        <div className="questions">
          <span>Candidate Name</span>
          <YesOrNo
            label={
              fetchedDetails.employeeFirstName +
              " " +
              fetchedDetails.employeeLastName
            }
            name={"employeeName"}
            onChange={handleInputChange}
            type={"text"}
            options={[
              {
                label: "Correct",
                value: "Correct",
              },
              {
                label: "Incorrect",
                value: "Incorrect",
              },
            ]}
          />
          {checkDetails.employeeName === "Incorrect" && (
            <div>
              <InputField
                type={"text"}
                name={"employeeFirstName"}
                onChange={handleChange}
                placeholder={fetchedDetails.employeeFirstName}
              />

              <InputField
                type={"text"}
                name={"employeeLastName"}
                onChange={handleChange}
                placeholder={fetchedDetails.employeeLastName}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className="d-flex align-self-start mt-3"
        style={{
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
        }}>
        <div className="questions">
          <span>Dates Employed</span>
          <YesOrNo
            label={
              fetchedDetails.datesEmployedFrom +
              " to " +
              fetchedDetails.datesEmployedTo
            }
            name={"datesEmployed"}
            onChange={handleInputChange}
            type={"text"}
            options={[
              {
                label: "Correct",
                value: "Correct",
              },
              {
                label: "Incorrect",
                value: "Incorrect",
              },
            ]}
          />

          {checkDetails.datesEmployed === "Incorrect" && (
            <div>
              <DateField
                label={"Employed From"}
                type={"text"}
                name={"datesEmployedFrom"}
                onChange={handleDateChange}
                placeholder={fetchedDetails.datesEmployedFrom}
              />
              <DateField
                label={"Employed to"}
                type={"text"}
                name={"datesEmployedTo"}
                onChange={handleDateChange}
                placeholder={fetchedDetails.datesEmployedTo}
              />
            </div>
          )}
        </div>

        <div className="questions">
          <span>Designation</span>
          <YesOrNo
            label={fetchedDetails.employeeDesignation}
            type={"text"}
            name={"employeeDesignation"}
            onChange={handleInputChange}
            options={[
              {
                label: "Correct",
                value: "Correct",
              },
              {
                label: "Incorrect",
                value: "Incorrect",
              },
            ]}
          />

          {checkDetails.employeeDesignation === "Incorrect" && (
            <div>
              <InputField
                type={"text"}
                name={"employeeDesignation"}
                onChange={handleChange}
                placeholder={fetchedDetails.employeeDesignation}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className="d-flex mt-3"
        style={{
          width: "100%",
        }}>
        <div
          className="questions"
          style={{ width: "100%" }}>
          <span>Reason for leaving</span>
          <YesOrNo
            label={fetchedDetails.reasonForLeaving}
            name={"reasonForLeaving"}
            onChange={handleInputChange}
            type={"text"}
            options={[
              {
                label: "Correct",
                value: "Correct",
              },
              {
                label: "Incorrect",
                value: "Incorrect",
              },
            ]}
          />
          {checkDetails.reasonForLeaving === "Incorrect" && (
            <div>
              <TextArea
                type={"textarea"}
                name={"reasonForLeaving"}
                onChange={handleChange}
                placeholder={fetchedDetails.reasonForLeaving}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className="d-flex align-self-start mt-3"
        style={{
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
        }}>
        <div className="questions">
          <span>Location</span>
          <YesOrNo
            name={"employeeCompanyLocation"}
            label={fetchedDetails.employeeCompanyLocation}
            type={"text"}
            onChange={handleInputChange}
            options={[
              {
                label: "Correct",
                value: "Correct",
              },
              {
                label: "Incorrect",
                value: "Incorrect",
              },
            ]}
          />
          {checkDetails.employeeCompanyLocation === "Incorrect" && (
            <div>
              <InputField
                type={"text"}
                name={"employeeCompanyLocation"}
                onChange={handleChange}
                placeholder={fetchedDetails.employeeCompanyLocation}
              />
            </div>
          )}
        </div>

        <div className="questions">
          <span>Work Type</span>
          <YesOrNo
            label={fetchedDetails.typeOfEmployment}
            name={"typeOfEmployment"}
            type={"text"}
            onChange={handleInputChange}
            options={[
              {
                label: "Correct",
                value: "Correct",
              },
              {
                label: "Incorrect",
                value: "Incorrect",
              },
            ]}
          />
          {checkDetails.typeOfEmployment === "Incorrect" && (
            <div>
              <DropDownField
                type={"text"}
                name={"typeOfEmployment"}
                onChange={handleChange}
                placeholder={fetchedDetails.typeOfEmployment}
                options={[
                  {
                    value: "Permanent Full-Time",
                    label: "Permanent Full-Time",
                  },
                  { value: "Part-Time", label: "Part-Time" },
                  { value: "Casual/Vacation", label: "Casual/Vacation" },
                  { value: "Contract", label: "Contract" },
                  { value: "Internship/Trainee", label: "Internship/Trainee" },
                ]}
              />
            </div>
          )}
        </div>
      </div>
      {fetchedDetails.questionsList.map((info, i) => {
        return (
          <div
            className="d-flex align-self-start mt-3"
            style={{ width: "100%" }}>
            {info.questionType === "Yes/No" && (
              <YesOrNo
                label={info.question}
                type={"text"}
                onChange={(e) => handleAnswerChange(e.target.value, i)}
                options={[
                  {
                    label: "Yes",
                    value: "Yes",
                  },
                  {
                    label: "No",
                    value: "No",
                  },
                ]}
              />
            )}

            {info.questionType === "Short Answer" && (
              <InputField
                label={info.question}
                type={"text"}
                onChange={(e) => handleAnswerChange(e.target.value, i)}
                placeholder={"Type your answer here"}
              />
            )}
          </div>
        );
      })}

      <div
        className="d-flex align-self-start flex-column mt-3"
        style={{ width: "100%" }}>
        <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          Enter the details of the person who verified the candidate
        </p>
        <div
          className="d-flex"
          style={{
            justifyContent: "space-around",
            gap: "1rem",
            marginLeft: "0",
          }}>
          <InputField
            type={"text"}
            name={"verificationByName"}
            onChange={handleInput2Change}
            placeholder={"Name"}
          />
          <InputField
            type={"text"}
            name={"verificationByDesignation"}
            onChange={handleInput2Change}
            placeholder={"Designation"}
          />
        </div>
        <div style={{ width: "49%" }}>
          <InputField
            type={"text"}
            name={"verificationByDepartment"}
            onChange={handleInput2Change}
            placeholder={"Department"}
          />
        </div>
      </div>
      <div
        className="d-flex align-self-start flex-column my-3"
        style={{ width: "100%" }}>
        <p style={{ fontSize: ".8rem", textAlign: "center" }}>
          *By clicking the submit button, you are sending this form to the
          previous employer of the candidate
        </p>
        <Button
          onClick={(e) => onSubmit(e)}
          className="signupBtn mt-0">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ViewVerification;
