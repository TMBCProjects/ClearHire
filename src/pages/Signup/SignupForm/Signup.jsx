import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/Dropdrowns/Dropdown";
import InputField from "../../../components/Input/InputField";
import UploadPic from "../../../components/UploadPic/UploadPic";
import "../SignupForm/Signup.css"

const initialValues = {
    email: "",
    password: "",
    companyWebsite: "",
    name: "",
    state: "",
    country: "",
    profileImage: "",
    role: sessionStorage.getItem("user"),
};

export default function Signup() {
    const [values, setValues] = useState(initialValues)
    const [dob, setDob] = useState({ date: "", month: "", year: "" })
    const [countries, setCountries] = useState([""]);
    const [states, setStates] = useState([""]);
    let year = [];
    var selectedCountry = ""
    var selectedState = ""
    var selectedYear = ""
    var user = sessionStorage.getItem("user")
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
        console.log(values)
    };
    const handleDOBChange = (e) => {
        const { name, value } = e.target;
        setDob({
            ...values,
            [name]: value,
        });
        console.log(dob)
    };

    const handleCountryChange = (e) => {
        selectedCountry = e.target.value
        const data = { "country": e.target.value }
        axios.post("https://countriesnow.space/api/v0.1/countries/states", data)
            .then((res) => setStates(res.data.data.states))
        setValues({
            ...values,
            "country": selectedCountry,
        });
        console.log(values)
    }
    const handleStateChange = (e) => {
        selectedState = e.target.value
        setValues({
            ...values,
            "state": selectedState,
        });
        console.log(values)
    }
    const handleYearChange = (e) => {
        selectedYear = e.target.value
        setValues({
            ...values,
            "companyEstablishmentYear": selectedYear,
        });
        console.log(values)
    }

    return (
        <div className="container-fluid">
            <div className="signupHeader">
                {user === "employer" ?
                    <span style={{ fontWeight: "bold" }}>Employer Signup</span>
                    :
                    <span style={{ fontWeight: "bold" }}>Employee Signup</span>
                }

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
                {user === "employee" ?
                    <InputField
                        label={"Your Name"}
                        type={"text"}
                        name={"name"}
                        value={values.name}
                        onChange={handleInputChange}
                        placeholder={"Input your full name."}
                    />
                    :

                    <>
                        <InputField
                            label={"Company Name"}
                            type={"text"}
                            name={"name"}
                            value={values.name}
                            onChange={handleInputChange}
                            placeholder={"Input your company name."}
                        />

                        <InputField
                            label={"Company Website"}
                            type={"url"}
                            name={"companyWebsite"}
                            value={values.companyWebsite}
                            onChange={handleInputChange}
                            placeholder={"Input your official company website link."}
                        />
                    </>
                }

                {user === "employer" ?
                    <label className="control-label">Company Location</label>
                    :
                    <label className="control-label">Your Location</label>
                }
                <div className="dropdowns">
                    <Dropdown
                        values={countries}
                        type={"country"}
                        name={"country"}
                        id={"Country"}
                        onChange={handleCountryChange}
                    />

                    <Dropdown
                        values={states}
                        type={"country"}
                        name={"state"}
                        id={"State"}
                        onChange={handleStateChange}
                    />
                </div>
                {user === "employer" ?
                    <label className="control-label">Company Logo</label>
                    :
                    <label className="control-label">Profile Image</label>
                }
                <UploadPic />

                {user === "employer" ?
                    <>
                        <label className="control-label">Company Establishment Date</label>
                        <div className="dropdowns">

                            <Dropdown
                                values={year}
                                type={"number"}
                                name={"companyEstablishmentYear"}
                                id={"Year"}
                                onChange={handleYearChange}
                            />
                        </div>
                    </>
                    :
                    <>
                        <label className="control-label">Date of Birth</label>
                        <div className="dropdowns">

                            <Dropdown
                                values={dob.date}
                                type={"number"}
                                name={"date"}
                                onChange={handleDOBChange}
                            />

                            <Dropdown
                                values={dob.month}
                                type={"number"}
                                name={"month"}
                                onChange={handleDOBChange}
                            />

                            <Dropdown
                                values={dob.year}
                                type={"number"}
                                name={"year"}
                                onChange={handleDOBChange}
                            />
                        </div>
                    </>
                }
                <button className="signupBtn">Signup</button>
            </form>
        </div>
    );
}
