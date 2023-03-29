import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/Dropdrowns/Dropdown";
import InputField from "../../../components/Input/InputField";
import UploadPic from "../../../components/UploadPic/UploadPic";
import "../SignupForm/Signup.css"

const initialValues = {
    email: "",
    password: "",
    companyName: "",
    companyWebsite: "",
};

export default function Signup() {
    const [values, setValues] = useState(initialValues)
    const [countries, setCountries] = useState([""]);
    const [states, setStates] = useState([""]);
    let year = [];
    var selectedCountry = ""
    var selectedState = ""
    var selectedYear = ""

    let maxOffset = 123;
    let thisYear = (new Date()).getFullYear();
    for (let x = 0; x <= maxOffset; x++) {
        var years = thisYear - x;
        year.push(years)
    }
    useEffect(() => {
        fetch("https://restcountries.com/v2/all?fields=name")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleCountryChange = (e) => {
        selectedCountry = e.target.value
        const data = { "country": e.target.value }
        axios.post("https://countriesnow.space/api/v0.1/countries/states", data)
            .then((res) => setStates(res.data.data.states))
        console.log(selectedCountry)
    }
    const handleStateChange = (e) => {
        selectedState = e.target.value
        console.log(selectedState)
    }
    const handleYearChange = (e) => {
        selectedYear = e.target.value
        console.log(selectedYear)
    }

    return (
        <div className="container-fluid">
            <div className="signupHeader">
                <span style={{ fontWeight: "bold" }}>Employer Signup</span>
            </div>
            <form className="form-horizontal">

                <InputField
                    label={"Email"}
                    type={"email"}
                    name={"email"}
                    value={values.email}
                    onChange={handleInputChange}
                    placeholder={"Input your company mail id, use an official email address."}
                />

                <InputField
                    label={"Password"}
                    type={"password"}
                    name={"password"}
                    value={values.password}
                    onChange={handleInputChange}
                    placeholder={"Input your password in here."}
                />

                <InputField
                    label={"Company Name"}
                    type={"text"}
                    name={"companyName"}
                    value={values.companyName}
                    onChange={handleInputChange}
                    placeholder={"Input your company name."}
                />

                <InputField
                    label={"Company Website"}
                    type={"text"}
                    name={"companyWebsite"}
                    value={values.companyWebsite}
                    onChange={handleInputChange}
                    placeholder={"Input your official company website link."}
                />

                <label className="control-label">Company Location</label>
                <div className="dropdowns">

                    <Dropdown
                        values={countries}
                        type={"country"}
                        name={"country"}
                        onChange={handleCountryChange}
                    />

                    <Dropdown
                        values={states}
                        type={"country"}
                        name={"state"}
                        onChange={handleStateChange}
                    />
                </div>

                <label className="control-label">Company Logo</label>
                <UploadPic />

                <label className="control-label">Company Establishment Date</label>
                <div className="dropdowns">

                    <Dropdown
                        values={year}
                        type={"number"}
                        name={"year"}
                        onChange={handleYearChange}
                    />
                </div>
            </form>
        </div>
    );
}
