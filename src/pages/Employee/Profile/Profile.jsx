import React, { useState } from "react";
import "../Profile/Profile.css";
import pic from "../../../assets/images/pic.png";
import Add from "../../../assets/images/add.svg";
import Check from "../../../assets/images/Check.svg";
import InputField from "../../../components/Input/InputField";
import { Slider, Col } from "antd";
import UploadFile from "../../../components/UploadFile";
import { MinusOutlined } from "@ant-design/icons";

let userDatas = JSON.parse(sessionStorage.getItem("userData"));
const initialValues = {
    portfolioLink: userDatas.data.portfolioLink || "",
    resume: userDatas.data.resume || "",
    employeeAadhaarCardNumber: userDatas.data.employeeAadhaarCardNumber || "",
    skills: userDatas.data.skills || [],
};
export default function Profile() {
    const [values, setValues] = useState(initialValues);
    const [skills, setSkills] = useState([
        {
            skillName: "",
            value: 0,
        },
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

    const handleInputChange = (e, index) => {
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

    const handleSubmit = () => {
        let resume = JSON.parse(sessionStorage.getItem("resume"));
        values.skill = skills;
        // values.resume = resume;
        console.log(resume);
        // profileUpdate(values).then(() => {
        //     window.location.href = "/offerletter-sent";
        // });
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

            <div className="profileBody">
                <UploadFile />
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
