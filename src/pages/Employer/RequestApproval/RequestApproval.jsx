import React, { useState } from "react";
import "./RequestApproval.css";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { checkIfAvailable } from "../../../utils/FirebaseUtils";
import { useEffect } from "react";
import { sendRequestToViewAssesment } from "../../../DataBase/Employer/employer";

function RequestApproval() {
    let userDetails = JSON.parse(sessionStorage.getItem("userData"));
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [emailAvailable, setEmailAvailable] = useState(false);

    const navigate = useNavigate("");

    const handleInputChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };
    const handleNameChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

    useEffect(() => {
        checkIfAvailable(email)
            .then((result) => setEmailAvailable(result))
            .catch((error) => console.error(error))
    }, [email]);


    const handleSubmit = () => {
        let newRequest = {
            isApproved: false,
            companyName: userDetails.data.companyName,
            companyLogo: userDetails.data.companyLogo,
            employerEmail: userDetails.data.employerEmail,
            employerId: userDetails.id,
            employeeName: name,
            employeeEmail: email,
            emailAvailable: !emailAvailable
        };
        sendRequestToViewAssesment(newRequest).then(() => {
            window.location.href = "/requests";
        });
    };

    const handleBack = () => {
        navigate("/requests");
    };
    return (
        <div className="createemp container">
            <div className="back mt-2" onClick={handleBack}>
                <GoChevronLeft style={{ color: "#9EC2AD" }} size={25} />
            </div>
            <div className="container-fluid" id="On-board">
                <div className="row d-flex  align-items-center">
                    <div className="col-12">
                        <div className="onboard-form-1">
                            <p className="onboard-heading">Request Employee Details</p>
                            <div className="mx-auto d-flex flex-column justify-content-center align-items-center">
                                <div className="form-item text">
                                    <input
                                        type="text"
                                        className="form-control-1"
                                        placeholder="Name"
                                        name="name"
                                        onChange={handleNameChange}
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
                                </div>
                                <p style={emailAvailable ? { color: "red" } : { opacity: "0", pointerEvents: "none" }}>
                                    Not on clearhire - an email will be sent to them instead
                                </p>

                                <div className="form-item">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="send-btn"
                                    >
                                        <i className="fa-solid fa-plus s-1"></i>
                                        Send Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestApproval;
