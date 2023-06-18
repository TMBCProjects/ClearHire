import React, { useEffect, useState } from "react";
import InputField from "../../../components/Input/InputField";
import TextArea from "../../../components/Input/TextArea";
import YesOrNo from "../../../components/Input/YesOrNo";
import DateField from "../../../components/Input/DateFiled";
import DropDownField from "../../../components/Input/DropDownField";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Dropdown from "../../../components/Dropdrowns/Dropdown";
import "../ViewVerification/ViewVerification.css";
import { readNotVerifiedVerifications } from "../../../DataBase/Employer/employer";
import { useLocation } from "react-router-dom";

const ViewVerification = () => {
  const location = useLocation();
  const { from } = location.state;
  const fetchedDetails = from;
  const [qCount, setQCount] = useState(1);
  const [CandidateDetails, setCandidateDetails] = useState([]);
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
  const onSubmit = () => {
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
        </div>
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
      {/* <div className="d-flex align-self-start mt-3" style={{
                width: '100%',
                gap: '1.4rem'
            }}>
                <div style={{
                    flex: '.25'
                }}>
                    <DateField
                        label={"Employed From"}
                        type={"text"}
                        name={"employedFrom"}
                        // value={values.email}
                        onChange={handleInputChange}
                        placeholder={
                            "From"
                        }
                    />
                </div>
                <div style={{
                    flex: '.25'
                }}>
                    <DateField
                        label={"Employed To"}
                        type={"text"}
                        name={"employedTo"}
                        // value={values.email}
                        onChange={handleInputChange}
                        placeholder={
                            "To"
                        }
                    />
                </div>
                <div style={
                    {
                        flex: ".5"
                    }
                }>
                    <InputField
                        label={"Designation"}
                        type={"text"}
                        name={"designation"}
                        // value={values.email}
                        onChange={handleInputChange}
                        placeholder={
                            "Enter candidate's designation"
                        }
                    />
                </div>
            </div>
            <div className="d-flex align-self-start mt-3" style={{ width: '100%' }}>
                <TextArea
                    label={"Reason for Leaving"}
                    type={"text"}
                    name={"reason"}
                    // value={values.email}
                    onChange={handleInputChange}
                    placeholder={
                        "Write candidate's reason for leaving"
                    }
                />
            </div>
            <div className="d-flex align-self-start mt-3" style={{
                justifyContent: "space-between",
                width: "100%",
                gap: '1rem'
            }}>
                <InputField
                    label={"Location"}
                    type={"text"}
                    name={"workLocation"}
                    // value={values.email}
                    onChange={handleInputChange}
                    placeholder={
                        "Enter candidate's previous work location"
                    }
                />
                <DropDownField
                    label={"Full time/Part time"}
                    type={"text"}
                    name={"workType"}
                    // value={values.email}
                    onChange={handleInputChange}
                    placeholder={
                        "Enter candidate's work type"
                    }
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
                            <input type="text" id={i}
                                //defaultValue={qType[i].question} 
                                //onChange={(e) => handleQuesChange(e, i)} 
                                placeholder='Enter Question'
                                className='f-34 f-3'
                                style={{ width: "85%", backgroundColor: 'white' }} />
                        </div>

                        <div className="form-3">
                            <Dropdown
                                values={ansType}
                                type={"text"}
                                name={"Choose Answer type"}
                                id={"type" + i}
                            //onChange={(e) => handleQuesTypeChange(e, i)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            {qCount > 1 &&
                <Button onClick={() => delques()}>Delete Question</Button>
            }

            <div onClick={addques} className="d-flex align-self-start mt-4" style={{ width: '100%', color: 'green', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>
                <PlusOutlined style={{ marginTop: '.3rem', marginRight: '.6rem' }} />
                <p>Add more questions</p>
            </div>


            <div className="d-flex align-self-start flex-column mt-3" style={{ width: '100%' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Enter the details of the person who verified the candidate</p>
                <div className='d-flex' style={{
                    justifyContent: "space-around",
                    gap: '1rem',
                    marginLeft: '0'
                }}>
                    <InputField
                        type={"text"}
                        name={"Name"}
                        // value={values.email}
                        onChange={handleInputChange}
                        placeholder={
                            "Name"
                        }
                    />
                    <InputField
                        type={"text"}
                        name={"EmpDesignation"}
                        // value={values.email}
                        onChange={handleInputChange}
                        placeholder={
                            "Designation"
                        }
                    />
                </div>
                <div style={{ width: '49%' }}>
                    <InputField
                        type={"text"}
                        name={"Department"}
                        // value={values.email}
                        onChange={handleInputChange}
                        placeholder={
                            "Department"
                        }
                    />
                </div>

            </div> */}
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
