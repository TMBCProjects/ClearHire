import React, { useState } from "react";
import "./Profile.css";
import Add from "../../../assets/images/add.svg";
import Check from "../../../assets/images/Check.svg";
import InputField from "../../../components/Input/InputField";
import { Slider, Col } from "antd";
import UploadFile from "../../../components/UploadFile";
import { MinusOutlined } from "@ant-design/icons";
import { profileUpdate } from "../../../DataBase/Employee/employee";

export default function Profile() {
    const [userDatas, setUserDatas] = useState(JSON.parse(sessionStorage.getItem("userData")));
    const [values, setValues] = useState({});
    const [skills, setSkills] = useState([
        {
            skillName: "",
            value: 0,
        },
    ]);
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let years = today.getFullYear() - birthDate.getFullYear();
        const months = today.getMonth() - birthDate.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
            years--;
        }
        return years;
    };
    const handleSkillChange = (e, index) => {
        const { value } = e.target;
        const newState = skills.map((obj, id) => {
            if (id === index) {
                return { ...obj, skillName: value };
            }
            return obj;
        });
        setSkills(newState);
    };

    const handleSkillValueChange = (e, index) => {
        const value = e;
        const newState = skills.map((obj, id) => {
            if (id === index) {
                return { ...obj, value: value };
            }
            return obj;
        });
        setSkills(newState);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const removeSkill = (index) => {
        const newState = skills.filter((obj, id) => {
            return id !== index;
        });
        setSkills(newState);
    };

    const updateUserData = (change) => {
        const newData = {
            ...userDatas, data: {
                ...userDatas.data, change
            }
        };
        sessionStorage.setItem("userData", JSON.stringify(newData));
        setUserDatas(JSON.parse(sessionStorage.getItem("userData")))
    };

    const handleSubmit = () => {
        let resume = sessionStorage.getItem("resume");
        if (resume) {
            values.resume = resume;
        }
        values.skills = skills;
        profileUpdate(values, userDatas.id).then(() => {
            updateUserData(values);
            sessionStorage.removeItem("resume");
            window.location.href = "/";
        });
    };

    return (
        <div className="profile">
            <div className="profileHeader">
                <div className="profilePic">
                    <img
                        src={userDatas.data.profileImage}
                        alt="manager-logo"
                        style={{ cursor: "pointer" }}></img>
                </div>

                <div className="name">
                    <span style={{ fontWeight: "bold" }}>
                        {userDatas.data.employeeName},{" "}
                        {calculateAge(userDatas.data.dateOfBirth)}
                    </span>
                    <br />
                    <span>
                        {userDatas.data.employeeState}, {userDatas.data.employeeCountry}
                    </span>
                </div>
            </div>
            {userDatas.data.currentEmployerId &&
                <div className="profile-progress">
                    <div className="progressBar">
                        <div className="col-12 circles">
                            <div className="col-6 circle-box">
                                <div className="circle" data-prog="95">
                                    <svg width={250} height="250">
                                        <circle
                                            class="progress-ring__circle"
                                            stroke="#00823B"
                                            stroke-width="15"
                                            // fill="transparent"
                                            r="35"
                                            cx="125"
                                            cy="125"
                                        ></circle>
                                    </svg>
                                    <div className="circle-inner">
                                        <h1>95%</h1>
                                    </div>
                                </div>
                                <div className="text">
                                    <h6>Colleague Score</h6>
                                </div>
                            </div>
                            <div className="col-6 circle-box">
                                <div className="circle" data-prog="75">
                                    <svg width={250} height="250">
                                        <circle
                                            class="progress-ring__circle"
                                            stroke="#00823B"
                                            stroke-width="15"
                                            // fill="transparent"
                                            r="35"
                                            cx="125"
                                            cy="125"
                                        ></circle>
                                    </svg>
                                    <div className="circle-inner">
                                        <h1>75%</h1>
                                    </div>
                                </div>
                                <div className="text">
                                    <h6>Score</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            {userDatas.data.currentEmployerId &&
            <div className="profileScore">
                <h1 className="text-center text-color-green fw-bold font-size-30">
                    Current Company
                </h1>
                <div>
                    <p>Company</p>
                    <p>The Madras Branding Company</p>
                </div>
                <div>
                    <p>Job Role</p>
                    <p>Graphics Designer</p>
                </div>
                <div>
                    <p>Date of joining</p>
                    <p>01-01-2023</p>
                </div>
                <div>
                    <p>Salary</p>
                    <p>500,000 PA</p>
                </div>
            </div>
            }

            <div className="profileBody">
                <UploadFile name={userDatas.data.employeeName} url={userDatas.data.resume} />
                <InputField
                    type={"text"}
                    name={"portfolioLink"}
                    value={values.portfolioLink}
                    onChange={handleInputChange}
                    placeholder={"Add Portfolio link..."}
                />

                <InputField
                    type={"number"}
                    name={"employeeAadhaarCardNumber"}
                    value={values.employeeAadhaarCardNumber}
                    onChange={handleInputChange}
                    placeholder={"Add Your Aadhar Number"}
                />

                <div className="skills">
                    <span
                        style={{
                            fontWeight: "bold",
                            display: "flex",
                            gap: "2vh",
                            alignItems: "center",
                        }}>
                        Your Skills
                    </span>
                    {!skills.length && (
                        <div>
                            Add atleast 1 skill{" "}
                            <span
                                onClick={() => {
                                    setSkills([
                                        ...skills,
                                        {
                                            skillName: "",
                                            value: 0,
                                        },
                                    ]);
                                }}
                                style={{
                                    border: "1px solid green",
                                    borderRadius: "6vh",
                                    marginLeft: "2vh",
                                    padding: "1vh 1.5vh",
                                    width: "7vh",
                                    cursor: "pointer",
                                }}>
                                <img
                                    src={Add}
                                    alt="add"></img>
                            </span>
                        </div>
                    )}
                    {skills?.map((skill, index) => {
                        return (
                            <div className="skillList">
                                <InputField
                                    type={"text"}
                                    name={`skill ${index + 1}`} //name should iterated according to .map
                                    onChange={(e) => {
                                        handleSkillChange(e, index);
                                    }}
                                    placeholder={`Skill ${index + 1}`}
                                />
                                <Col span={10}>
                                    <Slider
                                        min={1}
                                        max={100}
                                        onChange={(e) => {
                                            handleSkillValueChange(e, index);
                                        }}
                                        trackStyle={{ backgroundColor: "#00823B" }}
                                        handleStyle={{ backgroundColor: "#00823B" }}
                                    />
                                </Col>

                                <span className="sliderpercent">{skill.value}</span>

                                <span
                                    onClick={() => {
                                        removeSkill(index);
                                    }}
                                    style={{
                                        border: "1px solid tomato",
                                        borderRadius: "6vh",
                                        marginLeft: "2vh",
                                        padding: "1vh 1.5vh",
                                        width: "7vh",
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <MinusOutlined style={{ color: "tomato" }} />
                                </span>
                                {index === skills.length - 1 && (
                                    <span
                                        onClick={() => {
                                            setSkills([
                                                ...skills,
                                                {
                                                    skillName: "",
                                                    value: 0,
                                                },
                                            ]);
                                        }}
                                        style={{
                                            border: "1px solid green",
                                            borderRadius: "6vh",
                                            marginLeft: "2vh",
                                            padding: "1vh 1.5vh",
                                            width: "7vh",
                                            cursor: "pointer",
                                        }}>
                                        <img
                                            src={Add}
                                            alt="add"></img>
                                    </span>
                                )}
                            </div>
                        );
                    })}
                    <div className="profileFooter">
                        <button
                            onClick={handleSubmit}>
                            <img
                                src={Check}
                                alt="submit-logo"></img>
                            &nbsp;Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
