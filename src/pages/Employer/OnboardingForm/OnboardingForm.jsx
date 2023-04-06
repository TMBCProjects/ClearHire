import React, { useState } from 'react'
import "./OnboardingForm.css";
import add from "../../../images/add.svg";
import { onboardEmployee } from '../../../DataBase/Employer/employer';

const initialValues = {
    name: "",
    email: "",
    aadhaarNumber: "",
    designation: "",
    dateOfJoining: "",
    salary: "",
    offerLetter: "",
};
function OnboardingForm() {
    const [values, setValues] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        setFile(file.name)
        setValues({
            ...values,
            [name]: file,
        });
    };

    const handleSubmit = () => {
        let userDatas = JSON.parse(sessionStorage.getItem("userData"));
        values.companyName = userDatas.data.companyName;
        values.employerEmail = userDatas.data.employerEmail;
        values.employerId = userDatas.id;
        onboardEmployee(values).then(() => {
            window.location.href = "/offerletter-sent";
        });
    };


    let [file, setFile] = useState('')

    return (
        <div className="createemp">
            <div className="row back">
                <div className="col-12 back-item">
                    <i className="fa-solid fa-circle-chevron-left"></i>
                    <h4>Back</h4>
                </div>
                <div className="container-fluid" id="On-board">
                    <div className="container">
                        <div className="row d-flex  align-items-center">
                            <div className="col-12">
                                <div className="onboard-form-1">
                                    <p className="onboard-heading">On-Board New Employee</p>
                                    <div className="mx-auto">
                                        <div className="form-item">
                                            <input
                                                type="text"
                                                className="form-control-1"
                                                placeholder="Name"
                                                name="name"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-item email">
                                            <input
                                                type="email"
                                                className="form-control-1"
                                                placeholder="Email address"
                                                name="email"
                                                onChange={handleInputChange}
                                            />
                                            <p>Not on clearhire - an email will be sent to them instead</p>
                                        </div>
                                        <div className="form-item">
                                            <input
                                                type="number"
                                                className="form-control-1"
                                                placeholder="Aadhaar Number"
                                                name="aadhaarNumber"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-item ">
                                            <select name="designation" id=""
                                                onChange={handleInputChange}>
                                                <option value="">Designation*</option>
                                                <option value="Graphics Designer">Graphics Designer</option>
                                                <option value="Developer">Developer</option>
                                                <option value="Video Editor">Video Editor</option>
                                            </select>
                                        </div>
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
                                            <input
                                                type="number"
                                                className="form-control-1"
                                                placeholder="Salary*"
                                                name="salary"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-item f-3">
                                            <input type="file" id="file" name="offerLetter" accept=".txt, .pdf" onChange={(e) => {
                                                handleFileChange(e)
                                            }} />
                                            <label for="file" className="custom-file-upload">{file !== '' ? file : 'Upload Offer Letter'}</label>
                                            <span id="filename"></span>
                                            <img src={add} alt="" />
                                        </div>
                                        <div className="form-item">
                                            <button type="submit" onClick={handleSubmit} className="send-btn">
                                                <i className="fa-solid fa-plus s-1"></i>
                                                Send Offer Letter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingForm;