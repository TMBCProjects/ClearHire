import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/Dropdrowns/Dropdown";
import InputField from "../../../components/Input/InputField";
import UploadPic from "../../../components/UploadPic/UploadPic";
import { uploadPhoto } from "../../../utils/FirebaseUtils";
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
        console.log(values)
    };

    const handleCountryChange = (e) => {
        selectedCountry = e.target.value
        const data = { "country": e.target.value }
        axios.post("https://countriesnow.space/api/v0.1/countries/states", data)
            .then((res) => setStates(res.data.data.states))
        setValues({
            ...values,
            "companyCountry": selectedCountry,
        });
        console.log(values)
    }
    const handleStateChange = (e) => {
        selectedState = e.target.value
        setValues({
            ...values,
            "companyState": selectedState,
        });
        console.log(values)
    }
    const handleYearChange = (e) => {
        selectedYear = e.target.value
        setValues({
            ...values,
            "companyEstablishmentDate": selectedYear,
        });
        console.log(values)
    }
    const handleSubmit = async (file) => {
        try {
            const downloadURL = await uploadPhoto(file);
            console.log('Download URL:', downloadURL);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="signupHeader">
                <span style={{ fontWeight: "bold" }}>Employer Signup</span>
            </div>
            <form className="form-horizontal">

                <InputField
                    label={"Email"}
                    type={"email"}
                    name={"employerEmail"}
                    value={values.employerEmail}
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
                </div><br />
                <button type="submit" onClick={() => { handleSubmit() }} className="btn login-btn">
                    Login
                </button><br /><br /><br /><br /><br />
            </form>
        </div>
    );
}
