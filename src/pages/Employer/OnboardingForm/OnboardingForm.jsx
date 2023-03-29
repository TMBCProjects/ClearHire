import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/Dropdrowns/Dropdown";
import InputField from "../../../components/Input/InputField";
import UploadOfferLetter from "../../../components/UploadOfferLetter/UploadOfferLetter";
import UploadPic from "../../../components/UploadPic/UploadPic";
import "../OnboardingForm/OnboardingForm.css"

const initialValues = {
    email: "",
    password: "",
    name: "",
    state: "",
    country: "",
    profileImage: "",
    role: "",
};

export default function OnboardingForm() {
    const [values, setValues] = useState(initialValues)
    const [designations, setDesignations] = useState([""]);
    let year = Array.from({ length: 123 }, (_, i) => (new Date()).getFullYear() - i);
    var selectedCountry = ""
    var selectedState = ""
    var selectedYear = ""
    useEffect(() => {
        fetch("https://api.securevan.com/v4/designations")
            .then((res) => res.json())
            .then((data) => {
                setDesignations(data);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        values.profileImage = sessionStorage.getItem("offerLetter");
        // values.role = sessionStorage.getItem("user");
        // registerLogin(values).then(() => {
        //     sessionStorage.removeItem("profileImage");
        window.location.href = "/offerletter-sent";
        // });
    };

    const handleYearChange = (e) => {
        selectedYear = e.target.value
        setValues({
            ...values,
            "dateOfJoining": selectedYear,
        });
    }

    return (
        <div className="container-fluid">
            <div className="signupHeader">
                <span style={{ fontWeight: "bold" }}>On-Board New Employee</span>

            </div>
            <form className="form-horizontal">
                <InputField
                    type={"text"}
                    name={"name"}
                    value={values.name}
                    onChange={handleInputChange}
                    placeholder={"Name"}
                />
                <InputField
                    type={"email"}
                    name={"email"}
                    value={values.email}
                    onChange={handleInputChange}
                    placeholder={"Email ID"}
                />
                <InputField
                    type={"text"}
                    name={"aadharNumber"}
                    value={values.aadharNumber}
                    onChange={handleInputChange}
                    placeholder={"Aadhar Number"}
                />
                <label className="control-label"></label>
                <div className="dropdowns">
                    <Dropdown
                        values={designations}
                        type={"number"}
                        name={"Designation"}
                        id={"Designation"}
                        onChange={handleYearChange}
                    />
                </div>
                <label className="control-label"></label>
                <div className="dropdowns">
                    <Dropdown
                        values={year}
                        type={"number"}
                        name={"Date Of Joining"}
                        id={"doj"}
                        onChange={handleYearChange}
                    />
                </div>
                <InputField
                    type={"text"}
                    name={"salary"}
                    value={values.salary}
                    onChange={handleInputChange}
                    placeholder={"Salary"}
                />
                <label className="control-label"></label>
                <UploadOfferLetter name={values.name} />
                <Button className="signupBtn" onClick={handleSubmit}><SendOutlined /> Send Offer Letter</Button>
            </form>
        </div>
    );
}
