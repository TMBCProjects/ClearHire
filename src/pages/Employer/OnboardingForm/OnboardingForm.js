import React, { useState } from "react";
import "./OnboardingForm.css";
import add from "../../../images/add.svg";
import { GoChevronLeft } from "react-icons/go";
import { onboardEmployee } from "../../../DataBase/Employer/employer";
import { useNavigate } from "react-router-dom";
import { checkIfAvailable } from "../../../utils/FirebaseUtils";
import { useEffect } from "react";
import emailjs from 'emailjs-com'

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
function OnboardingForm() {
  let userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [values, setValues] = useState(initialValues);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [email, setEmail] = useState("")
  const navigate = useNavigate("");

  const handleSenderEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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

    emailjs.sendForm('service_cpytsjm', 'template_pwvg0ae', e.target, 'F3rrwZwcav-0a-BOW')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

  let [file, setFile] = useState("");

  const handleBack = () => {
    navigate("/employer-approval");
  };

  return (
    <div className="createemp container" style={{height: "auto"}}>
      <div className="back mt-2" onClick={handleBack}>
        <GoChevronLeft style={{ color: "#9EC2AD" }} size={25} />
      </div>
      <div className="container-fluid" id="On-board">
        <div className="row d-flex  align-items-center">
          <div className="col-12">
            <div className="onboard-form-1">
              <p className="onboard-heading">On-Board New Employee</p>
              <div className="mx-auto d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={handleSubmit} style={{width: "100%", display: "contents"}}>
                <div className="form-item email">
                  <input
                    type="email"
                    className="form-control-1"
                    placeholder="Email address"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                <p style={emailAvailable ? { color: "red", pointerEvents: "none" } : { display: "none" }}>
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
                  <select
                    name="companyLocation"
                    id=""
                    onChange={handleInputChange}
                  >
                    <option value="">Location*</option>
                    {userDatas.data.companyLocations.map((info) => {
                      return <option value={info}>{info}</option>;
                    })}
                  </select>
                </div>
                <div className="form-item">
                  <select name="designation" id="" onChange={handleInputChange}>
                    <option value="">Designation*</option>
                    <option value="Graphics Designer">Graphics Designer</option>
                    <option value="Developer">Developer</option>
                    <option value="Video Editor">Video Editor</option>
                  </select>
                </div>
                <div className="form-items">
                  <select
                    name="typeOfEmployment"
                    id="typeOfEmployment"
                    onChange={handleInputChange}
                  >
                    <option value="">Type Of Employment*</option>
                    <option value="Permanent Full-Time">
                      Permanent Full-Time
                    </option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Casual/Vacation">Casual/Vacation</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship/Trainee">
                      Internship/Trainee
                    </option>
                  </select>
                </div><br />
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
