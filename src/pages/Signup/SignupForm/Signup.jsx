import { Button } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/Dropdrowns/Dropdown";
import InputField from "../../../components/Input/InputField";
import UploadPic from "../../../components/UploadPic/UploadPic";
import "../SignupForm/Signup.css"

const initialValues = {
    email: "",
    password: "",
    name: "",
    state: "",
    country: "",
    profileImage: "",
    role: sessionStorage.getItem("user"),
};

export default function Signup() {
    const [values, setValues] = useState(initialValues)
    const [countries, setCountries] = useState([""]);
    const [states, setStates] = useState([""]);
    let year = Array.from({ length: 123 }, (_, i) => (new Date()).getFullYear() - i);
    let date = Array.from({ length: 31 }, (_, i) => i + 1);
    let month = Array.from({ length: 12 }, (_, i) => i + 1);
    var selectedCountry = ""
    var selectedState = ""
    var selectedYear = ""
    var user = sessionStorage.getItem("user")
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
    // const handleDOBChange = (e) => {
    //     const { name, value } = e.target;
    //     setDob({
    //         ...values,
    //         [name]: value,
    //     });
    //     console.log(dob)
    // };
    const handleSubmit = () => {
        console.log(values)
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
    }
    const handleStateChange = (e) => {
        selectedState = e.target.value
        setValues({
            ...values,
            "state": selectedState,
        });
    }
    const handleYearChange = (e) => {
        selectedYear = e.target.value
        setValues({
            ...values,
            "companyEstablishmentYear": selectedYear,
        });
    }
    const handleDOBYearChange = (e) => {
        const selectedYear = e.target.value;
        values.dateOfBirth = values.dateOfBirth === undefined ? "" : values.dateOfBirth
        console.log(values)
        const newDateOfBirth = `${values.dateOfBirth.split("/")[0]}/${values.dateOfBirth.split("/")[1]}/${selectedYear}`;
        setValues({
            ...values,
            "dateOfBirth": newDateOfBirth,
        });
    };

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        values.dateOfBirth = values.dateOfBirth === undefined ? "" : values.dateOfBirth
        console.log(values)
        const newDateOfBirth = `${selectedMonth}/${values.dateOfBirth.split("/")[1]}/${values.dateOfBirth.split("/")[2]}`;
        setValues({
            ...values,
            "dateOfBirth": newDateOfBirth,
        });
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        values.dateOfBirth = values.dateOfBirth === undefined ? "" : values.dateOfBirth
        console.log(values)
        const newDateOfBirth = `${values.dateOfBirth.split("/")[0]}/${selectedDate}/${values.dateOfBirth.split("/")[2]}`;
        setValues({
            ...values,
            "dateOfBirth": newDateOfBirth,
        });
    };


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
                            type={"text"}
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
                                name={"Year"}
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
                                values={date}
                                type={"number"}
                                name={"Date"}
                                onChange={handleDateChange}
                            />
                            <Dropdown
                                values={month}
                                type={"number"}
                                name={"Month"}
                                onChange={handleMonthChange}
                            />
                            <Dropdown
                                values={year}
                                type={"number"}
                                name={"Year"}
                                onChange={handleDOBYearChange}
                            />
                        </div>
                    </>
                }
                <Button className="signupBtn" onClick={handleSubmit}>Signup</Button>
            </form>
        </div>
    );
}
