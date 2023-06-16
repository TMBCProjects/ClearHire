import React, { useState } from "react";
import "./VerifyCandidate.css";
import InputField from "../../../components/Input/InputField";
import TextArea from "../../../components/Input/TextArea";
import DateField from "../../../components/Input/DateFiled";
import DropDownField from "../../../components/Input/DropDownField";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Dropdown from "../../../components/Dropdrowns/Dropdown";

const VerifyCandidate = () => {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [qCount, setQCount] = useState(1);
  const [CandidateDetails, setCandidateDetails] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const ansType = ["Short Answer", "Yes/No"];
  const addques = () => {
    setQCount(qCount + 1);
  };
  const handleInputChange = (e) => {
    setCandidateDetails((CandidateDetails) => ({
      ...CandidateDetails,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTypeChange = (e) => {
    setCandidateDetails((CandidateDetails) => ({
      ...CandidateDetails,
      typeOfEmployment: e,
    }));
  };
  const handleQuestionChange = (e, i, field) => {
    setQuestionsList((questionsList) => {
      const updatedQuestionsList = [...questionsList];
      updatedQuestionsList[i] = {
        ...updatedQuestionsList[i],
        [field]: e.target.value,
      };
      return updatedQuestionsList;
    });
  };

  const handleQuesChange = (e, i) => {
    handleQuestionChange(e, i, "question");
  };

  const handleQuesTypeChange = (e, i) => {
    handleQuestionChange(e, i, "questionType");
  };

  const onSubmit = () => {
    CandidateDetails.employerId = userDatas.id;
    CandidateDetails.employerEmail = userDatas.data.employerEmail;
    CandidateDetails.requestingCompanyName = userDatas.data.companyName;
    CandidateDetails.questionsList = questionsList;
    console.log(CandidateDetails);
  };

  const delques = () => {
    if (qCount > 1) {
      setQCount(qCount - 1);
    }
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
          Verify your Candidate
        </h1>
        <p
          style={{
            width: "600px",
            fontSize: "1rem",
            textAlign: "center",
            fontWeight: "500",
          }}>
          Entering the details of candidate and send it to candidate's previous
          company to veryfy candidate's details
        </p>
      </div>
      <div
        className="d-flex justify-content-center align-items-center my-5"
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          padding: "1rem",
          paddingBottom: "0",
          width: "45rem",
        }}>
        <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Enter the details provide by the company
        </p>
      </div>
      <div
        className="d-flex"
        style={{ width: "50%", alignSelf: "flex-start" }}>
        <InputField
          label={"Reference Number"}
          type={"text"}
          name={"referenceNumber"}
          // value={values.email}
          onChange={handleInputChange}
          placeholder={"Enter candidate's reference number"}
        />
      </div>
      <div
        className="d-flex align-self-start mt-3"
        style={{
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
        }}>
        <InputField
          label={"First Name"}
          type={"text"}
          name={"firstName"}
          // value={values.email}
          onChange={handleInputChange}
          placeholder={"Enter candidate's first name"}
        />
        <InputField
          label={"Last Name"}
          type={"text"}
          name={"lastName"}
          // value={values.email}
          onChange={handleInputChange}
          placeholder={"Enter candidate's last name"}
        />
      </div>
      <div
        className="d-flex align-self-start mt-3"
        style={{
          width: "100%",
          gap: "1.4rem",
        }}>
        <div
          style={{
            flex: ".25",
          }}>
          <DateField
            label={"Employed From"}
            type={"text"}
            name={"employedFrom"}
            // value={values.email}
            onChange={handleInputChange}
            placeholder={"From"}
          />
        </div>
        <div
          style={{
            flex: ".25",
          }}>
          <DateField
            label={"Employed To"}
            type={"text"}
            name={"employedTo"}
            // value={values.email}
            onChange={handleInputChange}
            placeholder={"To"}
          />
        </div>
        <div
          style={{
            flex: ".5",
          }}>
          <InputField
            label={"Designation"}
            type={"text"}
            name={"designation"}
            // value={values.email}
            onChange={handleInputChange}
            placeholder={"Enter candidate's designation"}
          />
        </div>
      </div>
      <div
        className="d-flex align-self-start mt-3"
        style={{ width: "100%" }}>
        <TextArea
          label={"Reason for Leaving"}
          type={"text"}
          name={"reason"}
          // value={values.email}
          onChange={handleInputChange}
          placeholder={"Write candidate's reason for leaving"}
        />
      </div>
      <div
        className="d-flex align-self-start mt-3"
        style={{
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
        }}>
        <InputField
          label={"Location"}
          type={"text"}
          name={"workLocation"}
          // value={values.email}
          onChange={handleInputChange}
          placeholder={"Enter candidate's previous work location"}
        />
        <DropDownField
          label={"Full time/Part time"}
          type={"text"}
          name={"workType"}
          // value={values.email}
          onChange={handleTypeChange}
          placeholder={"Enter candidate's work type"}
          options={[
            { value: "Permanent Full-Time", label: "Permanent Full-Time" },
            { value: "Part-Time", label: "Part-Time" },
            { value: "Casual/Vacation", label: "Casual/Vacation" },
            { value: "Contract", label: "Contract" },
            { value: "Internship/Trainee", label: "Internship/Trainee" },
          ]}
        />
      </div>

      {[...Array(qCount)].map((e, i) => (
        <div style={{ width: "100%" }}>
          <div key={i}>
            <div className="form-2">
              <label htmlFor="">Q{i + 1}</label>
              <input
                type="text"
                id={i}
                //defaultValue={qType[i].question}
                onChange={(e) => handleQuesChange(e, i)}
                placeholder="Enter Question"
                className="f-34 f-3"
                style={{ width: "85%", backgroundColor: "white" }}
              />
            </div>

            <div className="form-3">
              <Dropdown
                values={ansType}
                type={"text"}
                name={"Choose Answer type"}
                id={"type" + i}
                onChange={(e) => handleQuesTypeChange(e, i)}
              />
            </div>
          </div>
        </div>
      ))}
      {qCount > 1 && <Button onClick={() => delques()}>Delete Question</Button>}

      <div
        onClick={addques}
        className="d-flex align-self-start mt-4"
        style={{
          width: "100%",
          color: "green",
          fontSize: "1.1rem",
          cursor: "pointer",
          fontWeight: "bold",
        }}>
        <PlusOutlined style={{ marginTop: ".3rem", marginRight: ".6rem" }} />
        <p>Add more questions</p>
      </div>

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
            name={"verificationByEmail"}
            // value={values.email}
            onChange={handleInputChange}
            placeholder={"verificationByEmail"}
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

export default VerifyCandidate;
