import React, { useRef, useState } from "react";
import "./OnboardingForm.css";
import add from "../../../images/add.svg";
import { GoChevronLeft } from "react-icons/go";
import { PlusOutlined } from "@ant-design/icons";
import {
  onboardEmployee,
  readDesignations,
  writeDesignation,
} from "../../../DataBase/Employer/employer";
import { useNavigate } from "react-router-dom";
import { checkIfAvailable } from "../../../utils/FirebaseUtils";
import { useEffect } from "react";
import { Select, Space } from "antd";
import { Button, Input, Divider, message } from "antd";

const initialValues = {
  email: "",
  name: "",
  designation: "",
  dateOfJoining: "",
  typeOfEmployment: "",
  companyLocation: "",
  salary: "",
  offerLetter: "",
};

const $ = window.$;

function OnboardingForm() {
  let userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [values, setValues] = useState(initialValues);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [designationName, setDesignationName] = useState("");
  const [designations, setDesignations] = useState([]);
  const ipRef = useRef(null);
  const form = useRef();
  // const [email, setEmail] = useState("")
  const navigate = useNavigate("");

  // const handleSenderEmail = (e) => {
  //   setEmail(e.target.value)
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleLocationChange = (e) => {
    setValues({
      ...values,
      companyLocation: e,
    });
  };
  const handleTypeChange = (e) => {
    setValues({
      ...values,
      typeOfEmployment: e,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let userDatas = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readDesignations(userDatas.id);
        setDesignations(data);
      } catch (err) {
        message.error(err);
      }
    }
    fetchData();
    return () => {
      // error('Error fetching data:')
    };
  }, []);
  const addDesignation = (e) => {
    e.preventDefault();
    if (designationName !== "") {
      setDesignations(
        designations.concat([
          { companyId: userDatas.id, designation: designationName },
        ])
      );
      writeDesignation(userDatas.id, designationName);
      setDesignationName("");
      setTimeout(() => {
        ipRef.current?.focus();
      }, 0);
    }
  };
  const onDesignationNameChange = (event) => {
    setDesignationName(event.target.value);
  };
  const onDesignationChange = (event) => {
    values.designation = event;
  };
  useEffect(() => {
    checkIfAvailable(values.email)
      .then((result) => setEmailAvailable(result))
      .catch((error) => console.error(error));
  }, [values.email]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setFile(file.name);
    setValues({
      ...values,
      [name]: file,
    });
  };

  const handleSubmit = (e) => {
    values.companyName = userDatas.data.companyName;
    values.companyLogo = userDatas.data.companyLogo;
    values.employerEmail = userDatas.data.employerEmail;
    values.employerId = userDatas.id;
    values.emailAvailable = !emailAvailable;
    onboardEmployee(values).then(() => {
      window.location.href = "/offerletter-sent";
    });

    e.preventDefault();
    var data = {
      service_id: "service_cpytsjm",
      template_id: "template_pwvg0ae",
      user_id: "F3rrwZwcav-0a-BOW",
      template_params: {
        'name': values.name,
        'email': values.email,
      }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(function () {
      alert('Your mail is sent!');
    }).fail(function (error) {
      alert('Oops... ' + JSON.stringify(error));
    });
  };

  let [file, setFile] = useState("");

  const handleBack = () => {
    navigate("/employer-approval");
  };

  return (
    <div className="createemp container" style={{ height: "auto" }}>
      <div className="back mt-2" onClick={handleBack}>
        <GoChevronLeft style={{ color: "#9EC2AD" }} size={25} />
      </div>
      <div className="container-fluid" id="On-board">
        <div className="row d-flex  align-items-center">
          <div className="col-12">
            <div className="onboard-form-1">
              <p className="onboard-heading">On-Board New Employee</p>
              <div className="mx-auto d-flex flex-column justify-content-center align-items-center mb-5">
                <form
                  onSubmit={handleSubmit}
                  style={{ width: "100%", display: "contents" }}
                  ref={form}
                >
                  
                  <div className="form-item email">
                    <input
                      type="email"
                      className="form-control-1"
                      placeholder="Email address"
                      name="email"
                      onChange={handleInputChange}
                    />
                  </div>
                  <p
                    style={
                      emailAvailable
                        ? { color: "red", pointerEvents: "none" }
                        : { display: "none" }
                    }
                  >
                    Not on clearhire - an email will be sent to them instead
                  </p>

                  <div className="form-item">
                    <input
                      type="text"
                      className="form-control-1"
                      placeholder="Employee Name"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-item">
                    <Select
                      name="companyLocation"
                      placeholder="Select Company Location"
                      style={{ width: "100%" }}
                      onChange={(e) => handleLocationChange(e)}
                      options={userDatas.data.companyLocations.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </div>

                  <div className="form-item">
                    <Select
                      name="designation"
                      placeholder="Select Designation"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        onDesignationChange(e);
                      }}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Add new designation"
                              ref={ipRef}
                              value={designationName}
                              onChange={(e) => {
                                onDesignationNameChange(e);
                              }}
                            />
                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={(e) => addDesignation(e)}
                            >
                              Add
                            </Button>
                          </Space>
                        </>
                      )}
                      options={designations
                        .filter((item) => {
                          return item.designation.includes(designationName);
                        })
                        .map((item) => ({
                          label: item.designation,
                          value: item.designation,
                        }))}
                    />
                  </div>
                  <div className="form-item">
                    <Select
                      name="typeOfEmployment"
                      placeholder="Type Of Employment"
                      id="typeOfEmployment"
                      onChange={(e) => handleTypeChange(e)}
                      style={{ width: "100%" }}
                      options={[
                        {
                          label: "Permanent Full-Time",
                          value: "Permanent Full-Time",
                        },
                        {
                          label: "Part-Time",
                          value: "Part-Time",
                        },
                        {
                          label: "Casual/Vacation",
                          value: "Casual/Vacation",
                        },
                        {
                          label: "Contract",
                          value: "Contract",
                        },
                        {
                          label: "Internship/Trainee",
                          value: "Internship/Trainee",
                        },
                      ]}
                    />
                  </div>
                  <br />
                  <div className="form-item">
                    <input
                      type="date"
                      className="form-control-1"
                      placeholder="Date of Joining*"
                      name="dateOfJoining"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-item">
                    <div className="form-control-container">
                      <input
                        type="number"
                        className="form-control-2"
                        placeholder="Salary*"
                        name="salary"
                        onChange={handleInputChange}
                      />
                      <span className="form-control-unit">LPA</span>
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="file" className="file-input-label">
                      {file !== "" ? file : "Upload Offer Letter"}
                      <img src={add} alt="" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="file-input"
                      name="offerLetter"
                      accept=".txt, .pdf"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                    />
                  </div>

                  <div className="form-item">
                    <button
                      type="submit"
                      // onClick={handleSubmit}
                      className="send-btn"
                    >
                      <i className="fa-solid fa-plus s-1"></i>
                      Send Offer Letter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingForm;
