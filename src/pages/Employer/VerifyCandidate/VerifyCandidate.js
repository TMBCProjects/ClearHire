import React, { useState } from "react";
import "./VerifyCandidate.css";
import InputField from "../../../components/Input/InputField";
import TextArea from "../../../components/Input/TextArea";
import YesOrNo from "../../../components/Input/YesOrNo";
import DateField from "../../../components/Input/DateFiled";
import DropDownField from "../../../components/Input/DropDownField";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const initialValues = {
  referenceNumber: "",
  employerEmail: "",
  employerId: "",
  requestingCompanyName: "",
  employeeFirstName: "",
  employeeLastName: "",
  datesEmployedFrom: "",
  datesEmployedTo: "",
  employeeDesignation: "",
  reasonForLeaving: "",
  employeeCompanyLocation: "",
  typeOfEmployment: "",
  questions: "",
  verificationByEmail: "",
};
const VerifyCandidate = () => {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onTypeOfEmploymentChange = (event) => {
    values.typeOfEmployment = event;
  };
  const handleSubmit = () => {
    values.employerEmail = userDatas.data.employerEmail;
    values.employerId = userDatas.id;
    values.requestingCompanyName = userDatas.data.companyName;
    console.log(values);
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
          value={values.referenceNumber}
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
          name={"employeeFirstName"}
          value={values.employeeFirstName}
          onChange={handleInputChange}
          placeholder={"Enter candidate's first name"}
        />
        <InputField
          label={"Last Name"}
          type={"text"}
          name={"employeeLastName"}
          value={values.employeeLastName}
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
            name={"datesEmployedFrom"}
            value={values.datesEmployedFrom}
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
            name={"datesEmployedTo"}
            value={values.datesEmployedTo}
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
            name={"employeeDesignation"}
            value={values.employeeDesignation}
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
          name={"reasonForLeaving"}
          value={values.reasonForLeaving}
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
          name={"employeeCompanyLocation"}
          value={values.employeeCompanyLocation}
          onChange={handleInputChange}
          placeholder={"Enter candidate's previous work location"}
        />
        <DropDownField
          label={"Full time/Part time"}
          type={"text"}
          name={"typeOfEmployment"}
          value={values.typeOfEmployment}
          onChange={onTypeOfEmploymentChange}
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
      <div
        className="d-flex align-self-start mt-3"
        style={{ width: "100%" }}>
        <YesOrNo
          label={"Is the candidate eligible for Rehire?"}
          type={"text"}
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
      </div>
      <div
        className="d-flex align-self-start mt-3"
        style={{ width: "100%" }}>
        <YesOrNo
          label={"Is the document(Experience letter) authentic?"}
          type={"text"}
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
      </div>
      <div
        className="d-flex align-self-start mt-3"
        style={{ width: "100%" }}>
        <YesOrNo
          label={"How did the candidate's way of relieving?"}
          type={"text"}
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
          placeholder={"Enter the company name."}
        />
      </div>
      <div
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
          Enter the Email Id of the person who will verify the candidate
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
            value={values.verificationByEmail}
            onChange={handleInputChange}
            placeholder={"Email"}
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
          onClick={handleSubmit}
          className="signupBtn mt-0">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default VerifyCandidate;
